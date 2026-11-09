import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const source = new URL("../public/images/itf-assets/ITF-Logo.png", import.meta.url);
const destination = new URL("../public/images/itf-assets/itf-logo-footer.webp", import.meta.url);
const output = await sharp(await readFile(source))
  .resize({ width: 168, withoutEnlargement: true })
  .webp({ lossless: true, effort: 6 })
  .toFile(fileURLToPath(destination));

if (output.width !== 168 || output.height !== 168 || output.size > 32 * 1024) {
  throw new Error("The official footer logo must produce a 168x168 preview within 32 KiB.");
}
console.log(`Official footer logo: ${output.width}x${output.height}, ${output.size} bytes; source PNG unchanged.`);
