import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { SankalpaTable } from "../src/components/sankalpa-table";
import { getSankalpaNoteHistory, sankalpaRecords, type SankalpaNote } from "../src/lib/sankalpas";
import { sankalpas } from "../src/lib/site";

const expectedRows = [
  [1, "Mar 2026", "Decolonising the Indian Mind", "Sankrant Sanu", "Saffron Swords, in comics", "In Progress", "DJ / Naveen"],
  [2, "Mar 2026", "Decolonising the Indian Mind", "Sankrant Sanu", "A protest about inaccuracies in ICSE in freedom park. collate all learnings and print it as a document", "To Start", "DJ & Ananya"],
  [3, "Mar 2026", "Decolonising the Indian Mind", "Sankrant Sanu", "Secondary goal - To prove English is just another language to learn - Toast masters in one government school", "To Start", "Naveen/DJ/Gayatri/Ramya (DJ's office)"],
  [4, "Apr 2026", "Hindumisia — A Book on Hindu Genocides", "Chakravarthy Sulibele", "Translation of Hindumisia into Kannada", "Mostly completed", "Jyoti"],
  [5, "Apr 2026", "Hindumisia — A Book on Hindu Genocides", "Chakravarthy Sulibele", "Launch of Hindumisia", "In Progress", "Jyoti"],
  [6, "Apr 2026", "Hindumisia — A Book on Hindu Genocides", "Chakravarthy Sulibele", "Recognition of Hindu Genocide Act", "In Progress", "DJ"],
  [7, "Apr 2026", "Hindumisia — A Book on Hindu Genocides", "Chakravarthy Sulibele", "REach - have 20 events in 3 months across Karnataka to sell books", "To Start", "Naveen/DJ"],
  [8, "Apr 2026", "Hindumisia — A Book on Hindu Genocides", "Chakravarthy Sulibele", "Discources in all mathas (Sringeri, Uttaradi, Adichunchanagiri, Mantralaya etc)", "To Start", "Naveen/DJ"],
  [9, "Apr 2026", "Hindumisia — A Book on Hindu Genocides", "Chakravarthy Sulibele", "Genocide tour circuit - Sahana madam's idea.", "To Start", "DJ"],
  [10, "Apr 2026", "Hindumisia — A Book on Hindu Genocides", "Chakravarthy Sulibele", "Create genocide content on Social media", "To Start", "Sonu"],
  [11, "Apr 2026", "Hindumisia — A Book on Hindu Genocides", "Chakravarthy Sulibele", "Ghar Wapsi", "To Start", "DJ / Naveen"],
  [12, "May 2026", "Pakistan — A Failed State", "Shivashankar Shastri", "Purchase and distribution of Operation Sindoor — 100 copies", "Deprioritised", "Suhas"],
  [13, "May 2026", "Pakistan — A Failed State", "Shivashankar Shastri", "Translation of Aryan Invasion Myth to Kannada", "In Progress", "DJ / Naveen"],
  [14, "Jun 2026", "Rani Tara — Kali of the Deccan", "Medha Deshmukh", "Project Veerangana — Rani Tara Bai Scholarship", "In Progress", "DJ"],
  [15, "Jun 2026", "Rani Tara — Kali of the Deccan", "Medha Deshmukh", "25 Rani Tara Bai books to Yuva Tejas for the students to study and get motivated.", "Completed", "DJ"],
  [16, "Jun 2026", "Rani Tara — Kali of the Deccan", "Medha Deshmukh", "Translation of the Rani Tarabai book to Kannada", "In Progress", "DJ"],
  [17, "Jul 2026", "Places of Worship Act & Decontrol of Temples", "Manjunath Ajjampura", "Reverse Muzrai — de-control of one temple", "Deprioritised", "DJ / Naveen"],
  [18, "Jul 2026", "Places of Worship Act & Decontrol of Temples", "Manjunath Ajjampura", "Translation of History of Hindu-Christian Encounters (AD 304–1996) to Kannada", "Deprioritised", "DJ / Naveen"],
  [19, "POC", "Building community through helping students", "Rajesh", "Provide coaching to Mechanical Engineering (VTU) students", "In Progress", "Suhas"],
  [22, "Oct 2026", "Ancient Indian Astronomy", "Ram Mohan", "Ancient Indian Astronomy workshops in school", "To Start", "Mani"],
];

