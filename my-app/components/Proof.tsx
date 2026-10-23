import { certs } from "@/content/certs";
import { Section, SectionHead, card } from "./Section";
import TestReport from "./TestReport";

export default function Proof() {
  return (
    <Section id="proof">
      <SectionHead n="05" title="Proof" />
      <p className="mb-8 max-w-[52ch] text-lg text-muted">
        A sample run from my own test suite. The failures stay on the page, because finding them is the job.
      </p>
      <div className="grid grid-cols-1 gap-4 min-[801px]:grid-cols-[1.2fr_1fr]">
        <TestReport />
        <div className={card}>
          <div className="mono mb-4 flex justify-between">
            <span>Certifications</span>
            <span className="text-muted">{String(certs.length).padStart(2, "0")}</span>
          </div>
          <ul>
            {certs.map((c) => (
              <li key={c.name} className="flex items-baseline justify-between gap-4 border-t border-line py-3 first:border-t-0 first:pt-0">
                <b className="font-semibold">{c.name}</b>
                <span className="mono shrink-0 text-muted">
                  {c.issuer.split(" ")[0]} · {c.year}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
