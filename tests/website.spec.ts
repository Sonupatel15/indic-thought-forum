import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { sendSubmission, type Submission } from "../src/lib/forms";
import { events, gallery, principles, steps } from "../src/lib/site";
import { podcasts, socialProfiles } from "../src/lib/media";

const routes = ["/", "/about/", "/philosophy/", "/sankalpas/", "/events/", "/calendar/", "/gallery/", "/media/", "/contact-us/", "/support/", "/privacy/", "/accessibility/"];

test("public routes reflow at doubled text size without horizontal scrolling", async ({ page }) => {
  test.setTimeout(180000);
  for (const width of [360, 390, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    for (const route of routes) {
      await page.goto(route);
      await page.waitForLoadState("networkidle");
      await page.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route} at ${width}px`).toBe(true);
      await page.evaluate(() => { document.documentElement.style.removeProperty("font-size"); });
    }
  }
});

test("mobile navigation works without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto("/");
  const navigation = page.getByRole("navigation", { name: "Site navigation without JavaScript" });
  await expect(navigation).toBeVisible();
  await expect(page.locator(".menu-toggle")).toBeHidden();
  await navigation.getByRole("link", { name: "About", exact: true }).click();
  await expect(page).toHaveURL(/\/about\/$/);
  await expect(page.locator("main h1")).toHaveText("Rooted in a civilization. Looking to the future.");
  await context.close();
});

test("image viewer fits short viewports with visible, high-contrast keyboard controls", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 400 });
  await page.goto("/events/");
  await page.locator(".event-image").first().click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Tab");
  for (const label of ["Close image viewer", "Previous image", "Next image"]) {
    const control = dialog.getByRole("button", { name: label });
    await control.focus();
    await expect(control).toHaveCSS("outline-color", "rgb(255, 207, 148)");
    const bounds = await control.boundingBox();
    expect(bounds).not.toBeNull();
    if (!bounds) throw new Error("The image viewer control must have a visible bounding box.");
    expect(bounds.height).toBeGreaterThanOrEqual(44);
    expect(bounds.y).toBeGreaterThanOrEqual(0);
    expect(bounds.y + bounds.height).toBeLessThanOrEqual(400);
  }
  await page.keyboard.press("Escape");
  await expect(page.locator(".event-image").first()).toBeFocused();
});

test("image viewer explains failed images and can still be closed", async ({ page }) => {
  await page.route(`**${events[0].previewImage}`, route => route.abort());
  await page.goto("/events/");
  await page.locator(".event-image").first().click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("status")).toContainText("This image could not be loaded.");
  await dialog.getByRole("button", { name: "Close image viewer" }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page.locator(".event-image").first()).toBeFocused();
});

test.beforeEach(async ({ page }) => {
  await page.route(/^https:\/\/[abc]\.tile\.openstreetmap\.org\//, route => route.fulfill({
    status: 200,
    contentType: "image/svg+xml",
    body: '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"></svg>',
  }));
});

test("every public page is statically available, titled, and free of runtime errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  page.on("response", response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  for (const route of routes) {
    const response = await page.goto(route);
    await page.waitForLoadState("networkidle");
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("main h1")).toHaveCount(1);
    await expect(page).toHaveTitle(/Indic Thought Forum/);
    const canonical = route === "/philosophy/" ? "/about/" : ["/gallery/", "/media/"].includes(route) ? "/events/" : route;
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(canonical === "/" ? "\\/$" : `${canonical}$`));
    await expect(page.getByRole("navigation", { name: "Main navigation", includeHidden: true })).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `No overflow on ${route}`).toBe(true);
    expect(await page.locator("img").evaluateAll(images => images.filter(image => image instanceof HTMLImageElement && image.complete && image.naturalWidth === 0).length), `Images on ${route}`).toBe(0);
  }
  expect(errors).toEqual([]);
});

test("Privacy and Accessibility pages omit the decorative intro sparkle", async ({ page }) => {
  for (const route of ["/privacy/", "/accessibility/"]) {
    await page.goto(route);
    await expect(page.locator(".page-intro .intro-ornament")).toHaveCount(0);
  }
});

test("Privacy and Accessibility disclosures match configured contact methods", async ({ page }) => {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
  const formsEndpoint = process.env.NEXT_PUBLIC_FORMS_ENDPOINT?.trim();
  const contactFallback = contactEmail
    ? "email"
    : formsEndpoint
      ? "form"
      : "unavailable";

  await page.goto("/privacy/");
  await expect(page.locator(".legal-copy")).toContainText("The website code does not implement a mailing-list subscription.");
  await expect(page.locator(".legal-copy")).toContainText("The website code does not identify the hosting provider");
  if (contactFallback === "email") await expect(page.locator('.legal-copy a[href^="mailto:"]')).toHaveCount(1);
  else if (contactFallback === "form") await expect(page.locator(".legal-copy").getByRole("link", { name: "contact form" })).toHaveCount(1);
  else await expect(page.locator(".legal-copy")).toContainText("This deployment has no configured contact email or connected enquiry service, so this website cannot receive the request.");

  await page.goto("/accessibility/");
  await expect(page.locator(".legal-copy")).toContainText("If you encounter difficulty, report the page, the issue, and any assistive technology involved, without sharing sensitive information.");
  if (contactFallback === "email") await expect(page.locator('.legal-copy a[href^="mailto:"]')).toHaveCount(1);
  else if (contactFallback === "form") await expect(page.locator(".legal-copy").getByRole("link", { name: "contact form" })).toHaveCount(1);
  else await expect(page.locator(".legal-copy")).toContainText("This deployment has no configured contact email or connected enquiry service, so this website cannot receive a report.");
});

test("key pages have no automated WCAG A or AA violations", async ({ page }) => {
  test.setTimeout(90000);
  for (const route of routes) {
    await page.goto(route);
    const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(result.violations.map(violation => ({
      id: violation.id,
      nodes: violation.nodes.map(node => ({ target: node.target, summary: node.failureSummary })),
    })), `Accessibility on ${route}`).toEqual([]);
  }
});

test("home calls to action go to complete pages", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Explore our Sankalpas" }).click();
  await expect(page).toHaveURL(/\/sankalpas\/$/);
  await page.getByRole("link", { name: "I'd like to contribute" }).first().click();
  await expect(page).toHaveURL(/\/contact-us\/\?area=heritage$/);
  await expect(page.getByRole("form", { name: "Contribute to the Community" }).getByLabel("Area of contribution")).toHaveValue("Culture & heritage");
});

test("mobile menu opens, navigates, and closes with Escape", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.use.isMobile, "Mobile-only interaction");
  await page.goto("/");
  const toggle = page.locator(".menu-toggle");
  await toggle.click();
  await expect(page.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");
  const navigation = page.getByRole("navigation", { name: "Main navigation" });
  const links = navigation.getByRole("link");
  await page.keyboard.press("Shift+Tab");
  await expect(links.last()).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(toggle).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await navigation.getByRole("link", { name: "About", exact: true }).click();
  await expect(page).toHaveURL(/\/about\/$/);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("desktop navigation stays visible at tablet widths", async ({ page }) => {
  for (const width of [981, 1024, 1180]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Open menu" })).toBeHidden();
  }
});

test("Updates has one gallery, image navigation, Escape, and focus restoration work", async ({ page }) => {
  await page.goto("/events/#gallery");
  await expect(page.locator("#gallery .filter-bar")).toHaveCount(0);
  await expect(page.locator(".gallery-photo")).toHaveCount(gallery.length);
  const first = page.locator(".gallery-photo").first();
  await first.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText(`1 of ${gallery.length}`);
  await page.keyboard.press("ArrowRight");
  await expect(dialog).toContainText(`2 of ${gallery.length}`);
  await page.keyboard.press("ArrowLeft");
  await expect(dialog).toContainText(`1 of ${gallery.length}`);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(first).toBeFocused();
});

test("event archive loads every event newest first without category filters", async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-11-09T12:00:00Z"));
  await page.goto("/events/");
  await expect(page.locator(".event-card")).toHaveCount(3);
  await expect(page.locator("#events .filter-bar, #events .event-tag")).toHaveCount(0);
  for (const category of ["History", "Ideas & dialogue"]) {
    await expect(page.locator("#events").getByRole("button", { name: category, exact: true })).toHaveCount(0);
  }
  await page.getByRole("button", { name: "Load more events" }).click();
  await expect(page.locator(".event-card")).toHaveCount(6);
  await page.getByRole("button", { name: "Load more events" }).click();
  await expect(page.locator(".event-card")).toHaveCount(events.length);
  await expect(page.getByRole("button", { name: "Load more events" })).toHaveCount(0);
  const dates = await page.locator(".event-card time").evaluateAll(items => items.map(item => item.getAttribute("datetime")));
  expect(dates).toEqual([...dates].sort((a, b) => b!.localeCompare(a!)));
  await page.getByRole("button", { name: /View poster for/ }).first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Close image viewer" }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
});

test("Contact separates Join and Contribute forms with validation, conditional interest, and reset", async ({ page }) => {
  await page.goto("/contact-us/?area=learning");
  const joinForm = page.getByRole("form", { name: "Join the Community" });
  const contributionForm = page.getByRole("form", { name: "Contribute to the Community" });
  await expect(page.locator("form")).toHaveCount(2);
  expect(await page.locator("form").evaluateAll(forms => forms.map(form => form.id))).toEqual(["contact-form", "contribute-form"]);
  await expect(contributionForm.getByLabel("Area of contribution")).toHaveValue("Knowledge & dialogue");
  expect(await joinForm.evaluate(form => (form as HTMLFormElement).checkValidity())).toBe(false);
  await joinForm.evaluate(form => (form as HTMLFormElement).requestSubmit());
  await expect(joinForm.getByRole("alert")).toContainText("Please complete all required fields");
  await joinForm.getByLabel("Full name").fill("Test Member");
  await joinForm.getByLabel("Email address").fill("not-an-email");
  expect(await joinForm.getByLabel("Email address").evaluate(input => input instanceof HTMLInputElement && input.validity.typeMismatch)).toBe(true);
  await joinForm.getByLabel("Email address").fill("member@example.com");
  await joinForm.getByLabel("Phone number").fill("invalid phone");
  expect(await joinForm.getByLabel("Phone number").evaluate(input => input instanceof HTMLInputElement && input.validity.patternMismatch)).toBe(true);
  await joinForm.getByLabel("Phone number").fill("+91 98765 43210");
  await joinForm.getByLabel("City").fill("Bengaluru");
  await joinForm.getByLabel("How did you hear about us?").fill("A friend");
  await joinForm.getByLabel("I'm interested in").selectOption("Other");
  expect(await joinForm.evaluate(form => (form as HTMLFormElement).checkValidity())).toBe(false);
  await joinForm.getByLabel("Please describe your interest").fill("Community reading circles");
  await joinForm.getByRole("checkbox").check();
  expect(await joinForm.evaluate(form => (form as HTMLFormElement).checkValidity())).toBe(true);
  await joinForm.getByRole("button", { name: "Reset Join form" }).click();
  await expect(joinForm.getByLabel("Full name")).toHaveValue("");
  await expect(joinForm.getByLabel("Please describe your interest")).toHaveCount(0);
  await expect(joinForm.getByRole("checkbox")).not.toBeChecked();

  await contributionForm.getByLabel("Full name").fill("Test Contributor");
  await contributionForm.getByLabel("Email address").fill("contributor@example.com");
  await contributionForm.getByLabel("Availability").fill("Weekends");
  await contributionForm.getByLabel("How would you like to contribute?").fill("I can help with community reading circles.");
  await contributionForm.getByRole("checkbox").check();
  expect(await contributionForm.evaluate(form => (form as HTMLFormElement).checkValidity())).toBe(true);
  await contributionForm.getByRole("button", { name: "Reset contribution form" }).click();
  await expect(contributionForm.getByLabel("Full name")).toHaveValue("");
  expect(await page.evaluate(() => localStorage.length)).toBe(0);
});

test("unconfigured services never imply a successful message or take a payment", async ({ page }) => {
  test.skip(Boolean(process.env.NEXT_PUBLIC_FORMS_ENDPOINT || process.env.NEXT_PUBLIC_DONATION_URL), "This check covers an unconfigured deployment");
  await page.goto("/contact-us/");
  const joinForm = page.getByRole("form", { name: "Join the Community" });
  const contributionForm = page.getByRole("form", { name: "Contribute to the Community" });
  await expect(joinForm.getByRole("status")).toContainText("Sending unavailable: service connection required.");
  await expect(contributionForm.getByRole("status")).toContainText("Sending unavailable: service connection required.");
  await expect(page.locator("main")).not.toContainText("Online messaging is not available yet.");
  await expect(joinForm.getByRole("button", { name: "Send Join enquiry" })).toBeDisabled();
  await expect(contributionForm.getByRole("button", { name: "Send contribution enquiry" })).toBeDisabled();
  await expect(page.locator(".intro-ornament")).toHaveCount(0);
  await page.goto("/support/");
  await expect(page.getByRole("button", { name: "Online donations opening soon" })).toBeDisabled();
  await expect(page.locator('input[autocomplete="cc-number"]')).toHaveCount(0);
});

test("layouts fit phone through large-TV widths on every public route", async ({ page }) => {
  test.setTimeout(240000);
  const widths = [320, 360, 361, 375, 480, 481, 760, 761, 768, 1024, 1025, 1180, 1181, 1200, 1440, 1920, 2560, 3840];
  const sharedHeroRoutes = ["/about/", "/sankalpas/", "/events/", "/calendar/", "/contact-us/"];
  for (const width of widths) {
    await page.setViewportSize({ width, height: width <= 480 ? 568 : 900 });
    for (const route of routes) {
      await page.goto(route);
      const layout = await page.evaluate(() => {
        const headingsFit = [...document.querySelectorAll("main h1, main h2")].every(heading => heading.scrollWidth <= heading.clientWidth + 1);
        const imagesAreUndistorted = [...document.images].every(image => {
          if (!image.complete || image.naturalWidth === 0 || !image.clientWidth || !image.clientHeight) return true;
          if (getComputedStyle(image).objectFit !== "fill") return true;
          const naturalRatio = image.naturalWidth / image.naturalHeight;
          const renderedRatio = image.clientWidth / image.clientHeight;
          return Math.abs(naturalRatio - renderedRatio) / naturalRatio < 0.02;
        });
        const header = document.querySelector(".header-inner");
        const brand = header?.querySelector(".brand");
        const toggle = header?.querySelector(".menu-toggle");
        const headerBounds = header?.getBoundingClientRect();
        const brandBounds = brand?.getBoundingClientRect();
        const toggleBounds = toggle?.getBoundingClientRect();
        const headerFits = !headerBounds || !brandBounds || !toggleBounds || toggleBounds.width === 0
          || (brandBounds.right <= toggleBounds.left + 1 && toggleBounds.right <= headerBounds.right + 1);
        return {
          noHorizontalOverflow: document.documentElement.scrollWidth <= document.documentElement.clientWidth,
          headingsFit,
          imagesAreUndistorted,
          headerFits,
        };
      });
      expect(layout.noHorizontalOverflow, `${route} has no horizontal overflow at ${width}px`).toBe(true);
      expect(layout.headingsFit, `${route} headings fit at ${width}px`).toBe(true);
      expect(layout.imagesAreUndistorted, `${route} images preserve their aspect ratio at ${width}px`).toBe(true);
      expect(layout.headerFits, `${route} header fits at ${width}px`).toBe(true);
      if (sharedHeroRoutes.includes(route)) {
        await expect(page.locator("main > .page-intro")).toHaveCount(1);
        const heroContainer = await page.locator(".page-intro > .container").boundingBox();
        const sectionContainer = await page.locator("main > section.container:not(.reading-width), main > section:not(.page-intro):not(.container) .container:not(.reading-width)").first().boundingBox();
        expect(heroContainer, `${route} hero container at ${width}px`).not.toBeNull();
        expect(sectionContainer, `${route} section container at ${width}px`).not.toBeNull();
        if (!heroContainer || !sectionContainer) throw new Error(`${route} shared containers must be visible.`);
        expect(Math.abs(heroContainer.x - sectionContainer.x), `${route} aligned container edges at ${width}px`).toBeLessThanOrEqual(1);
        expect(Math.abs(heroContainer.width - sectionContainer.width), `${route} aligned container widths at ${width}px`).toBeLessThanOrEqual(1);
      }
      if (route === "/calendar/") {
        if (width <= 480) {
          const selectors = page.locator(".calendar-selectors");
          const monthBox = await selectors.getByLabel("Month", { exact: true }).boundingBox();
          const yearBox = await selectors.getByLabel("Year", { exact: true }).boundingBox();
          const applyBox = await selectors.getByRole("button", { name: "Apply year", exact: true }).boundingBox();
          expect(monthBox).not.toBeNull();
          expect(yearBox).not.toBeNull();
          expect(applyBox).not.toBeNull();
          if (!monthBox || !yearBox || !applyBox) throw new Error("Calendar selectors must be visible.");
          expect(Math.abs(monthBox.y - yearBox.y)).toBeLessThanOrEqual(1);
          expect(monthBox.width).toBeGreaterThanOrEqual(150);
          expect(applyBox.y).toBeGreaterThanOrEqual(monthBox.y + monthBox.height);
        }
        await page.getByRole("button", { name: "Year", exact: true }).click();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Year view at ${width}px`).toBe(true);
        await page.getByRole("button", { name: "Day", exact: true }).click();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Day view at ${width}px`).toBe(true);
      }
    }
  }
});

test("shared typography tokens and section labels stay consistent", async ({ page }) => {
  test.setTimeout(120000);
  const widths = [320, 480, 768, 1440, 3840];
  const sharedHeroRoutes = ["/about/", "/sankalpas/", "/events/", "/calendar/", "/contact-us/"];
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const homeTypography = await page.evaluate(() => ({
      hero: getComputedStyle(document.querySelector("main h1")!).fontSize,
      tokens: ["--type-hero", "--type-heading", "--type-subheading", "--type-body", "--type-lead", "--type-caption", "--type-label"]
        .map(token => getComputedStyle(document.documentElement).getPropertyValue(token).trim()),
    }));
    expect(homeTypography.tokens.every(Boolean), `Typography tokens at ${width}px`).toBe(true);

    for (const route of sharedHeroRoutes) {
      await page.goto(route);
      const pageHeroSize = await page.locator("main h1").evaluate(element => getComputedStyle(element).fontSize);
      expect(pageHeroSize, `${route} hero title at ${width}px`).toBe(homeTypography.hero);
    }
  }
  for (const route of routes) {
    await page.goto(route);
    const labels = await page.locator("main .eyebrow").allTextContents();
    expect(labels.filter(label => /^\s*\d+\s*\/\s*/.test(label)), `${route} numbered section labels`).toEqual([]);
    expect(labels.filter(label => /^\s*\/\s*/.test(label)), `${route} orphaned section-label separators`).toEqual([]);
  }
});

test("all internal home links resolve and SEO endpoints exist", async ({ page, request }) => {
  await page.goto("/");
  const links = await page.locator('a[href^="/"]').evaluateAll(elements => [...new Set(elements.map(element => element.getAttribute("href")?.split("#")[0]).filter((href): href is string => Boolean(href)))]);
  for (const link of links) expect((await request.get(link)).status(), link).toBe(200);
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain("/sankalpas/");
  expect(await sitemap.text()).toContain("/calendar/");
  expect(await sitemap.text()).toContain("/events/");
  expect(await sitemap.text()).not.toContain("/media/");
  expect((await request.get("/robots.txt")).status()).toBe(200);
  await page.goto("/404.html");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("found its place");
});

test("combined sections preserve editorial content and all existing archive and media items", async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-11-01T12:00:00Z"));
  await page.goto("/about/");
  const main = page.locator("main");
  for (const text of [
    "Our goal is to bridge tradition and modern life",
    "A conscious, connected Bharat.",
    "Make heritage a living practice.",
    "Bring your perspective.",
    "Our civilizational inheritance offers a foundation for reflection",
    "A Sankalpa is a conscious commitment.",
    "Meaningful dialogue asks us to listen carefully",
  ]) await expect(main).toContainText(text);
  for (const principle of principles) await expect(main).toContainText(principle.description);
  for (const step of steps) await expect(main).toContainText(step.description);
  await expect(page.locator(".principle-grid")).toHaveCount(1);
  await page.goto("/events/");
  await expect(page.locator("#events .event-card")).toHaveCount(3);
  await page.getByRole("button", { name: "Load more events" }).click();
  await page.getByRole("button", { name: "Load more events" }).click();
  for (const event of events) await expect(page.locator("#events")).toContainText(event.title);
  for (const photo of gallery) await expect(page.locator(`#gallery img[alt="${photo.alt}"]`)).toHaveCount(1);
  while (await page.getByRole("button", { name: "Load more podcasts" }).count()) {
    await page.getByRole("button", { name: "Load more podcasts" }).click();
  }
  for (const podcast of podcasts) await expect(page.locator("#podcasts")).toContainText(podcast.title);
  const instagramProfile = socialProfiles.find(profile => profile.platform === "Instagram");
  if (!instagramProfile) throw new Error("The official Instagram profile must be configured.");
  await expect(page.locator("#posts .instagram-profile-link a")).toHaveAttribute("href", instagramProfile.url);
  for (const profile of socialProfiles) await expect(page.locator(`#social-channels a[href="${profile.url}"]`)).toHaveCount(1);
  await expect(page.locator("main")).not.toContainText("Blogs");
});

test("affected navigation links and fragments resolve, including legacy URLs", async ({ page, request }) => {
  test.setTimeout(90000);
  for (const route of ["/", "/about/", "/events/", "/philosophy/", "/gallery/", "/media/"]) {
    await page.goto(route);
    await expect(page.locator('#primary-navigation a[href="/philosophy/"], #primary-navigation a[href="/gallery/"], #primary-navigation a[href="/media/"]')).toHaveCount(0);
    if (route !== "/") {
      const active = route === "/about/" || route === "/philosophy/" ? "/about/" : "/events/";
      await expect(page.locator(`#primary-navigation a[href="${active}"]`)).toHaveAttribute("aria-current", "page");
    }
    const links = await page.locator('a[href^="/"], a[href^="#"]').evaluateAll(items => [...new Set(items.map(item => item.getAttribute("href")).filter((href): href is string => Boolean(href)))]);
    for (const href of links) {
      const url = new URL(href, page.url());
      expect((await request.get(url.pathname + url.search)).status(), href).toBe(200);
      if (url.hash) {
        await page.goto(url.pathname + url.search + url.hash);
        await expect(page.locator(`[id="${url.hash.slice(1)}"]`), href).toHaveCount(1);
      }
    }
  }
  await page.goto("/events/");
  const localNavigation = page.getByRole("navigation", { name: "Explore updates" });
  for (const id of ["podcasts", "events", "plan-conversation", "posts", "gallery", "social-channels"]) {
    await localNavigation.locator(`a[href="#${id}"]`).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator(`#${id}`)).toBeInViewport();
  }
});

