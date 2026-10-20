import { testReport as r } from "@/content/testReport";
import { card } from "./Section";
import CountUp from "./CountUp";

export default function TestReport({ full = false }: { full?: boolean }) {
  return (
    <div className={card}>
      <div className="mono">Sample test run</div>
      <div className="display text-[clamp(64px,9vw,120px)] leading-none">
        <CountUp value={r.passed} />
        <span className="text-[.4em]">/{r.total}</span>
      </div>
      <div className="my-4 h-2.5 overflow-hidden rounded-[5px] bg-line">
        <div className="h-full bg-blue" style={{ width: `${r.coverage}%` }} />
      </div>
      <div className="mono">
        {r.coverage}% coverage · <span className="text-fail">{r.failed} failed</span> · {r.duration}
      </div>
      {full && (
        <table className="mt-6 w-full text-left">
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
                <td className="py-2">{c.name}</td>
                <td>{c.total}</td>
                <td className="text-fail">{c.failed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
