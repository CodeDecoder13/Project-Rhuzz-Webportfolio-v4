"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import type { ReactNode } from "react";
import { tracks, type Track } from "@/content/lifecycle";
import HowCover from "./HowCover";

// One bug (#142) travels through all six QA steps; the dev track has its own scenes. Each scene is a short, single-idea animation.
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
      className={`rounded-xl border-[1.5px] border-ink bg-card p-3 shadow-[4px_4px_0_var(--ink)] ${className}`}
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

const qaScenes: ReactNode[] = [
  // 01 Explore & test: open the app, look for UI defects and broken flows
  <>
    <Card>
      <div className="mb-1.5 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-2 rounded-full border border-ink" />
        ))}
        <span className="mono ml-2 text-[10px] text-muted">
          shop.app/checkout
        </span>
      </div>
      <b className="text-[15px] leading-tight">Open the app, look around</b>
    </Card>
    <Card className="space-y-1.5">
      {[
        "✓ Layout holds on mobile and desktop",
        "✗ Pay button overlaps the footer",
        "✗ SAVE10 applied, total unchanged",
      ].map((t) => (
        <motion.p
          key={t}
          variants={type}
          className={`font-mono text-[12px] ${t.startsWith("✗") ? "text-fail" : ""}`}
        >
          {t}
        </motion.p>
      ))}
    </Card>
    <div className="flex flex-wrap gap-2">
      <Tag>UI</Tag>
      <Tag>functional</Tag>
      <Tag bad>2 defects</Tag>
    </div>
  </>,

  // 02 Automate: the bug becomes a regression test that fails, then guards the fix
  <>
    <motion.div
      variants={item}
      className="rounded-xl border-[1.5px] border-ink bg-ink p-3 font-mono text-[12px] leading-relaxed text-paper shadow-[4px_4px_0_var(--blue)]"
    >
      <motion.p variants={type} className="text-sky">
        {`test("SAVE10 takes 10% off", async () => {`}
      </motion.p>
      <motion.p variants={type} className="pl-3 text-sky">
        await applyCode(&quot;SAVE10&quot;);
      </motion.p>
      <motion.p variants={type} className="pl-3 text-sky">
        expect(total).toBe(900);
      </motion.p>
      <motion.p variants={type} className="text-sky">
        {`});`}
      </motion.p>
    </motion.div>
    <div className="flex flex-wrap gap-2">
      <Tag>Playwright</Tag>
      <Tag>regression</Tag>
      <Tag bad>fails today ✗</Tag>
    </div>
  </>,

  // 03 Document: test case, steps, evidence
  <>
    <Card>
      <Label>TC-142 · TEST CASE</Label>
      <b className="text-[15px] leading-tight">
        Discount code applies at checkout
      </b>
    </Card>
    <Card className="space-y-1.5">
      {["Steps: cart → code → total", "Expected: ₱900", "Actual: ₱1,000"].map(
        (t) => (
          <motion.p key={t} variants={type} className="font-mono text-[12px]">
            {t}
          </motion.p>
        ),
      )}
    </Card>
    <div className="flex flex-wrap gap-2">
      {["▸ screenshot.png", "▸ console.log", "▸ video.webm"].map((a) => (
        <Tag key={a}>{a}</Tag>
      ))}
    </div>
  </>,

  // 04 Create ticket: one owner, one priority, one definition of done
  <>
    <Card>
      <Label>#142 · BUG · NEW TICKET</Label>
      <b className="text-[15px] leading-tight">
        Discount code ignored at checkout
      </b>
    </Card>
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
        DV
      </motion.span>
      <div>
        <Label>ASSIGNED TO</Label>
        <b>Developer</b>
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

  // 05 Test again: clean build, the failing test now passes, plus the neighbours
  <>
    <Card>
      <div className="mb-2 flex items-center justify-between">
        <Label>RETEST · CLEAN BUILD</Label>
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
      <Tag>manual ✓</Tag>
      <Tag>automated ✓</Tag>
      <Tag>regression ✓</Tag>
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
      {["▸ test-run.html", "▸ test-cases.md", "▸ ticket #142"].map((a) => (
        <Tag key={a}>{a}</Tag>
      ))}
    </div>
  </>,
];

