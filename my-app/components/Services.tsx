import { services } from "@/content/services";
import { Section, SectionHead } from "./Section";

export default function Services() {
  return (
    <Section id="do">
      <SectionHead n="03" title="What I do" />
      <div className="grid grid-cols-1 border-t-[1.5px] border-ink min-[801px]:grid-cols-3">
        {services.map((s, i) => (
          <div
            key={s.title}
            className="border-b border-line py-7 min-[801px]:border-b-0 min-[801px]:border-r min-[801px]:pr-6 min-[801px]:last:border-r-0 min-[801px]:[&:not(:first-child)]:pl-6"
          >
            <b className="display block text-[64px] text-blue">{String(i + 1).padStart(2, "0")}</b>
            <h3 className="display my-2 text-[34px] leading-none">{s.title}</h3>
            <p className="text-muted">{s.promise}</p>
            <div className="mono mt-3">{s.keywords.join(" / ")}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
