import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const path of ["/", "/privacy", "/terms"]) {
  test(`no serious or critical a11y violations on ${path}`, async ({ page }) => {
    await page.addInitScript(() => sessionStorage.setItem("gate", "1"));
    await page.goto(path);
    const { violations } = await new AxeBuilder({ page }).analyze();
    const bad = violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(bad.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(" | ")}`)).toEqual([]);
  });
}
