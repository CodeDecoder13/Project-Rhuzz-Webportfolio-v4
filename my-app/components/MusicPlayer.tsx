"use client";

import { useEffect, useRef, useState } from "react";

export const PLAY_EVENT = "rhuzz:play";

export default function MusicPlayer() {
  const audio = useRef<HTMLAudioElement>(null);
  const [state, setState] = useState<"off" | "on" | "missing">("off");

  const play = () => {
    const a = audio.current;
    if (!a) return;
    a.volume = 0.5;
    a.play().then(() => setState("on"), () => setState("missing"));
    try { localStorage.setItem("snd", "1"); } catch {}
  };
  const pause = () => {
    audio.current?.pause();
    setState("off");
    try { localStorage.setItem("snd", "0"); } catch {}
  };

  // Gate "with sound" fires this synchronously inside its click, so play() keeps the user gesture.
  useEffect(() => {
    window.addEventListener(PLAY_EVENT, play);
    return () => window.removeEventListener(PLAY_EVENT, play);
  }, []);

  return (
    <>
      <audio ref={audio} loop preload="none" src="/assets/music/soundtrack.mp3" onError={() => setState("missing")} />
      <button
        type="button"
        aria-label="Toggle soundtrack"
        aria-pressed={state === "on"}
        onClick={() => (state === "on" ? pause() : play())}
        className="fixed bottom-5 right-5 z-[15] flex items-center gap-3 rounded-full bg-ink py-2 pl-2 pr-[18px] text-white shadow-[0_10px_30px_rgba(11,27,51,.35)]"
      >
        <span
          className={`size-10 rounded-full border border-[#2c3d5e] bg-[radial-gradient(circle,var(--blue)_0_18%,#0B1B33_19%_24%,transparent_25%),repeating-radial-gradient(#111_0_2px,#1d2a44_3px_4px)] ${state === "on" ? "animate-[spin_3s_linear_infinite]" : ""}`}
        />
        <span className="text-left">
          <small className="block font-mono text-[9px] tracking-[.1em] text-[#9FB4D1]">PORTFOLIO SOUNDTRACK</small>
          <b className="font-mono text-xs font-semibold uppercase tracking-[.06em]">
            {state === "on" ? "Playing" : state === "missing" ? "Add track" : "Sound off"}
          </b>
        </span>
      </button>
    </>
  );
}
