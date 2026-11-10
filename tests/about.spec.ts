import { test, expect } from "@playwright/test";
import { gallery, principles, steps } from "../src/lib/site";

test("About and Philosophy retain the shared hero and original content without photos, sparkles or principle numbers", async ({ page, request }) => {
  for (const route of ["/about/", "/philosophy/"]) {
    expect((await page.goto(route))?.status()).toBe(200);
    await expect(page).toHaveTitle("About | Indic Thought Forum");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/about\/$/);
    await expect(page.locator(".page-intro")).toHaveCount(1);
    await expect(page.locator("main h1")).toHaveText("Rooted in a civilization. Looking to the future.");
    await expect(page.locator(".page-intro p")).toHaveText("We are a community of curious minds, connected by our heritage and a shared belief in meaningful action.");
    await expect(page.locator(".breadcrumb > span").last()).toHaveText("About");
    await expect(page.locator('main img, main .intro-ornament, main .cta-decoration, main .card-number')).toHaveCount(0);
    await expect(page.locator("main")).not.toContainText("\u2726");
    const thought = page.getByRole("region", { name: "The thought behind the forum", exact: true });
    await expect(thought).toHaveClass(/reading-width/);
    await expect(thought.locator("p")).toHaveText([
      "Indic Thought Forum (ITF) is a platform dedicated to promoting Bharateeya Sabhyata and its timeless values.",
      "We aim to reconnect individuals with India's rich cultural and intellectual heritage through awareness, education, and community initiatives. Our goal is to bridge tradition and modern life, making cultural knowledge accessible, relevant, and impactful for today's society.",
      "We believe that understanding our roots can deepen our sense of responsibility: to ourselves, to the people around us, and to future generations.",
    ]);
    await expect(page.locator(".principle-card")).toHaveCount(3);
    for (const [index, principle] of principles.entries()) {
      const card = page.locator(".principle-card").nth(index);
      await expect(card).toContainText(principle.title);
      await expect(card).toContainText(principle.outcome);
      await expect(card).toContainText(principle.description);
      await expect(card.locator(".icon-box svg")).toHaveCount(1);
    }
    const belief = page.getByRole("region", { name: "Our guiding belief", exact: true });
    await expect(belief.locator(".eyebrow")).toHaveText("Our guiding belief");
    await expect(belief.locator("blockquote")).toContainText("For those who want to build,");
    await expect(belief.locator("blockquote")).toContainText("not just debate.");
    await expect(belief.locator("p")).toHaveText("Understanding matters. What we do with that understanding matters just as much.");
    await expect(page.locator(".quote-section + .reading-width")).toContainText("Heritage as a source of direction.");
    await expect(page.locator(".quote-section + .reading-width")).toContainText("Respect is part of the practice.");
    await expect(page.locator(".journey .step-number")).toHaveText(["01", "02", "03", "04", "05"]);
    for (const step of steps) await expect(page.locator(".journey")).toContainText(step.description);
    await expect(page.locator(".community-cta a")).toHaveAttribute("href", "/join/");
    await expect(page.getByRole("link", { name: "Explore ways to contribute" })).toHaveAttribute("href", "/sankalpas/");
    await expect(page.locator('#primary-navigation a[href="/about/"]')).toHaveAttribute("aria-current", "page");
  }
  expect((await request.get(gallery[0].src)).status()).toBe(200);
  await page.goto("/");
  await expect(page.locator(`.gallery-grid--preview img[src="${gallery[0].src}"]`)).toHaveCount(1);
});

test("page-specific ornament removal preserves the intended scope and Home principles", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "The full ornament-scope sweep runs once; About is checked in every profile.");
  for (const [route, intro, cta] of [
    ["/", 0, 1], ["/sankalpas/", 0, 0], ["/events/", 0, 0], ["/calendar/", 0, 0],
    ["/gallery/", 0, 0], ["/media/", 0, 0], ["/contact-us/", 0, 0], ["/join/", 1, 0],
    ["/support/", 1, 0], ["/privacy/", 1, 0], ["/accessibility/", 1, 0],
  ] as const) {
    await page.goto(route);
    await expect(page.locator(".intro-ornament"), route).toHaveCount(intro);
    await expect(page.locator(".cta-decoration"), route).toHaveCount(cta);
    if (route === "/") {
      await expect(page.locator(".principle-card")).toHaveCount(3);
      await expect(page.locator(".card-number")).toHaveCount(0);
      await expect(page.locator(".journey .step-number")).toHaveCount(5);
    }
  }
});

