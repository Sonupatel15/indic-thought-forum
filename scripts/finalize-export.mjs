import { constants } from "node:fs";
import { copyFile, readdir, rmdir, unlink } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

let normalized = 0;

async function flattenSegments(directory, routeDirectory, parts) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const source = join(directory, entry.name);
    if (entry.isDirectory()) {
      await flattenSegments(source, routeDirectory, [...parts, entry.name]);
    } else if (entry.isFile() && entry.name.endsWith(".txt")) {
      const destination = join(routeDirectory, [...parts, entry.name].join("."));
      await copyFile(source, destination, constants.COPYFILE_EXCL);
      await unlink(source);
      normalized++;
    } else {
      throw new Error(`Unexpected static segment entry: ${source}`);
    }
  }
  await rmdir(directory);
}

async function visit(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const child = join(directory, entry.name);
    if (entry.name.startsWith("__next.")) {
      await flattenSegments(child, directory, [entry.name]);
    } else {
      await visit(child);
    }
  }
}

// Next 16.4's Windows exporter retains backslashes in segment names.
// The browser router requests the corresponding dotted, portable filenames.
if (process.platform === "win32") {
  await visit(fileURLToPath(new URL("../out/", import.meta.url)));
  console.log(`Normalized ${normalized} Windows static routing segment files.`);
}
