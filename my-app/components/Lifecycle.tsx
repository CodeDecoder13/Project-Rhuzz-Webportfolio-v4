"use client";

import { useRef, useState } from "react";
import { tracks, type Track } from "@/content/lifecycle";
import HowStage from "./HowStage";
import { Section, SectionHead } from "./Section";

// Two ways I work (tabs). Steps on the left fill the column; the ticket scene sits on the right. Nothing plays by
// itself: the panel shows an idle cover until a step is hovered or focused (desktop) or tapped (mobile).
export default function Lifecycle() {
  const [track, setTrack] = useState<Track>("dev");
  const [active, setActive] = useState<number | null>(null);
  const list = useRef<HTMLOListElement>(null);
  const steps = tracks[track].steps;

  const choose = (t: Track) => {
    setTrack(t);
    setActive(null);
  };

  return (
    <Section fit>
      <SectionHead n="04" title="How I work" />
      <div
        role="tablist"
        aria-label="Way of working"
        className="mb-[clamp(8px,2svh,20px)] flex w-full max-w-md gap-1 rounded-full border-[1.5px] border-ink bg-white p-1 min-[801px]:w-fit"
      >
        {(Object.keys(tracks) as Track[]).map((t) => (
          <button
            key={t}
            role="tab"
            type="button"
            aria-selected={track === t}
            onClick={() => choose(t)}
            className={`mono flex-1 rounded-full px-4 py-[clamp(6px,1.2svh,10px)] transition-[background-color,color,transform] duration-200 ease-out active:scale-[.97] min-[801px]:flex-none ${track === t ? "bg-ink text-paper" : "text-ink hover:bg-sky/40"}`}
          >
            {tracks[t].label}
          </button>
        ))}
      </div>
      <div
        onPointerLeave={(e) => e.pointerType === "mouse" && setActive(null)}
        className="grid gap-5 min-[801px]:h-[min(680px,calc(100svh-345px))] min-[801px]:grid-cols-2 min-[801px]:gap-12"
      >
        <div className="sticky top-[72px] z-[4] h-[248px] min-[801px]:static min-[801px]:order-last min-[801px]:mt-[clamp(8px,3svh,32px)] min-[801px]:h-[calc(100%-clamp(8px,3svh,32px))]">
          <HowStage track={track} active={active} />
        </div>
        <ol
          ref={list}
          className="ml-4 flex flex-col border-l-[1.5px] border-ink pl-6 min-[801px]:ml-6 min-[801px]:h-full min-[801px]:pl-10"
        >
          {steps.map((step, i) => {
            const on = i === active;
            const last = i === steps.length - 1;
            return (
              <li
                key={`${track}-${step.name}`}
                tabIndex={0}
                onPointerEnter={(e) =>
                  e.pointerType === "mouse" && setActive(i)
                }
                onFocus={() => setActive(i)}
                onBlur={(e) =>
                  !list.current?.contains(e.relatedTarget as Node | null) &&
                  setActive(null)
                }
                onClick={() => setActive(i)}
                className="reveal relative flex cursor-default pb-[clamp(4px,1svh,14px)] outline-none last:pb-0 min-[801px]:flex-[1_1_auto]"
              >
                <span
                  aria-hidden="true"
                  className={`absolute -left-[31px] top-[clamp(16px,3svh,30px)] size-3 rounded-full border-[1.5px] border-ink transition-colors duration-200 min-[801px]:-left-[47px] ${on ? "bg-blue" : "bg-paper"}`}
                />
                <div
                  className={`flex w-full items-center gap-5 rounded-[14px] border-[1.5px] p-[clamp(6px,1.25svh,20px)] transition-[transform,box-shadow,border-color] duration-200 ease-out active:scale-[.99] ${last ? "bg-sky" : "bg-card"} ${on ? "-translate-y-0.5 border-blue shadow-[6px_6px_0_var(--ink)]" : "border-ink"}`}
                >
                  <b className="display text-[clamp(24px,5svh,52px)] leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </b>
                  <div>
                    <h3 className="mono">
                      {step.name}
                      {last && " ✓"}
                    </h3>
                    <p className="mt-1 text-[clamp(12px,1.7svh,17px)] leading-snug text-ink/80">
                      {step.text}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
