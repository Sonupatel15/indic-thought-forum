import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

const base = "https://ml-media-center.s3.amazonaws.com/0c582109-28fa-409a-b05c-a5a6a1d4b6ce/73ef6ef2-2cb2-11f1-8f07-7e9e2d2aaf01/";
const assets = [
  ["heritage-hero.webp", "1775058351_ChatGPT_Image_Apr_1,_2026,_05_36_14_PM.png", 1920],
  ["heritage.webp", "1775019303_1775019244_1774950348_WhatsApp_Image_2026-03-30_at_9.55.39_PM.jpeg", 960],
  ["sankrant-sanu/event-photos/community-gathering.webp", "WhatsApp Image 2026-03-31 at 2.53.24 PM.jpeg", 1000],
  ["sankrant-sanu/event-photos/community-conversation.webp", "WhatsApp Image 2026-03-31 at 2.53.26 PM.jpeg", 1000],
  ["sankrant-sanu/event-photos/audience-participation.webp", "WhatsApp Image 2026-03-31 at 2.53.26 PM (1).jpeg", 1000],
  ["sankrant-sanu/event-photos/speaker-and-participants.webp", "WhatsApp Image 2026-03-31 at 2.53.27 PM.jpeg", 1000],
  ["sankrant-sanu/event-photos/community-connections.webp", "WhatsApp Image 2026-03-31 at 2.53.24 PM (1).jpeg", 1000],
];

const directory = new URL("../public/images/", import.meta.url);
await mkdir(directory, { recursive: true });

await Promise.all(assets.map(async ([name, source, width]) => {
  const response = await fetch(base + encodeURIComponent(source), { signal: AbortSignal.timeout(60000) });
  if (!response.ok) throw new Error(`Asset ${name}: HTTP ${response.status}`);
  const input = Buffer.from(await response.arrayBuffer());
  const image = sharp(input).rotate().resize({ width, withoutEnlargement: true });
  const output = name.endsWith(".png") ? await image.png().toBuffer() : await image.webp({ quality: 84 }).toBuffer();
  const destination = new URL(name, directory);
  await mkdir(new URL(".", destination), { recursive: true });
  await writeFile(destination, output);
  if (name === "heritage.webp") {
    const mark = await sharp(output).trim({ threshold: 20 }).resize(160, 160, { fit: "contain", background: "#f7f5ef" }).png().toBuffer();
    await writeFile(new URL("logo-mark.png", directory), mark);
  }
  console.log(`${name}: ${(output.length / 1024).toFixed(0)} KB`);
}));
