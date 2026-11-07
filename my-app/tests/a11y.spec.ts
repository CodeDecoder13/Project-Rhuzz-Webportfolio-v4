import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const theme of ["light", "dark"]) {
  for (const path of [
    "/",
    "/privacy",
    "/terms",
    "/about",
    "/projects",
    "/contact",
    "/qa-testing",
  ]) {
    test(`no serious or critical a11y violations on ${path} (${theme})`, async ({
      page,
    }) => {
      await page.addInitScript((t) => {
        sessionStorage.setItem("gate", "1");
        localStorage.setItem("theme", t);
      }, theme);
      // Entrance animations fade text in; axe would measure contrast mid-fade, so test the settled state.
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(path);
      const { violations } = await new AxeBuilder({ page }).analyze();
      const bad = violations.filter(
        (v) => v.impact === "serious" || v.impact === "critical",
      );
      expect(
        bad.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(" | ")}`),
      ).toEqual([]);
    });
  }
}
