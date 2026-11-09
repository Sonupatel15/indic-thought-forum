import { mkdir, readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";
import { podcasts } from "../src/lib/media.ts";

const directory = new URL("../public/images/", import.meta.url);
await mkdir(directory, { recursive: true });
await Promise.all(podcasts.map(async ({ videoId, thumbnail }) => {
  if (!/^\/images\/[A-Za-z0-9_-]+\.webp$/.test(thumbnail)) throw new Error(`Invalid local thumbnail path: ${thumbnail}`);
  const filename = thumbnail.slice("/images/".length);
  const response = await fetch(`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`Thumbnail ${videoId}: HTTP ${response.status}`);
  const output = await sharp(Buffer.from(await response.arrayBuffer())).resize({ width: 960, withoutEnlargement: true }).webp({ quality: 82 }).toBuffer();
  await writeFile(new URL(filename, directory), output);
  console.log(`${filename}: ${Math.round(output.length / 1024)} KB`);
}));
const mobileHero = await sharp(await readFile(new URL("heritage-hero.webp", directory))).resize({ width: 960 }).webp({ quality: 80 }).toBuffer();
await writeFile(new URL("heritage-hero-mobile.webp", directory), mobileHero);
console.log(`heritage-hero-mobile.webp: ${Math.round(mobileHero.length / 1024)} KB`);
