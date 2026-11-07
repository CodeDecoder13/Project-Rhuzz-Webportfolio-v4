"use client";

import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import Image from "next/image";
import { useEffect } from "react";

// Resting state: picture 2 as a blue duotone silhouette. While the card is hovered (or tapped), picture 1 opens over it
// in full colour from the face outward. Web-sized copies of the originals in /public/assets/about.
export default function JourneyPortrait({ meet }: { meet: boolean }) {
  const reduce = useReducedMotion();
  const r = useMotionValue(0);
  const clip = useMotionTemplate`circle(${r}% at 50% 38%)`;

  useEffect(() => {
    if (reduce) r.set(meet ? 100 : 0);
    else {
      const a = animate(r, meet ? 100 : 0, {
        duration: meet ? 0.8 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      });
      return () => a.stop();
    }
  }, [meet, reduce, r]);

  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border-[1.5px] border-ink bg-ink shadow-[5px_5px_0_var(--ink)] min-[801px]:self-start">
      <Image
        src="/assets/about/picture-2-web.jpg"
        alt="Rhuzzel Paramio in a barong, shown as a blue silhouette"
        width={1200}
        height={1798}
        quality={85}
        sizes="(max-width: 800px) 90vw, 30vw"
        className="absolute inset-0 size-full scale-105 object-cover object-top grayscale contrast-125"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-blue mix-blend-multiply"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
      />
      <motion.div style={{ clipPath: clip }} className="absolute inset-0">
        <Image
          src="/assets/about/picture-1-web.jpg"
          alt="Rhuzzel Paramio in graduation toga"
          width={1200}
          height={1798}
          quality={85}
          sizes="(max-width: 800px) 90vw, 30vw"
          className="size-full object-cover object-top"
        />
      </motion.div>
      <span className="mono absolute bottom-3 left-3 rounded-full border-[1.5px] border-ink bg-white px-3 py-1 text-[10px]">
        {meet ? "Hi, I’m Rhuzzel" : "Hover to meet me"}
      </span>
    </div>
  );
}
