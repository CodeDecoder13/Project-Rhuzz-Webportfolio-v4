import Image from "next/image";
import Marquee from "./Marquee";

export default function Hero() {
  return (
    <div className="flex h-screen min-h-[600px] flex-col">
      <section
        aria-label="Introduction"
        className="relative flex min-h-0 flex-1 items-end justify-center overflow-hidden bg-[radial-gradient(55%_65%_at_52%_62%,rgba(31,95,191,.3),transparent_72%),linear-gradient(180deg,#F2F6FB_0%,#D6E5F8_60%,#B7D0F0_100%)]"
      >
        <div
          aria-hidden="true"
          className="display absolute right-[-1vw] top-[9vh] z-0 select-none bg-[linear-gradient(var(--blue)_10%,rgba(31,95,191,0)_88%)] bg-clip-text leading-[.85] text-transparent [font-size:min(44vw,620px)] max-[800px]:top-[12vh] max-[800px]:[font-size:60vw]"
        >
          RP
        </div>
        <Image
          src="/assets/rhuzz-cutout.png"
          alt="Rhuzzel Paramio in a black blazer and navy tie"
          width={696}
          height={1207}
          preload
          sizes="(max-width: 800px) 90vw, 50vw"
          className="relative z-[1] h-[92%] w-auto max-w-[90vw] object-contain object-bottom min-[801px]:max-[1100px]:ml-[24vw]"
        />
        {/* On mobile the text overlaps the photo, so it turns white; the shadow keeps it legible over the light shirt and sky. */}
        <div className="absolute bottom-[20vh] left-[max(32px,6vw)] z-[3] max-w-[min(32ch,30vw)] max-[800px]:bottom-[24vh] max-[800px]:left-4 max-[800px]:max-w-[50vw] max-[800px]:text-white max-[800px]:[text-shadow:0_2px_10px_rgba(11,27,51,.65)] min-[801px]:max-[1100px]:max-w-[27vw]">
          <h1 className="display animate-[rise_.6s_both] text-[clamp(48px,6.4vw,104px)] min-[801px]:max-[1100px]:text-[6vw]">
            Rhuzzel
            <br />
            Paramio
          </h1>
          <p className="mt-4 animate-[rise_.6s_.12s_both] text-[clamp(16px,1.35vw,20px)] font-semibold">
            I build web systems, then try to break them. Shipped with proof that they pass.
          </p>
        </div>
        <div className="absolute bottom-[8%] right-[max(32px,6vw)] z-[3] animate-[rise_.6s_.24s_both] rounded-[18px] border-[1.5px] border-ink bg-white px-6 py-4 text-[clamp(20px,2.3vw,34px)] font-semibold leading-[1.1] tracking-[-.02em] shadow-[0_12px_32px_rgba(11,27,51,.18)] max-[800px]:right-4 max-[800px]:bottom-[4%]">
          Full-stack Engineer /<br />
          QA Specialist
        </div>
      </section>
      <Marquee />
    </div>
  );
}
