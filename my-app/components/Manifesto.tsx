import Image from "next/image";
import { Section } from "./Section";

const stats = [
  {
    title: "QA + Dev",
    text: "Two disciplines, one workflow",
    svg: <path d="M4 20V12M10 20V6M16 20v-9M22 20V3" />,
  },
  {
    title: "Vue · Laravel · Next.js",
    text: "Full-stack, tested end to end",
    svg: <path d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5M3 17.5l9 5 9-5" />,
  },
  {
    title: "Philippines",
    text: "Replies in 24-48 hours",
    svg: (
      <path d="M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12zM12 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
    ),
  },
];

const facts = [
  [
    "Now",
    "Junior IT Architect at Prisma International. Websites, internal tools and n8n automation for global clients.",
  ],
  [
    "Shipped",
    "OmniPOS (30% faster checkout), Whale Wallet (Gemini receipt reader) and AirZen (ESP32 sensors to a Laravel API).",
  ],
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

// Sized to fit one screen on desktop, so the whole section reveals together and nothing scrolls past mid-animation.
export default function Manifesto() {
  return (
    <Section className="bg-tint bg-[linear-gradient(var(--grid)_1px,transparent_1px),linear-gradient(90deg,var(--grid)_1px,transparent_1px)] bg-[size:48px_48px] min-[801px]:flex min-[801px]:min-h-svh min-[801px]:flex-col min-[801px]:justify-center min-[801px]:!pb-8 min-[801px]:!pt-24">
      <p className="mono mb-3">
        <span className="text-blue">02</span> / Behind the work
      </p>
      <h2
        data-split
        className="display mb-6 text-[clamp(40px,min(6.4vw,7.5svh),104px)] leading-[.95] min-[801px]:mb-8"
      >
        {["I don’t just ship it.", "I prove it works."].map((line, li) => (
          <span key={li} className={`block ${li ? "text-blue" : ""}`}>
            {line.split(" ").map((w, i) => (
              <span
                key={i}
                className="mr-[.25em] inline-block overflow-hidden align-bottom last:mr-0"
              >
                <span data-word className="inline-block">
                  {w}
                </span>
              </span>
            ))}
          </span>
        ))}
      </h2>
      <div className="grid grid-cols-1 gap-8 min-[801px]:grid-cols-[minmax(0,.85fr)_1.15fr]">
        <div className="reveal flex max-w-[48ch] flex-col text-[clamp(14px,1.9svh,17px)] leading-[1.5] min-[801px]:justify-between">
          <div>
            <p>
              I&rsquo;m{" "}
              <span className="font-semibold text-blue">Rhuzzel Paramio</span>,
              a full-stack engineer and QA specialist building web systems that
              hold up after launch.
            </p>
            <p className="mt-3">
              I work where development and testing meet, so I&rsquo;m not here
              to ship features and hope.
            </p>
            <p className="mt-3">
              I think about the requirement, the user, the edge case, the
              failure, and the fix. Then I build around what actually needs to
              happen. Vue and Laravel or Next.js, the rule stays the same:
            </p>
            <p className="mt-3 text-[clamp(18px,2.7svh,24px)] font-bold leading-tight">
              If it can&rsquo;t be tested, it isn&rsquo;t done.
            </p>
          </div>
          <dl className="mt-4 space-y-2 border-t border-ink/20 pt-3 text-[clamp(12px,1.6svh,14px)] leading-snug">
            {facts.map(([k, v]) => (
              <div key={k} className="flex gap-3">
                <dt className="mono w-16 shrink-0 pt-0.5 text-blue">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <ul className="mt-4 grid grid-cols-1 divide-y island-light divide-white/20 rounded-2xl border-[1.5px] border-ink bg-ink px-4 text-paper shadow-[6px_6px_0_var(--blue)]">
            {stats.map((s) => (
              <li key={s.title} className="flex items-center gap-3 py-2">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="size-7 shrink-0 text-sky"
                >
                  {s.svg}
                </svg>
                <div>
                  <b className="display block text-[18px] leading-none">
                    {s.title}
                  </b>
                  <span className="mono text-[10px] text-[#9FB4D1]">
                    {s.text}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="reveal relative flex h-[520px] flex-col min-[801px]:h-[clamp(380px,calc(100svh-390px),760px)]">
          {/* ponytail: the word sits in flow above the portrait (head overlaps only its faded foot) so it stays readable and the labels keep their % anchors inside the row below */}
          <div
            aria-hidden="true"
            className="display relative -mb-[.3em] shrink-0 select-none bg-[linear-gradient(rgba(31,95,191,.55),rgba(31,95,191,.1)_90%)] bg-clip-text text-center text-[clamp(80px,min(14vw,21svh),230px)] leading-[.85] text-transparent"
          >
            Tested.
          </div>
          <div className="relative z-[1] flex min-h-0 flex-1 items-end justify-center">
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
      </div>
    </Section>
  );
}
