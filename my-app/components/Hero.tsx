import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import BookButton from "./BookButton";
import HeroMotion from "./HeroMotion";
import Marquee from "./Marquee";

export default function Hero() {
  return (
    <div className="flex h-screen min-h-[600px] flex-col">
      <section
        aria-label="Introduction"
        className="relative flex min-h-0 flex-1 items-end justify-center overflow-hidden bg-[radial-gradient(55%_65%_at_52%_62%,var(--glow),transparent_72%),linear-gradient(180deg,var(--hero-a)_0%,var(--hero-b)_60%,var(--hero-c)_100%)]"
      >
        <div
          aria-hidden="true"
          data-ghost
          className="display absolute right-[-1vw] top-[9vh] z-0 flex select-none leading-[.85] [font-size:min(44vw,620px)] max-[800px]:top-[12vh] max-[800px]:[font-size:60vw]"
        >
          <span
            data-h="r"
            className="inline-block bg-[linear-gradient(var(--blue)_10%,rgba(31,95,191,0)_88%)] bg-clip-text text-transparent"
          >
            R
          </span>
          <span
            data-h="p"
            className="inline-block bg-[linear-gradient(var(--blue)_10%,rgba(31,95,191,0)_88%)] bg-clip-text text-transparent"
          >
            P
          </span>
        </div>
        <Image
          src="/assets/rhuzz-cutout.png"
          alt="Rhuzzel Paramio in a black blazer and navy tie"
          width={696}
          height={1207}
          preload
          sizes="(max-width: 800px) 90vw, 50vw"
          data-h="photo"
          className="relative z-[1] h-[92%] w-auto max-w-[90vw] object-contain object-bottom min-[801px]:max-[1100px]:ml-[24vw]"
        />
        {/* On mobile the text overlaps the photo, so it turns white; the shadow keeps it legible over the light shirt and sky. */}
        <div className="absolute bottom-[20vh] left-[max(32px,6vw)] z-[3] max-w-[min(32ch,30vw)] max-[800px]:bottom-[24vh] max-[800px]:left-4 max-[800px]:max-w-[50vw] max-[800px]:text-white max-[800px]:[text-shadow:0_2px_10px_rgba(11,27,51,.65)] min-[801px]:max-[1100px]:max-w-[27vw]">
          <h1
            data-h="left"
            className="display text-[clamp(48px,6.4vw,104px)] min-[801px]:max-[1100px]:text-[6vw]"
          >
            Rhuzzel
            <br />
            Paramio
          </h1>
          <p
            data-h="left"
            className="mt-4 text-[clamp(16px,1.35vw,20px)] font-semibold"
          >
            I build web systems, then try to break them. Shipped with proof that
            they pass.
          </p>
          <div data-h="left" className="mt-5 flex flex-wrap gap-2.5">
            <Link
              href="/contact"
              className="rounded-full border-[1.5px] border-ink bg-ink px-5 py-2.5 font-mono text-xs uppercase tracking-[.06em] text-paper max-[800px]:[text-shadow:none]"
            >
              Message
            </Link>
            <span className="group relative">
              <BookButton
                url={site.calendly}
                describedBy="book-tip"
                className="block rounded-full border-[1.5px] border-ink bg-card px-5 py-2.5 font-mono text-xs uppercase tracking-[.06em] text-ink max-[800px]:[text-shadow:none]"
              />
              <span
                id="book-tip"
                role="tooltip"
                className="pointer-events-none absolute bottom-full left-0 z-10 mb-2 w-60 translate-y-1 rounded-[12px] border-[1.5px] border-ink bg-ink px-3.5 py-2.5 text-sm font-medium leading-snug text-paper opacity-0 transition-[opacity,transform] duration-150 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 max-[800px]:[text-shadow:none]"
              >
                Want to collaborate, or schedule a 1:1? Pick a time that works
                for you.
              </span>
            </span>
          </div>
        </div>
        <div
          data-h="right"
          className="absolute bottom-[8%] right-[max(32px,6vw)] z-[3] rounded-[18px] border-[1.5px] border-ink bg-card px-6 py-4 text-[clamp(20px,2.3vw,34px)] font-semibold leading-[1.1] tracking-[-.02em] shadow-[0_12px_32px_rgba(11,27,51,.18)] max-[800px]:right-4 max-[800px]:bottom-[4%]"
        >
          Full-stack Engineer /<br />
          QA Specialist /<br />
          AI Engineer
        </div>
      </section>
      <div data-h="up">
        <Marquee />
      </div>
      <HeroMotion />
    </div>
  );
}