test("short section labels are consistent in navigation, breadcrumbs, and page titles", async ({ page }) => {
  for (const [route, label] of [["/about/", "About"], ["/events/", "Updates"]]) {
    await page.goto(route);
    const menuToggle = page.getByRole("button", { name: "Open menu", exact: true });
    if (await menuToggle.isVisible()) await menuToggle.click();
    const navigation = page.getByRole("navigation", { name: "Main navigation" });
    await expect(navigation.getByRole("link", { name: label, exact: true })).toHaveAttribute("href", route);
    await expect(navigation.getByRole("link", { name: label, exact: true })).toHaveAttribute("aria-current", "page");
    await expect(page.locator(`.site-footer a[href="${route}"]`)).toHaveCount(0);
    await expect(page.locator(".breadcrumb > span").last()).toHaveText(label);
    await expect(page.locator(".page-intro .eyebrow")).toHaveText(label);
    await expect(page).toHaveTitle(`${label} | Indic Thought Forum`);
  }
});

test("disconnected Contact validates and resets without sending or storing data", async ({ page }) => {
  test.skip(Boolean(process.env.NEXT_PUBLIC_FORMS_ENDPOINT), "Do not submit tests to a real service");
  const submissions: string[] = [];
  page.on("request", request => { if (request.method() === "POST") submissions.push(request.url()); });
  await page.goto("/contact-us/");
  const joinForm = page.getByRole("form", { name: "Join the Community" });
  const contributionForm = page.getByRole("form", { name: "Contribute to the Community" });
  await joinForm.getByLabel("Full name").fill("Test Contact");
  await joinForm.getByLabel("Email address").fill("contact@example.com");
  await joinForm.getByLabel("City").fill("Bengaluru");
  await joinForm.getByLabel("How did you hear about us?").fill("A friend");
  await joinForm.getByLabel("I'm interested in").selectOption("General enquiry");
  await joinForm.getByRole("checkbox").check();
  expect(await joinForm.evaluate(element => (element as HTMLFormElement).checkValidity())).toBe(true);
  await expect(joinForm.getByRole("button", { name: "Send Join enquiry", exact: true })).toBeDisabled();
  await joinForm.evaluate(element => element.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })));
  await expect(joinForm.getByRole("alert")).toContainText("a form service connection is required");

  await contributionForm.getByLabel("Full name").fill("Test Contributor");
  await contributionForm.getByLabel("Email address").fill("contributor@example.com");
  await contributionForm.getByLabel("Area of contribution").selectOption("Community & seva");
  await contributionForm.getByLabel("Availability").fill("Weekends");
  await contributionForm.getByLabel("How would you like to contribute?").fill("A test enquiry that must not be transmitted.");
  await contributionForm.getByRole("checkbox").check();
  expect(await contributionForm.evaluate(element => (element as HTMLFormElement).checkValidity())).toBe(true);
  await contributionForm.evaluate(element => element.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })));
  await expect(contributionForm.getByRole("alert")).toContainText("a form service connection is required");
  expect(submissions).toEqual([]);
  expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }))).toEqual({ local: 0, session: 0 });
  await joinForm.getByRole("button", { name: "Reset Join form", exact: true }).click();
  await expect(joinForm.getByLabel("Full name")).toHaveValue("");
  await expect(joinForm.getByRole("alert")).toHaveCount(0);
});

