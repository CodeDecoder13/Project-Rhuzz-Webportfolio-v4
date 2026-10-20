import type { Metadata } from "next";
import { Tags } from "@/components/ProjectDetail";
import { Section, SectionHead, card } from "@/components/Section";
import { about } from "@/content/about";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main className="pt-14">
      <Section>
        <SectionHead title="About" />
        <div className="grid grid-cols-1 gap-4 min-[801px]:grid-cols-2">
          <div className={card}>
            <div className="mono mb-3">My story</div>
            <p className="text-muted">{about.bio}</p>
            <div className="mono mb-2 mt-5">Experience</div>
            <ul>
              {about.experience.map((e) => (
                <li key={e.role}>
                  <b>{e.role}</b> · {e.period}
                </li>
              ))}
            </ul>
          </div>
          <div className={card}>
            <div className="mono mb-3">Education</div>
            <ul>
              {about.education.map((e) => (
                <li key={e.school}>
                  <b>{e.program}</b>, {e.school} · {e.period}
                </li>
              ))}
            </ul>
            <div className="mono mb-2 mt-5">Soft skills</div>
            <Tags items={about.softSkills} />
            <div className="mono mb-2 mt-5">Beyond code</div>
            <Tags items={about.interests} />
          </div>
        </div>
        <h2 className="display mb-4 mt-12 text-[34px]">Journey</h2>
        <ol className="border-l-[1.5px] border-ink pl-6">
          {about.journey.map((j) => (
            <li key={j.year} className="mb-4">
              <span className="mono text-blue">{j.year}</span>
              <p>{j.event}</p>
            </li>
          ))}
        </ol>
      </Section>
    </main>
  );
}
