import { existsSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { test, expect } from "@playwright/test";
import { events, gallery, site } from "../src/lib/site";
import { getYouTubeEmbedUrl, podcasts } from "../src/lib/media";

test("Home has real-text branding, unnumbered sections, updated goals, and no purpose photo", async ({ page }) => {
  await page.goto("/");
  const main = page.locator("main");
  await expect(page.locator(".hero-eyebrow, .hero-signature img, #our-purpose img, .principle-card .card-number")).toHaveCount(0);
  await expect(main).not.toContainText("Rooted in heritage. Driven by purpose.");
  await expect(page.locator(".hero-signature strong")).toHaveText(site.name);
  await expect(page.locator(".hero-signature > div > span")).toHaveText(site.tagline);
  await expect(page.locator("#our-purpose .eyebrow")).toHaveText("Our Purpose");
  expect(await main.locator(".eyebrow").allTextContents()).not.toContainEqual(expect.stringMatching(/^\d{2}\s*\//));
  await expect(page.locator(".principle-card")).toHaveCount(3);
  await expect(page.locator(".journey .step-number")).toHaveCount(5);
  await expect(page.locator(".pathway-card .lucide-list-checks")).toHaveCount(1);
  await expect(page.locator(".pathway-card .lucide-calendar-days")).toHaveCount(1);
  expect(await page.locator(".goal > strong").allTextContents()).toEqual(["500+", "10+", "30+"]);
  await expect(page.locator(".gallery-grid--preview .gallery-photo")).toHaveCount(4);
  await expect(main).not.toContainText("Privacy-first preview");
  await expect(main).not.toContainText("Choosing Load connects to YouTube/Google");
  await expect(page.locator(".youtube-label, .youtube-disclosure, iframe")).toHaveCount(0);
});

test("Home shows exactly the latest three events including upcoming dates with correct posters and venues", async ({ page }) => {
  const posterRequests: string[] = [];
  page.on("request", request => {
    const path = new URL(request.url()).pathname;
    if (path.includes("/event-poster/")) posterRequests.push(path);
  });
  await page.clock.setFixedTime(new Date("2026-11-09T12:00:00Z"));
  await page.goto("/");
  const cards = page.locator(".event-card");
  await expect(cards).toHaveCount(3);
  expect(await cards.locator(".event-date time").evaluateAll(items => items.map(item => item.getAttribute("datetime")))).toEqual([
    "2026-11-29", "2026-10-25", "2026-07-11",
  ]);
  expect(await cards.locator(".event-date > span").allTextContents()).toEqual(["Upcoming", "Archive", "Archive"]);
  for (const [index, event] of events.slice(0, 3).entries()) {
    await expect(cards.nth(index).locator("img")).toHaveAttribute("src", event.previewImage);
    await expect(cards.nth(index).locator(".event-location")).toHaveText(event.venue);
  }
  for (const image of await cards.locator("img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveJSProperty("complete", true);
  }
  expect([...new Set(posterRequests)].sort()).toEqual(events.slice(0, 3).map(event => event.previewImage).sort());
  const poster = cards.first().getByRole("button", { name: `View poster for ${events[0].title}`, exact: true });
  await poster.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog").locator("img")).toHaveAttribute("src", events[0].image);
  await expect(page.getByRole("dialog").locator("img")).toHaveJSProperty("complete", true);
  expect(posterRequests).toContain(events[0].image);
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("dialog").locator("img")).toHaveAttribute("src", events[1].image);
  await page.keyboard.press("Escape");
  await expect(poster).toBeFocused();
  await page.clock.setFixedTime(new Date("2026-11-29T12:00:00Z"));
  await page.reload();
  await expect(cards.first().locator(".event-date > span")).toHaveText("Today");
  await page.clock.setFixedTime(new Date("2026-11-30T12:00:00Z"));
  await page.reload();
  await expect(cards.first().locator(".event-date > span")).toHaveText("Archive");
});

test("every supplied poster has correct intrinsic dimensions and all event photos resolve", async ({ request }) => {
  expect(events).toHaveLength(7);
  expect(gallery).toHaveLength(5);
  for (const event of events) {
    expect(event.image).toMatch(/\/event-poster\/[a-z0-9-]+-2026-\d{2}-\d{2}\.png$/);
    const metadata = await sharp(join("public", ...event.image.slice(1).split("/"))).metadata();
    expect(metadata.width).toBe(event.imageWidth);
    expect(metadata.height).toBe(event.imageHeight);
    expect(metadata.format).toBe("png");
    expect((await request.get(event.image)).status()).toBe(200);
    expect(event.previewImage).toBe(event.image.replace(/\.png$/, ".webp"));
    const preview = await sharp(join("public", ...event.previewImage.slice(1).split("/"))).metadata();
    expect(preview.width).toBe(event.imageWidth);
    expect(preview.height).toBe(event.imageHeight);
    expect(preview.format).toBe("webp");
    const response = await request.get(event.previewImage);
    expect(response.status()).toBe(200);
    expect((await response.body()).byteLength).toBeLessThanOrEqual(256 * 1024);
  }
  for (const photo of gallery) {
    expect(photo.src).toMatch(/^\/images\/sankrant-sanu\/event-photos\/[a-z-]+\.webp$/);
    expect(existsSync(join("public", ...photo.src.slice(1).split("/")))).toBe(true);
    expect((await request.get(photo.src)).status()).toBe(200);
  }
});

test("Home posters stay uncropped and aligned with readable copy from phones through TV widths", async ({ page }) => {
  test.setTimeout(90000);
  for (const width of [320, 393, 480, 768, 1024, 1440, 1920, 2560, 3840]) {
    await page.setViewportSize({ width, height: width >= 2560 ? 2160 : 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Home overflow at ${width}px`).toBe(true);
    const signature = await page.locator(".hero-signature").boundingBox();
    const heroBottom = await page.locator(".hero-bottom").boundingBox();
    if (!signature || !heroBottom) throw new Error("Hero branding and bottom navigation must remain visible.");
    expect(signature.y + signature.height, `Hero branding overlap at ${width}px`).toBeLessThanOrEqual(heroBottom.y);
    expect(await page.locator(".philosophy-footnote").evaluate(element => parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(14);
    const gridColumns = await page.locator(".event-grid").evaluate(element => getComputedStyle(element).gridTemplateColumns.split(" ").length);
    expect(gridColumns).toBe(width <= 480 ? 1 : width <= 760 ? 2 : 3);
    const images = page.locator(".event-image img");
    const positions: number[] = [];
    for (const image of await images.all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveJSProperty("complete", true);
      const metrics = await image.evaluate(element => {
        if (!(element instanceof HTMLImageElement)) throw new Error("Expected an event poster image.");
        const bounds = element.getBoundingClientRect();
        return { width: element.naturalWidth, height: element.naturalHeight, ratio: bounds.width / bounds.height, fit: getComputedStyle(element).objectFit, top: bounds.top + scrollY };
      });
      expect(metrics.width).toBe(1587);
      expect(metrics.height).toBe(2245);
      expect(metrics.ratio).toBeCloseTo(1587 / 2245, 3);
      expect(metrics.fit).toBe("contain");
      positions.push(metrics.top);
      await image.hover();
      expect(await image.evaluate(element => getComputedStyle(element).transform)).toBe("none");
    }
    if (width > 760) expect(Math.max(...positions) - Math.min(...positions)).toBeLessThanOrEqual(1);
  }
});

test("Home keeps keyboard opt-in, playback errors, direct watch links, and focus restoration without preview clutter", async ({ page }) => {
  const episode = podcasts[0];
  await page.route("https://www.youtube-nocookie.com/embed/**", route => route.fulfill({
    contentType: "text/html",
    body: "<!doctype html><html lang='en'><title>Mock video</title><button>Play video</button></html>",
  }));
  await page.goto("/");
  const load = page.getByRole("button", { name: `Load YouTube player: ${episode.title}`, exact: true });
  await load.focus();
  await page.keyboard.press("Enter");
  const frame = page.getByTitle(`YouTube video: ${episode.title}`, { exact: true });
  await expect(frame).toHaveAttribute("src", getYouTubeEmbedUrl(episode.videoId));
  await expect(page.frameLocator("iframe").getByRole("button", { name: "Play video" })).toBeVisible();
  await frame.dispatchEvent("error");
  await expect(page.locator(".youtube-disclosure")).toContainText("The external player could not load.");
  await expect(page.getByRole("link", { name: /Watch on YouTube/ })).toHaveAttribute("href", `https://www.youtube.com/watch?v=${episode.videoId}`);
  await page.getByRole("button", { name: "Close player", exact: true }).click();
  await expect(load).toBeFocused();
  await expect(page.locator("iframe, .youtube-disclosure, .youtube-label")).toHaveCount(0);
});
