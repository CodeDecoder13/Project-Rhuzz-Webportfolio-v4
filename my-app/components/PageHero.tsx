import Image from "next/image";
import type { CSSProperties } from "react";
import AboutMotion from "./about/AboutMotion";
import CountUp from "./CountUp";

const ghost =
  "bg-[linear-gradient(var(--blue)_10%,rgba(31,95,191,0)_88%)] bg-clip-text text-transparent";

export type HeroStat = {
  value: number | string;
  label: string;
  plus?: boolean;
};

// One-screen page hero in the home page's language: a giant ghost word behind the cut-out, copy left, stats right.
// Each page passes its own word, photo, copy and stats; AboutMotion flies the [data-a] pieces in.
export default function PageHero({
  label,
  word,
  photo,
  tag,
  eyebrow,
  title,
  kicker,
  blurb,
  pill,
  stats,
}: {
  label: string;
  word: string;
  photo: { src: string; w: number; h: number; alt: string };
  tag?: string;
  eyebrow: string;
  title: [string, string];
  kicker: string;
  blurb: string;
  pill: string;
  stats: HeroStat[];
}) {
  // ghost word width scales with its letter count so long words still fit the screen
  const size = {
    "--wd": `${Math.min(32, 165 / word.length)}vw`,
    "--wm": `${Math.min(34, 170 / word.length)}vw`,
  } as CSSProperties;
  return (
    <section
      aria-label={label}
      className="relative flex min-h-svh flex-col overflow-hidden bg-[radial-gradient(55%_65%_at_52%_62%,var(--glow),transparent_72%),linear-gradient(180deg,var(--hero-a)_0%,var(--hero-b)_60%,var(--hero-c)_100%)]"
    >
      <noscript>
        <style>{"[data-a]{opacity:1!important}"}</style>
      </noscript>
      {tag && (
        <div
          data-a="tag"
          className="mono absolute right-[max(16px,5vw)] top-24 z-[3] flex items-center gap-2 rounded-full border-[1.5px] border-ink bg-card px-3.5 py-1.5 max-[800px]:left-4 max-[800px]:right-auto max-[800px]:top-[74px]"
        >
          <span aria-hidden="true" className="size-2 rounded-full bg-blue" />
          {tag}
        </div>
      )}

      <div className="relative flex flex-1 flex-col items-center justify-end max-[800px]:pt-28">
        <div
          aria-hidden="true"
          style={size}
          className="display pointer-events-none absolute inset-x-0 top-[12svh] z-0 flex select-none justify-center leading-[.85] [font-size:min(var(--wd),40svh)] max-[800px]:top-[14svh] max-[800px]:[font-size:var(--wm)]"
        >
          {word.split("").map((l, i) => (
            <span key={i} data-a="g" className={`inline-block ${ghost}`}>
              {l}
            </span>
          ))}
        </div>

        <Image
          data-a="photo"
          src={photo.src}
          alt={photo.alt}
          width={photo.w}
          height={photo.h}
          preload
          quality={90}
          sizes="(max-width: 800px) 80vw, 45vw"
          className="relative z-[1] h-[84svh] w-auto max-w-[88vw] object-contain object-bottom max-[800px]:h-[46svh]"
        />

        <div className="absolute bottom-[14svh] left-[max(32px,5vw)] z-[3] max-w-[min(34ch,30vw)] max-[800px]:static max-[800px]:mt-6 max-[800px]:max-w-none max-[800px]:px-4 max-[800px]:pb-6 max-[800px]:text-center">
          <p data-a="left" className="mono text-ink">
            {eyebrow}
          </p>
          <h1
            data-a="left"
            className="display text-[clamp(44px,min(6.2vw,10.5svh),104px)]"
          >
            {title[0]}
            <br />
            {title[1]}
          </h1>
          <p data-a="left" className="mono mt-3 text-ink">
            {kicker}
          </p>
          <p
            data-a="left"
            className="mt-2 text-[clamp(14px,1.9svh,18px)] font-medium"
          >
            {blurb}
          </p>
          <p
            data-a="left"
            className="mono mt-4 inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink bg-card px-3.5 py-1.5"
          >
            <span aria-hidden="true" className="size-2 rounded-full bg-blue" />
            {pill}
          </p>
        </div>

        <dl className="absolute bottom-[14svh] right-[max(32px,5vw)] z-[3] w-[min(230px,20vw)] max-[800px]:static max-[800px]:mb-8 max-[800px]:grid max-[800px]:w-full max-[800px]:grid-cols-3 max-[800px]:gap-2 max-[800px]:px-4">
          {stats.map((s) => (
            <div
              key={s.label}
              data-a="right"
              className="border-t-[1.5px] border-ink py-[clamp(6px,1.6svh,16px)]"
            >
              <dd className="display text-[clamp(34px,6svh,56px)] leading-none text-blue">
                {typeof s.value === "number" ? (
                  <>
                    <CountUp value={s.value} />
                    {s.plus && "+"}
                  </>
                ) : (
                  s.value
                )}
              </dd>
              <dt className="mono mt-1 text-ink">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
      <AboutMotion />
    </section>
  );
}
