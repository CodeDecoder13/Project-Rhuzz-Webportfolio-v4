"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { about } from "@/content/about";
import { card } from "../Section";
import { useFocus } from "./AboutFocus";

const panel: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0,
      staggerChildren: 0.07,
    },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.12 } },
};
const row: Variants = {
  hidden: { opacity: 0, x: -10 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", duration: 0.45, bounce: 0.1 },
  },
};
const norm = (s: string) => s.replace(/\s*\(.*\)/, "").toLowerCase();

// Role selector on the left, details on the right. A skill picked in the profile band lights up the roles that used it.
export function ExperienceExplorer() {
  const { skill, role, setRole } = useFocus();
  const reduce = useReducedMotion();
  const cur =
    about.experience.find((e) => e.id === role) ?? about.experience[0];

  return (
    <div className="grid grid-cols-1 gap-5 min-[801px]:grid-cols-[minmax(0,.8fr)_1.4fr]">
      <div
        role="tablist"
        aria-label="Roles"
        aria-orientation="vertical"
        className="flex flex-col gap-3"
      >
        {about.experience.map((e) => {
          const on = e.id === cur.id;
          const hit =
            skill !== null && e.stack.some((c) => norm(c) === norm(skill));
          return (
            <button
              key={e.id}
              role="tab"
              type="button"
              aria-selected={on}
              onClick={() => setRole(e.id)}
              className={`reveal rounded-[14px] border-[1.5px] p-4 text-left transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out active:scale-[.99] ${on ? "-translate-y-0.5 border-blue bg-white shadow-[6px_6px_0_var(--ink)]" : "border-ink bg-card hover:-translate-y-0.5"} ${hit ? "ring-2 ring-blue ring-offset-2 ring-offset-paper" : ""}`}
            >
              <span className="mono block text-blue">{e.period}</span>
              <span className="mt-1 block text-[17px] font-bold leading-tight">
                {e.role}
              </span>
              <span className="mono mt-1 block text-muted">{e.org}</span>
            </button>
          );
        })}
      </div>

      <div className={`${card} min-h-[320px]`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={cur.id}
            variants={panel}
            initial={reduce ? false : "hidden"}
            animate="show"
            exit={reduce ? { opacity: 0, transition: { duration: 0 } } : "exit"}
          >
            <motion.div variants={row} className="mono text-blue">
              {cur.period}
            </motion.div>
            <motion.h3
              variants={row}
              className="mt-1 text-2xl font-bold leading-tight"
            >
              {cur.role}
            </motion.h3>
            <motion.p variants={row} className="mono mb-4 mt-1 text-muted">
              {cur.org}
            </motion.p>
            <ul className="space-y-2.5">
              {cur.points.map((p) => (
                <motion.li
                  key={p}
                  variants={row}
                  className="flex gap-3 text-muted"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-blue"
                  />
                  {p}
                </motion.li>
              ))}
            </ul>
            <motion.ul variants={row} className="mt-5 flex flex-wrap gap-1.5">
              {cur.stack.map((c) => {
                const hit = skill !== null && norm(c) === norm(skill);
                return (
                  <li
                    key={c}
                    className={`rounded-full border-[1.5px] border-ink px-2.5 py-0.5 font-mono text-[11px] font-medium transition-colors duration-200 ${hit ? "bg-blue text-white" : ""}`}
                  >
                    {c}
                  </li>
                );
              })}
            </motion.ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Leadership beside a timeline whose years select the matching role above.
export function TimelineCards() {
  const { role, setRole } = useFocus();
  return (
    <div className="mt-5 grid grid-cols-1 gap-5 min-[801px]:grid-cols-2">
      <div className={card}>
        <div className="mono mb-3 text-blue">Leadership</div>
        <ul className="list-disc space-y-1.5 pl-5 marker:text-blue">
          {about.leadership.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </div>
      <div className={card}>
        <div className="mono mb-3 text-blue">The road so far · tap a year</div>
        <ol className="space-y-1">
          {about.journey.map((j) => {
            const content = (
              <>
                <span
                  className={`mono w-10 shrink-0 pt-0.5 ${role === j.role ? "text-ink" : "text-blue"}`}
                >
                  {j.year}
                </span>
                <span className="leading-snug">{j.event}</span>
              </>
            );
            return (
              <li key={j.year}>
                {j.role ? (
                  <button
                    type="button"
                    aria-pressed={role === j.role}
                    onClick={() => setRole(j.role)}
                    className={`flex w-full gap-4 rounded-lg px-2 py-1 text-left transition-[background-color,transform] duration-150 ease-out active:scale-[.99] ${role === j.role ? "bg-sky/60" : "hover:bg-sky/30"}`}
                  >
                    {content}
                  </button>
                ) : (
                  <div className="flex gap-4 px-2 py-1">{content}</div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
