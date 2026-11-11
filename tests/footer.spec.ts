import { readFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { test, expect } from "@playwright/test";
import { site } from "../src/lib/site";
import { socialProfiles } from "../src/lib/media";

const logoUrl = "/images/itf-assets/itf-logo-footer.webp";
const newProfiles = [
  { platform: "X (Twitter)", url: "https://x.com/IndicthoughtFor" },
  { platform: "WhatsApp", url: "https://chat.whatsapp.com/Lr7Bu6azh5JBJmZpETf7Jf" },
] as const;

test("header and footer share a faithful lightweight official logo and real-text branding without a tab icon", async ({ page, request }) => {
  const source = join("public", "images", "itf-assets", "ITF-Logo.png");
  const preview = join("public", "images", "itf-assets", "itf-logo-footer.webp");
  const metadata = await sharp(preview).metadata();
  expect(metadata.width).toBe(168);
  expect(metadata.height).toBe(168);
  expect(metadata.format).toBe("webp");
  expect(metadata.hasAlpha).toBe(true);
  expect(readFileSync(preview).byteLength).toBeLessThanOrEqual(32 * 1024);
  const background = { r: 238, g: 234, b: 225 };
  const resizedSource = await sharp(source).resize({ width: 168, withoutEnlargement: true }).png().toBuffer();
  const expected = await sharp(resizedSource).flatten({ background }).removeAlpha().raw().toBuffer();
  const actual = await sharp(preview).flatten({ background }).removeAlpha().raw().toBuffer();
  expect(actual.byteLength).toBe(expected.byteLength);
  expect(actual.equals(expected), "Footer logo must faithfully reproduce the resized official source.").toBe(true);
  expect((await request.get(logoUrl)).status()).toBe(200);
  await page.goto("/");
  const footer = page.locator(".site-footer");
  await footer.scrollIntoViewIfNeeded();
  await expect(footer.locator(".brand img")).toHaveAttribute("src", logoUrl);
  await expect(footer.locator(".brand img")).toHaveAttribute("loading", "lazy");
  await expect(footer.locator(".brand img")).toHaveJSProperty("naturalWidth", 168);
  await expect(footer.locator(".brand strong")).toHaveText(site.name);
  await expect(footer.locator(".brand small")).toHaveText(site.tagline);
  await expect(footer.locator(".brand")).toHaveAttribute("href", "/");
  const header = page.locator(".site-header");
  await expect(header.locator(".brand img")).toHaveAttribute("src", logoUrl);
  await expect(header.locator(".brand img")).toHaveJSProperty("naturalWidth", 168);
  await expect(header.locator(".brand strong")).toHaveText(site.name);
  await expect(header.locator(".brand small")).toHaveText(site.tagline);
  await expect(page.locator('head link[rel~="icon"]')).toHaveCount(0);
  await expect(page.locator('img[src*="next.svg"], img[src*="vercel.svg"]')).toHaveCount(0);
  await expect(page.locator("nextjs-portal, [data-nextjs-dialog]")).toHaveCount(0);
});

test("all public footers retain social profiles and use Contact without repeated navigation", async ({ page, request }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Full route coverage runs once; footer device reflow runs in every profile.");
  test.setTimeout(90000);
  const errors: string[] = [];
  const external: string[] = [];
  const allowedExternalHosts = new Set(["a.tile.openstreetmap.org", "b.tile.openstreetmap.org", "c.tile.openstreetmap.org"]);
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error" || message.type() === "warning") errors.push(message.text()); });
  page.on("response", response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  page.on("request", request => {
    const hostname = new URL(request.url()).hostname;
    if (!["127.0.0.1", "localhost"].includes(hostname) && !allowedExternalHosts.has(hostname)) external.push(request.url());
  });
  expect(socialProfiles.map(profile => profile.platform)).toEqual(["YouTube", "Instagram", "Facebook", "X (Twitter)", "WhatsApp"]);
  for (const route of ["/", "/about/", "/philosophy/", "/sankalpas/", "/events/", "/calendar/", "/gallery/", "/media/", "/contact-us/", "/support/", "/privacy/", "/accessibility/"]) {
    expect((await page.goto(route))?.status(), route).toBe(200);
    const footer = page.locator(".site-footer");
    await footer.scrollIntoViewIfNeeded();
    await expect(footer.locator(".brand img")).toHaveJSProperty("naturalWidth", 168);
    await expect(footer.locator(".brand strong")).toHaveText(site.name);
    await expect(footer.locator(".brand small")).toHaveText(site.tagline);
    await expect(footer.locator(".social-channel-link")).toHaveCount(5);
    await expect(footer.getByRole("heading", { name: "Explore", exact: true })).toHaveCount(0);
    await expect(footer.getByRole("heading", { name: "Get involved", exact: true })).toHaveCount(0);
    await expect(footer.getByRole("link", { name: "Find your place here" })).toHaveAttribute("href", "/contact-us/");
    await expect(page.locator('a[href^="/join/"]')).toHaveCount(0);
    for (const profile of socialProfiles) {
      const link = footer.locator(`a[href="${profile.url}"]`);
      await expect(link).toHaveCount(1);
      await expect(link).toHaveAccessibleName(profile.platform);
      await expect(link).toHaveAttribute("aria-label", profile.platform);
      await expect(link).toHaveAttribute("title", profile.platform);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
      await expect(link.locator("svg")).toHaveCount(1);
      await expect(link.locator(".lucide-arrow-up-right")).toHaveCount(0);
      await expect(link.locator(".sr-only")).toHaveText(" (opens in a new tab)");
    }
    for (const profile of newProfiles) await expect(footer.locator(`a[href="${profile.url}"]`)).toHaveCount(1);
  }
  await page.goto("/");
  for (const profile of newProfiles) await expect(page.locator(`main .social-channel-links a[href="${profile.url}"]`)).toHaveCount(0);
  await page.goto("/events/#social-channels");
  for (const profile of newProfiles) await expect(page.locator(`.social-channel-grid a[href="${profile.url}"]`)).toHaveCount(1);
  expect(external).toEqual([]);
  expect(errors).toEqual([]);
  expect((await request.get("/join/")).status()).toBe(404);
  expect(await (await request.get("/sitemap.xml")).text()).not.toContain("/join/");
});

test("footer logo, text and five social links reflow from phone to TV widths", async ({ page }) => {
  test.setTimeout(120000);
  for (const width of [320, 360, 393, 480, 599, 600, 768, 1023, 1024, 1180, 1200, 1440, 1920, 2560, 3840]) {
    await page.setViewportSize({ width, height: width >= 2560 ? 2160 : 900 });
    for (const route of ["/", "/events/"]) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const footer = page.locator(".site-footer");
      await expect(footer.getByRole("link", { name: "Find your place here" })).toBeVisible();
      const metrics = await footer.evaluate(element => {
        const logo = element.querySelector(".brand img");
        const copy = element.querySelector(".brand > span");
        const name = element.querySelector(".brand strong");
        const tagline = element.querySelector(".brand small");
        if (!(logo instanceof HTMLImageElement) || !(copy instanceof HTMLElement) || !(name instanceof HTMLElement) || !(tagline instanceof HTMLElement)) {
          throw new Error("Footer image and real-text brand elements are required.");
        }
        const logoBox = logo.getBoundingClientRect();
        const copyBox = copy.getBoundingClientRect();
        return {
          overflow: document.documentElement.scrollWidth > innerWidth,
          logoWidth: logoBox.width, logoHeight: logoBox.height, fit: getComputedStyle(logo).objectFit,
          nameSize: parseFloat(getComputedStyle(name).fontSize), taglineSize: parseFloat(getComputedStyle(tagline).fontSize),
          alignment: Math.abs(name.getBoundingClientRect().left - tagline.getBoundingClientRect().left),
          centering: Math.abs(logoBox.top + logoBox.height / 2 - copyBox.top - copyBox.height / 2),
          copyOverflow: name.scrollWidth > name.clientWidth + 1 || tagline.scrollWidth > tagline.clientWidth + 1,
          badLinks: [...element.querySelectorAll(".social-channel-link")].filter(link => {
            const box = link.getBoundingClientRect();
            return box.left < -1 || box.right > innerWidth + 1 || box.height < 38;
          }).map(link => link.getAttribute("href")),
        };
      });
      expect(metrics.overflow, `${route} at ${width}px`).toBe(false);
      expect(metrics.logoWidth).toBe(56);
      expect(metrics.logoHeight).toBe(56);
      expect(metrics.fit).toBe("contain");
      expect(metrics.nameSize).toBeGreaterThanOrEqual(18);
      expect(metrics.taglineSize).toBeGreaterThanOrEqual(12);
      expect(metrics.alignment).toBeLessThanOrEqual(1);
      expect(metrics.centering).toBeLessThanOrEqual(1);
      expect(metrics.copyOverflow).toBe(false);
      expect(metrics.badLinks).toEqual([]);
      await expect(footer.locator(".social-channel-link")).toHaveCount(5);
      const layout = await footer.evaluate(element => {
        const box = (selector: string) => {
          const item = element.querySelector(selector);
          if (!item) throw new Error(`Missing footer element: ${selector}`);
          const rect = item.getBoundingClientRect();
          return { top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right };
        };
        const grid = element.querySelector(".footer-main");
        if (!grid) throw new Error("Missing footer grid");
        return {
          brand: box(".footer-about"), values: box(".footer-values"), cta: box(".footer-note"),
          grid: box(".footer-main"), bottom: box(".footer-bottom"),
          columns: getComputedStyle(grid).gridTemplateColumns.split(/\s+/).length,
          socialTops: [...element.querySelectorAll(".social-channel-link")].map(link => link.getBoundingClientRect().top),
          dividers: [...element.querySelectorAll("*")].filter(item => parseFloat(getComputedStyle(item).borderTopWidth) > 0 && item.getBoundingClientRect().width > 100).length,
          height: element.getBoundingClientRect().height,
        };
      });
      expect(layout.columns).toBe(width >= 1024 ? 3 : width >= 600 ? 2 : 1);
      expect(layout.bottom.left).toBe(layout.grid.left);
      expect(layout.bottom.right).toBe(layout.grid.right);
      expect(layout.dividers).toBe(1);
      expect(Math.max(...layout.socialTops) - Math.min(...layout.socialTops)).toBeLessThanOrEqual(1);
      if (width >= 1024) {
        expect(Math.abs(layout.brand.top - layout.values.top)).toBeLessThanOrEqual(1);
        expect(Math.abs(layout.brand.top - layout.cta.top)).toBeLessThanOrEqual(1);
        expect(layout.height).toBeLessThan(400);
      } else if (width >= 600) {
        expect(layout.brand.top).toBe(layout.values.top);
        expect(layout.cta.top).toBeGreaterThan(layout.brand.bottom);
        expect(layout.cta.left).toBe(layout.brand.left);
        expect(layout.cta.right).toBe(layout.values.right);
      } else {
        expect(layout.values.top).toBeGreaterThan(layout.brand.bottom);
        expect(layout.cta.top).toBeGreaterThan(layout.values.bottom);
      }
      if (route === "/events/") {
        await expect(page.locator(".social-channel-card")).toHaveCount(5);
        expect(await page.locator(".social-channel-card").evaluateAll(cards => cards.every(card => {
          const box = card.getBoundingClientRect();
          return box.left >= -1 && box.right <= innerWidth + 1 && card.scrollWidth <= card.clientWidth + 1;
        }))).toBe(true);
      }
    }
  }
});

test("footer links have visible keyboard focus and accent hover states", async ({ page }) => {
  await page.goto("/");
  const footer = page.locator(".site-footer");
  await footer.scrollIntoViewIfNeeded();
  await expect(footer.getByRole("navigation", { name: "Footer", exact: true })).toBeVisible();
  for (const link of await footer.getByRole("link").all()) {
    await link.focus();
    expect(await link.evaluate(element => {
      const style = getComputedStyle(element);
      return element.matches(":focus-visible") && style.outlineStyle !== "none" && parseFloat(style.outlineWidth) >= 2;
    })).toBe(true);
    await page.keyboard.press("Tab");
  }
  for (const link of await footer.locator(".social-channel-link, .footer-cta").all()) {
    await link.hover();
    await expect(link).toHaveCSS("background-color", "rgb(169, 67, 9)");
    await expect(link).toHaveCSS("color", "rgb(255, 255, 255)");
    await page.mouse.move(0, 0);
    await link.focus();
    await expect(link).toHaveCSS("background-color", "rgb(169, 67, 9)");
  }
});
