"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import "./orbit.css";
import { StackMark } from "./StackMark";
import { links, stack, type StackCategory, type StackItem } from "@/content/stack";

// Decorative dots per orbit ring: [angle, colour, size]
const DOTS = [
  [[25, "var(--blue)", 9], [205, "var(--fail)", 6]],
  [[70, "var(--sky)", 10], [168, "var(--blue)", 6], [305, "var(--ink)", 7]],
] as const;

type Picked = { it: StackItem; ring: string; core: boolean };
const rings = (c: StackCategory) => [c.core, ...c.rings];
const find = (c: StackCategory, id: string | null): Picked | null => {
  if (!id) return null;
  for (const [k, r] of rings(c).entries()) {
    const it = r.items.find((x) => x.id === id);
    if (it) return { it, ring: r.label, core: k === 0 };
  }
  return null;
};
const wide = () => matchMedia("(min-width:700px)").matches;

export function StackOrbit() {
  const [cat, setCat] = useState(0);
  const [pinned, setPinned] = useState<string | null>(null);
  const [peek, setPeek] = useState<string | null>(null);
  const [halt, setHalt] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const c = stack[cat];
  const shown = find(c, peek ?? pinned);

  const go = (i: number, focus?: boolean) => {
    const n = (i + stack.length) % stack.length;
    setCat(n);
    setPinned(null);
    setPeek(null);
    if (focus) tabs.current[n]?.focus();
  };
  const close = (refocus?: boolean) => {
    const id = pinned;
    setPinned(null);
    setPeek(null);
    if (refocus && id) document.querySelector<HTMLElement>(`[data-node="${id}"]`)?.focus();
  };

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape" && (pinned || peek))
        close(!!document.activeElement?.closest(".so-card"));
    };
    document.addEventListener("keydown", k);
    return () => document.removeEventListener("keydown", k);
  });

  const nc = c.core.items.length;
  const nt = c.rings[0].items.length + c.rings[1].items.length;

  return (
    <MotionConfig reducedMotion="user">
      <div className="so-bar">
        <div className="so-tabs mono" role="tablist" aria-label="Stack categories">
          {stack.map((s, i) => (
            <button
              key={s.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              type="button"
              id={`so-tab-${s.id}`}
              aria-selected={i === cat}
              aria-controls={`so-panel-${s.id}`}
              tabIndex={i === cat ? 0 : -1}
              className="so-tab"
              onClick={() => go(i)}
              onKeyDown={(e) => {
                const to = { ArrowRight: cat + 1, ArrowLeft: cat - 1, Home: 0, End: stack.length - 1 }[e.key];
                if (to !== undefined) {
                  e.preventDefault();
                  go(to, true);
                }
              }}
            >
              {i === cat && (
                <motion.span
                  layoutId="so-pill"
                  className="so-pill"
                  transition={{ type: "spring", duration: 0.5, bounce: 0.18 }}
                />
              )}
              <span className="so-tab-in">
                <b aria-hidden="true">0{i + 1}</b>
                {s.name}
              </span>
            </button>
          ))}
        </div>
        <button type="button" className="btn-fill so-halt mono" aria-pressed={halt} onClick={() => setHalt(!halt)}>
          {halt ? "Play orbit" : "Pause orbit"}
        </button>
      </div>

      {stack.map((s, ci) => (
        <div
          key={s.id}
          id={`so-panel-${s.id}`}
          role="tabpanel"
          aria-labelledby={`so-tab-${s.id}`}
          hidden={ci !== cat}
          className="so-panel"
        >
          <div className="so-intro">
            <p className="mono blue">
              0{ci + 1} / 0{stack.length} · {s.core.items.length} fundamentals · {s.rings[0].items.length + s.rings[1].items.length} tools
            </p>
            <h3 className="display">{s.name}</h3>
            <p className="so-blurb">{s.blurb}</p>
            <ol className="so-tiers">
              {rings(s).map((r, k) => (
                <li key={r.label}>
                  <span className="mono muted">{k ? `Ring ${k}` : "Core"}</span>
                  <b>{r.label}</b>
                  <span className="mono muted">{r.items.length}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className={`so-stage${halt ? " so-halt-on" : ""}`}>
            <div className="so-system">
              <div className="so-core" aria-hidden="true" />
              <div className="so-hub" aria-hidden="true">
                <span className="display">
                  {s.hub[0]}
                  <br />
                  {s.hub[1]}
                </span>
                <span className="mono">{nc + nt} items</span>
              </div>
              {rings(s).map((r, k) => {
                const step = 360 / r.items.length;
                const off = -90 + step / (k === 1 ? 4 : 2);
                const paused = !!r.items.find((x) => x.id === pinned);
                return (
                  <div key={r.label} className="so-tier">
                    <h4 className={`so-rlabel mono r${k}`}>{r.label}</h4>
                    {k > 0 && (
                      <div className={`so-dots r${k}`} aria-hidden="true">
                        {DOTS[k - 1].map(([a, col, sz]) => (
                          <i key={a} className="so-dot" style={{ "--a": `${a}deg`, "--c": col, "--s": `${sz}px` } as React.CSSProperties} />
                        ))}
                      </div>
                    )}
                    <ul className={`so-ring r${k}${paused ? " paused" : ""}`}>
                      {r.items.map((it, j) => (
                        <li key={it.id} className="so-slot" style={{ "--a": `${(off + j * step).toFixed(2)}deg`, "--i": j + k * 3 } as React.CSSProperties}>
                          <button
                            type="button"
                            data-node={it.id}
                            className={`so-node${it.id === pinned ? " on" : ""}${it.glyph ? " cap" : ""}${it.todo ? " todo" : ""}`}
                            aria-pressed={it.id === pinned}
                            aria-label={it.name + (it.todo ? " (to confirm)" : "")}
                            onClick={() => {
                              setPinned(pinned === it.id ? null : it.id);
                              setPeek(null);
                            }}
                            onPointerEnter={(e) => e.pointerType === "mouse" && wide() && setPeek(it.id)}
                            onPointerLeave={() => setPeek(null)}
                            onFocus={(e) => e.currentTarget.matches(":focus-visible") && wide() && setPeek(it.id)}
                            onBlur={() => setPeek(null)}
                          >
                            <span className="so-disc">
                              <StackMark item={it} />
                            </span>
                            <span className="so-tag" aria-hidden="true">
                              {it.name}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {ci === cat && (
            <div className="so-side">
              <AnimatePresence mode="wait" initial={false}>
                {shown ? (
                  <Card key={shown.it.id + (shown.it.id === pinned)} p={shown} pinned={shown.it.id === pinned} onClose={() => close(true)} />
                ) : (
                  <motion.div
                    key="empty"
                    className="so-card empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.12 } }}
                    role="region"
                    aria-label="Tool details"
                  >
                    <p className="display">Pick a logo</p>
                    <p>
                      Hover or focus a logo to pause its ring. <kbd>Enter</kbd> pins the card, <kbd>Esc</kbd> closes it, <kbd>←</kbd> <kbd>→</kbd> switch category.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      ))}
    </MotionConfig>
  );
}

function Card({ p, pinned, onClose }: { p: Picked; pinned: boolean; onClose: () => void }) {
  const { it } = p;
  return (
    <motion.div
      className="so-card"
      role="region"
      aria-label="Tool details"
      aria-live="polite"
      initial={{ opacity: 0, y: 14, scale: 0.98, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -6, filter: "blur(3px)", transition: { duration: 0.12 } }}
      transition={{ type: "spring", duration: 0.5, bounce: 0.14 }}
    >
      {pinned ? (
        <button type="button" className="so-x" onClick={onClose} aria-label="Close details">
          ×
        </button>
      ) : (
        <span className="so-peek mono">Preview</span>
      )}
      <div className="so-chead">
        <span className={`so-big${it.glyph ? " cap" : ""}`}>
          <StackMark item={it} />
        </span>
        <h4 className="display">{it.name}</h4>
      </div>
      <p className="so-meta mono">
        {p.core && <span className="so-chip solid">Fundamental</span>}
        <span className="so-chip">{p.ring}</span>
        {it.glyph && <span className="so-chip">Capability</span>}
        {it.todo && <span className="so-chip flag">To confirm</span>}
      </p>
      {it.use && (
        <>
          <p className="so-lbl mono">What I use it for</p>
          <p className="so-use">{it.use}</p>
        </>
      )}
      {it.links && (
        <>
          <p className="so-lbl mono">See it in</p>
          <p className="so-links">
            {it.links.map((k) => (
              <Link key={k} href={links[k][1]} className="btn-fill so-link mono">
                {links[k][0]} →
              </Link>
            ))}
          </p>
        </>
      )}
    </motion.div>
  );
}
