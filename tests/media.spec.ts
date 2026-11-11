import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test, expect } from "@playwright/test";
import { getYouTubeEmbedUrl, homeFeaturedPodcast, podcasts, socialProfiles } from "../src/lib/media";
import { events } from "../src/lib/site";

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
  expect(homeFeaturedPodcast).toBe(podcasts[0]);
  await expect(page.locator("#podcasts .youtube-player")).toHaveCount(3);
  const columns = await page.locator("#podcast-archive").evaluate(grid => getComputedStyle(grid).gridTemplateColumns.split(/\s+/).length);
  for (let count = 2; count < podcasts.length - 1;) {
    await page.getByRole("button", { name: "Load more podcasts" }).click();
    count = Math.min(Math.ceil((count + 3) / columns) * columns, podcasts.length - 1);
    await expect(page.locator("#podcasts .youtube-player")).toHaveCount(count + 1);
  }
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

test("Home features the same latest podcast as Updates", async ({ page }) => {
  for (const route of ["/", "/events/"]) {
    await page.goto(route);
    const featured = page.locator(".featured-podcast");
    await expect(featured.getByRole("heading", { name: podcasts[0].title, exact: true })).toBeVisible();
    await expect(featured.locator(".youtube-load img")).toHaveAttribute("src", podcasts[0].thumbnail);
    await expect(featured.getByRole("link", { name: /Watch on YouTube/ })).toHaveAttribute("href", `https://www.youtube.com/watch?v=${podcasts[0].videoId}`);
  }
});

test("loading more events and podcasts moves keyboard focus to the first newly shown item", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/events/");
  await page.waitForLoadState("networkidle");
  const eventsButton = page.getByRole("button", { name: "Load more events" });
  await eventsButton.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#event-list .event-card").nth(3)).toBeFocused();

  const podcastsButton = page.getByRole("button", { name: "Load more podcasts" });
  await podcastsButton.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#podcast-archive .podcast-card").nth(2)).toBeFocused();
});

