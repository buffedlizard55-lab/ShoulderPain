const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;
const fs = require("node:fs");
const pages = [
  "index",
  "causes",
  "treatment",
  "exercises",
  "ergonomics",
  "products",
  "costs",
  "pain-log",
  "sources",
  "next-steps",
];
for (const width of [390, 1440]) {
  for (const slug of pages) {
    test(`${slug} at ${width}px: no errors, overflow or WCAG A/AA violations`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      const requests = [];
      page.on("request", (r) => requests.push(r.url()));
      await page.goto(`/${slug}.html`);
      await expect(page.locator("h1")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBeTruthy();
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(result.violations).toEqual([]);
      expect(errors).toEqual([]);
      expect(
        requests.filter((u) => !u.startsWith("http://127.0.0.1:8000/")),
      ).toEqual([]);
    });
  }
}
test("skip link and product filters work with keyboard", async ({ page }) => {
  await page.goto("/products.html");
  await expect(page.locator("#filter-status")).toHaveText(
    "Showing 5 options. Read the qualification limits on each card.",
  );
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
  await page.getByRole("button", { name: "Chairs & trade-offs" }).click();
  await expect(page.locator(".product:visible")).toHaveCount(2);
  await page.getByRole("button", { name: "Folding candidates" }).click();
  await expect(page.locator(".product:visible")).toHaveCount(4);
  await page.getByRole("button", { name: "All options" }).click();
  await expect(page.locator(".product:visible")).toHaveCount(5);
});
test("content usable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const p = await context.newPage();
  await p.goto("http://127.0.0.1:8000/products.html");
  await expect(p.locator(".product:visible")).toHaveCount(5);
  await p.goto("http://127.0.0.1:8000/exercises.html");
  await expect(p.getByText("1. Pendulum")).toBeVisible();
  await context.close();
});
const key = "shoulderpain-log-v1";
test("log blank values, save/reload, safe rendering, export and clear", async ({
  page,
}) => {
  page.on("dialog", (d) => d.accept());
  await page.goto("/pain-log.html");
  await page.locator("#f-evening").fill("6");
  await page.locator("#f-notes").fill("<img src=x onerror=alert(1)>");
  await page.getByRole("button", { name: "Save entry", exact: true }).click();
  await expect(page.locator("#log-status")).toContainText("Saved");
  await page.reload();
  await expect(page.locator("#log-summary")).toContainText("6.0/10");
  await expect(page.locator("#history-body img")).toHaveCount(0);
  const data = await page.evaluate(
    (k) => JSON.parse(localStorage.getItem(k)),
    key,
  );
  expect(Object.values(data.entries)[0].m).toBeNull();
  const downloadPromise = page.waitForEvent("download");
  await page.locator("#export-json").click();
  const dl = await downloadPromise;
  const backup = JSON.parse(fs.readFileSync(await dl.path(), "utf8"));
  expect(Object.keys(backup.entries)).toHaveLength(1);
  await page.locator("#clear-log").click();
  await expect(page.locator("#log-summary")).toContainText("0 days logged");
  await expect(page.locator("#log-summary")).toContainText("not recorded");
});
test("corrupt storage does not get silently overwritten; export recovery offered", async ({
  page,
}) => {
  await page.addInitScript(
    (k) => localStorage.setItem(k, '{"entries":{"bad":null}}'),
    key,
  );
  await page.goto("/pain-log.html");
  await expect(page.locator("#log-status")).toContainText(
    "Saving/import are blocked",
  );
  await page.getByRole("button", { name: "Save entry", exact: true }).click();
  expect(await page.evaluate((k) => localStorage.getItem(k), key)).toBe(
    '{"entries":{"bad":null}}',
  );
});
test("storage write and delete failures never report success", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw Error("Quota");
    };
    Storage.prototype.removeItem = () => {
      throw Error("Denied");
    };
  });
  page.on("dialog", (d) => d.accept());
  await page.goto("/pain-log.html");
  await page.getByRole("button", { name: "Save entry", exact: true }).click();
  await expect(page.locator("#log-status")).toContainText("Could not save");
  await page.locator("#clear-log").click();
  await expect(page.locator("#log-status")).toContainText("Could not delete");
});
test("import validates malformed dates, numbers, types, arrays; valid v1 survives", async ({
  page,
}) => {
  page.on("dialog", (d) => d.accept());
  await page.goto("/pain-log.html");
  const entries = {
    "2026-01-01": { side: "left", e: 3, flags: { wing: true }, notes: "valid" },
    "2026-02-30": { side: "left" },
    "2026-01-03": { side: "back", breaks: 1.2 },
    "2026-01-04": { side: "back", e: true },
  };
  await page.locator("#import-file").setInputFiles({
    name: "log.json",
    mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify({ version: 1, entries })),
  });
  await expect(page.locator("#log-status")).toContainText(
    "1 valid entries; 0 replaced; 3 invalid entries skipped",
  );
  await expect(page.locator("#history-body")).toContainText("2026-01-01");
});
test("CSV neutralizes dangerous spreadsheet text", async ({ page }) => {
  await page.goto("/pain-log.html");
  await page.locator("#f-notes").fill("=1+1");
  await page.getByRole("button", { name: "Save entry", exact: true }).click();
  const wait = page.waitForEvent("download");
  await page.locator("#export-csv").click();
  const file = await wait;
  expect(fs.readFileSync(await file.path(), "utf8")).toContain('"\'=1+1"');
});

