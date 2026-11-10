import { test, expect, type Page } from "@playwright/test";
import { events } from "../src/lib/site";
import { formatEventTime, getEventSchedule, getEventStart, getIndiaDateKey } from "../src/lib/schedule";

test.beforeEach(async ({ page }) => {
  await page.route(/^https:\/\/[abc]\.tile\.openstreetmap\.org\//, route => route.fulfill({
    status: 200,
    contentType: "image/svg+xml",
    body: '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"></svg>',
  }));
});

const queenTara = events.find(event => event.id === "queen-tara");
if (!queenTara) throw new Error("The confirmed Queen Tara event is required by the schedule fixtures.");

async function openCalendar(page: Page) {
  await page.goto("/calendar/");
  await expect(page.locator(".event-map-canvas")).toHaveAttribute("data-map-ready", "true");
}

test("calendar shows a date-ordered archive with times, venues, and working filters", async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-12-01T12:00:00Z"));
  await openCalendar(page);
  const archive = page.getByRole("region", { name: "Complete event schedule" });
  await expect(page.getByRole("heading", { name: "No upcoming dates announced yet." })).toBeVisible();
  await expect(page.locator(".schedule-item")).toHaveCount(7);
  expect(await page.locator(".schedule-date").evaluateAll(items => items.map(item => item.getAttribute("datetime")))).toEqual([
    "2026-11-29", "2026-10-25", "2026-07-11", "2026-06-06", "2026-05-09", "2026-04-02", "2026-02-20",
  ]);
  await expect(page.locator(".schedule-item").first()).toContainText(/3:00\s?pm IST/i);
  await expect(page.locator(".schedule-item").last()).toContainText(/6:00\s?pm IST/i);
  await expect(page.locator(".schedule-item").first()).toContainText("Alliance Francaise de Bangalore, Vasanth Nagar, Bengaluru");
  await page.getByRole("button", { name: "Upcoming", exact: true }).click();
  await expect(page.locator(".schedule-item")).toHaveCount(0);
  await expect(archive.getByRole("status")).toHaveText("0 events");
  await page.getByRole("button", { name: "Past events", exact: true }).click();
  await expect(page.locator(".schedule-item")).toHaveCount(7);
  const poster = page.getByRole("button", { name: "View poster for Queen Tara: Kali of the Deccan" });
  await poster.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog")).toContainText("4 of 7");
  await page.keyboard.press("Escape");
  await expect(poster).toBeFocused();
});

test("upcoming dates sort earliest first and are not incorrectly labeled as archive", async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-04-02T00:00:00Z"));
  await openCalendar(page);
  const archive = page.getByRole("region", { name: "Complete event schedule" });
  await page.getByRole("button", { name: "Upcoming", exact: true }).click();
  await expect(archive.locator(".schedule-item")).toHaveCount(6);
  expect(await archive.locator(".schedule-date").evaluateAll(items => items.map(item => item.getAttribute("datetime")))).toEqual([
    "2026-04-02", "2026-05-09", "2026-06-06", "2026-07-11", "2026-10-25", "2026-11-29",
  ]);
  await expect(archive.locator(".schedule-status").first()).toHaveText("Today");
  await page.goto("/events/");
  await expect(page.locator(".event-card")).toHaveCount(3);
  await expect(page.locator(".event-card").first()).toContainText("Pepper, Potato, Mould and Gold");
});

test("schedule rolls an event into the archive after midnight in India without rebuilding", async ({ page }) => {
  await page.clock.install({ time: new Date("2026-11-29T18:29:00Z") });
  await openCalendar(page);
  const archive = page.getByRole("region", { name: "Complete event schedule" });
  await page.getByRole("button", { name: "Upcoming", exact: true }).click();
  await expect(archive.locator(".schedule-item")).toHaveCount(1);
  await expect(archive.locator(".schedule-status")).toHaveText("Today");
  await page.clock.fastForward(90000);
  await expect(archive.locator(".schedule-item")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "No upcoming dates announced yet." })).toBeVisible();
  await page.getByRole("button", { name: "Past events", exact: true }).click();
  await expect(archive.locator(".schedule-item")).toHaveCount(7);
});

