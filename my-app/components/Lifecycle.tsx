"use client";

import { useRef, useState } from "react";
import { lifecycle } from "@/content/lifecycle";
import HowStage from "./HowStage";
import { Section, SectionHead } from "./Section";

// Steps on the left, a live ticket scene on the right. Nothing plays by itself: the panel shows an idle cover
// until the visitor hovers or focuses a step (desktop) or taps one (mobile), and returns to the cover when they leave.
export default function Lifecycle() {
  const [active, setActive] = useState<number | null>(null);
  const list = useRef<HTMLOListElement>(null);

  return (
    <Section fit>
      <SectionHead n="04" title="How I work" />
      <div
        onPointerLeave={(e) => e.pointerType === "mouse" && setActive(null)}
        className="grid gap-5 min-[801px]:grid-cols-2 min-[801px]:items-start min-[801px]:gap-12"
      >
        <div className="sticky top-[72px] z-[4] h-[212px] min-[801px]:top-28 min-[801px]:order-last min-[801px]:h-[min(660px,calc(100svh-290px))]">
          <HowStage active={active} />
        </div>
        <ol
          ref={list}
          className="ml-4 border-l-[1.5px] border-ink pl-6 min-[801px]:ml-6 min-[801px]:pl-10"
        >
          {lifecycle.map((step, i) => {
            const on = i === active;
            const last = i === lifecycle.length - 1;
            return (
              <li
                key={step.name}
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
                className="reveal relative cursor-default pb-[clamp(4px,1svh,14px)] outline-none last:pb-0"
              >
                <span
                  aria-hidden="true"
                  className={`absolute -left-[31px] top-[clamp(16px,3svh,30px)] size-3 rounded-full border-[1.5px] border-ink transition-colors duration-200 min-[801px]:-left-[47px] ${on ? "bg-blue" : "bg-paper"}`}
                />
                <div
                  className={`flex items-start gap-5 rounded-[14px] border-[1.5px] p-[clamp(8px,1.5svh,22px)] transition-[transform,box-shadow,border-color] duration-200 ease-out active:scale-[.99] ${last ? "bg-sky" : "bg-card"} ${on ? "-translate-y-0.5 border-blue shadow-[6px_6px_0_var(--ink)]" : "border-ink"}`}
                >
                  <b className="display text-[clamp(24px,5svh,52px)] leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </b>
                  <div>
                    <h3 className="mono">
                      {step.name}
                      {last && " ✓"}
                    </h3>
                    <p className="mt-1 text-[clamp(12px,1.75svh,16px)] leading-snug text-ink/80">
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
