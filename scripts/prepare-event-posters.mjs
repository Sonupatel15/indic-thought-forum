import { join } from "node:path";
import sharp from "sharp";
import { events } from "../src/lib/site.ts";

for (const event of events) {
  if (!/^\/images\/[a-z0-9/-]+\.png$/.test(event.image) || event.previewImage !== event.image.replace(/\.png$/, ".webp")) {
    throw new Error(`Invalid original/preview poster paths for "${event.id}".`);
  }
  const image = sharp(join("public", ...event.image.slice(1).split("/")));
  const metadata = await image.metadata();
  if (metadata.width !== event.imageWidth || metadata.height !== event.imageHeight) {
    throw new Error(`Poster dimensions do not match the event data for "${event.id}".`);
  }
  const output = await image.webp({ quality: 82, effort: 6 }).toFile(join("public", ...event.previewImage.slice(1).split("/")));
  if (output.size > 256 * 1024) {
    throw new Error(`Poster preview "${event.id}" exceeds the 256 KiB card-image budget.`);
  }
  console.log(`${event.id}: ${Math.round(output.size / 1024)} KiB, ${output.width}x${output.height}; original PNG preserved.`);
}
