"use client";

import { animate, stagger } from "motion";
import { useEffect } from "react";

const q = (name: string) => [
  ...document.querySelectorAll<HTMLElement>(`[data-a="${name}"]`),
];
const spring = { type: "spring", duration: 0.9, bounce: 0.15 } as const;

// Fade + de-blur on one clock, the slide on a spring (a spring would overshoot past opacity 1).
function fly(
  els: HTMLElement[],
  from: Record<string, (string | number)[]>,
  delay: number | ReturnType<typeof stagger>,
  physics: object = spring,
) {
  if (!els.length) return;
  animate(
    els,
    { opacity: [0, 1], filter: ["blur(8px)", "blur(0px)"] },
    { duration: 0.55, delay, ease: "easeOut" },
  );
  animate(els, from, { ...physics, delay });
}

// About hero entrance: A and B hurtle in from the left, U and T from the right, O drops from above; then the portrait rises,
// the copy arrives from the left and the stats from the right.
export default function AboutMotion() {
  useEffect(() => {
    const all = ["g", "photo", "left", "right", "tag"].flatMap(q);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      all.forEach((el) => (el.style.opacity = "1"));
      return;
    }
    const w = innerWidth * 0.55;
    q("g").forEach((el, i, a) => {
      const mid = (a.length - 1) / 2;
      const from: Record<string, (string | number)[]> =
        i === mid
          ? { y: [-innerHeight * 0.5, 0] }
          : {
              x: [(i < mid ? -w : w) * (1 - Math.abs(i - mid) * 0.15), 0],
              rotate: [i < mid ? -8 : 8, 0],
            };
      fly([el], from, 0.1 + Math.abs(i - mid) * 0.04, {
        type: "spring",
        duration: 1.1,
        bounce: 0.3,
      });
    });
    fly(q("photo"), { y: [70, 0], scale: [0.95, 1] }, 0.3, {
      type: "spring",
      duration: 1.2,
      bounce: 0,
    });
    fly(q("left"), { x: [-80, 0] }, stagger(0.09, { startDelay: 0.5 }));
    fly(q("right"), { x: [80, 0] }, stagger(0.09, { startDelay: 0.6 }));
    fly(q("tag"), { y: [-12, 0] }, 0.9);
  }, []);

  return null;
}