test("configured Contact forms send their fields to the existing endpoint", async ({ page }) => {
  const endpoint = process.env.NEXT_PUBLIC_FORMS_ENDPOINT;
  test.skip(!endpoint, "The form endpoint is intentionally unconfigured in this deployment.");
  const target = endpoint ?? "https://forms.example.org/submit";
  const submissions: Submission[] = [];
  await page.route(target, async route => {
    submissions.push(JSON.parse(route.request().postData() ?? "{}") as Submission);
    await route.fulfill({ contentType: "application/json", body: JSON.stringify({ success: true }) });
  });
  await page.goto("/contact-us/");
  const joinForm = page.getByRole("form", { name: "Join the Community" });
  await joinForm.getByLabel("Full name").fill("Test Member");
  await joinForm.getByLabel("Email address").fill("member@example.com");
  await joinForm.getByLabel("City").fill("Bengaluru");
  await joinForm.getByLabel("How did you hear about us?").fill("A friend");
  await joinForm.getByLabel("I'm interested in").selectOption("Other");
  await joinForm.getByLabel("Please describe your interest").fill("Community reading circles");
  await joinForm.getByRole("checkbox").check();
  await joinForm.getByRole("button", { name: "Send Join enquiry" }).click();
  await expect(joinForm.getByRole("status")).toContainText("Join the Community enquiry has been received");
  expect(submissions[0]).toMatchObject({
    type: "membership",
    name: "Test Member",
    email: "member@example.com",
    city: "Bengaluru",
    referralSource: "A friend",
    area: "Other",
    customInterest: "Community reading circles",
    message: "",
    consent: true,
    website: "",
  });

  const contributionForm = page.getByRole("form", { name: "Contribute to the Community" });
  await contributionForm.getByLabel("Full name").fill("Test Contributor");
  await contributionForm.getByLabel("Email address").fill("contributor@example.com");
  await contributionForm.getByLabel("Area of contribution").selectOption("Community & seva");
  await contributionForm.getByLabel("Availability").fill("Weekends");
  await contributionForm.getByLabel("How would you like to contribute?").fill("I can help with community reading circles.");
  await contributionForm.getByRole("checkbox").check();
  await contributionForm.getByRole("button", { name: "Send contribution enquiry" }).click();
  await expect(contributionForm.getByRole("status")).toContainText("contribution enquiry has been received");
  expect(submissions[1]).toMatchObject({
    type: "contact",
    name: "Test Contributor",
    email: "contributor@example.com",
    area: "Community & seva",
    availability: "Weekends",
    message: "I can help with community reading circles.",
    consent: true,
    website: "",
  });
  expect(submissions).toHaveLength(2);
});

