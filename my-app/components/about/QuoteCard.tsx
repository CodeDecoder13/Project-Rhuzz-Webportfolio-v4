"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useSpring,
  type Variants,
} from "motion/react";
import { useState } from "react";

const quotes = [
  "If it can’t be tested, it isn’t done.",
  "Fix the cause, not the symptom.",
  "Ship it. Break it. Prove it passes.",
  "“Works on my machine” closes nothing.",
];
const parent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
  exit: { opacity: 0, transition: { duration: 0.12 } },
};
const word: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { type: "spring", duration: 0.6, bounce: 0.1 } },
};

// Tilts toward the cursor on a spring (decorative, mouse only); the button cycles the principles.
export default function QuoteCard() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const rx = useSpring(0, { stiffness: 140, damping: 16 });
  const ry = useSpring(0, { stiffness: 140, damping: 16 });

  return (
    <motion.figure
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      className="island-light flex w-full flex-col justify-between rounded-[14px] border-[1.5px] border-ink bg-blue p-[clamp(16px,3svh,32px)] text-white shadow-[6px_6px_0_var(--ink)]"
    >
      <span
        aria-hidden="true"
        className="display text-[96px] leading-[.6] text-sky"
      >
        &ldquo;
      </span>
      <blockquote
        aria-live="polite"
        className="display min-h-[3.1em] text-[clamp(30px,3.4vw,46px)] leading-[1.02]"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={i}
            variants={parent}
            initial={reduce ? false : "hidden"}
            animate="show"
            exit="exit"
            className="block"
          >
            {quotes[i].split(" ").map((w, k) => (
              <span
                key={k}
                className="mr-[.25em] inline-block overflow-hidden align-bottom"
              >
                <motion.span variants={word} className="inline-block">
                  {w}
                </motion.span>
              </span>
            ))}
          </motion.span>
        </AnimatePresence>
      </blockquote>
      <figcaption className="mt-8 flex items-end justify-between gap-3">
        <span>
          <span className="display block text-[44px] leading-none text-sky">
            Rhuzzel
          </span>
          <span className="mono mt-3 block">
            Let&rsquo;s build something that holds up.
          </span>
        </span>
        <button
          type="button"
          onClick={() => setI((i + 1) % quotes.length)}
          className="mono shrink-0 rounded-full border-[1.5px] border-white px-3.5 py-2 transition-[background-color,color,transform] duration-150 ease-out hover:bg-card hover:text-blue active:scale-[.97]"
        >
          Next ›
        </button>
      </figcaption>
    </motion.figure>
  );
}
