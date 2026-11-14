import { expect, test, type Page } from "@playwright/test";
import { jargon } from "../content/personas";

const seed = (view: string) => ({
  cookies: [],
  origins: [
    {
      origin: "http://localhost:3100",
      localStorage: [
        { name: "cookie-consent", value: "necessary" },
        { name: "persona", value: view },
      ],
    },
  ],
});
const html = (page: Page) => page.locator("html");
const mainText = (page: Page) => page.locator("main").innerText();
const skipGate = (page: Page) =>
  page.addInitScript(() => sessionStorage.setItem("gate", "1"));
const gateName = "Enter portfolio";

test("gate asks who you are on first visit", async ({ page }) => {
  await page.goto("/");
  const gate = page.getByRole("dialog", { name: gateName });
  await expect(gate).toBeVisible();
  await expect(
    gate.getByRole("heading", { name: "Who are you?" }),
  ).toBeVisible();
  for (const n of [
    "I'm hiring",
    "I need something built",
    "I build software",
    "Just looking",
  ])
    await expect(
      gate.getByRole("button", { name: new RegExp(n) }),
    ).toBeVisible();
});

test("gate choice is applied and remembered", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /I'm hiring/ }).click();
  await expect(page.getByRole("dialog", { name: gateName })).toBeHidden();
  await expect(html(page)).toHaveAttribute("data-persona", "recruiter");
  expect(await page.evaluate(() => localStorage.getItem("persona"))).toBe(
    "recruiter",
  );
  await page.reload();
  await expect(html(page)).toHaveAttribute("data-persona", "recruiter");
});

test("gate Esc keeps the default view and saves nothing", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: gateName })).toBeHidden();
  await expect(html(page)).not.toHaveAttribute("data-persona", /.+/);
  expect(await page.evaluate(() => localStorage.getItem("persona"))).toBeNull();
  await expect(
    page.getByText("I build web systems, then try to break them.").first(),
  ).toBeVisible();
});

test("gate is keyboard operable and traps focus", async ({ page }) => {
  await page.goto("/");
  const gate = page.getByRole("dialog", { name: gateName });
  await expect(gate.getByRole("button", { name: /I'm hiring/ })).toBeFocused();
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press("Tab");
    expect(
      await page.evaluate(
        () => !!document.activeElement?.closest("[role=dialog]"),
      ),
    ).toBe(true);
  }
  await page.getByRole("button", { name: /I build software/ }).focus();
  await page.keyboard.press("Enter");
  await expect(html(page)).toHaveAttribute("data-persona", "dev");
});

test("gate: share link presets the view and skips the intro; junk is ignored", async ({
  page,
}) => {
  await page.goto("/?for=business");
  await expect(page.getByRole("dialog", { name: gateName })).toBeHidden();
  await expect(html(page)).toHaveAttribute("data-persona", "business");
  expect(await page.evaluate(() => localStorage.getItem("persona"))).toBe(
    "business",
  );
  await page.evaluate(() => localStorage.removeItem("persona"));
  await page.goto("/?for=%3Cscript%3E");
  await expect(html(page)).not.toHaveAttribute("data-persona", /.+/);
});

test("canonical ignores the share param", async ({ page }) => {
  await page.goto("/?for=recruiter");
  const href = await page.locator("link[rel=canonical]").getAttribute("href");
  expect(href).not.toContain("?");
});

test.describe("recruiter", () => {
  test.use({ storageState: seed("recruiter") });
  test.beforeEach(({ page }) => skipGate(page));

  test("Home has no tool jargon and hides the technical sections", async ({
    page,
  }) => {
    await page.goto("/");
    expect((await mainText(page)).match(jargon)?.[0]).toBeUndefined();
    await expect(
      page.getByRole("button", { name: "Get my CV" }).first(),
    ).toBeVisible();
    expect(await page.locator("#proof").innerText()).not.toContain("148/156");
    await expect(page.getByRole("tab", { name: "QA Engineer" })).toHaveCount(0);
    await expect(page.getByText("Next.js ✦").first()).toBeHidden();
  });

  test("view survives navigation and the drawer shows plain wording", async ({
    page,
  }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });
    await nav.getByRole("link", { name: "About" }).click();
    await nav.getByRole("link", { name: "Projects" }).click();
    await expect(html(page)).toHaveAttribute("data-persona", "recruiter");
    await page.getByRole("button", { name: /OmniPOS/ }).click();
    const drawer = page.getByRole("dialog", { name: "Project details" });
    await expect(drawer).toContainText("Faster checkout");
    await expect(drawer.getByText("Laravel 12")).toBeHidden();
  });

  test("hidden-from-nav pages still load", async ({ page }) => {
    await page.goto("/tech-stack");
    await expect(
      page.getByRole("heading", { level: 2, name: "Tech stack" }),
    ).toBeVisible();
    await expect(
      page.getByText("The tools I use to build and test software"),
    ).toBeVisible();
  });

  test("chat chips and request follow the view; CV form preselects the role", async ({
    page,
  }) => {
    let body = "";
    await page.route("**/api/chat", (r) => {
      body = r.request().postData() ?? "";
      return r.fulfill({
        status: 200,
        contentType: "application/x-ndjson",
        body: JSON.stringify({ t: "text", v: "ok" }) + "\n",
      });
    });
    await page.goto("/contact");
    await page.getByLabel("Message", { exact: true }).click();
    await page.getByRole("button", { name: "I agree, start chat" }).click();
    await page.getByRole("button", { name: "Is he available?" }).click();
    await expect(page.getByRole("log")).toContainText("ok");
    expect(JSON.parse(body).view).toBe("recruiter");
    await page
      .getByRole("banner")
      .getByRole("button", { name: "Get my CV" })
      .click();
    await expect(page.getByLabel("Your role")).toHaveValue("Recruiter / HR");
  });
});

