import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { sendSubmission, type Submission } from "../src/lib/forms";
import { events, gallery, principles, steps } from "../src/lib/site";
import { podcasts, socialPosts } from "../src/lib/media";

const routes = ["/", "/about/", "/philosophy/", "/sankalpas/", "/events/", "/calendar/", "/gallery/", "/media/", "/contact-us/", "/join/", "/support/", "/privacy/", "/accessibility/"];

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
  await expect(page).toHaveURL(/\/join\/\?area=heritage$/);
  await expect(page.getByLabel("Area of contribution")).toHaveValue("Culture & heritage");
});

test("mobile menu opens, navigates, and closes with Escape", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.use.isMobile, "Mobile-only interaction");
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open menu" });
  await toggle.click();
  await expect(page.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "About", exact: true }).click();
  await expect(page).toHaveURL(/\/about\/$/);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
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

test("membership form validates required data and resets without persisting drafts", async ({ page }) => {
  await page.goto("/join/?area=learning");
  const form = page.locator("form");
  expect(await form.evaluate(element => (element as HTMLFormElement).checkValidity())).toBe(false);
  await page.getByLabel("Full name").fill("Test Member");
  await page.getByLabel("Email address").fill("not-an-email");
  expect(await page.getByLabel("Email address").evaluate(input => input instanceof HTMLInputElement && input.validity.typeMismatch)).toBe(true);
  await page.getByLabel("Email address").fill("member@example.com");
  await page.getByLabel("Phone number").fill("invalid phone");
  expect(await page.getByLabel("Phone number").evaluate(input => input instanceof HTMLInputElement && input.validity.patternMismatch)).toBe(true);
  await page.getByLabel("Phone number").fill("+91 98765 43210");
  await page.getByLabel("Why would you like to join?").fill("I would like to join a community reading circle.");
  await page.getByRole("checkbox").check();
  expect(await form.evaluate(element => (element as HTMLFormElement).checkValidity())).toBe(true);
  await page.getByRole("button", { name: "Reset form" }).click();
  await expect(page.getByLabel("Full name")).toHaveValue("");
  await expect(page.getByRole("checkbox")).not.toBeChecked();
  expect(await page.evaluate(() => localStorage.length)).toBe(0);
});

test("unconfigured services never imply a successful message or take a payment", async ({ page }) => {
  test.skip(Boolean(process.env.NEXT_PUBLIC_FORMS_ENDPOINT || process.env.NEXT_PUBLIC_DONATION_URL), "This check covers an unconfigured deployment");
  await page.goto("/contact-us/");
  await expect(page.getByRole("status")).toContainText("Sending unavailable: service connection required.");
  await expect(page.locator("main")).not.toContainText("Online messaging is not available yet.");
  await expect(page.getByRole("button", { name: "Send message" })).toBeDisabled();
  await page.goto("/support/");
  await expect(page.getByRole("button", { name: "Online donations opening soon" })).toBeDisabled();
  await expect(page.locator('input[autocomplete="cc-number"]')).toHaveCount(0);
});

test("layouts fit narrow mobile, tablet, and desktop screens", async ({ page }) => {
  for (const width of [320, 480, 768, 1024, 1180, 1200, 1440, 2560]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/join/", "/events/", "/calendar/", "/sankalpas/", "/about/", "/contact-us/"]) {
      await page.goto(route);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route} at ${width}px`).toBe(true);
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
  await page.getByRole("button", { name: "Load more posts" }).click();
  for (const post of socialPosts) await expect(page.locator("#posts")).toContainText(post.title);
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

test("short section labels are consistent in navigation, footer, breadcrumbs, and page titles", async ({ page }) => {
  for (const [route, label] of [["/about/", "About"], ["/events/", "Updates"]]) {
    await page.goto(route);
    const menuToggle = page.getByRole("button", { name: "Open menu", exact: true });
    if (await menuToggle.isVisible()) await menuToggle.click();
    const navigation = page.getByRole("navigation", { name: "Main navigation" });
    await expect(navigation.getByRole("link", { name: label, exact: true })).toHaveAttribute("href", route);
    await expect(navigation.getByRole("link", { name: label, exact: true })).toHaveAttribute("aria-current", "page");
    await expect(page.locator(`.site-footer a[href="${route}"]`)).toHaveText(label);
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
  await page.getByLabel("Full name").fill("Test Contact");
  await page.getByLabel("Email address").fill("contact@example.com");
  await page.getByLabel("I'm interested in").selectOption("General enquiry");
  await page.getByLabel("Your message").fill("A test enquiry that must not be transmitted.");
  await page.getByRole("checkbox").check();
  expect(await page.locator("form").evaluate(element => (element as HTMLFormElement).checkValidity())).toBe(true);
  await expect(page.getByRole("button", { name: "Send message", exact: true })).toBeDisabled();
  await page.locator("form").evaluate(element => element.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })));
  await expect(page.locator(".notice--error")).toContainText("a form service connection is required");
  expect(submissions).toEqual([]);
  expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }))).toEqual({ local: 0, session: 0 });
  await page.getByRole("button", { name: "Reset form", exact: true }).click();
  await expect(page.getByLabel("Full name")).toHaveValue("");
  await expect(page.locator(".notice--error")).toHaveCount(0);
});

const payload: Submission = { type: "membership", name: "Test", email: "test@example.com", phone: "9876543210", area: "Learning", message: "I would like to contribute.", consent: true, website: "" };

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