test("calendar defaults to the complete current IST month, day, and year", async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-10-31T20:00:00Z"));
  await openCalendar(page);
  const calendar = page.getByRole("region", { name: "Browse event calendar" });
  await expect(calendar.locator(".calendar-period")).toHaveText("November 2026");
  await expect(calendar.getByLabel("Month", { exact: true })).toHaveValue("10");
  await expect(calendar.getByLabel("Year", { exact: true })).toHaveValue("2026");
  await expect(calendar.locator(".calendar-day")).toHaveCount(30);
  await expect(calendar.getByRole("button", { name: "Sunday, 29 November 2026. 1 confirmed event", exact: true })).toBeVisible();
  await expect(calendar.locator(".calendar-details .schedule-item")).toHaveCount(0);
  await calendar.getByRole("button", { name: "Sunday, 29 November 2026. 1 confirmed event", exact: true }).click();
  await expect(calendar.locator(".calendar-period")).toHaveText("November 2026");
  await expect(calendar.locator(".calendar-details > h3")).toHaveText("Events on Sunday, 29 November 2026");
  await expect(calendar.locator(".calendar-details .schedule-item")).toHaveCount(1);
  await expect(calendar.locator(".calendar-details .schedule-item")).toContainText("K. N. Ganeshaiah");
  await expect(calendar.locator(".calendar-details .schedule-item")).toContainText(/3:00\s?pm IST/i);
  await expect(calendar.locator(".calendar-details .schedule-item")).toContainText("Alliance Francaise de Bangalore, Vasanth Nagar, Bengaluru");
  await expect(calendar.locator('.calendar-day[aria-current="date"] time')).toHaveAttribute("datetime", "2026-11-01");
  const dates = await calendar.locator(".calendar-day time").evaluateAll(items => items.map(item => item.getAttribute("datetime")));
  expect(dates).toEqual(Array.from({ length: 30 }, (_, index) => `2026-11-${String(index + 1).padStart(2, "0")}`));
  await calendar.getByRole("button", { name: "Day", exact: true }).click();
  await expect(calendar.locator(".calendar-period")).toContainText("29 November 2026");
  await expect(calendar.locator(".calendar-details .schedule-item")).toHaveCount(1);
  await calendar.getByRole("button", { name: "Year", exact: true }).click();
  await expect(calendar.locator(".calendar-period")).toHaveText("2026");
  await expect(calendar.locator(".calendar-year-month")).toHaveCount(12);
  await expect(calendar.locator(".schedule-item")).toHaveCount(events.length);
  await expect(calendar.getByRole("button", { name: "View June 2026, 1 confirmed event", exact: true })).toBeVisible();
});

test("month selection and previous/next navigation synchronize months and years", async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-11-01T12:00:00Z"));
  await openCalendar(page);
  const calendar = page.getByRole("region", { name: "Browse event calendar" });
  const month = calendar.getByLabel("Month", { exact: true });
  const year = calendar.getByLabel("Year", { exact: true });
  await month.selectOption("11");
  await expect(calendar.locator(".calendar-day")).toHaveCount(31);
  await calendar.getByRole("button", { name: "Next month", exact: true }).click();
  await expect(calendar.locator(".calendar-period")).toHaveText("January 2027");
  await expect(month).toHaveValue("0");
  await expect(year).toHaveValue("2027");
  await calendar.getByRole("button", { name: "Previous month", exact: true }).click();
  await expect(calendar.locator(".calendar-period")).toHaveText("December 2026");
  await expect(month).toHaveValue("11");
  await expect(year).toHaveValue("2026");
  for (let index = 0; index < 12; index++) {
    await month.selectOption(String(index));
    await expect(calendar.locator(".calendar-period")).toHaveText(`${new Intl.DateTimeFormat("en-IN", { month: "long", timeZone: "UTC" }).format(new Date(Date.UTC(2026, index, 1)))} 2026`);
    await expect(calendar.locator(".calendar-day")).toHaveCount(new Date(Date.UTC(2026, index + 1, 0)).getUTCDate());
  }
  await year.fill("2028");
  await calendar.getByRole("button", { name: "Apply year", exact: true }).click();
  await month.selectOption("1");
  await expect(calendar.locator(".calendar-period")).toHaveText("February 2028");
  await expect(calendar.locator(".calendar-day")).toHaveCount(29);
  await calendar.getByRole("button", { name: "Year", exact: true }).click();
  await calendar.getByRole("button", { name: "Next year", exact: true }).click();
  await expect(calendar.locator(".calendar-period")).toHaveText("2029");
  await expect(year).toHaveValue("2029");
  await calendar.getByRole("button", { name: "Previous year", exact: true }).click();
  await calendar.getByRole("button", { name: "View June 2028, 0 confirmed events", exact: true }).click();
  await expect(calendar.locator(".calendar-period")).toHaveText("June 2028");
  await expect(month).toHaveValue("5");
  await calendar.getByRole("button", { name: "Today", exact: true }).click();
  await expect(calendar.locator(".calendar-period")).toHaveText("November 2026");
});

