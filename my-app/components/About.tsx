import Link from "next/link";
import { about } from "@/content/about";
import { Tags } from "./ProjectDetail";
import { Section, SectionHead, card } from "./Section";

export default function About({
  n,
  compact = false,
}: {
  n?: string;
  compact?: boolean;
}) {
  return (
    <Section id="about" fit={compact}>
      <SectionHead n={n} title="About" />
      <div className="grid grid-cols-1 gap-4 min-[801px]:grid-cols-[1.2fr_1fr]">
        <div className={`${card} flex flex-col`}>
          <div className="mono mb-[clamp(6px,1.6svh,16px)]">My story</div>
          <p className="display text-[clamp(28px,min(5vw,6svh),64px)]">
            Developer by training.
            <br />
            <span className="text-blue">Tester by habit.</span>
          </p>
          <div className="mt-[clamp(10px,2.4svh,24px)] space-y-[clamp(6px,1.6svh,16px)] text-[clamp(14px,2svh,18px)] text-muted">
            {about.bio.slice(0, compact ? 2 : 3).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {!compact && (
            <>
              <div className="mono mb-2 mt-7">How I work with people</div>
              <Tags items={about.softSkills} />
            </>
          )}
          {!compact && (
            <>
              <div className="mono mb-2 mt-5">Languages</div>
              <Tags items={about.languages} />
            </>
          )}
          <div className="mono mb-2 mt-5">Beyond code</div>
          <Tags items={about.interests} />
          {compact && (
            <p className="mt-auto pt-[clamp(8px,2svh,20px)]">
              <Link
                href="/about"
                className="mono inline-block rounded-full border-[1.5px] border-ink bg-ink px-5 py-[clamp(6px,1.2svh,10px)] text-paper"
              >
                Full story, experience and education →
              </Link>
            </p>
          )}
        </div>
        <div className={card}>
          <div className="mono mb-[clamp(8px,2svh,20px)]">The road so far</div>
          <ol className="border-l-[1.5px] border-ink pl-6">
            {about.journey.map((j, i) => (
              <li
                key={j.year}
                className="reveal relative pb-[clamp(4px,1.5svh,20px)] last:pb-0"
              >
                <span
                  aria-hidden="true"
                  className={`absolute -left-[31px] top-1.5 size-3 rounded-full border-[1.5px] border-ink ${i === about.journey.length - 1 ? "bg-blue" : "bg-card"}`}
                />
                <span className="mono text-blue">{j.year}</span>
                <p className="text-[clamp(12px,1.8svh,16px)] leading-snug">
                  {j.event}
                  {"grad" in j && (
                    <svg
                      role="img"
                      aria-label="Graduation cap"
                      viewBox="0 0 24 24"
                      className="ml-2 inline size-6 align-[-5px] text-blue"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 9l10-5 10 5-10 5z" />
                      <path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" />
                      <path d="M22 9v6" />
                    </svg>
                  )}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {!compact && (
        <>
          <h3 className="display mb-4 mt-12 text-[clamp(32px,4vw,48px)]">
            Experience
          </h3>
          <div className="grid grid-cols-1 gap-4 min-[801px]:grid-cols-2">
            {about.experience.map((e) => (
              <div key={e.role} className={`${card} reveal`}>
                <div className="mono text-blue">{e.period}</div>
                <h4 className="mt-1 text-xl font-bold leading-tight">
                  {e.role}
                </h4>
                <p className="mono mb-3 mt-1 text-muted">{e.org}</p>
                <ul className="list-disc space-y-1.5 pl-5 text-muted marker:text-blue">
                  {e.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 min-[801px]:grid-cols-2">
            <div className={card}>
              <div className="mono mb-3">Education</div>
              <ul className="space-y-2">
                {about.education.map((e) => (
                  <li key={e.school}>
                    <b>{e.program}</b>, {e.school} · {e.period}
                  </li>
                ))}
              </ul>
            </div>
            <div className={card}>
              <div className="mono mb-3">Leadership</div>
              <ul className="list-disc space-y-1.5 pl-5 marker:text-blue">
                {about.leadership.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </Section>
  );
}