test("About heroes, reading columns and continuing quote panels reflow from phones to TVs", async ({ page }) => {
  test.setTimeout(120000);
  for (const width of [320, 393, 480, 768, 1024, 1180, 1200, 1440, 1920, 2560, 3840]) {
    await page.setViewportSize({ width, height: width >= 2560 ? 2160 : 900 });
    for (const route of ["/about/", "/philosophy/"]) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const metrics = await page.evaluate(() => {
        const intro = document.querySelector(".page-intro");
        const title = document.querySelector("main h1");
        const thought = document.querySelector('[aria-label="The thought behind the forum"]');
        const quote = document.querySelector(".quote-section");
        const quotation = quote?.querySelector("blockquote");
        const explanation = quote?.querySelector("p");
        const footer = document.querySelector(".site-footer");
        if (!(intro instanceof HTMLElement) || !(title instanceof HTMLElement) || !(thought instanceof HTMLElement) || !(quote instanceof HTMLElement) || !quotation || !explanation || !footer) {
          throw new Error("About hero, thought section, quotation and actual footer must exist.");
        }
        const introBox = intro.getBoundingClientRect();
        const titleBox = title.getBoundingClientRect();
        const box = quote.getBoundingClientRect();
        return {
          overflow: document.documentElement.scrollWidth > innerWidth,
          heroFits: titleBox.top >= introBox.top && titleBox.bottom <= introBox.bottom && title.scrollWidth <= title.clientWidth + 1,
          thoughtWidth: thought.getBoundingClientRect().width,
          thoughtOverflow: thought.scrollWidth > thought.clientWidth + 1,
          quoteLeft: box.left, quoteRightInset: innerWidth - box.right, quoteWidth: box.width,
          quoteOverflow: quote.scrollWidth > quote.clientWidth + 1,
          background: getComputedStyle(quote).backgroundColor,
          footerBackground: getComputedStyle(footer).backgroundColor,
          accentWidth: parseFloat(getComputedStyle(quote).borderInlineStartWidth),
          textAlign: getComputedStyle(quote).textAlign,
          quoteFont: getComputedStyle(quotation).fontFamily,
          quoteWrapping: getComputedStyle(quotation).textWrap,
          explanationSize: parseFloat(getComputedStyle(explanation).fontSize),
          followingContent: quote.nextElementSibling?.textContent?.includes("Heritage as a source of direction."),
          cardsFit: [...document.querySelectorAll(".principle-card")].every(card => {
            const rect = card.getBoundingClientRect();
            return rect.left >= -1 && rect.right <= innerWidth + 1 && card.scrollWidth <= card.clientWidth + 1;
          }),
        };
      });
      expect(metrics.overflow, `${route} overflow at ${width}px`).toBe(false);
      expect(metrics.heroFits).toBe(true);
      expect(metrics.thoughtWidth).toBeLessThanOrEqual(780.5);
      expect(metrics.thoughtOverflow).toBe(false);
      expect(metrics.quoteLeft).toBeGreaterThanOrEqual(16);
      expect(metrics.quoteRightInset).toBeGreaterThanOrEqual(16);
      expect(metrics.quoteWidth).toBeLessThanOrEqual(1200.5);
      expect(metrics.quoteOverflow).toBe(false);
      expect(metrics.background).toBe("rgb(255, 255, 255)");
      expect(metrics.background).not.toBe(metrics.footerBackground);
      expect(metrics.accentWidth).toBe(4);
      expect(metrics.textAlign).toBe("center");
      expect(metrics.quoteFont).toContain("Georgia");
      expect(metrics.quoteWrapping).toBe("balance");
      expect(metrics.explanationSize).toBeGreaterThanOrEqual(14);
      expect(metrics.followingContent).toBe(true);
      expect(metrics.cardsFit).toBe(true);
    }
  }
});
