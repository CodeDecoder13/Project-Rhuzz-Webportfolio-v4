import { getTestReport } from "@/lib/testReport";
import { fmtDate, fmtDuration } from "@/lib/testSummary";
import { card } from "./Section";
import ReportLive from "./ReportLive";

// Real results of this site's own Playwright suite (see scripts/report-summary.mjs).
export default async function TestReport() {
  const r = await getTestReport();
  const date = fmtDate(r.generatedAt);
  const slowest = r.tests.reduce((a, t) => (t.ms > a.ms ? t : a), r.tests[0]);
  return (
    <div className={card}>
      <div className="mono flex items-center justify-between">
        <span>$ npm run e2e</span>
        <span className="rounded-full bg-ink px-2.5 py-px text-sky">
          {r.failed
            ? `${r.failed} FAILED`
            : r.passed === r.total
              ? "ALL PASSED"
              : "0 FAILED"}
        </span>
      </div>
      <ReportLive
        tests={r.tests.map((t) => ({ n: t.title, s: t.status, ms: t.ms }))}
        counts={{
          total: r.total,
          passed: r.passed,
          failed: r.failed,
          skipped: r.skipped,
          flaky: r.flaky,
        }}
        date={date}
        live={r.source === "live"}
        duration={fmtDuration(r.durationMs)}
      />
      <dl className="grid grid-cols-3 border-t border-line pt-4">
        {[
          ["Failed", String(r.failed), r.failed ? "text-fail" : ""],
          ["Skipped", String(r.skipped), ""],
          ["Duration", fmtDuration(r.durationMs), ""],
        ].map(([k, v, c]) => (
          <div key={k}>
            <dt className="mono text-muted">{k}</dt>
            <dd className={`display text-[clamp(20px,3.2svh,28px)] ${c}`}>
              {v}
            </dd>
          </div>
        ))}
      </dl>
      <table className="mt-[clamp(8px,1.6svh,20px)] w-full text-left text-[clamp(13px,1.8svh,16px)]">
        <thead className="mono text-muted">
          <tr>
            <th className="pb-2 font-medium">Suite</th>
            <th className="pb-2 font-medium">Total</th>
            <th className="pb-2 font-medium">Failed</th>
          </tr>
        </thead>
        <tbody>
          {r.suites.map((c) => (
            <tr key={c.name} className="border-t border-line">
              <td className="py-[clamp(2px,.7svh,8px)]">{c.name}</td>
              <td>{c.total}</td>
              <td className={c.failed ? "text-fail" : "text-muted"}>
                {c.failed}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mono mt-[clamp(8px,1.6svh,20px)] text-muted">
        {r.source === "live" ? "Last run" : "Snapshot from"}{" "}
        <time dateTime={r.generatedAt}>{date}</time>
        {r.source === "live" && r.sha && (
          <>
            {" · commit "}
            {r.runUrl ? (
              <a
                href={r.runUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue"
              >
                {r.sha.slice(0, 7)}
                <span className="sr-only"> (opens the run on GitHub)</span>
              </a>
            ) : (
              r.sha.slice(0, 7)
            )}
          </>
        )}
        {r.flaky ? ` · ${r.flaky} flaky` : ""}
        {slowest
          ? ` · slowest: ${slowest.title} (${fmtDuration(slowest.ms)})`
          : ""}
      </p>
    </div>
  );
}
