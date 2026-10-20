import { certs } from "@/content/certs";
import { Tags } from "./ProjectDetail";
import { Section, SectionHead, card } from "./Section";
import TestReport from "./TestReport";

export default function Proof() {
  return (
    <Section id="proof">
      <SectionHead n="05" title="Proof" />
      <div className="grid grid-cols-1 gap-4 min-[801px]:grid-cols-[1.2fr_1fr]">
        <TestReport />
        <div className={card}>
          <div className="mono mb-3">Certifications</div>
          <Tags items={certs.map((c) => c.name)} />
        </div>
      </div>
    </Section>
  );
}
