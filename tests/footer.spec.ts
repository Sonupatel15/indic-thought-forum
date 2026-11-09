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

test("footer uses a faithful lightweight official logo and real-text branding without changing the header", async ({ page, request }) => {
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
  await expect(page.locator(".site-header .brand img")).toHaveAttribute("src", "/images/logo-mark.png");
});

test("all public footers retain the existing profiles and add the exact X and WhatsApp links without connecting", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Full route coverage runs once; footer device reflow runs in every profile.");
  test.setTimeout(90000);
  const errors: string[] = [];
  const external: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  page.on("response", response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  page.on("request", request => {
    if (!["127.0.0.1", "localhost"].includes(new URL(request.url()).hostname)) external.push(request.url());
  });
  expect(socialProfiles.map(profile => profile.platform)).toEqual(["YouTube", "Instagram", "Facebook", "X (Twitter)", "WhatsApp"]);
  for (const route of ["/", "/about/", "/philosophy/", "/sankalpas/", "/events/", "/calendar/", "/gallery/", "/media/", "/contact-us/", "/join/", "/support/", "/privacy/", "/accessibility/"]) {
    expect((await page.goto(route))?.status(), route).toBe(200);
    const footer = page.locator(".site-footer");
    await footer.scrollIntoViewIfNeeded();
    await expect(footer.locator(".brand img")).toHaveJSProperty("naturalWidth", 168);
    await expect(footer.locator(".brand strong")).toHaveText(site.name);
    await expect(footer.locator(".brand small")).toHaveText(site.tagline);
    await expect(footer.locator(".social-channel-link")).toHaveCount(5);
    for (const profile of socialProfiles) {
      const link = footer.locator(`a[href="${profile.url}"]`);
      await expect(link).toHaveCount(1);
      await expect(link).toContainText(profile.platform);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
      await expect(link.locator(".icon-box svg")).toHaveCount(1);
      await expect(link.locator(".sr-only")).toHaveText(" (opens in a new tab)");
    }
    for (const profile of newProfiles) await expect(footer.locator(`a[href="${profile.url}"]`)).toHaveCount(1);
  }
  await page.goto("/");
  for (const profile of newProfiles) await expect(page.locator(`main .social-channel-links a[href="${profile.url}"]`)).toHaveCount(1);
  await page.goto("/events/#social-channels");
  for (const profile of newProfiles) await expect(page.locator(`.social-channel-grid a[href="${profile.url}"]`)).toHaveCount(1);
  expect(external).toEqual([]);
  expect(errors).toEqual([]);
});

test("footer logo, text and five social links reflow from phone to TV widths", async ({ page }) => {
  test.setTimeout(120000);
  for (const width of [320, 393, 480, 768, 1024, 1180, 1200, 1440, 1920, 2560, 3840]) {
    await page.setViewportSize({ width, height: width >= 2560 ? 2160 : 900 });
    for (const route of ["/", "/events/"]) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const footer = page.locator(".site-footer");
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
            return box.left < -1 || box.right > innerWidth + 1 || box.height < 44;
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
