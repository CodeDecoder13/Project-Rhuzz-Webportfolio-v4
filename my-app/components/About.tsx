import { about } from "@/content/about";
import { Tags } from "./ProjectDetail";
import { Section, SectionHead, card } from "./Section";

export default function About() {
  return (
    <Section id="about">
      <SectionHead n="06" title="About" />
      <div className="grid grid-cols-1 gap-4 min-[801px]:grid-cols-[1.2fr_1fr]">
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
            {about.education.slice(0, 2).map((e) => (
              <li key={e.school}>
                <b>{e.program}</b>, {e.school} · {e.period}
              </li>
            ))}
          </ul>
          <div className="mono mb-2 mt-5">Beyond code</div>
          <Tags items={about.interests} />
        </div>
      </div>
    </Section>
  );
}
