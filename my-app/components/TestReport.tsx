import { testReport as r } from "@/content/testReport";
import { card } from "./Section";
import CountUp from "./CountUp";

// Failures sit at even intervals across the run.
const failedAt = new Set(
  Array.from({ length: r.failed }, (_, k) =>
    Math.floor(((k + 1) * (r.passed + r.failed)) / (r.failed + 1)),
  ),
);

export default function TestReport() {
  return (
    <div className={card}>
      <div className="mono flex items-center justify-between">
        <span>$ npm run e2e</span>
        <span className="rounded-full bg-ink px-2.5 py-px text-sky">
          {r.failed} FAILED
        </span>
      </div>
      <div className="display mt-3 text-[clamp(36px,min(9vw,11svh),120px)] leading-none">
        <CountUp value={r.passed} />
        <span className="text-[.4em]">/{r.total}</span>
        <span className="mono ml-3 align-middle text-muted">tests passed</span>
      </div>
      {/* One cell per test; failures are spread out so they read as scattered, not grouped. */}
      <div
        aria-hidden="true"
        className="my-[clamp(8px,1.8svh,20px)] grid grid-cols-[repeat(auto-fill,minmax(9px,1fr))] gap-[3px]"
      >
        {Array.from({ length: r.total }, (_, i) => (
          <span
            key={i}
            className={`h-[clamp(6px,1.2svh,10px)] rounded-[2px] ${failedAt.has(i) ? "bg-fail" : i < r.passed + r.failed ? "bg-blue" : "bg-line"}`}
          />
        ))}
      </div>
      <dl className="grid grid-cols-3 border-t border-line pt-4">
        {[
          ["Coverage", `${r.coverage}%`, ""],
          ["Failed", String(r.failed), "text-fail"],
          ["Duration", r.duration, ""],
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
          {r.categories.map((c) => (
            <tr key={c.name} className="border-t border-line">
              <td className="py-[clamp(2px,.7svh,8px)]">{c.name}</td>
              <td>{c.total}</td>
              <td className="text-fail">{c.failed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