const payload: Submission = { type: "membership", name: "Test", email: "test@example.com", phone: "9876543210", area: "Other", message: "", city: "Bengaluru", referralSource: "A friend", customInterest: "Community reading circles", consent: true, website: "" };

test("form service requires an explicit success confirmation", async () => {
  let sent: RequestInit | undefined;
  const success: typeof fetch = async (_url, init) => { sent = init; return Response.json({ success: true }); };
  await expect(sendSubmission("https://forms.example.org/submit", payload, success)).resolves.toBeUndefined();
  expect(sent?.method).toBe("POST");
  expect(JSON.parse(String(sent?.body))).toEqual(payload);
  expect(sent?.credentials).toBe("omit");
  const unconfirmed: typeof fetch = async () => Response.json({ message: "Received" });
  await expect(sendSubmission("https://forms.example.org/submit", payload, unconfirmed)).rejects.toThrow("did not confirm");
});

test("form service surfaces rate limits, server errors, and network failures", async () => {
  const limited: typeof fetch = async () => new Response(null, { status: 429 });
  await expect(sendSubmission("https://forms.example.org/submit", payload, limited)).rejects.toThrow("Too many requests");
  const failed: typeof fetch = async () => new Response(null, { status: 500 });
  await expect(sendSubmission("https://forms.example.org/submit", payload, failed)).rejects.toThrow("could not be sent");
  const network: typeof fetch = async () => { throw new Error("Network unavailable"); };
  await expect(sendSubmission("https://forms.example.org/submit", payload, network)).rejects.toThrow("Network unavailable");
});