const mono = { fontFamily: "var(--font-jetbrains-mono)" };

const devScenes: ReactNode[] = [
  // 01 Discover: the problem and the person
  <>
    <Card>
      <Label>BRIEF #07</Label>
      <b className="text-[15px] leading-tight">Split bills with friends</b>
    </Card>
    <Card className="space-y-1.5">
      {[
        "Who: students sharing rent",
        "Pain: nobody knows who owes what",
        "Win: settle up in two taps",
      ].map((t) => (
        <motion.p key={t} variants={type} className="font-mono text-[12px]">
          {t}
        </motion.p>
      ))}
    </Card>
    <div className="flex gap-2">
      <Tag>user</Tag>
      <Tag>problem</Tag>
      <Tag>success</Tag>
    </div>
  </>,

  // 02 Design: the data model and the API, before code
  <>
    <Card>
      <Label>DATA MODEL</Label>
      <svg
        viewBox="0 0 300 64"
        className="mt-1 w-full"
        fill="none"
        stroke="#0B1B33"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        {[
          ["users", 8],
          ["bills", 110],
          ["splits", 212],
        ].map(([t, x], i) => (
          <motion.g
            key={t}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.1 + i * 0.18,
              type: "spring",
              duration: 0.5,
              bounce: 0.2,
            }}
          >
            <rect
              x={x as number}
              y="14"
              width="80"
              height="36"
              rx="6"
              fill="#fff"
            />
            <text
              x={(x as number) + 40}
              y="37"
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill="#0B1B33"
              stroke="none"
              style={mono}
            >
              {t}
            </text>
          </motion.g>
        ))}
        {[88, 190].map((x, i) => (
          <motion.path
            key={x}
            d={`M${x} 32H${x + 22}`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.45 + i * 0.18, duration: 0.3 }}
          />
        ))}
      </svg>
    </Card>
    <div className="flex gap-2">
      <Tag>GET /bills</Tag>
      <Tag>POST /splits</Tag>
    </div>
  </>,

  // 03 Build: three typed layers
  <>
    {[
      ["UI", "Vue 3 / Next.js"],
      ["API", "Laravel / Node"],
      ["DB", "PostgreSQL"],
    ].map(([k, v]) => (
      <Card key={k} className="flex items-center justify-between py-2.5">
        <span className="display text-[22px] leading-none text-blue">{k}</span>
        <span className="mono text-[11px]">{v}</span>
      </Card>
    ))}
    <div className="flex gap-2">
      <Tag>typed end to end</Tag>
      <Tag>small commits</Tag>
    </div>
  </>,

  // 04 AI-assisted: Claude Code and Codex speed up the build, I review everything
  <>
    <Card className="space-y-1.5">
      <Label>PROMPT</Label>
      <p className="font-mono text-[12px]">
        Add the SAVE10 discount to checkout, with tests
      </p>
    </Card>
    <div className="flex items-center gap-2">
      <Tag>✦ Claude Code</Tag>
      <Tag>Codex</Tag>
    </div>
    <motion.div
      variants={item}
      className="rounded-xl border-[1.5px] border-ink bg-ink p-3 font-mono text-[12px] leading-relaxed text-paper shadow-[4px_4px_0_var(--blue)]"
    >
      <motion.p variants={type} className="text-sky">
        + total = subtotal − discount(code)
      </motion.p>
      <motion.p variants={type} className="text-sky">
        + {`test("applies SAVE10 to the total")`}
      </motion.p>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.3, type: "spring", duration: 0.4, bounce: 0.3 }}
      className="flex flex-wrap gap-2"
    >
      <Tag>reviewed by me ✓</Tag>
      <Tag>ships faster</Tag>
    </motion.div>
  </>,

  // 05 Ship: CI, then the right cloud
  <>
    <div className="flex items-center gap-2">
      {["build", "test", "deploy"].map((s, i) => (
        <motion.div
          key={s}
          variants={item}
          className="relative flex-1 overflow-hidden rounded-xl border-[1.5px] border-ink bg-card px-2 py-3 text-center shadow-[3px_3px_0_var(--ink)]"
        >
          <span className="mono relative z-10 text-[11px]">{s}</span>
          <motion.span
            className="absolute inset-0 origin-left bg-sky"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4 + i * 0.45, duration: 0.4, ease }}
          />
        </motion.div>
      ))}
    </div>
    <div className="flex flex-wrap gap-2">
      {["Railway", "Vercel", "Hostinger", "Google Cloud", "Amazon AWS"].map(
        (c, i) => (
          <motion.span
            key={c}
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 1.8 + i * 0.15,
              type: "spring",
              duration: 0.45,
              bounce: 0.3,
            }}
            className="mono rounded-full border-[1.5px] border-ink bg-card px-2.5 py-0.5 text-[10px] shadow-[2px_2px_0_var(--ink)]"
          >
            ● {c}
          </motion.span>
        ),
      )}
    </div>
    <motion.div variants={item} className="mono text-[10px] text-muted">
      rollback: one click
    </motion.div>
  </>,

  // 06 Watch: logs and real usage feed the next fix
  <>
    <Card>
      <Label>REQUESTS · LAST 24H</Label>
      <svg
        viewBox="0 0 300 70"
        className="mt-1 w-full"
        fill="none"
        stroke="#1F5FBF"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          d="M6 52 L46 44 L86 48 L126 30 L166 36 L206 20 L246 26 L294 12"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, ease, delay: 0.2 }}
        />
        <motion.circle
          cx="294"
          cy="12"
          r="5"
          fill="#1F5FBF"
          stroke="none"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 1.2,
            type: "spring",
            duration: 0.4,
            bounce: 0.5,
          }}
        />
      </svg>
    </Card>
    <div className="flex flex-wrap gap-2">
      <Tag>error spotted</Tag>
      <Tag>fixed ✓</Tag>
      <Tag>next: iterate</Tag>
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
            Hover a step to see how it plays out
          </span>
          <span className="min-[801px]:hidden">
            Tap a step to see how it plays out
          </span>
        </p>
      </motion.div>
    </>
  );
}

