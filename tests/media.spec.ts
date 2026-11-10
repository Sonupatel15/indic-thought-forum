import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test, expect } from "@playwright/test";
import { getYouTubeEmbedUrl, homeFeaturedPodcast, podcasts, socialPosts, socialProfiles } from "../src/lib/media";

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
  expect(podcasts.map(episode => episode.videoId)).toEqual([
    "UX37BufManw", "CP8G3DXbzgw", "9zZnYfYLTsE", "v-0RB4e5SNo", "trB-R1Mf3PI",
    "lFzOmGN2o5A", "za2JjGqiP28", "3f_nS6Z3lhE", "teN5_eTt0cs", "02Z4CCbVsRg",
  ]);
  expect(homeFeaturedPodcast.id).toBe("shiv-sastry");
  await expect(page.locator("#podcasts .youtube-player")).toHaveCount(3);
  await page.getByRole("button", { name: "Load more podcasts" }).click();
  await expect(page.locator("#podcasts .youtube-player")).toHaveCount(6);
  await page.getByRole("button", { name: "Load more podcasts" }).click();
  await expect(page.locator("#podcasts .youtube-player")).toHaveCount(9);
  await page.getByRole("button", { name: "Load more podcasts" }).click();
  await expect(page.locator("#podcasts .youtube-player")).toHaveCount(podcasts.length);
  await expect(page.getByRole("button", { name: "Load more podcasts" })).toHaveCount(0);
  for (const episode of podcasts) {
    const link = page.locator(`.youtube-controls a[href="https://www.youtube.com/watch?v=${episode.videoId}"]`);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }
  await expect(page.locator("#podcasts .youtube-disclosure")).toHaveCount(0);
  await expect(page.locator("#podcasts")).not.toContainText("Privacy-first preview");
  await expect(page.locator("#podcasts")).not.toContainText("Choosing Load connects to YouTube/Google");
});

test("verified social channels and five Instagram posts link to their original source", async ({ page }) => {
  await page.goto("/events/#posts");
  await expect(page.locator("#posts .social-post")).toHaveCount(3);
  await expect(page.locator("#posts a[href*='instagram.com']")).toHaveCount(3);
  await page.getByRole("button", { name: "Load more posts" }).click();
  await expect(page.locator("#posts .social-post")).toHaveCount(5);
  await expect(page.locator("#posts a[href*='instagram.com']")).toHaveCount(5);
  await expect(page.locator("#posts")).not.toContainText("Queen Tara");
  await expect(page.locator("#posts a[href*='youtube.com']")).toHaveCount(0);
  await page.locator("#social-channels").scrollIntoViewIfNeeded();
  for (const profile of socialProfiles) {
    await expect(page.locator(`.social-channel-grid a[href="${profile.url}"]`)).toHaveCount(1);
  }
  for (const post of socialPosts) {
    const link = page.locator(`#posts .social-post a[href="${post.url}"]`);
    await expect(link).toHaveCount(1);
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }
  await expect(page.locator(".media-privacy-note")).toHaveCount(0);
});

test("Updates orders sections and navigation, removes ornaments, and omits pre-load feed disclosures", async ({ page }) => {
  await page.goto("/events/");
  await expect(page.locator(".page-intro")).toHaveCount(1);
  await expect(page.locator(".page-intro .intro-ornament, .community-cta .cta-decoration")).toHaveCount(0);
  const orderedSections = await page.locator("main > section[id]").evaluateAll(sections => sections.map(section => section.id));
  const requestedOrder = ["podcasts", "events", "plan-conversation", "posts", "gallery"];
  expect(orderedSections.filter(id => requestedOrder.includes(id))).toEqual(requestedOrder);
  await expect(page.getByRole("navigation", { name: "Explore updates" }).getByRole("link")).toHaveText([
    "Podcasts", "Events", "Plan your next conversation", "Posts", "Gallery", "Social channels",
  ]);
  await expect(page.locator("#podcasts .youtube-disclosure")).toHaveCount(0);
  await expect(page.locator("#podcasts")).not.toContainText("Privacy-first preview");
  await expect(page.locator("#podcasts")).not.toContainText("A curated selection");
  await expect(page.locator("#posts .filter-bar, #gallery .filter-bar")).toHaveCount(0);
});

test("Updates keeps the initial media cards and load-more controls within narrow and large viewports", async ({ page }) => {
  for (const width of [320, 393, 480, 768, 1024, 1180, 1200, 1440, 1920, 2560, 3840]) {
    await page.setViewportSize({ width, height: width >= 2560 ? 2160 : 900 });
    await page.goto("/events/");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Updates at ${width}px`).toBe(true);
    await expect(page.locator("#podcasts .youtube-player")).toHaveCount(3);
    await expect(page.locator("#events .event-card")).toHaveCount(3);
    await expect(page.locator("#posts .social-post")).toHaveCount(3);
    await expect(page.getByRole("button", { name: "Load more podcasts" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Load more events" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Load more posts" })).toBeVisible();
  }
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
