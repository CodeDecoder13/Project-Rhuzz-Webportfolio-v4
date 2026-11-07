"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { useRef, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

// The line fills as you scroll and lights each step in turn; tap or hover a step to see what it delivers.
export default function ProcessList({
  steps,
  icons,
}: {
  steps: { name: string; text: string; output?: string }[];
  icons: Record<string, string>;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  const [lit, setLit] = useState(reduce ? steps.length : 0);
  const [open, setOpen] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 55%"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.4,
  });
  useMotionValueEvent(
    scrollYProgress,
    "change",
    (v) => !reduce && setLit(Math.round(v * steps.length)),
  );

  return (
    <ol ref={ref} className="relative space-y-3">
      <span
        aria-hidden="true"
        className="absolute bottom-6 left-[19px] top-6 w-0.5 bg-ink/15"
      />
      <motion.span
        aria-hidden="true"
        style={{ scaleY: reduce ? 1 : fill }}
        className="absolute bottom-6 left-[19px] top-6 w-0.5 origin-top bg-blue"
      />
      {steps.map((s, i) => {
        const on = i < lit || open === i;
        return (
          <li
            key={s.name}
            className="relative"
            onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(i)}
            onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(null)}
          >
            <button
              type="button"
              aria-expanded={open === i}
              onClick={() => setOpen(open === i ? null : i)}
              onFocus={() => setOpen(i)}
              className="flex w-full gap-4 rounded-xl text-left transition-transform duration-150 ease-out active:scale-[.99]"
            >
              <span
                className={`relative z-[1] grid size-10 shrink-0 place-items-center rounded-full border-[1.5px] border-ink transition-[background-color,color,transform] duration-300 ease-out ${on ? "scale-105 bg-blue text-white" : "bg-white text-blue"}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="size-[18px]"
                >
                  <path d={icons[s.name]} />
                </svg>
              </span>
              <span className="min-w-0">
                <span className="mono block">
                  <span className="text-blue">
                    {String(i + 1).padStart(2, "0")}
                  </span>{" "}
                  · {s.name}
                </span>
                <span className="block text-[15px] leading-snug text-muted">
                  {s.text.split(/(?<=\.)\s/)[0]}
                </span>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && s.output && (
                <motion.div
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease }}
                  className="overflow-hidden pl-14"
                >
                  <p className="mono mt-2 inline-block rounded-full border-[1.5px] border-ink bg-sky px-3 py-1 text-[10px]">
                    Delivers: {s.output}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ol>
  );
}
