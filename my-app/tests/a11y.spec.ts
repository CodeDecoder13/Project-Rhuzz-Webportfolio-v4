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
    "/tech-stack",
    "/certifications",
    "/ai-consent",
    "/cookies",
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

// Each adaptive view on the pages that change most, plus the picker itself.
const serious = (
  vs: { impact?: string | null; id: string; nodes: { target: unknown }[] }[],
) =>
  vs
    .filter((v) => v.impact === "serious" || v.impact === "critical")
    .map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(" | ")}`);

for (const view of ["dev", "recruiter", "business"]) {
  for (const path of ["/", "/about", "/projects", "/contact"]) {
    test(`no serious or critical a11y violations on ${path} (${view} view)`, async ({
      page,
    }) => {
      await page.addInitScript((v) => {
        sessionStorage.setItem("gate", "1");
        localStorage.setItem("persona", v);
      }, view);
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(path);
      const { violations } = await new AxeBuilder({ page }).analyze();
      expect(serious(violations)).toEqual([]);
    });
  }
}

for (const theme of ["light", "dark"]) {
  test(`no serious or critical a11y violations with the picker open (${theme})`, async ({
    page,
  }) => {
    await page.addInitScript((t) => localStorage.setItem("theme", t), theme);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(
      page.getByRole("dialog", { name: "Enter portfolio" }),
    ).toBeVisible();
    const { violations } = await new AxeBuilder({ page }).analyze();
    expect(serious(violations)).toEqual([]);
  });
}
