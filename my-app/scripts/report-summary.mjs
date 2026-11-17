// Turns Playwright's JSON report into the compact summary the Proof section shows.
//   node scripts/report-summary.mjs             -> test-results/pages/summary.json (CI publishes this to GitHub Pages)
//   node scripts/report-summary.mjs --snapshot  -> content/testReport.json (the committed fallback)
// Regenerate the committed snapshot with: npm run e2e && npm run report:snapshot
// The e2e run never writes the snapshot itself, so a run cannot make its own numbers stale.
// Only titles, statuses and timings are kept: no error text, so nothing sensitive can leak.
import { execSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const report = JSON.parse(readFileSync("test-results/report.json", "utf8"));
const tests = [];
const walk = (suite, file) => {
  for (const spec of suite.specs ?? []) {
    for (const t of spec.tests) {
      const status =
        t.status === "expected"
          ? "passed"
          : t.status === "unexpected"
            ? "failed"
            : t.status; // flaky | skipped
      tests.push({
        title: spec.title,
        suite: file,
        status,
        ms: Math.round(t.results.at(-1)?.duration ?? 0),
      });
    }
  }
  for (const s of suite.suites ?? []) walk(s, file);
};
for (const s of report.suites) walk(s, s.title.replace(/\.spec\.ts$/, ""));

const count = (st) => tests.filter((t) => t.status === st).length;
const suites = [...new Set(tests.map((t) => t.suite))].map((name) => {
  const own = tests.filter((t) => t.suite === name);
  return {
    name,
    total: own.length,
    failed: own.filter((t) => t.status === "failed").length,
  };
});
const {
  GITHUB_SERVER_URL: srv,
  GITHUB_REPOSITORY: repo,
  GITHUB_RUN_ID: run,
} = process.env;
const summary = {
  generatedAt: report.stats.startTime,
  // The committed snapshot omits the commit: it is a recorded run, not a build of the commit it sits in.
  ...(!process.argv.includes("--snapshot") && {
    sha:
      process.env.GITHUB_SHA ??
      execSync("git rev-parse HEAD", { encoding: "utf8" }).trim(),
  }),
  ...(run && { runUrl: `${srv}/${repo}/actions/runs/${run}` }),
  durationMs: Math.round(report.stats.duration),
  total: tests.length,
  passed: count("passed"),
  failed: count("failed"),
  flaky: count("flaky"),
  skipped: count("skipped"),
  suites,
  tests,
};

const snapshot = process.argv.includes("--snapshot");
const out = snapshot
  ? "content/testReport.json"
  : "test-results/pages/summary.json";
if (!snapshot) mkdirSync("test-results/pages", { recursive: true });
writeFileSync(out, JSON.stringify(summary, null, 1) + "\n");
console.log(
  `${out}: ${summary.passed}/${summary.total} passed, ${summary.failed} failed`,
);
