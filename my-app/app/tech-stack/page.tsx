import type { Metadata } from "next";
import { Section, SectionHead, card } from "@/components/Section";
import { stack, type Level } from "@/content/stack";

export const metadata: Metadata = { title: "Tech stack" };

const dots: Record<Level, number> = { Expert: 3, Advanced: 2, Intermediate: 1 };

function Dots({ level }: { level: Level }) {
  return (
    <span aria-hidden="true" className="ml-2 inline-flex gap-0.5">
      {[1, 2, 3].map((n) => (
        <i key={n} className={`size-1.5 rounded-full ${n <= dots[level] ? "bg-blue" : "bg-line"}`} />
      ))}
    </span>
  );
}

export default function TechStackPage() {
  return (
    <main className="pt-14">
      <Section>
        <SectionHead title="Tech stack" />
        <p className="mono mb-6 text-muted">Proficiency: ●●● Expert · ●● Advanced · ● Intermediate</p>
        <div className="grid grid-cols-1 gap-4 min-[801px]:grid-cols-2">
          {stack.map((g) => (
            <div key={g.group} className={card}>
              <h2 className="display mb-3 text-[26px]">{g.group}</h2>
              <ul className="flex flex-wrap gap-1.5">
                {g.skills.map((s) => (
                  <li key={s.name} className="rounded-full border-[1.5px] border-ink px-2.5 py-0.5 font-mono text-[11px] font-medium">
                    {s.name}
                    <Dots level={s.level} />
                    <span className="sr-only"> ({s.level})</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
