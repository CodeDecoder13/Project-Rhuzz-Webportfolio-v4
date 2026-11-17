import { readFileSync } from "node:fs";

// The committed run summary the Proof section falls back to (TEST_REPORT_URL is unset under test).
// Tests assert against this file, never against literals, so regenerating it never breaks them.
export const snapshot = JSON.parse(
  readFileSync("content/testReport.json", "utf8"),
) as {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  tests: { title: string }[];
};
export const proofCount = `${snapshot.passed}/${snapshot.total}`;
