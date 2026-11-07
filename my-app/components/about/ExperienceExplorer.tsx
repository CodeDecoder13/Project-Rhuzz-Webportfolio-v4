"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { about, logos } from "@/content/about";
import { Tags } from "../ProjectDetail";
import JourneyPortrait from "./JourneyPortrait";
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
              className={`reveal rounded-[14px] border-[1.5px] p-4 text-left transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out active:scale-[.99] ${on ? "-translate-y-0.5 border-blue bg-card shadow-[6px_6px_0_var(--ink)]" : "border-ink bg-card hover:-translate-y-0.5"} ${hit ? "ring-2 ring-blue ring-offset-2 ring-offset-paper" : ""}`}
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

// Logo slot: shows the file from `logos[mark]` (content/about.ts) once a logo is supplied, otherwise the short mark.
function LogoSlot({ mark }: { mark: string }) {
  const src = logos[mark];
  return (
    <span className="relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-xl border-[1.5px] border-ink bg-card font-mono text-[10px] font-bold">
      {src ? (
        <Image
          src={src}
          alt=""
          fill
          sizes="44px"
          className="object-contain p-1"
        />
      ) : (
        mark
      )}
    </span>
  );
}

// Leadership on the left; on the right the road so far, with a portrait that opens from a blue silhouette
// into picture 1 while the card is hovered (or tapped).
export function LeadershipJourney() {
  const [meet, setMeet] = useState(false);
  return (
    <div className="mt-5 grid grid-cols-1 gap-5 min-[801px]:grid-cols-[.9fr_1.4fr]">
      <div className={`${card} flex flex-col`}>
        <div className="mono mb-4 text-blue">Leadership</div>
        <ul className="flex flex-1 flex-col gap-3">
          {about.leadership.map((l) => (
            <li
              key={l.role}
              className="flex flex-1 items-center gap-4 rounded-xl border-[1.5px] border-ink bg-paper p-3 transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[4px_4px_0_var(--ink)]"
            >
              <LogoSlot mark={l.mark} />
              <span className="min-w-0 flex-1">
                <b className="block leading-snug">{l.role}</b>
                <span className="block text-[15px] leading-snug text-muted">
                  {l.org}
                </span>
              </span>
              <span className="mono shrink-0">{l.period}</span>
            </li>
          ))}
        </ul>
        <div className="mono mb-2 mt-5 text-blue">Beyond code</div>
        <Tags items={about.interests} />
      </div>

      <div
        className={`${card} relative overflow-hidden`}
        onPointerEnter={(e) => e.pointerType === "mouse" && setMeet(true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setMeet(false)}
        onClick={(e) =>
          e.nativeEvent instanceof PointerEvent &&
          e.nativeEvent.pointerType !== "mouse" &&
          setMeet((m) => !m)
        }
      >
        <JourneyPortrait meet={meet} />
        <div className="mono relative mb-4 text-blue">The road so far</div>
        <div className="relative min-[801px]:max-w-[62%]">
          <ol className="space-y-1">
            {about.journey.map((j) => (
              <li
                key={j.year}
                className="flex items-center gap-3 rounded-lg px-1 py-1.5 transition-transform duration-200 ease-out hover:translate-x-1"
              >
                <LogoSlot mark={j.mark} />
                <span className="mono w-10 shrink-0 text-blue">{j.year}</span>
                <span className="leading-snug">
                  {j.event}
                  {"grad" in j && (
                    <svg
                      role="img"
                      aria-label="Graduation cap"
                      viewBox="0 0 24 24"
                      className="ml-2 inline size-5 align-[-4px] text-blue"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 9l10-5 10 5-10 5z" />
                      <path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" />
                      <path d="M22 9v6" />
                    </svg>
                  )}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
