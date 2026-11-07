import Image from "next/image";
import CountUp from "../CountUp";
import { projects } from "@/content/projects";
import { certs } from "@/content/certs";
import AboutMotion from "./AboutMotion";

// Placeholder: the home-page cut-out until the owner supplies an about-page portrait.
export const aboutPhoto = "/assets/rhuzz-cutout.png";

const ghost =
  "bg-[linear-gradient(var(--blue)_10%,rgba(31,95,191,0)_88%)] bg-clip-text text-transparent";
const stats: { n: number; label: string; plus?: boolean }[] = [
  { n: 3, label: "Years building", plus: true },
  { n: projects.length, label: "Projects live" },
  { n: certs.length, label: "Certifications" },
];

// One-screen hero in the home page's language: a giant ghost word behind the cut-out, copy left, stats right.
export default function AboutHero() {
  return (
    <section
      aria-label="About Rhuzzel"
      className="relative flex min-h-svh flex-col overflow-hidden bg-[radial-gradient(55%_65%_at_52%_62%,rgba(31,95,191,.3),transparent_72%),linear-gradient(180deg,#F2F6FB_0%,#D6E5F8_60%,#B7D0F0_100%)]"
    >
      <noscript>
        <style>{"[data-a]{opacity:1!important}"}</style>
      </noscript>
      <div
        data-a="tag"
        className="mono absolute right-[max(16px,5vw)] top-24 z-[3] flex items-center gap-2 rounded-full border-[1.5px] border-ink bg-white px-3.5 py-1.5"
      >
        <span aria-hidden="true" className="size-2 rounded-full bg-blue" />
        Open to opportunities
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-end max-[800px]:pt-28">
        <div
          aria-hidden="true"
          className="display pointer-events-none absolute inset-x-0 top-[12svh] z-0 flex select-none justify-center leading-[.85] [font-size:min(32vw,40svh)] max-[800px]:top-[14svh] max-[800px]:[font-size:34vw]"
        >
          {"ABOUT".split("").map((l, i) => (
            <span key={i} data-a="g" className={`inline-block ${ghost}`}>
              {l}
            </span>
          ))}
        </div>

        <Image
          data-a="photo"
          src={aboutPhoto}
          alt="Rhuzzel Paramio in a black blazer and navy tie"
          width={696}
          height={1207}
          preload
          sizes="(max-width: 800px) 80vw, 45vw"
          className="relative z-[1] h-[84svh] w-auto max-w-[88vw] object-contain object-bottom max-[800px]:h-[46svh]"
        />

        <div className="absolute bottom-[14svh] left-[max(32px,5vw)] z-[3] max-w-[min(34ch,30vw)] max-[800px]:static max-[800px]:mt-6 max-[800px]:max-w-none max-[800px]:px-4 max-[800px]:pb-6 max-[800px]:text-center">
          <p data-a="left" className="mono text-ink">
            hello, i&rsquo;m
          </p>
          <h1
            data-a="left"
            className="display text-[clamp(44px,min(6.2vw,10.5svh),104px)]"
          >
            Rhuzzel
            <br />
            Paramio
          </h1>
          <p data-a="left" className="mono mt-3 text-ink">
            Full-stack · QA · AI Engineer
          </p>
          <p
            data-a="left"
            className="mt-2 text-[clamp(14px,1.9svh,18px)] font-medium"
          >
            I build web systems, test them like someone who didn&rsquo;t write
            them, and add AI where it earns its place.
          </p>
          <p
            data-a="left"
            className="mono mt-4 inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink bg-white px-3.5 py-1.5"
          >
            <span aria-hidden="true" className="size-2 rounded-full bg-blue" />
            Metro Manila · working worldwide
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
                <CountUp value={s.n} />
                {s.plus && "+"}
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