test.describe("business", () => {
  test.use({ storageState: seed("business") });
  test.beforeEach(({ page }) => skipGate(page));

  test("Home leads with outcomes and has no invented numbers", async ({
    page,
  }) => {
    await page.goto("/");
    expect((await mainText(page)).match(jargon)?.[0]).toBeUndefined();
    await expect(
      page
        .getByRole("button", { name: "Book a call" })
        .or(page.getByRole("link", { name: "Book a call" }))
        .first(),
    ).toBeVisible();
    await expect(page.locator("#proof")).toBeHidden();
    await expect(
      page.getByRole("heading", { name: "What I can build for you" }),
    ).toBeVisible();
    expect(await page.locator("#work").innerText()).not.toContain("30%");
  });

  test("no layout shift between first parse and load", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const sub = page.getByText("I build the web system your business runs on");
    const a = await sub.boundingBox();
    await page.waitForLoadState("load");
    await page.waitForTimeout(300);
    const b = await sub.boundingBox();
    expect(b?.y).toBeCloseTo(a!.y, 0);
  });
});

test.describe("dev", () => {
  test.use({ storageState: seed("dev") });
  test.beforeEach(({ page }) => skipGate(page));

  test("Home keeps the technical view", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Laravel with Vue or Next.js")).toBeVisible();
    await expect(page.getByRole("tab", { name: "QA Engineer" })).toBeVisible();
    await expect(page.locator("#work")).toContainText("Laravel");
    await expect(page.locator("#proof")).toContainText("148/156", {
      timeout: 4000,
    });
  });
});

test("default view is unchanged", async ({ page }) => {
  await skipGate(page);
  await page.goto("/");
  await expect(
    page.getByText(
      "I build web systems, then try to break them. Shipped with proof that they pass.",
    ),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "What I do" })).toBeVisible();
  await expect(page.getByText("Brief #07")).toBeVisible();
});

test("header switcher changes the view live and announces it", async ({
  page,
}) => {
  await skipGate(page);
  await page.goto("/");
  const sel = page.getByRole("combobox", { name: "Viewing as" });
  await sel.click();
  await page.getByRole("option", { name: /Business view/ }).click();
  await expect(html(page)).toHaveAttribute("data-persona", "business");
  await expect(
    page
      .getByRole("status")
      .filter({ hasText: "Now showing the business view" }),
  ).toBeAttached();
  await expect(sel).toBeFocused();
  await sel.click();
  await page.getByRole("option", { name: /Everything/ }).click();
  await expect(html(page)).not.toHaveAttribute("data-persona", /.+/);
});

test.describe("mobile switcher", () => {
  test.use({ viewport: { width: 375, height: 700 } });
  test("is in the burger menu", async ({ page }) => {
    await skipGate(page);
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).click();
    await page.getByRole("combobox", { name: "Viewing as" }).click();
    await page.getByRole("option", { name: /Recruiter view/ }).click();
    await expect(html(page)).toHaveAttribute("data-persona", "recruiter");
  });
});

test.describe("no JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("full default page, no dialog", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(
      page.getByText("I build web systems, then try to break them.").first(),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "What I do" }),
    ).toBeVisible();
  });
});

test("reduced motion: every view shows its content", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await skipGate(page);
  for (const v of ["dev", "recruiter", "business"]) {
    await page.goto("/");
    await page.evaluate((x) => localStorage.setItem("persona", x), v);
    await page.reload();
    await expect(page.locator("h1")).toHaveCSS("opacity", "1");
    await expect(page.locator("#contact h2:visible")).toBeVisible();
  }
});

test("chat API validates the view", async ({ request }) => {
  const m = [{ role: "user", content: "hi" }];
  const bad = await request.post("/api/chat", {
    data: { messages: m, view: "nope" },
  });
  expect(bad.status()).toBe(400);
  const ok = await request.post("/api/chat", {
    data: { messages: m, view: "recruiter" },
  });
  expect([200, 429, 500, 502]).toContain(ok.status()); // 500/502 when no Gemini key is set locally
});
