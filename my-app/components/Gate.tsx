"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ENTER_EVENT } from "./HeroMotion";
import { PLAY_EVENT } from "./MusicPlayer";
import { viewMeta, type View } from "@/content/personas";
import { setView, storedView } from "@/lib/visitor";

const btn = "rounded-full px-7 py-4 font-mono text-sm tracking-[.06em]";

// Client-only overlay: real page content stays in the DOM underneath for SEO.
const seenThisSession = () => {
  try {
    return sessionStorage.getItem("gate") === "1";
  } catch {
    return false;
  }
};
const subscribe = () => () => {};
const picks: View[] = ["recruiter", "business", "dev"];
const card =
  "btn-fill flex min-h-[44px] flex-col rounded-[14px] border-[1.5px] border-ink bg-card p-4 text-left text-ink";

export default function Gate() {
  // Server snapshot says "seen" so SSR renders no overlay; the client re-reads after hydration.
  const seen = useSyncExternalStore(subscribe, seenThisSession, () => true);
  // First-time visitors (nothing saved) are asked who they are; returning ones get the plain intro with a "change" link.
  const saved = useSyncExternalStore(subscribe, storedView, () => null);
  const [changing, setChanging] = useState(false);
  const [sound, setSound] = useState(false);
  const asking = saved === null || changing;
  const [phase, setPhase] = useState<"open" | "out" | "closed">("open");
  const root = useRef<HTMLDivElement>(null);
  const opener = useRef<Element | null>(null);
  const visible = phase === "out" || (!seen && phase === "open");

  const enter = (sound = false) => {
    try {
      sessionStorage.setItem("gate", "1");
    } catch {}
    if (sound) window.dispatchEvent(new Event(PLAY_EVENT));
    window.dispatchEvent(new Event(ENTER_EVENT));
    setPhase("out");
    setTimeout(() => {
      setPhase("closed");
      (opener.current as HTMLElement | null)?.focus?.();
    }, 400);
  };

  const choose = (v: View) => {
    setView(v);
    enter(sound);
  };

  useEffect(() => {
    if (!visible || phase !== "open") return;
    opener.current = document.activeElement;
    const els = () =>
      root.current!.querySelectorAll<HTMLElement>("button, a[href], input");
    els()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return enter();
      if (e.key !== "Tab") return;
      const list = els();
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [visible, phase]);

  if (!visible) return null;
  return (
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label="Enter portfolio"
      className={`island-light fixed inset-0 z-30 grid place-items-center bg-[rgba(11,27,51,.86)] p-6 text-center text-paper backdrop-blur-[14px] transition-[opacity,transform] duration-[400ms] ${phase === "out" ? "pointer-events-none scale-[1.04] opacity-0" : ""}`}
    >
      {asking ? (
        <div className="w-full max-w-[920px]">
          <div className="mono mb-4 text-[#9FB4D1]">
            Rhuzzel Paramio · portfolio
          </div>
          <h2 className="display text-[clamp(44px,8vw,96px)] text-paper">
            Who are you?
          </h2>
          <p className="mt-2 text-[#C9D6E8]">
            I&rsquo;ll show you the version that fits.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-3 min-[801px]:grid-cols-3">
            {picks.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => choose(v)}
                className={card}
              >
                <span className="display text-[26px] leading-none">
                  {viewMeta[v].pick}
                </span>
                <span className="mt-2 text-[14px]">{viewMeta[v].who}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => choose("all")}
            className="btn-fill mt-4 rounded-full border-[1.5px] border-paper px-6 py-3 font-mono text-[13px] tracking-[.06em] text-paper [--fill:var(--paper)] [--fill-text:var(--ink)]"
          >
            {viewMeta.all.pick}
          </button>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[13px] text-[#C9D6E8]">
            <label className="flex cursor-pointer items-center gap-2 font-mono">
              <input
                type="checkbox"
                checked={sound}
                onChange={(e) => setSound(e.target.checked)}
                className="size-5 accent-[#8DBBF2]"
              />
              Play the soundtrack ♪
            </label>
            <button
              type="button"
              onClick={() => enter()}
              className="underline underline-offset-4"
            >
              Skip (Esc)
            </button>
          </div>
          <p className="mt-4 text-[13px] text-[#9FB4D1]">
            You can change this any time from the top bar.
          </p>
        </div>
      ) : (
        <div>
          <div className="mono mb-4 text-[#9FB4D1]">
            Rhuzzel Paramio · Full-stack + QA + AI
          </div>
          <h2 className="display text-[clamp(56px,11vw,128px)] text-paper">
            Enter the
            <br />
            <span className="text-sky">portfolio</span>
          </h2>
          <div className="mt-7 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={() => enter()}
              className={`${btn} bg-sky text-ink`}
            >
              $ run portfolio
            </button>
            <button
              type="button"
              onClick={() => enter(true)}
              className="font-mono text-[13px] tracking-[.06em] text-paper underline underline-offset-4"
            >
              or enter with sound ♪
            </button>
            <a
              href="#work"
              onClick={() => enter()}
              className="text-[13px] text-[#9FB4D1]"
            >
              Skip intro · sound off
            </a>
            <p className="text-[13px] text-[#C9D6E8]">
              Viewing as: {viewMeta[saved ?? "all"].now} ·{" "}
              <button
                type="button"
                onClick={() => setChanging(true)}
                className="underline underline-offset-4"
              >
                change
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