test("calendar date selection shows original event details and day navigation crosses years", async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-11-01T12:00:00Z"));
  await openCalendar(page);
  const calendar = page.getByRole("region", { name: "Browse event calendar" });
  await calendar.getByLabel("Month", { exact: true }).selectOption("5");
  await calendar.getByRole("button", { name: "Saturday, 6 June 2026. 1 confirmed event", exact: true }).click();
  await expect(calendar.locator(".calendar-period")).toHaveText("June 2026");
  await expect(calendar.locator(".calendar-day[aria-pressed=\"true\"] time")).toHaveAttribute("datetime", "2026-06-06");
  await expect(calendar.locator(".calendar-details > h3")).toHaveText("Events on Saturday, 6 June 2026");
  await expect(calendar.locator(".schedule-item")).toHaveCount(1);
  await expect(calendar.locator(".schedule-item")).toContainText(queenTara.title);
  await expect(calendar.locator(".schedule-item")).toContainText(queenTara.venue);
  const poster = calendar.getByRole("button", { name: `View poster for ${queenTara.title}`, exact: true });
  await poster.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(poster).toBeFocused();
  await calendar.getByRole("button", { name: "Month", exact: true }).click();
  await calendar.getByLabel("Month", { exact: true }).selectOption("11");
  await calendar.getByRole("button", { name: "Thursday, 31 December 2026. No confirmed events", exact: true }).click();
  await calendar.getByRole("button", { name: "Day", exact: true }).click();
  await calendar.getByRole("button", { name: "Next day", exact: true }).click();
  await expect(calendar.locator(".calendar-period")).toContainText("1 January 2027");
  await expect(calendar.getByLabel("Year", { exact: true })).toHaveValue("2027");
  await calendar.getByRole("button", { name: "Previous day", exact: true }).click();
  await expect(calendar.locator(".calendar-period")).toContainText("31 December 2026");
  await expect(calendar.getByLabel("Month", { exact: true })).toHaveValue("11");
});

test("calendar follows IST midnight by default and rejects an invalid year", async ({ page }) => {
  await page.clock.install({ time: new Date("2026-12-31T18:29:00Z") });
  await openCalendar(page);
  const calendar = page.getByRole("region", { name: "Browse event calendar" });
  await expect(calendar.locator(".calendar-period")).toHaveText("December 2026");
  await page.clock.fastForward(90000);
  await expect(calendar.locator(".calendar-period")).toHaveText("January 2027");
  await expect(calendar.getByLabel("Year", { exact: true })).toHaveValue("2027");
  await calendar.getByLabel("Year", { exact: true }).fill("0");
  await calendar.getByRole("button", { name: "Apply year", exact: true }).click();
  expect(await calendar.getByLabel("Year", { exact: true }).evaluate(input => input instanceof HTMLInputElement && input.validity.rangeUnderflow)).toBe(true);
  await expect(calendar.locator(".calendar-period")).toHaveText("January 2027");
});

