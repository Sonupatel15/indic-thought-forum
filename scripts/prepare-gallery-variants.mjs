import { join } from "node:path";
import sharp from "sharp";
import { gallery } from "../src/lib/site.ts";

for (const photo of gallery) {
  const image = sharp(join("public", ...photo.src.slice(1).split("/")));
  const metadata = await image.metadata();
  if (metadata.width !== 1000 || !metadata.height) {
    throw new Error(`Unexpected gallery dimensions for "${photo.src}".`);
  }

  for (const width of [360, 720]) {
    const outputPath = join("public", ...photo.src.replace(".webp", `-${width}.webp`).slice(1).split("/"));
    const output = await image.clone().resize({ width, withoutEnlargement: true }).webp({ quality: 82, effort: 6 }).toFile(outputPath);
    const expectedHeight = Math.round(width * metadata.height / metadata.width);
    if (output.width !== width || output.height !== expectedHeight || output.size > 180 * 1024) {
      throw new Error(`Gallery variant "${outputPath}" does not meet its size budget.`);
    }
    console.log(`${outputPath}: ${Math.round(output.size / 1024)} KiB, ${output.width}x${output.height}.`);
  }
}
