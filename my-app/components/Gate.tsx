"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { PLAY_EVENT } from "./MusicPlayer";

const btn = "rounded-full px-7 py-4 font-mono text-sm tracking-[.06em]";

// Client-only overlay: real page content stays in the DOM underneath for SEO.
const seenThisSession = () => {
  try { return sessionStorage.getItem("gate") === "1"; } catch { return false; }
};
const subscribe = () => () => {};

export default function Gate() {
  // Server snapshot says "seen" so SSR renders no overlay; the client re-reads after hydration.
  const seen = useSyncExternalStore(subscribe, seenThisSession, () => true);
  const [phase, setPhase] = useState<"open" | "out" | "closed">("open");
  const root = useRef<HTMLDivElement>(null);
  const opener = useRef<Element | null>(null);
  const visible = phase === "out" || (!seen && phase === "open");

  const enter = (sound = false) => {
    try { sessionStorage.setItem("gate", "1"); } catch {}
    if (sound) window.dispatchEvent(new Event(PLAY_EVENT));
    setPhase("out");
    setTimeout(() => {
      setPhase("closed");
      (opener.current as HTMLElement | null)?.focus?.();
    }, 400);
  };

  useEffect(() => {
    if (!visible || phase !== "open") return;
    opener.current = document.activeElement;
    const els = () => root.current!.querySelectorAll<HTMLElement>("button, a[href]");
    els()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return enter();
      if (e.key !== "Tab") return;
      const list = els();
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
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
      className={`fixed inset-0 z-30 grid place-items-center bg-[rgba(11,27,51,.86)] p-6 text-center text-paper backdrop-blur-[14px] transition-[opacity,transform] duration-[400ms] ${phase === "out" ? "pointer-events-none scale-[1.04] opacity-0" : ""}`}
    >
      <div>
        <div className="mono mb-4 text-[#9FB4D1]">Rhuzzel Paramio · Full-stack + QA</div>
        <h2 className="display text-[clamp(56px,11vw,128px)]">
          Enter the
          <br />
          <span className="text-sky">portfolio</span>
        </h2>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={() => enter()} className={`${btn} bg-sky text-ink`}>
            $ run portfolio
          </button>
          <button type="button" onClick={() => enter(true)} className={`${btn} border-[1.5px] border-white text-white`}>
            with sound ♪
          </button>
        </div>
        <a href="#work" onClick={() => enter()} className="mt-3.5 block text-[13px] text-[#9FB4D1]">
          Skip intro · sound off
        </a>
      </div>
    </div>
  );
}
