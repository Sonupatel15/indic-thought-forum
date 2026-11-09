import { chromium, devices } from "@playwright/test";

const baseURL = process.env.PREVIEW_URL ?? "http://127.0.0.1:4173";
const path = process.argv[2] ?? "/";
const browser = await chromium.launch();
const runs = [];

try {
  for (let run = 0; run < 3; run++) {
    const context = await browser.newContext({ ...devices["Pixel 7"], serviceWorkers: "block" });
    const page = await context.newPage();
    const client = await context.newCDPSession(page);
    await client.send("Network.enable");
    await client.send("Network.emulateNetworkConditions", {
      offline: false, latency: 150, downloadThroughput: 200000, uploadThroughput: 96000,
    });
    await client.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    await page.addInitScript(() => {
      window.itfMetrics = { lcp: null, cls: 0 };
      new PerformanceObserver(list => {
        window.itfMetrics.lcp = list.getEntries().at(-1).startTime;
      }).observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) window.itfMetrics.cls += entry.value;
        }
      }).observe({ type: "layout-shift", buffered: true });
    });
    const response = await page.goto(new URL(path, baseURL).toString(), { waitUntil: "networkidle", timeout: 60000 });
    if (!response?.ok()) throw new Error(`Preview unavailable: ${response?.status()}`);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() => window.itfMetrics.lcp !== null);
    runs.push(await page.evaluate(() => {
      const resources = performance.getEntriesByType("resource");
      const scripts = resources.filter(resource => new URL(resource.name).pathname.endsWith(".js"));
      return {
        lcpMs: Math.round(window.itfMetrics.lcp),
        cls: Number(window.itfMetrics.cls.toFixed(4)),
        scriptKiB: Math.round(scripts.reduce((sum, resource) => sum + resource.encodedBodySize, 0) / 1024),
        resourceKiB: Math.round(resources.reduce((sum, resource) => sum + resource.encodedBodySize, 0) / 1024),
        requests: resources.length,
      };
    }));
    await context.close();
  }
  const median = Object.fromEntries(Object.keys(runs[0]).map(key => [
    key, runs.map(run => run[key]).sort((a, b) => a - b)[1],
  ]));
  console.log(JSON.stringify({
    path, profile: "Pixel 7, cold cache, 4x CPU, 150ms latency, 1.6Mbps download",
    note: "Local lab measurements, not Lighthouse scores or real-user Core Web Vitals. Local static resources are not CDN-compressed.",
    runs, median,
  }, null, 2));
} finally {
  await browser.close();
}
