import { lifecycle } from "@/content/lifecycle";
import { Section, SectionHead } from "./Section";

export default function Lifecycle() {
  return (
    <Section>
      <SectionHead n="04" title="How I work" />
      <ol className="ml-4 max-w-3xl border-l-[1.5px] border-ink pl-6 min-[801px]:ml-6 min-[801px]:pl-10">
        {lifecycle.map((step, i) => {
          const last = i === lifecycle.length - 1;
          return (
            <li key={step.name} className="reveal relative pb-4 last:pb-0">
              <span
                aria-hidden="true"
                className={`absolute -left-[31px] top-7 size-3 rounded-full border-[1.5px] border-ink min-[801px]:-left-[47px] ${last ? "bg-blue" : "bg-paper"}`}
              />
              <div
                className={`flex items-start gap-5 rounded-[14px] border-[1.5px] border-ink p-5 min-[801px]:p-6 ${last ? "bg-sky" : "bg-card"}`}
              >
                <b className="display text-[40px] min-[801px]:text-[56px]">
                  {String(i + 1).padStart(2, "0")}
                </b>
                <div>
                  <h3 className="mono">
                    {step.name}
                    {last && " ✓"}
                  </h3>
                  <p className="mt-1.5 text-ink/80">{step.text}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
