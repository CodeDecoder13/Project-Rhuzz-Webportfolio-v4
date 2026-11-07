import Image from "next/image";
import Link from "next/link";
import { about } from "@/content/about";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { tracks } from "@/content/lifecycle";
import BookButton from "../BookButton";
import HowCover from "../HowCover";
import { Tags } from "../ProjectDetail";
import { Section, SectionHead, card } from "../Section";

const pill =
  "mono inline-block rounded-full border-[1.5px] border-ink px-5 py-2.5 transition-transform duration-150 ease-out active:scale-[.97]";

// 01 Selected projects: three cards linking to the case studies (same covers as the work grid).
const picks = ["omnipos", "whale-wallet", "devcollab"];
export function ProjectTeasers() {
  const list = picks
    .map((s) => projects.find((p) => p.slug === s))
    .filter((p) => p !== undefined);
  return (
    <Section>
      <div className="mb-[clamp(12px,3svh,32px)] flex flex-wrap items-end justify-between gap-4">
        <h2 data-split className="display text-[clamp(36px,6vw,80px)]">
          {"Selected projects".split(" ").map((w, i) => (
            <span
              key={i}
              className="mr-[.25em] inline-block overflow-hidden align-bottom last:mr-0"
            >
              <span data-word className="inline-block">
                {w}
              </span>
            </span>
          ))}
        </h2>
        <Link href="/projects" className={`${pill} bg-ink text-paper`}>
          View all projects →
        </Link>
      </div>
      <ul className="grid grid-cols-1 gap-5 min-[801px]:grid-cols-3">
        {list.map((p, i) => (
          <li key={p.slug} className="reveal">
            <Link
              href={`/projects/${p.slug}`}
              className="group block overflow-hidden rounded-2xl border-[1.5px] border-ink bg-card transition-[transform,box-shadow] duration-[250ms] hover:-translate-y-1 hover:shadow-[6px_6px_0_var(--ink)] focus-visible:-translate-y-1 focus-visible:shadow-[6px_6px_0_var(--ink)]"
            >
              <div className="relative aspect-[16/10] border-b-[1.5px] border-ink">
                {p.cover && (
                  <Image
                    src={p.cover}
                    alt=""
                    fill
                    quality={90}
                    sizes="(max-width: 800px) 100vw, 33vw"
                    className="object-cover object-top"
                  />
                )}
              </div>
              <div className="flex items-center gap-4 p-4">
                <b className="display text-[40px] leading-none text-blue">
                  {String(i + 1).padStart(2, "0")}
                </b>
                <div className="min-w-0 flex-1">
                  <h3 className="display truncate text-[26px] leading-none">
                    {p.title}
                  </h3>
                  <p className="mono mt-1 truncate text-muted">
                    {p.live?.replace(/^https?:\/\//, "") ?? p.category}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="text-2xl transition-transform duration-200 ease-out group-hover:translate-x-1"
                >
                  →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

const icons: Record<string, string> = {
  Discover: "M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-5-5",
  Design: "M3 4h18v6H3zM3 14h8v6H3zM15 14h6v6h-6z",
  Build: "M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14",
  "AI-assisted":
    "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z",
  Ship: "M3 12l18-9-6 18-3-7z",
  Watch:
    "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 100-6 3 3 0 000 6z",
};
const skills = [
  "Laravel",
  "Vue 3",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "PostgreSQL",
  "Selenium (C#)",
  "Playwright (C#)",
  "Jenkins",
  "n8n",
  "Google Gemini API",
  "Railway",
];

// 02 Education and skills, work process, and a quote: the reference's three-column band, in neo-brutalist cards.
export function Profile() {
  const steps = tracks.dev.steps;
  return (
    <Section>
      <div className="grid grid-cols-1 gap-5 min-[801px]:grid-cols-[1fr_1.15fr_.85fr]">
        <div className={card}>
          <h2 className="display mb-4 text-[clamp(28px,3vw,40px)]">
            Education &amp; skills
          </h2>
          <div className="mono mb-2 text-blue">Education</div>
          <ul className="space-y-3">
            {about.education.slice(0, 2).map((e) => (
              <li
                key={e.school}
                className="flex items-baseline justify-between gap-3 border-b border-line pb-3"
              >
                <span>
                  <b className="block leading-snug">{e.program}</b>
                  <span className="text-muted">{e.school}</span>
                </span>
                <span className="mono shrink-0">{e.period}</span>
              </li>
            ))}
          </ul>
          <div className="mono mb-2 mt-5 text-blue">Skills</div>
          <Tags items={skills} />
          <div className="mono mb-2 mt-5 text-blue">Languages</div>
          <Tags items={about.languages} />
        </div>

        <div className={card}>
          <h2 className="display mb-4 text-[clamp(28px,3vw,40px)]">
            Work process
          </h2>
          <ol className="relative space-y-4">
            <span
              aria-hidden="true"
              className="absolute bottom-6 left-[19px] top-6 w-px bg-ink/25"
            />
            {steps.map((s, i) => (
              <li key={s.name} className="relative flex gap-4">
                <span className="relative z-[1] grid size-10 shrink-0 place-items-center rounded-full border-[1.5px] border-ink bg-white">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="size-[18px] text-blue"
                  >
                    <path d={icons[s.name]} />
                  </svg>
                </span>
                <div>
                  <h3 className="mono">
                    <span className="text-blue">
                      {String(i + 1).padStart(2, "0")}
                    </span>{" "}
                    · {s.name}
                  </h3>
                  <p className="text-[15px] leading-snug text-muted">
                    {s.text.split(/(?<=\.)\s/)[0]}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <figure className="reveal flex flex-col justify-between rounded-[14px] border-[1.5px] border-ink bg-blue p-[clamp(16px,3svh,32px)] text-white shadow-[6px_6px_0_var(--ink)]">
          <span
            aria-hidden="true"
            className="display text-[96px] leading-[.6] text-sky"
          >
            &ldquo;
          </span>
          <blockquote className="display text-[clamp(30px,3.4vw,46px)] leading-[1.02]">
            If it can&rsquo;t be tested, it isn&rsquo;t done.
          </blockquote>
          <figcaption className="mt-8">
            <p className="display text-[44px] leading-none text-sky">Rhuzzel</p>
            <p className="mono mt-3">
              Let&rsquo;s build something that holds up.
            </p>
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}

// 03 Experience: the same role cards, now with a section head.
export function Experience() {
  return (
    <Section>
      <SectionHead title="Experience" />
      <div className="grid grid-cols-1 gap-5 min-[801px]:grid-cols-2">
        {about.experience.map((e) => (
          <div key={e.role} className={card}>
            <div className="mono text-blue">{e.period}</div>
            <h3 className="mt-1 text-xl font-bold leading-tight">{e.role}</h3>
            <p className="mono mb-3 mt-1 text-muted">{e.org}</p>
            <ul className="list-disc space-y-1.5 pl-5 text-muted marker:text-blue">
              {e.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 min-[801px]:grid-cols-2">
        <div className={card}>
          <div className="mono mb-3 text-blue">Leadership</div>
          <ul className="list-disc space-y-1.5 pl-5 marker:text-blue">
            {about.leadership.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>
        <div className={card}>
          <div className="mono mb-3 text-blue">The road so far</div>
          <ol className="space-y-2">
            {about.journey.map((j) => (
              <li key={j.year} className="flex gap-4">
                <span className="mono w-10 shrink-0 pt-0.5 text-blue">
                  {j.year}
                </span>
                <span className="leading-snug">{j.event}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}

const contact = [
  ["Email", site.email, `mailto:${site.email}`, "M3 6h18v12H3zM3 7l9 6 9-6"],
  [
    "GitHub",
    "github.com/CodeDecoder13",
    site.github,
    "M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14",
  ],
  [
    "LinkedIn",
    "linkedin.com/in/rhuzz",
    site.linkedin,
    "M4 4h16v16H4zM8 10v7M8 7v.01M12 17v-7M12 13c0-3 5-3 5 0v4",
  ],
  [
    "Based in",
    `${site.location} · replies in ${site.replyTime}`,
    undefined,
    "M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12zM12 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
  ],
] as const;

// 04 Let's work together: contact rows, the book/message actions, and the developer at his laptop.
export function AboutContact() {
  return (
    <Section className="bg-sky">
      <div className="grid grid-cols-1 items-center gap-10 min-[801px]:grid-cols-[1fr_1fr_.9fr]">
        <div className="reveal">
          <h2 className="display text-[clamp(44px,6vw,88px)]">
            Let&rsquo;s work
            <br />
            <span className="mt-1 inline-block rounded-xl bg-ink px-3 pb-1 text-paper">
              together
            </span>
          </h2>
          <p className="mt-4 max-w-[34ch] text-lg">
            I&rsquo;m open to new projects, roles and collaborations. Tell me
            what you&rsquo;re building.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className={`${pill} bg-ink text-paper`}>
              Message
            </Link>
            <span id="about-book-tip" className="sr-only">
              Schedule a 1:1 call on Calendly
            </span>
            <BookButton
              url={site.calendly}
              describedBy="about-book-tip"
              className={`${pill} bg-white text-ink`}
            />
          </div>
        </div>
        <ul className="reveal">
          {contact.map(([k, v, href, d]) => {
            const row = (
              <>
                <span className="grid size-11 shrink-0 place-items-center rounded-full border-[1.5px] border-ink bg-white">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="size-5"
                  >
                    <path d={d} />
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="mono block text-ink">{k}</span>
                  <span className="block truncate font-semibold">{v}</span>
                </span>
              </>
            );
            return (
              <li key={k} className="border-b border-ink/30 py-3 first:pt-0">
                {href ? (
                  <a
                    href={href}
                    className="flex items-center gap-4 transition-transform duration-150 ease-out hover:translate-x-1"
                  >
                    {row}
                  </a>
                ) : (
                  <div className="flex items-center gap-4">{row}</div>
                )}
              </li>
            );
          })}
        </ul>
        <div className="reveal rounded-[14px] border-[1.5px] border-ink bg-[#E4EEFB] p-4 shadow-[6px_6px_0_var(--ink)]">
          <HowCover />
        </div>
      </div>
    </Section>
  );
}