const noteFixture: readonly SankalpaNote[] = [
  { id: "first", updatedAt: "2026-10-01T10:00:00.000Z", text: "First approved update." },
  { id: "latest", updatedAt: "2026-11-01T10:00:00.000Z", text: "Latest approved update." },
  { id: "middle", updatedAt: "2026-10-15T10:00:00.000Z", text: "Previous approved update." },
];

test("Sankalpa tracker contains exactly seven columns and the twenty approved source rows", async ({ page }) => {
  await page.goto("/sankalpas/");
  const table = page.getByRole("table");
  await expect(table.getByRole("columnheader")).toHaveText(["Talk date", "Talk topic", "Speaker", "Sankalpa", "Status", "Owner", "Notes"]);
  await expect(table.locator("tbody tr")).toHaveCount(20);
  const actual = await table.locator("tbody tr").evaluateAll(rows => rows.map(row => [
    Number(row.id.replace("sankalpa-", "")),
    ...Array.from(row.querySelectorAll("td")).slice(0, 6).map(cell => cell.textContent?.trim()),
  ]));
  expect(actual).toEqual(expectedRows);
  for (const row of await table.locator("tbody tr").all()) await expect(row.locator("td")).toHaveCount(7);
  await expect(table.locator("#sankalpa-20, #sankalpa-21")).toHaveCount(0);
  await expect(page.locator("main")).not.toContainText("Rushi Runa");
  await expect(page.locator("main")).not.toContainText("monthly Uber corporate pass");
  await expect(table.locator("time")).toHaveCount(0);
});

test("notes are intentionally empty and do not imply an editing or saving service", async ({ page }) => {
  expect(sankalpaRecords.every(entry => entry.notes.length === 0)).toBe(true);
  await page.goto("/sankalpas/");
  const table = page.getByRole("table");
  await expect(table.locator(".sankalpa-notes-cell")).toHaveCount(20);
  await expect(table.locator(".sankalpa-latest-note, .sankalpa-note-history")).toHaveCount(0);
  await expect(table.getByRole("button", { name: /add note/i })).toHaveCount(0);
  await expect(table.locator("input, textarea")).toHaveCount(0);
});

test("future notes show only the latest update initially with all earlier notes in the dropdown", async ({ page }) => {
  await page.goto("/sankalpas/");
  const html = renderToStaticMarkup(createElement(SankalpaTable, { entries: [{ ...sankalpaRecords[0], notes: noteFixture }] }));
  await page.locator(".sankalpa-table-wrap").evaluate((element, markup) => { element.outerHTML = markup; }, html);
  const table = page.getByRole("table");
  await expect(table.locator(".sankalpa-latest-note p")).toHaveText("Latest approved update.");
  await expect(table.locator(".sankalpa-latest-note time")).toHaveAttribute("datetime", "2026-11-01T10:00:00.000Z");
  await expect(table.locator(".sankalpa-latest-note time")).toContainText("IST");
  const history = table.locator(".sankalpa-note-history");
  const toggle = history.locator("summary");
  await expect(toggle).toHaveText("Previous notes (2)");
  await expect(history.locator("li").first()).not.toBeVisible();
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(history).toHaveAttribute("open", "");
  await expect(history.locator("li")).toHaveCount(2);
  await expect(history.locator("li p")).toHaveText(["Previous approved update.", "First approved update."]);
  await expect(history.locator("li").last()).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(history).not.toHaveAttribute("open", "");
  await expect(history.locator("li").first()).not.toBeVisible();
  await expect(table.locator(".sankalpa-latest-note")).toBeVisible();
  expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }))).toEqual({ local: 0, session: 0 });
});

