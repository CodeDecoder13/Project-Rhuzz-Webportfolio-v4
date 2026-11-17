import { cacheLife } from "next/cache";
import snapshot from "@/content/testReport.json";
import { parseSummary, type TestSummary } from "./testSummary";

export type TestReportData = TestSummary & { source: "live" | "snapshot" };

// The committed snapshot is the fallback and what tests/builds see when TEST_REPORT_URL is unset.
// Regenerate it with `npm run e2e && npm run report:snapshot` (see scripts/report-summary.mjs).
const fallback = (): TestReportData => ({
  ...(parseSummary(snapshot) as TestSummary),
  source: "snapshot",
});

// Last verified CI run, published by .github/workflows/ci.yml to GitHub Pages.
// The URL comes from the environment only, never from a visitor.
export async function getTestReport(): Promise<TestReportData> {
  "use cache";
  cacheLife("hours");
  const url = process.env.TEST_REPORT_URL;
  if (!url) return fallback();
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) return fallback();
    const text = await res.text();
    if (text.length > 200_000) return fallback();
    const live = parseSummary(JSON.parse(text));
    return live ? { ...live, source: "live" } : fallback();
  } catch {
    return fallback();
  }
}
