"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import type { ReactNode } from "react";
import { lifecycle } from "@/content/lifecycle";
import HowCover from "./HowCover";

// One bug ticket (#142) travels through all six steps. Each scene is a short, single-idea animation.
const ease = [0.22, 1, 0.36, 1] as const;
const scene: Variants = {
  hidden: { opacity: 0, filter: "blur(6px)", y: 12 },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      type: "spring",
      duration: 0.6,
      bounce: 0,
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    filter: "blur(4px)",
    y: -8,
    transition: { duration: 0.12 },
  },
};
const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", duration: 0.5, bounce: 0.1 },
  },
};
const type: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  show: { clipPath: "inset(0 0% 0 0)", transition: { duration: 0.5, ease } },
};

function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={item}
      className={`rounded-xl border-[1.5px] border-ink bg-white p-3 shadow-[4px_4px_0_var(--ink)] ${className}`}
    >
      {children}
    </motion.div>
  );
}
const Label = ({ children }: { children: ReactNode }) => (
  <div className="mono text-[10px] text-blue">{children}</div>
);
function Tag({
  children,
  bad = false,
}: {
  children: ReactNode;
  bad?: boolean;
}) {
  return (
    <motion.span
      variants={item}
      className={`mono rounded-full border-[1.5px] px-2.5 py-0.5 text-[10px] ${bad ? "border-fail text-fail" : "border-ink"}`}
    >
      {children}
    </motion.span>
  );
}

const scenes: ReactNode[] = [
  // 01 New: the bug lands and gets written down
  <>
    <Card>
      <Label>#142 · BUG</Label>
      <b className="text-[15px] leading-tight">
        Discount code ignored at checkout
      </b>
    </Card>
    <Card className="space-y-1.5">
      {[
        "1. Add an item to the cart",
        "2. Apply code SAVE10",
        "3. Total does not change",
      ].map((t) => (
        <motion.p key={t} variants={type} className="font-mono text-[12px]">
          {t}
        </motion.p>
      ))}
    </Card>
    <div className="flex gap-2">
      <Tag>expected ₱900</Tag>
      <Tag bad>actual ₱1,000</Tag>
    </div>
  </>,

  // 02 Assigned: one owner, one priority, one definition of done
  <>
    <Card className="flex items-center gap-3">
      <motion.span
        variants={{
          hidden: { scale: 0.6, opacity: 0 },
          show: {
            scale: 1,
            opacity: 1,
            transition: { type: "spring", duration: 0.5, bounce: 0.3 },
          },
        }}
        className="display grid size-10 place-items-center rounded-full bg-blue text-lg text-white"
      >
        RP
      </motion.span>
      <div>
        <Label>OWNER</Label>
        <b>Rhuzzel</b>
      </div>
      <motion.span
        variants={{
          hidden: { scale: 1.9, opacity: 0, rotate: -16 },
          show: {
            scale: 1,
            opacity: 1,
            rotate: -8,
            transition: {
              type: "spring",
              duration: 0.45,
              bounce: 0.35,
              delay: 0.3,
            },
          },
        }}
        className="mono ml-auto rounded-md border-2 border-fail px-2 py-0.5 text-sm text-fail"
      >
        P1
      </motion.span>
    </Card>
    <Card>
      <Label>DONE WHEN</Label>
      <p className="text-[14px] leading-snug">SAVE10 takes 10% off the total</p>
    </Card>
  </>,

  // 03 In progress: failing test, then the fix, then green
  <>
    <motion.div
      variants={item}
      className="rounded-xl border-[1.5px] border-ink bg-ink p-3 font-mono text-[12px] leading-relaxed text-paper shadow-[4px_4px_0_var(--blue)]"
    >
      <div className="relative">
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 1.7, duration: 0.2 }}
          className="text-[#FF9B87]"
        >
          ✗ applies SAVE10 to the total
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.2 }}
          className="absolute left-0 top-0 text-sky"
        >
          ✓ applies SAVE10 to the total
        </motion.span>
      </div>
      <motion.p variants={type} className="mt-2 text-[#FF9B87]">
        − total = subtotal
      </motion.p>
      <motion.p
        variants={type}
        className="text-sky"
        transition={{ delay: 0.5 }}
      >
        + total = subtotal − discount(code)
      </motion.p>
    </motion.div>
    <motion.div variants={item} className="mono text-[10px] text-muted">
      test first, fix second
    </motion.div>
  </>,

  // 04 Fixed: the branch merges and CI ticks green
  <>
    <Card>
      <div className="flex items-center justify-between">
        <Label>PR #143</Label>
        <span className="mono rounded-full bg-ink px-2 py-px text-[10px] text-sky">
          merged
        </span>
      </div>
      <svg
        viewBox="0 0 300 64"
        className="mt-1 w-full"
        fill="none"
        stroke="#0B1B33"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M10 52H290" opacity=".25" />
        <motion.path
          d="M60 52C90 52 90 14 122 14H188C220 14 220 52 250 52"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, ease, delay: 0.2 }}
        />
        {[
          [60, 52],
          [155, 14],
          [250, 52],
        ].map(([x, y], i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r="6"
            fill={i === 2 ? "#1F5FBF" : "#8DBBF2"}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.3 + i * 0.35,
              type: "spring",
              duration: 0.4,
              bounce: 0.4,
            }}
          />
        ))}
      </svg>
    </Card>
    <div className="flex flex-wrap gap-2">
      {["lint", "types", "unit", "e2e"].map((c, i) => (
        <motion.span
          key={c}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.9 + i * 0.22,
            type: "spring",
            duration: 0.4,
            bounce: 0.3,
          }}
          className="mono rounded-full border-[1.5px] border-ink bg-sky px-2.5 py-0.5 text-[10px]"
        >
          ✓ {c}
        </motion.span>
      ))}
    </div>
  </>,

  // 05 Verified: a clean build, the original steps plus the neighbours
  <>
    <Card>
      <div className="mb-2 flex items-center justify-between">
        <Label>CLEAN BUILD</Label>
        <span className="mono text-[10px]">32 / 32</span>
      </div>
      <div className="grid grid-cols-8 gap-1">
        {Array.from({ length: 32 }, (_, i) => (
          <motion.span
            key={i}
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.15 + ((i % 8) + Math.floor(i / 8)) * 0.04,
              type: "spring",
              duration: 0.4,
              bounce: 0.3,
            }}
            className={`h-3.5 rounded-[3px] ${i === 11 || i === 20 ? "bg-sky ring-2 ring-ink" : "bg-blue"}`}
          />
        ))}
      </div>
    </Card>
    <div className="flex gap-2">
      <Tag>original steps ✓</Tag>
      <Tag>cart ✓</Tag>
      <Tag>refunds ✓</Tag>
    </div>
  </>,

  // 06 Closed: stamped, with proof attached
  <>
    <motion.div
      variants={item}
      className="rounded-xl border-[1.5px] border-ink bg-sky p-3 shadow-[4px_4px_0_var(--ink)]"
    >
      <Label>#142</Label>
      <motion.div
        variants={{
          hidden: { scale: 1.5, opacity: 0, rotate: -6 },
          show: {
            scale: 1,
            opacity: 1,
            rotate: -3,
            transition: {
              type: "spring",
              duration: 0.5,
              bounce: 0.35,
              delay: 0.15,
            },
          },
        }}
        className="display text-[44px] leading-none"
      >
        Closed ✓
      </motion.div>
    </motion.div>
    <div className="flex flex-wrap gap-2">
      {["▸ test-run.html", "▸ notes.md", "▸ PR #143"].map((a) => (
        <Tag key={a}>{a}</Tag>
      ))}
    </div>
  </>,
];

