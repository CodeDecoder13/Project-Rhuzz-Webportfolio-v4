import Image from "next/image";
import { Section } from "./Section";

const icon = "size-9 shrink-0 text-sky";
const stats = [
  {
    title: "QA + Dev",
    text: "Two disciplines, one workflow",
    svg: <path d="M4 20V12M10 20V6M16 20v-9M22 20V3" />,
  },
  {
    title: "Vue · Laravel · Next.js",
    text: "Full-stack builds, tested end to end",
    svg: <path d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5M3 17.5l9 5 9-5" />,
  },
  {
    title: "Philippines",
    text: "Replies within 24-48 hours",
    svg: (
      <path d="M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12zM12 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
    ),
  },
];

// Annotation labels; each line runs into the portrait. Hidden on mobile where there's no room.
const left = [
  { text: "Test automation", top: "30%", reach: 62 },
  { text: "CI/CD pipelines", top: "72%", reach: 87 },
];
const right = [
  { text: "Full-stack builds", top: "24%", reach: 126 },
  { text: "Bug reports & proof", top: "62%", reach: 76 },
];

const dot = (
  <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-ink" />
);

export default function Manifesto() {
  return (
    <Section className="bg-[#E4EEFB] bg-[linear-gradient(rgba(11,27,51,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(11,27,51,.05)_1px,transparent_1px)] bg-[size:48px_48px]">
      <p className="mono mb-5">
        <span className="text-blue">02</span> / Behind the work
      </p>
      <h2 className="display mb-12 text-[clamp(44px,8.5vw,128px)] leading-[.95]">
        I don&rsquo;t just ship it.
        <br />
        <span className="text-blue">I prove it works.</span>
      </h2>
      <div className="grid grid-cols-1 gap-10 min-[801px]:grid-cols-[minmax(0,.8fr)_1.2fr]">
        <div className="max-w-[46ch] text-lg">
          <p>
            I&rsquo;m{" "}
            <span className="font-semibold text-blue">Rhuzzel Paramio</span>, a
            full-stack engineer and QA specialist building web systems that hold
            up after launch.
          </p>
          <p className="mt-5">I work where development and testing meet.</p>
          <p className="mt-5">
            That means I&rsquo;m not here to ship features and hope.
          </p>
          <p className="mt-5">
            I think about the requirement.
            <br />
            The user.
            <br />
            The edge case.
            <br />
            The failure.
            <br />
            The fix.
          </p>
          <p className="mt-5">
            Then I build around what actually needs to happen. Whether
            it&rsquo;s a Vue and Laravel app or a Next.js site, the rule stays
            the same:
          </p>
          <p className="mt-5 text-2xl font-bold leading-tight">
            If it can&rsquo;t be tested, it isn&rsquo;t done.
          </p>
          <ul className="mt-8 divide-y divide-white/20 rounded-2xl border-[1.5px] border-ink bg-ink px-5 text-paper shadow-[6px_6px_0_var(--blue)]">
            {stats.map((s) => (
              <li key={s.title} className="flex items-center gap-4 py-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className={icon}
                >
                  {s.svg}
                </svg>
                <div>
                  <b className="display block text-[22px] leading-none">
                    {s.title}
                  </b>
                  <span className="mono text-[#9FB4D1]">{s.text}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative flex h-[560px] items-end justify-center min-[801px]:h-[820px]">
          <div
            aria-hidden="true"
            className="display absolute inset-x-0 top-0 select-none bg-[linear-gradient(rgba(31,95,191,.3),rgba(31,95,191,0)_85%)] bg-clip-text text-center text-[clamp(72px,13vw,190px)] leading-[.85] text-transparent"
          >
            Tested.
          </div>
          <div className="relative hidden h-full flex-1 min-[801px]:block">
            {left.map((t) => (
              <div
                key={t.text}
                style={{ top: t.top }}
                className="mono absolute inset-x-0 z-[2] flex items-center gap-3"
              >
                <span className="shrink-0">{t.text}</span>
                <span
                  aria-hidden="true"
                  style={{ marginRight: -t.reach }}
                  className="h-px flex-1 bg-ink"
                />
                {dot}
              </div>
            ))}
          </div>
          <Image
            src="/assets/portrait-crop.png"
            alt="Rhuzzel Paramio"
            width={690}
            height={1452}
            sizes="(max-width: 800px) 90vw, 400px"
            className="relative z-[1] h-full w-auto max-w-[90vw] shrink-0 object-contain object-bottom grayscale"
          />
          <div className="relative hidden h-full flex-1 min-[801px]:block">
            {right.map((t) => (
              <div
                key={t.text}
                style={{ top: t.top }}
                className="mono absolute inset-x-0 z-[2] flex items-center gap-3"
              >
                {dot}
                <span
                  aria-hidden="true"
                  style={{ marginLeft: -t.reach }}
                  className="h-px flex-1 bg-ink"
                />
                <span className="shrink-0">{t.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
