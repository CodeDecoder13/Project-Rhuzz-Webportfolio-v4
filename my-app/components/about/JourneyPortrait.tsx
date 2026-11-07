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

// The card's background, the whole photo (not cropped) pinned to the right edge at full card height. At rest: picture 2 as a faint blue silhouette on the right edge. While the card is hovered
// (or tapped), picture 1 opens over it in full colour from the face outward. Both fade into the card on the text side.
// Web-sized copies of the originals in /public/assets/about.
export default function JourneyPortrait({ meet }: { meet: boolean }) {
  const reduce = useReducedMotion();
  const r = useMotionValue(0);
  const clip = useMotionTemplate`circle(${r}% at 55% 32%)`;

  useEffect(() => {
    if (reduce) r.set(meet ? 100 : 0);
    else {
      const a = animate(r, meet ? 100 : 0, {
        duration: meet ? 0.9 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      });
      return () => a.stop();
    }
  }, [meet, reduce, r]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 aspect-[2/3] h-full [mask-image:linear-gradient(to_left,#000_62%,transparent_100%)] max-[800px]:aspect-auto max-[800px]:w-full max-[800px]:opacity-30"
    >
      <Image
        src="/assets/about/picture-2-web.jpg"
        alt=""
        width={1200}
        height={1798}
        quality={85}
        sizes="(max-width: 800px) 100vw, 40vw"
        className="absolute inset-0 size-full object-cover grayscale contrast-125"
      />
      <div className="absolute inset-0 bg-blue mix-blend-multiply" />
      <div className="absolute inset-0 bg-white/45" />
      <motion.div style={{ clipPath: clip }} className="absolute inset-0">
        <Image
          src="/assets/about/picture-1-web.jpg"
          alt=""
          width={1200}
          height={1798}
          quality={85}
          sizes="(max-width: 800px) 100vw, 40vw"
          className="size-full object-cover"
        />
      </motion.div>
    </div>
  );
}
