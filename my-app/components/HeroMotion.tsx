"use client";

import { animate, stagger } from "motion";
import { useEffect } from "react";

export const ENTER_EVENT = "rhuzz:enter";

const q = (name: string) => [
  ...document.querySelectorAll<HTMLElement>(`[data-h="${name}"]`),
];
const spring = { type: "spring", duration: 0.9, bounce: 0.15 } as const;
const soft = { type: "spring", duration: 1.2, bounce: 0 } as const;
const crash = { type: "spring", duration: 1.1, bounce: 0.3 } as const; // overshoots, so the letters meet, rebound and settle

// Slide in on a spring while the opacity and blur settle on their own clock (a spring would overshoot past opacity 1).
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

// Hero choreography: R and P hurtle in from opposite edges and collide behind the portrait, the copy comes from the left,
// the role card from the right. It starts as the intro gate dissolves (or at once for returning visitors).
export default function HeroMotion() {
  useEffect(() => {
    const all = q("r").concat(
      q("p"),
      q("photo"),
      q("left"),
      q("right"),
      q("up"),
    );
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      all.forEach((el) => (el.style.opacity = "1"));
      return;
    }
    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      fly(q("r"), { x: [-innerWidth * 0.6, 0], rotate: [-10, 0] }, 0.1, crash);
      fly(q("p"), { x: [innerWidth * 0.6, 0], rotate: [10, 0] }, 0.1, crash);
      // the impact: the whole monogram squeezes as the two letters meet
      const ghost = document.querySelector<HTMLElement>("[data-ghost]");
      if (ghost)
        animate(
          ghost,
          { scale: [1, 1.035, 1] },
          { duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] },
        );
      fly(q("photo"), { y: [70, 0], scale: [0.95, 1] }, 0.25, soft);
      fly(q("left"), { x: [-90, 0] }, stagger(0.09, { startDelay: 0.45 }));
      fly(q("right"), { x: [90, 0], rotate: [3, 0] }, 0.6);
      fly(q("up"), { y: [40, 0] }, 0.8);
    };
    let seen = false;
    try {
      seen = sessionStorage.getItem("gate") === "1";
    } catch {}
    if (seen) play();
    window.addEventListener(ENTER_EVENT, play);
    return () => window.removeEventListener(ENTER_EVENT, play);
  }, []);

  return null;
}
