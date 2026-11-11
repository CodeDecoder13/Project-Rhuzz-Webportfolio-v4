import { certs } from "@/content/certs";
import Link from "next/link";
import { Section, SectionHead, card } from "./Section";
import TestReport from "./TestReport";

export default function Proof() {
  return (
    <Section id="proof" fit only={["all", "dev", "recruiter"]}>
      <SectionHead title="Proof" only={["all", "dev"]} />
      <SectionHead title="Certificates" only={["recruiter"]} />
      <p
        data-for="all dev"
        className="reveal mb-[clamp(10px,2.6svh,28px)] max-w-[52ch] text-[clamp(14px,2svh,18px)] text-muted"
      >
        A sample run from my own test suite. The failures stay on the page,
        because finding them is the job.
      </p>
      <div className="grid grid-cols-1 gap-4 min-[801px]:grid-cols-[1.2fr_1fr]">
        <div data-for="all dev" className="contents">
          <TestReport />
        </div>
        <div className={card}>
          <div className="mono mb-4 flex justify-between">
            <span>Certifications</span>
            <span className="text-muted">
              {String(certs.length).padStart(2, "0")}
            </span>
          </div>
          <ul>
            {certs.map((c) => (
              <li
                key={c.name}
                className="flex items-baseline justify-between gap-4 border-t border-line py-[clamp(5px,1.3svh,12px)] first:border-t-0 first:pt-0"
              >
                <b className="font-semibold">{c.name}</b>
                <span className="mono shrink-0 text-muted">
                  {c.issuer.split(" ")[0]} · {c.year}
                </span>
              </li>
            ))}
          </ul>
          <p data-for="recruiter" className="mt-4">
            <Link
              href="/certifications"
              className="btn-fill mono inline-block rounded-full border-[1.5px] border-ink px-4 py-2"
            >
              All certificates →
            </Link>
          </p>
        </div>
      </div>
    </Section>
  );
}
