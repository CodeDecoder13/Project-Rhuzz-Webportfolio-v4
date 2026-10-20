import { expect, test } from "@playwright/test";

// Every test except the gate one starts as a returning visitor so the intro overlay stays out of the way.
test.beforeEach(async ({ page }, info) => {
  if (info.title.includes("gate")) return;
  await page.addInitScript(() => sessionStorage.setItem("gate", "1"));
});

test("home loads with centered nav and no view-projects button", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Rhuzzel Paramio/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Rhuzzel");
  const nav = page.getByRole("navigation", { name: "Primary" });
  await expect(nav.getByRole("link")).toHaveText(["About", "Projects", "Contact"]);
  await expect(page.getByText("View projects")).toHaveCount(0);
});

test.describe("mobile", () => {
  test.use({ viewport: { width: 375, height: 700 } });

  test("burger menu replaces the nav and opens the pages", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("navigation", { name: "Primary" })).toBeHidden();
    const burger = page.getByRole("button", { name: "Menu" });
    await expect(burger).toHaveAttribute("aria-expanded", "false");
    await burger.click();
    const menu = page.getByRole("navigation", { name: "Mobile" });
    await expect(menu.getByRole("link")).toHaveText(["About", "Projects", "Contact", "Download CV"]);
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await burger.click();
    await menu.getByRole("link", { name: "Contact" }).click();
    await expect(page).toHaveURL("/contact");
    await expect(menu).toBeHidden();
  });

  test("hero text is white over the photo", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveCSS("color", "rgb(255, 255, 255)");
  });
});

test("gate can be skipped with Esc", async ({ page }) => {
  await page.goto("/");
  const gate = page.getByRole("dialog", { name: "Enter portfolio" });
  await expect(gate).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(gate).toBeHidden();
});

test("nav links open the dedicated pages", async ({ page }) => {
  await page.goto("/");
  for (const [link, path, heading] of [
    ["About", "/about", "About"],
    ["Projects", "/projects", "Selected work"],
    ["Contact", "/contact", "Contact"],
  ]) {
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: link }).click();
    await expect(page).toHaveURL(path);
    await expect(page.getByRole("heading", { level: 2, name: heading })).toBeVisible();
  }
});

test("filter changes the card count", async ({ page }) => {
  await page.goto("/projects");
  const cards = page.locator("#work button[aria-haspopup='dialog']");
  for (const [filter, count] of [["All", 9], ["Web Dev", 5], ["QA", 3], ["Capstone", 1]] as const) {
    await page.getByRole("button", { name: filter, exact: true }).click();
    await expect(cards).toHaveCount(count);
  }
});

test("drawer opens, syncs the URL and closes", async ({ page }) => {
  await page.goto("/projects");
  const card = page.getByRole("button", { name: /DevCollab/ });
  await card.click();
  const drawer = page.getByRole("dialog", { name: "Project details" });
  await expect(drawer).toBeVisible();
  await expect(page).toHaveURL(/\/projects\/devcollab$/);
  await expect(drawer.getByRole("button", { name: "Close" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(drawer).toBeHidden();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(card).toBeFocused();
});

test("case study route renders and unknown slug does not", async ({ page }) => {
  await page.goto("/projects/project-airzen");
  await expect(page.getByRole("heading", { level: 2, name: "Project Airzen" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Code" })).toHaveAttribute("href", /CodeDecoder13\/AirZen/);
  await page.goto("/projects/nope");
  await expect(page.getByText("Not found")).toBeVisible();
});

test("proof counter ends on the true value", async ({ page }) => {
  await page.goto("/");
  await page.locator("#proof").scrollIntoViewIfNeeded();
  await expect(page.locator("#proof")).toContainText("148/156", { timeout: 3000 });
});

test("contact form shows validation errors", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Send message" }).click();
  // Next's route announcer also has role=alert, so scope to the form's field errors.
  await expect(page.locator("form p[role=alert]")).toHaveCount(4);
  await expect(page.getByText("Name is required")).toBeVisible();
});

test("contact form surfaces a server error", async ({ page }) => {
  await page.route("**/api/contact", (r) => r.fulfill({ status: 500, json: { error: "Contact form is not configured." } }));
  await page.goto("/contact");
  await page.getByLabel("Name", { exact: true }).fill("Test");
  await page.getByLabel("Email", { exact: true }).fill("test@example.com");
  await page.getByLabel("Subject", { exact: true }).fill("Hello");
  await page.getByLabel("Message", { exact: true }).fill("Hi there");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("status")).toContainText("not configured");
});

test("contact API rejects bad input and honeypot sends nothing", async ({ request }) => {
  const bad = await request.post("/api/contact", { data: { name: "", email: "x", subject: "s", message: "m" } });
  expect(bad.status()).toBe(400);
  const bot = await request.post("/api/contact", {
    data: { name: "Bot", email: "bot@example.com", subject: "s", message: "m", website: "http://spam" },
  });
  expect(bot.status()).toBe(200);
});

test("legal pages are reachable from the footer", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Terms & Conditions" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Terms & Conditions");
  await page.getByRole("link", { name: "Privacy Policy" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Privacy Policy");
  // Next keeps the previous route mounted but hidden, so only count the visible match.
  await expect(page.getByText("Not legal advice").locator("visible=true")).toHaveCount(1);
});

test("footer lists site links and contact details", async ({ page }) => {
  await page.goto("/");
  const footer = page.getByRole("contentinfo");
  await expect(footer.getByRole("navigation", { name: "Footer" }).getByRole("link")).toHaveCount(7);
  await expect(footer.getByRole("link", { name: "boyparamio@gmail.com" })).toBeVisible();
  await expect(footer.getByText("Volatile Reaction")).toHaveCount(0);
});