// active === null is the idle cover; nothing advances on its own, the visitor drives it.
export default function HowStage({
  track,
  active,
}: {
  track: Track;
  active: number | null;
}) {
  const steps = tracks[track].steps;
  const scenes = track === "qa" ? qaScenes : devScenes;
  const reduce = useReducedMotion();
  return (
    <div
      aria-hidden="true"
      className="island-light flex h-full flex-col overflow-hidden rounded-[16px] border-[1.5px] border-ink bg-[#E4EEFB] bg-[linear-gradient(rgba(11,27,51,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(11,27,51,.05)_1px,transparent_1px)] bg-[size:24px_24px] shadow-[8px_8px_0_var(--blue)]"
    >
      <div className="flex shrink-0 items-center justify-between border-b-[1.5px] border-ink bg-card px-4 py-2">
        <span className="mono">{tracks[track].ticket}</span>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={active ?? "idle"}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.1 } }}
            transition={{ duration: 0.2, ease }}
            className="mono rounded-full bg-ink px-2.5 py-px text-sky"
          >
            {active === null ? "Idle" : steps[active].name}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="relative min-h-0 flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${track}-${active ?? "cover"}`}
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
      <div className="flex shrink-0 gap-1.5 border-t-[1.5px] border-ink bg-card px-4 py-2.5">
        {steps.map((s, i) => (
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
