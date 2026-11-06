import { services } from "@/content/services";
import { Section, SectionHead } from "./Section";
import ServiceScene from "./ServiceScene";

export default function Services() {
  return (
    <Section id="do" fit>
      <SectionHead n="03" title="What I do" />
      <div className="grid grid-cols-1 gap-x-8 border-t-[1.5px] border-ink pt-[clamp(12px,3svh,32px)] min-[801px]:grid-cols-3">
        {services.map((s, i) => (
          <div
            key={s.title}
            className="svc reveal border-b border-line pb-7 min-[801px]:border-b-0"
          >
            <div className="mb-[clamp(10px,2svh,20px)] overflow-hidden rounded-[14px] border-[1.5px] border-ink bg-[#DCE8F7] min-[801px]:h-[clamp(150px,32svh,320px)]">
              <ServiceScene level={(i + 1) as 1 | 2 | 3} />
            </div>
            <b className="display block text-[clamp(36px,7svh,64px)] text-blue">
              {String(i + 1).padStart(2, "0")}
            </b>
            <h3 className="display my-2 text-[clamp(24px,4svh,34px)] leading-none">
              {s.title}
            </h3>
            <p className="text-muted">{s.promise}</p>
            <div className="mono mt-3">{s.keywords.join(" / ")}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
