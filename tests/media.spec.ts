import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test, expect } from "@playwright/test";
import { getYouTubeEmbedUrl, podcasts, socialPosts, socialProfiles } from "../src/lib/media";

test("media previews make no external requests before a visitor opts in", async ({ page }) => {
  const external: string[] = [];
  page.on("request", request => {
    if (!["127.0.0.1", "localhost"].includes(new URL(request.url()).hostname)) external.push(request.url());
  });
  for (const path of ["/", "/events/"]) {
    await page.goto(path);
    await page.locator(".youtube-load").first().scrollIntoViewIfNeeded();
    await expect(page.locator(".youtube-load").first()).toBeVisible();
    await page.waitForLoadState("networkidle");
    await expect(page.locator("iframe")).toHaveCount(0);
    expect(await page.locator(".youtube-load img").evaluateAll(images => images.every(image => image.getAttribute("src")?.startsWith("/images/")))).toBe(true);
  }
  expect(external).toEqual([]);
});

test("keyboard opt-in loads only the selected privacy-enhanced player and closing restores focus", async ({ page }) => {
  const embeds: string[] = [];
  await page.route("https://www.youtube-nocookie.com/embed/**", async route => {
    embeds.push(route.request().url());
    await route.fulfill({ contentType: "text/html", body: "<!doctype html><html lang='en'><title>Mock video player</title><button>Play video</button></html>" });
  });
  await page.goto("/events/#podcasts");
  const load = page.getByRole("button", { name: `Load YouTube player: ${podcasts[0].title}`, exact: true });
  await load.focus();
  await page.keyboard.press("Enter");
  const frame = page.getByTitle(`YouTube video: ${podcasts[0].title}`, { exact: true });
  await expect(frame).toHaveAttribute("src", getYouTubeEmbedUrl(podcasts[0].videoId));
  await expect(frame).toHaveAttribute("referrerpolicy", "strict-origin-when-cross-origin");
  await expect(page.frameLocator("iframe").getByRole("button", { name: "Play video" })).toBeVisible();
  expect(embeds).toHaveLength(1);
  await expect(page.locator(".youtube-load")).toHaveCount(2);
  await page.getByRole("button", { name: "Close player", exact: true }).click();
  await expect(page.locator("iframe")).toHaveCount(0);
  await expect(load).toBeFocused();
  await page.reload();
  await expect(page.locator("iframe")).toHaveCount(0);
  expect(embeds).toHaveLength(1);
});

test("every podcast retains a usable YouTube link even when embedding is unavailable", async ({ page }) => {
  await page.goto("/events/#podcasts");
  for (const episode of podcasts) {
    const link = page.locator(`.youtube-controls a[href="https://www.youtube.com/watch?v=${episode.videoId}"]`);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }
  await expect(page.locator(".youtube-disclosure").first()).toContainText("No player connects before you choose");
});

test("verified social channels and curated event posts link to their original source", async ({ page }) => {
  await page.goto("/events/#social-channels");
  for (const profile of socialProfiles) {
    await expect(page.locator(`.social-channel-grid a[href="${profile.url}"]`)).toHaveCount(1);
  }
  for (const post of socialPosts) {
    const link = page.locator(`.social-post a[href="${post.url}"]`);
    await expect(link).toHaveCount(1);
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }
  await expect(page.locator(".media-privacy-note")).toContainText("not an automatic live feed");
});

test("responsive hero loads a single correctly sized image and uses the variable font", async ({ page }) => {
  const heroRequests: string[] = [];
  page.on("request", request => { if (new URL(request.url()).pathname.includes("heritage-hero")) heroRequests.push(request.url()); });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  const viewport = page.viewportSize();
  if (!viewport) throw new Error("The browser test requires a configured viewport.");
  const source = await page.locator(".hero-image").evaluate(image => image instanceof HTMLImageElement ? image.currentSrc : "");
  expect(source).toContain(viewport.width <= 760 ? "heritage-hero-mobile.webp" : "heritage-hero.webp");
  expect(heroRequests).toHaveLength(1);
  await expect(page.locator(".hero-image")).toHaveAttribute("loading", "eager");
  expect(await page.locator("body").evaluate(body => getComputedStyle(body).getPropertyValue("--font-manrope").trim())).not.toBe("");
  await expect(page.locator('link[rel="preload"][as="font"]')).toHaveCount(1);
});

test("video IDs cannot change the approved embed origin and both deployment policies allow it", () => {
  const url = new URL(getYouTubeEmbedUrl("lFzOmGN2o5A"));
  expect(url.origin).toBe("https://www.youtube-nocookie.com");
  expect(url.pathname).toBe("/embed/lFzOmGN2o5A");
  expect(() => getYouTubeEmbedUrl("https://example.org")).toThrow("11");
  expect(() => getYouTubeEmbedUrl("../bad?id=1")).toThrow("11");
  expect(readFileSync(join("public", "_headers"), "utf8")).toContain("frame-src https://www.youtube-nocookie.com");
  expect(readFileSync("vercel.json", "utf8")).toContain("frame-src https://www.youtube-nocookie.com");
});