test("a single note has no empty history dropdown and note text is rendered as plain text", async ({ page }) => {
  await page.goto("/sankalpas/");
  const note = { id: "only", updatedAt: "2026-11-01T10:00:00.000Z", text: "<strong>Approved note</strong>\nSecond line." };
  const html = renderToStaticMarkup(createElement(SankalpaTable, { entries: [{ ...sankalpaRecords[0], notes: [note] }] }));
  await page.locator(".sankalpa-table-wrap").evaluate((element, markup) => { element.outerHTML = markup; }, html);
  await expect(page.locator(".sankalpa-latest-note p")).toHaveText(note.text);
  await expect(page.locator(".sankalpa-latest-note strong")).toHaveCount(0);
  await expect(page.locator(".sankalpa-note-history")).toHaveCount(0);
});

test("Sankalpa tracker and populated note history reflow without overflow and pass automated accessibility checks", async ({ page }) => {
  for (const width of [320, 393, 768, 1024, 1025, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/sankalpas/");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Sankalpa table at ${width}px`).toBe(true);
    const html = renderToStaticMarkup(createElement(SankalpaTable, { entries: [{ ...sankalpaRecords[0], notes: noteFixture }] }));
    await page.locator(".sankalpa-table-wrap").evaluate((element, markup) => { element.outerHTML = markup; }, html);
    await page.locator(".sankalpa-note-history summary").click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Note history at ${width}px`).toBe(true);
    const cells = await page.locator(".sankalpa-table tbody tr").first().locator("td").evaluateAll(items => items.map(item => {
      const bounds = item.getBoundingClientRect();
      return { x: bounds.x, right: bounds.right, y: bounds.y, bottom: bounds.bottom };
    }));
    if (width <= 1024) {
      for (let index = 1; index < cells.length; index++) {
        expect(cells[index].x).toBe(cells[0].x);
        expect(cells[index].right).toBe(cells[0].right);
        expect(cells[index].y).toBeGreaterThanOrEqual(cells[index - 1].bottom);
      }
    } else {
      for (const cell of cells) expect(cell.y).toBe(cells[0].y);
    }
  }
  const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(result.violations.map(item => ({ id: item.id, targets: item.nodes.map(node => node.target) }))).toEqual([]);
});

test("existing personal contribution pathways still link to the correct membership interest", async ({ page }) => {
  await page.goto("/sankalpas/");
  for (const pathway of sankalpas) {
    const card = page.locator(`.sankalpa-card[id="${pathway.id}"]`);
    await expect(card).toContainText(pathway.description);
    await expect(card).toContainText(pathway.action);
    await expect(card.getByRole("link")).toHaveAttribute("href", `/join/?area=${pathway.id}`);
  }
  await page.locator("#heritage").getByRole("link").click();
  await expect(page).toHaveURL(/\/join\/\?area=heritage$/);
  await expect(page.getByLabel("Area of contribution")).toHaveValue("Culture & heritage");
});

test("note history sorts latest first without mutating records and rejects invalid content", () => {
  expect(getSankalpaNoteHistory(noteFixture).map(note => note.id)).toEqual(["latest", "middle", "first"]);
  expect(noteFixture.map(note => note.id)).toEqual(["first", "latest", "middle"]);
  expect(getSankalpaNoteHistory([])).toEqual([]);
  expect(() => getSankalpaNoteHistory([{ ...noteFixture[0], updatedAt: "2026-02-31T10:00:00.000Z" }])).toThrow("Invalid update timestamp");
  expect(() => getSankalpaNoteHistory([{ ...noteFixture[0], updatedAt: "not-a-date" }])).toThrow("Invalid update timestamp");
  expect(() => getSankalpaNoteHistory([{ ...noteFixture[0], text: " " }])).toThrow("non-empty text");
  expect(() => getSankalpaNoteHistory([noteFixture[0], noteFixture[0]])).toThrow("unique non-empty IDs");
});