function Cover() {
  return (
    <>
      <motion.div variants={item} className="flex w-full justify-center">
        <HowCover />
      </motion.div>
      <motion.div variants={item} className="text-center">
        <div className="display text-[34px] leading-none max-[800px]:text-[24px]">
          How I work
        </div>
        <p className="mono mt-2 text-[10px] text-muted">
          <span className="max-[800px]:hidden">
            Hover a step to follow one bug from New to Closed
          </span>
          <span className="min-[801px]:hidden">
            Tap a step to follow one bug from New to Closed
          </span>
        </p>
      </motion.div>
    </>
  );
}

// active === null is the idle cover; nothing advances on its own, the visitor drives it.
export default function HowStage({ active }: { active: number | null }) {
  const reduce = useReducedMotion();
  return (
    <div
      aria-hidden="true"
      className="flex h-full flex-col overflow-hidden rounded-[16px] border-[1.5px] border-ink bg-[#E4EEFB] bg-[linear-gradient(rgba(11,27,51,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(11,27,51,.05)_1px,transparent_1px)] bg-[size:24px_24px] shadow-[8px_8px_0_var(--blue)]"
    >
      <div className="flex shrink-0 items-center justify-between border-b-[1.5px] border-ink bg-white px-4 py-2">
        <span className="mono">Ticket #142</span>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={active ?? "idle"}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.1 } }}
            transition={{ duration: 0.2, ease }}
            className="mono rounded-full bg-ink px-2.5 py-px text-sky"
          >
            {active === null ? "Idle" : lifecycle[active].name}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="relative min-h-0 flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active ?? "cover"}
            variants={scene}
            initial={reduce ? false : "hidden"}
            animate="show"
            exit={reduce ? { opacity: 0, transition: { duration: 0 } } : "exit"}
            className="absolute inset-0 flex flex-col items-center justify-center p-5 max-[800px]:[zoom:.74] min-[801px]:[zoom:1.45] min-[801px]:p-7"
          >
            <div className="flex w-full max-w-[380px] flex-col gap-3">
              {active === null ? <Cover /> : scenes[active]}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex shrink-0 gap-1.5 border-t-[1.5px] border-ink bg-white px-4 py-2.5">
        {lifecycle.map((s, i) => (
          <span key={s.name} className="h-1.5 flex-1 rounded-full bg-ink/15">
            <span
              className={`block h-full rounded-full bg-blue transition-[width] duration-300 ease-out ${active !== null && i <= active ? "w-full" : "w-0"}`}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
