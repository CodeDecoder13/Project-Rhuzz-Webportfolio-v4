import { z } from "zod";

// Shape of the compact run summary made by scripts/report-summary.mjs.
// Pure (no Next imports) so `node lib/check.ts` can test it.
const status = z.enum(["passed", "failed", "flaky", "skipped"]);
const count = z.number().int().nonnegative();

export const summarySchema = z.object({
  generatedAt: z.iso.datetime(),
  // Absent in the committed snapshot: it is a recorded run, not a build of the current commit.
  sha: z
    .string()
    .regex(/^[0-9a-f]{7,40}$/)
    .optional(),
  runUrl: z
    .string()
    .regex(/^https:\/\/github\.com\//)
    .max(300)
    .optional(),
  durationMs: z.number().nonnegative(),
  total: count,
  passed: count,
  failed: count,
  flaky: count,
  skipped: count,
  suites: z
    .array(z.object({ name: z.string().max(80), total: count, failed: count }))
    .max(50),
  tests: z
    .array(
      z.object({
        title: z.string().max(200),
        suite: z.string().max(80),
        status,
        ms: z.number().nonnegative(),
      }),
    )
    .max(2000),
});

export type TestSummary = z.infer<typeof summarySchema>;

export function parseSummary(input: unknown): TestSummary | null {
  const r = summarySchema.safeParse(input);
  if (!r.success) return null;
  const d = r.data;
  // Every number must be backed by the test list, or the page would show claims it cannot prove.
  const n = (st: string) => d.tests.filter((t) => t.status === st).length;
  if (
    d.tests.length !== d.total ||
    n("passed") !== d.passed ||
    n("failed") !== d.failed ||
    n("flaky") !== d.flaky ||
    n("skipped") !== d.skipped
  )
    return null;
  const names = [...new Set(d.tests.map((t) => t.suite))];
  const ok =
    d.suites.length === names.length &&
    names.every((name) => {
      const own = d.tests.filter((t) => t.suite === name);
      const s = d.suites.find((x) => x.name === name);
      return (
        s?.total === own.length &&
        s.failed === own.filter((t) => t.status === "failed").length
      );
    });
  return ok ? d : null;
}

const months = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");
// "2026-11-17T09:00:00.000Z" -> "17 Nov 2026" without touching the clock (static pages must not call new Date()).
export const fmtDate = (iso: string) =>
  `${Number(iso.slice(8, 10))} ${months[Number(iso.slice(5, 7)) - 1]} ${iso.slice(0, 4)}`;

export const fmtDuration = (ms: number) => {
  if (ms < 1000) return `${Math.round(ms)}ms`;
  const s = Math.round(ms / 1000); // whole seconds first, so 59.6 s never prints as 60s or 0m 60s
  return s < 60
    ? `${s}s`
    : `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, "0")}s`;
};