test("320px and tablet widths do not create page-level horizontal scroll", async ({
  page,
}) => {
  for (const width of [320, 768]) {
    await page.setViewportSize({ width, height: 900 });
    for (const slug of pages) {
      await page.goto(`/${slug}.html`);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `${slug} at ${width}`,
      ).toBeTruthy();
    }
  }
});

test("project subpath preserves assets and navigation", async ({ page }) => {
  const failed = [];
  await page.route("**/ShoulderPain/**", async (route) => {
    const response = await route.fetch({
      url: route.request().url().replace("/ShoulderPain/", "/"),
    });
    if (!response.ok()) failed.push(route.request().url());
    await route.fulfill({ response });
  });
  await page.goto("/ShoulderPain/index.html");
  await page
    .getByRole("link", { name: "Products & prices", exact: true })
    .click();
  await expect(page).toHaveURL(/\/ShoulderPain\/products.html$/);
  await expect(page.locator("#product-filters")).toBeVisible();
  expect(failed).toEqual([]);
});

test("another-tab edit blocks stale saves instead of overwriting data", async ({
  context,
  page,
}) => {
  await page.goto("/pain-log.html");
  const other = await context.newPage();
  await other.goto("/pain-log.html");
  await other.locator("#f-evening").fill("2");
  await other.getByRole("button", { name: "Save entry", exact: true }).click();
  await expect(page.locator("#log-status")).toContainText(
    "Log changed in another tab",
  );
  await page.getByRole("button", { name: "Save entry", exact: true }).click();
  await expect(page.locator("#log-status")).toContainText("Saving is blocked");
  const state = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("shoulderpain-log-v1")),
  );
  expect(Object.values(state.entries)[0].e).toBe(2);
});

test("oversize import rejected and cancelled overwrite preserves history", async ({
  page,
}) => {
  await page.goto("/pain-log.html");
  await page.locator("#import-file").setInputFiles({
    name: "large.json",
    mimeType: "application/json",
    buffer: Buffer.alloc(20 * 1024 * 1024 + 1, 32),
  });
  await expect(page.locator("#log-status")).toContainText("exceeds 20 MB");
  await page.locator("#f-evening").fill("4");
  await page.getByRole("button", { name: "Save entry", exact: true }).click();
  page.on("dialog", (d) => d.dismiss());
  await page.locator("#f-evening").fill("8");
  await page.getByRole("button", { name: "Save entry", exact: true }).click();
  await page.reload();
  await expect(page.locator("#log-summary")).toContainText("4.0/10");
});

test("statement audit expands by keyboard and links to source scope", async ({
  page,
}) => {
  await page.goto("/sources.html#statement-audit");
  const group = page.locator(".audit-group").first();
  const summary = group.locator("summary");
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(group).toHaveAttribute("open", "");
  await expect(group.locator(".source-record").first()).toBeVisible();
  await group
    .getByRole("link", { name: "M1 register entry", exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(/#m1$/);
  await expect(page.locator("#m1")).toBeInViewport();
});

test("statement audit remains available without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:8000/sources.html#statement-audit");
  const group = page.locator(".audit-group").first();
  await group.locator("summary").click();
  await expect(group.locator(".source-record").first()).toBeVisible();
  await context.close();
});
