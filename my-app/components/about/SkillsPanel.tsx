"use client";

import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react";
import { useState } from "react";
import { about } from "@/content/about";
import { copy } from "@/content/personas";
import { skillGroups, targetLabel, uses } from "@/content/skills";
import { useFocus } from "./AboutFocus";

const ease = [0.22, 1, 0.36, 1] as const;
const edu = about.education.slice(0, 2);

// Education rows expand on click; skills filter by category, show where they were used on hover, and light up
// the matching projects and roles when picked.
export default function SkillsPanel() {
  const { skill, setSkill } = useFocus();
  const reduce = useReducedMotion();
  const [group, setGroup] = useState<string>("All");
  const [peek, setPeek] = useState<string | null>(null);
  const [open, setOpen] = useState<number | null>(0);

  const tabs = ["All", ...skillGroups.map((g) => g.group)];
  const shown = skillGroups
    .filter((g) => group === "All" || g.group === group)
    .flatMap((g) => g.skills);
  const info = peek ?? skill;

  return (
    <>
      <h2 className="display mb-4 text-[clamp(28px,3vw,40px)]">
        Education &amp; skills
      </h2>
      <div className="mono mb-2 text-blue">Education</div>
      <ul className="space-y-2">
        {edu.map((e, i) => (
          <li key={e.school} className="border-b border-line pb-2">
            <button
              type="button"
              aria-expanded={open === i}
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-baseline justify-between gap-3 text-left transition-transform duration-150 ease-out active:scale-[.99]"
            >
              <span>
                <b className="block leading-snug">{e.program}</b>
                <span className="text-muted">{e.school}</span>
              </span>
              <span className="mono flex shrink-0 items-center gap-2">
                {e.period}
                <motion.span
                  aria-hidden="true"
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.2, ease }}
                  className="inline-block text-base leading-none"
                >
                  +
                </motion.span>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.p
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease }}
                  className="overflow-hidden text-[15px] text-muted"
                >
                  <span className="block pt-2">{e.detail}</span>
                </motion.p>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>

      <div data-for="all dev">
        <div className="mono mb-2 mt-5 text-blue">Skills</div>
        <div
          role="tablist"
          aria-label="Skill category"
          className="mb-3 flex flex-wrap gap-1.5"
        >
          {tabs.map((t) => (
            <button
              key={t}
              role="tab"
              type="button"
              aria-selected={group === t}
              onClick={() => setGroup(t)}
              className={`mono rounded-full border-[1.5px] border-ink px-2.5 py-0.5 text-[10px] transition-[background-color,color,transform] duration-150 ease-out active:scale-[.97] ${group === t ? "bg-ink text-paper" : "hover:bg-sky/50"}`}
            >
              {t}
            </button>
          ))}
        </div>
        <LayoutGroup>
          <motion.ul
            layout
            className="flex min-h-[76px] flex-wrap content-start gap-1.5"
          >
            <AnimatePresence initial={false} mode="popLayout">
              {shown.map((s) => (
                <motion.li
                  key={s}
                  layout={!reduce}
                  initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    transition: { duration: 0.12 },
                  }}
                  transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
                >
                  <button
                    type="button"
                    aria-pressed={skill === s}
                    onClick={() => setSkill(skill === s ? null : s)}
                    onPointerEnter={() => setPeek(s)}
                    onPointerLeave={() => setPeek(null)}
                    onFocus={() => setPeek(s)}
                    onBlur={() => setPeek(null)}
                    className={`rounded-full border-[1.5px] border-ink px-2.5 py-0.5 font-mono text-[11px] font-medium transition-[background-color,color,transform] duration-150 ease-out active:scale-[.97] ${skill === s ? "bg-blue text-white" : "hover:-translate-y-0.5 hover:bg-sky/50"}`}
                  >
                    {s}
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>
        <p
          aria-live="polite"
          className="mono mt-3 min-h-[2.4em] text-[10px] text-muted"
        >
          {info
            ? `${info} · used in ${(uses[info] ?? []).map((t) => targetLabel[t]).join(", ")}`
            : "Pick a skill to light up where I used it."}
        </p>
      </div>
      <div data-for="recruiter">
        <div className="mono mb-2 mt-5 text-blue">What I do</div>
        <ul className="space-y-2">
          {copy.skillGloss.map(([g, d]) => (
            <li key={g}>
              <b>{g}.</b> <span className="text-muted">{d}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
