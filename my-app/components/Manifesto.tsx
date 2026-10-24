import Image from "next/image";
import { Section } from "./Section";

// TODO(owner): drop a transparent cut-out at public/assets/behind-cutout.png, then set this to its path.
const photo: string | undefined = undefined;

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

// Annotation labels around the photo; hidden on mobile where there's no room.
const tags = [
  { text: "Test automation", cls: "left-0 top-[34%]", line: "order-last" },
  { text: "Full-stack builds", cls: "right-0 top-[26%]", line: "" },
  {
    text: "CI/CD pipelines",
    cls: "left-[4%] bottom-[22%]",
    line: "order-last",
  },
  { text: "Bug reports & proof", cls: "right-0 bottom-[16%]", line: "" },
];

export default function Manifesto() {
  return (
    <Section className="bg-ink text-paper">
      <p className="mono mb-5">
        <span className="text-sky">02</span> / Behind the work
      </p>
      <h2 className="display mb-12 text-[clamp(44px,8.5vw,128px)] leading-[.95]">
        I don&rsquo;t just ship it.
        <br />
        <span className="text-sky">I prove it works.</span>
      </h2>
      <div className="grid grid-cols-1 gap-10 min-[801px]:grid-cols-[minmax(0,.9fr)_1.1fr]">
        <div className="max-w-[46ch] text-lg">
          <p>
            I&rsquo;m <span className="text-sky">Rhuzzel Paramio</span>, a
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
          <ul className="mt-8 divide-y divide-white/20 rounded-2xl border border-white/25 bg-white/5 px-5">
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
        <div className="relative min-h-[420px] min-[801px]:min-h-[640px]">
          <div
            aria-hidden="true"
            className="display absolute inset-x-0 top-0 select-none bg-[linear-gradient(rgba(242,246,251,.28),rgba(242,246,251,0)_85%)] bg-clip-text text-center text-[clamp(72px,13vw,190px)] leading-[.85] text-transparent"
          >
            Tested.
          </div>
          {photo ? (
            <Image
              src={photo}
              alt="Rhuzzel Paramio"
              fill
              sizes="(max-width: 800px) 100vw, 50vw"
              className="object-contain object-bottom"
            />
          ) : (
            <div className="absolute inset-x-[12%] bottom-0 top-[22%] grid place-items-center rounded-t-[40%] border-[1.5px] border-dashed border-white/40 text-center">
              <span className="mono px-6 text-[#9FB4D1]">
                Photo placeholder
              </span>
            </div>
          )}
          {tags.map((t) => (
            <div
              key={t.text}
              className={`mono absolute hidden items-center gap-3 min-[801px]:flex ${t.cls}`}
            >
              <span>{t.text}</span>
              <span
                aria-hidden="true"
                className={`h-px w-14 bg-paper ${t.line}`}
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