test("official social links use their profiles and the Instagram action matches its visible name", async ({ page }) => {
  await page.goto("/events/#posts");
  const instagramProfile = socialProfiles.find(profile => profile.platform === "Instagram");
  if (!instagramProfile) throw new Error("The official Instagram profile must be configured.");
  await expect(page.locator("#posts .instagram-profile-link")).toHaveCount(1);
  const instagramLink = page.locator("#posts a[href*='instagram.com']");
  await expect(instagramLink).toHaveAttribute("href", instagramProfile.url);
  await expect(instagramLink).toHaveAccessibleName(/Visit Instagram/);
  await expect(instagramLink).not.toHaveAttribute("aria-label", /./);
  await expect(page.getByRole("button", { name: "Load more posts" })).toHaveCount(0);
  await page.locator("#social-channels").scrollIntoViewIfNeeded();
  for (const profile of socialProfiles) {
    await expect(page.locator(`.social-channel-grid a[href="${profile.url}"]`)).toHaveCount(1);
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
  for (const width of [320, 393, 480, 481, 760, 761, 768, 1024, 1180, 1200, 1440, 1920, 2560, 3840]) {
    await page.setViewportSize({ width, height: width >= 2560 ? 2160 : 900 });
    await page.goto("/events/");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Updates at ${width}px`).toBe(true);
    await expect(page.locator("#podcasts .youtube-player")).toHaveCount(3);
    await expect(page.locator("#events .event-card")).toHaveCount(width > 480 && width <= 760 ? 4 : 3);
    await expect(page.locator("#posts .instagram-profile-link")).toHaveCount(1);
    await expect(page.getByRole("button", { name: "Load more podcasts" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Load more events" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Load more posts" })).toHaveCount(0);
  }
});

test("Updates load-more fills complete rows until each archive is exhausted in original order", async ({ page }) => {
  for (const width of [393, 600, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/events/");
    const lists = [
      { selector: "#podcast-archive", child: ".podcast-card", initial: 2, total: podcasts.length - 1, columns: width > 760 ? 2 : 1, button: "Load more podcasts" },
      { selector: "#event-list", child: ".event-card", initial: 3, total: events.length, columns: width > 760 ? 3 : width > 480 ? 2 : 1, button: "Load more events" },
    ];
    for (const list of lists) {
      const grid = page.locator(list.selector);
      let count = Math.min(Math.ceil(list.initial / list.columns) * list.columns, list.total);
      await expect(grid.locator(list.child)).toHaveCount(count);
      while (count < list.total) {
        expect(count % list.columns).toBe(0);
        const button = page.getByRole("button", { name: list.button, exact: true });
        await expect(button).toHaveAttribute("aria-controls", list.selector.slice(1));
        await button.click();
        count = Math.min(Math.ceil((count + 3) / list.columns) * list.columns, list.total);
        await expect(grid.locator(list.child)).toHaveCount(count);
      }
      await expect(page.getByRole("button", { name: list.button, exact: true })).toHaveCount(0);
    }
    expect(await page.locator("#podcast-archive .youtube-controls a").evaluateAll(links => links.map(link => link.getAttribute("href")))).toEqual(podcasts.slice(1).map(episode => `https://www.youtube.com/watch?v=${episode.videoId}`));
    expect(await page.locator("#event-list time").evaluateAll(times => times.map(time => time.getAttribute("datetime")))).toEqual([...events].sort((a, b) => b.date.localeCompare(a.date)).map(event => event.date));
    await expect(page.locator("#posts .instagram-profile-link")).toHaveCount(1);
    await expect(page.locator(".featured-podcast")).toHaveCount(1);
  }
});

test("Updates resize rounds upward without hiding loaded items or reconnecting an active player", async ({ page }) => {
  const embeds: string[] = [];
  await page.route("https://www.youtube-nocookie.com/embed/**", async route => {
    embeds.push(route.request().url());
    await route.fulfill({ contentType: "text/html", body: "<!doctype html><html lang='en'><title>Mock video</title><button>Play video</button></html>" });
  });
  await page.setViewportSize({ width: 393, height: 900 });
  await page.goto("/events/");
  await page.locator("#podcast-archive .youtube-load").first().click();
  await expect(page.frameLocator("iframe").getByRole("button", { name: "Play video" })).toBeVisible();
  await page.getByRole("button", { name: "Load more podcasts" }).click();
  await expect(page.locator(".podcast-card")).toHaveCount(5);
  for (const [width, eventCount, podcastCount] of [[600, 4, 5], [1440, 6, 6], [393, 6, 6]]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(page.locator("#events .event-card")).toHaveCount(eventCount);
    await expect(page.locator("#posts .instagram-profile-link")).toHaveCount(1);
    await expect(page.locator(".podcast-card")).toHaveCount(podcastCount);
    await expect(page.frameLocator("iframe").getByRole("button", { name: "Play video" })).toBeVisible();
  }
  for (const name of ["Load more events", "Load more podcasts"]) {
    await page.getByRole("button", { name, exact: true }).click();
    await expect(page.getByRole("button", { name, exact: true })).toHaveCount(0);
  }
  await page.setViewportSize({ width: 600, height: 900 });
  await expect(page.locator("#events .event-card")).toHaveCount(events.length);
  await expect(page.locator("#posts .instagram-profile-link")).toHaveCount(1);
  await expect(page.locator(".podcast-card")).toHaveCount(podcasts.length - 1);
  expect(embeds).toHaveLength(1);
});

test("Updates posters, social links and section gaps use the responsive scale", async ({ page }) => {
  for (const width of [320, 393, 480, 600, 760, 761, 1024, 1180, 1200, 1440, 3840]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/events/");
    const poster = page.locator("#events .event-image img").first();
    await poster.scrollIntoViewIfNeeded();
    await expect.poll(() => poster.evaluate(image => image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0)).toBe(true);
    const metrics = await page.evaluate(() => {
      function element(selector: string) {
        const result = document.querySelector(selector);
        if (!result) throw new Error(`Missing Updates element: ${selector}`);
        return result;
      }
      const box = (selector: string) => element(selector).getBoundingClientRect();
      const image = element("#events .event-image img");
      if (!(image instanceof HTMLImageElement)) throw new Error("The event poster must be an image.");
      return {
        spacing: parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--section-spacing")),
        gaps: [
          box("#events .section-heading").top - box("#podcasts .load-more-control").bottom,
          box("#plan-conversation").top - box("#events .load-more-control").bottom,
          box("#posts .section-heading").top - box("#plan-conversation").bottom,
          box(".community-cta").top - box("#social-channels .social-channel-grid").bottom,
          box(".site-footer").top - box(".community-cta").bottom,
        ],
        posterWidth: box("#events .event-image").width,
        posterCardWidth: box("#events .event-card").width,
        posterRatio: image.clientWidth / image.clientHeight,
        naturalRatio: image.naturalWidth / image.naturalHeight,
        posterFit: getComputedStyle(image).objectFit,
        instagramCalloutWidth: box("#posts .instagram-profile-link").width,
        iconBox: box(".social-channel-card .icon-box").width,
        footerTargetWidth: box(".footer-social .social-channel-link").width,
        footerTargetHeight: box(".footer-social .social-channel-link").height,
        glyph: box(".social-channel-card .icon-box svg").width,
        footerGlyph: box(".footer-social .social-channel-link svg").width,
        targetHeight: box(".social-channel-card").height,
        overflow: document.documentElement.scrollWidth > innerWidth,
      };
    });
    const spacing = width > 1180 ? 96 : width > 760 ? 75 : 58;
    expect(metrics.spacing).toBe(spacing);
    for (const gap of metrics.gaps) expect(gap, `Updates content gap at ${width}px`).toBeCloseTo(spacing, 1);
    expect(metrics.posterWidth).toBeLessThanOrEqual(280);
    expect(metrics.posterWidth / metrics.posterCardWidth).toBeLessThanOrEqual(.801);
    expect(metrics.posterRatio).toBeCloseTo(metrics.naturalRatio, 2);
    expect(metrics.posterFit).toBe("contain");
    expect(metrics.instagramCalloutWidth).toBeLessThanOrEqual(760);
    expect(metrics.iconBox).toBe(25);
    expect(metrics.footerTargetWidth).toBe(38);
    expect(metrics.footerTargetHeight).toBe(38);
    expect(metrics.glyph).toBe(17);
    expect(metrics.footerGlyph).toBe(18);
    expect(metrics.targetHeight).toBeGreaterThanOrEqual(44);
    expect(metrics.overflow).toBe(false);
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
