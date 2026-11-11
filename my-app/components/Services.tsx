import { services } from "@/content/services";
import { copy, type Copy } from "@/content/personas";
import { Section, SectionHead, Swap } from "./Section";
import ServiceScene from "./ServiceScene";

const word = (all: string, i: number, k: "title" | "promise"): Copy => ({
  all,
  recruiter: copy.services.recruiter[i][k],
  business: copy.services.business[i][k],
});

export default function Services() {
  return (
    <Section id="do" fit>
      <SectionHead title="What I do" only={["all", "dev"]} />
      <SectionHead title="What I can do for your team" only={["recruiter"]} />
      <SectionHead title="What I can build for you" only={["business"]} />
      <div className="grid grid-cols-1 gap-x-8 border-t-[1.5px] border-ink pt-[clamp(12px,3svh,32px)] min-[801px]:grid-cols-3">
        {services.map((s, i) => (
          <div
            key={s.title}
            className="svc reveal border-b border-line pb-7 min-[801px]:border-b-0 [:root[data-persona=business]_&]:rounded-[14px] [:root[data-persona=business]_&]:border-[1.5px] [:root[data-persona=business]_&]:border-ink [:root[data-persona=business]_&]:bg-card [:root[data-persona=business]_&]:p-7 [:root[data-persona=recruiter]_&]:rounded-[14px] [:root[data-persona=recruiter]_&]:border-[1.5px] [:root[data-persona=recruiter]_&]:border-ink [:root[data-persona=recruiter]_&]:bg-card [:root[data-persona=recruiter]_&]:p-7 [:root[data-persona=business]_&]:min-[801px]:min-h-[340px] [:root[data-persona=recruiter]_&]:min-[801px]:min-h-[340px]"
          >
            <div
              data-for="all dev"
              className="mb-[clamp(10px,2svh,20px)] overflow-hidden rounded-[14px] border-[1.5px] border-ink bg-[#DCE8F7] min-[801px]:h-[clamp(150px,32svh,320px)]"
            >
              <ServiceScene level={(i + 1) as 1 | 2 | 3} />
            </div>
            <b className="display block text-[clamp(36px,7svh,64px)] text-blue">
              {String(i + 1).padStart(2, "0")}
            </b>
            <h3 className="display my-2 text-[clamp(24px,4svh,34px)] leading-none">
              <Swap c={word(s.title, i, "title")} />
            </h3>
            <p className="text-muted">
              <Swap c={word(s.promise, i, "promise")} />
            </p>
            <div data-for="all dev" className="mono mt-3">
              {s.keywords.join(" / ")}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