test("calendar features the November gathering and an attributed interactive venue map", async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-11-10T06:00:00Z"));
  await openCalendar(page);
  await expect(page.locator(".intro-ornament, .cta-decoration")).toHaveCount(0);
  const feature = page.locator(".calendar-featured-event");
  await expect(feature).toContainText("Pepper, Potato, Mould and Gold: How They Shaped Human History");
  await expect(feature).toContainText("29 November 2026");
  await expect(feature).toContainText(/3:00\s?pm IST/i);
  await expect(feature.locator("img")).toHaveAttribute("alt", /Original event poster/);
  await expect(page.locator(".schedule-timezone, .schedule-note, .calendar-empty")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: /Confirmed events:/ })).toHaveCount(0);

  const map = page.locator(".event-map-canvas");
  await expect(map).toHaveAttribute("data-map-ready", "true");
  await expect(map.locator(".leaflet-marker-icon")).toHaveCount(2);
  await expect(page.locator(".event-map-location")).toHaveCount(2);
  await expect(page.locator(".event-map-location li")).toHaveCount(events.length);
  await expect(page.locator(".event-map-attribution")).toContainText("OpenStreetMap contributors");
  await expect(page.getByRole("link", { name: "Get directions" }).first()).toHaveAttribute("href", /openstreetmap\.org\/directions\?to=/);
  await map.locator('.leaflet-marker-icon[title="Alliance Francaise de Bangalore, Vasanth Nagar, Bengaluru"]').click();
  await expect(page.locator(".leaflet-popup-content")).toContainText("Pepper, Potato, Mould and Gold");
  const initialZoom = Number(await map.getAttribute("data-zoom"));
  await map.locator(".leaflet-control-zoom-in").click();
  await expect.poll(async () => Number(await map.getAttribute("data-zoom"))).toBe(initialZoom + 1);
});

test("homepage features Sankalpas beside the calendar and navigation identifies the page", async ({ page }) => {
  await page.goto("/");
  const section = page.getByRole("region", { name: "Sankalpas and calendar" });
  await expect(section.getByRole("link", { name: "Explore all Sankalpas" })).toHaveAttribute("href", "/sankalpas/");
  await section.getByRole("link", { name: "View event calendar" }).click();
  await expect(page).toHaveURL(/\/calendar\/$/);
  await expect(page.locator('#primary-navigation a[href="/calendar/"]')).toHaveAttribute("aria-current", "page");
});

test("India date boundaries are independent of the visitor's time zone", () => {
  expect(getIndiaDateKey(new Date("2026-06-05T18:29:59.999Z"))).toBe("2026-06-05");
  expect(getIndiaDateKey(new Date("2026-06-05T18:30:00Z"))).toBe("2026-06-06");
  expect(getIndiaDateKey(new Date("2026-12-31T18:30:00Z"))).toBe("2027-01-01");
  expect(getEventStart(queenTara).toISOString()).toBe("2026-06-06T12:00:00.000Z");
  expect(formatEventTime(queenTara)).toMatch(/5:30\s?pm/i);
});

test("schedule sorts both groups without mutating the shared event data", () => {
  const original = events.map(event => event.id);
  const schedule = getEventSchedule([...events].reverse(), "2026-04-02");
  expect(schedule.upcoming.map(event => event.id)).toEqual(["hindumisia", "pakistan", "queen-tara", "places-of-worship", "vedanga-jyotisha", "ganeshaiah"]);
  expect(schedule.past.map(event => event.id)).toEqual(["independent"]);
  expect(events.map(event => event.id)).toEqual(original);
  expect(getEventSchedule([], "2026-10-30")).toEqual({ upcoming: [], past: [] });
});

test("invalid event dates and times fail explicitly instead of publishing a broken schedule", () => {
  expect(() => getEventSchedule([{ ...events[0], date: "2026-02-31" }], "2026-01-01")).toThrow("Invalid calendar date");
  expect(() => getEventStart({ ...events[0], date: "not-a-date" })).toThrow("Invalid date or start time");
  expect(() => getEventStart({ ...events[0], startTime: "25:00" })).toThrow("Invalid date or start time");
});
