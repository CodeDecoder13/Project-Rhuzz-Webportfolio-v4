"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { useRef, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

// Each step is a card with an outlined icon tile. Scrolling tints the steps in order; hover or tap one to lift it
// and see what it delivers.
export default function ProcessList({
  steps,
  icons,
}: {
  steps: { name: string; text: string; output?: string }[];
  icons: Record<string, string>;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  const [lit, setLit] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  useMotionValueEvent(
    scrollYProgress,
    "change",
    (v) => !reduce && setLit(Math.round(v * steps.length)),
  );

  return (
    <ol ref={ref} className="space-y-2.5">
      {steps.map((s, i) => {
        const on = i < lit && !reduce;
        const isOpen = open === i;
        return (
          <li
            key={s.name}
            onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(i)}
            onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(null)}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              onFocus={() => setOpen(i)}
              className={`flex w-full items-start gap-3.5 rounded-xl border-[1.5px] border-ink p-3 text-left transition-[transform,box-shadow,background-color] duration-200 ease-out active:scale-[.99] ${isOpen ? "-translate-y-0.5 bg-white shadow-[4px_4px_0_var(--ink)]" : on ? "bg-sky/40" : "bg-paper"}`}
            >
              <span
                className={`grid size-11 shrink-0 place-items-center rounded-lg border-[1.5px] border-ink text-ink transition-colors duration-200 ${isOpen || on ? "bg-sky" : "bg-white"}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="size-5"
                >
                  <path d={icons[s.name]} />
                </svg>
              </span>
              <span className="min-w-0 flex-1">
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
              <motion.span
                aria-hidden="true"
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2, ease }}
                className="mt-1 text-lg leading-none"
              >
                →
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && s.output && (
                <motion.div
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease }}
                  className="overflow-hidden pl-3.5"
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
