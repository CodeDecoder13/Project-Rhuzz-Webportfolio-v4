import { lifecycle } from "@/content/lifecycle";
import { Section, SectionHead } from "./Section";

export default function Lifecycle() {
  return (
    <Section>
      <SectionHead n="04" title="How I work" />
      <ol className="grid grid-cols-2 gap-2.5 min-[801px]:grid-cols-6">
        {lifecycle.map((step, i) => {
          const last = i === lifecycle.length - 1;
          return (
            <li
              key={step}
              className={`flex min-h-[140px] flex-col justify-between rounded-[14px] border-[1.5px] border-ink p-4 ${last ? "bg-sky" : "bg-card"}`}
            >
              <b className="display text-[32px]">
                {String(i + 1).padStart(2, "0")}
                {last && " ✓"}
              </b>
              <span className="mono">{step}</span>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
