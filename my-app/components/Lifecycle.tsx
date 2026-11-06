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
    <Section>
      <SectionHead n="04" title="How I work" />
      <div
        onPointerLeave={(e) => e.pointerType === "mouse" && setActive(null)}
        className="grid gap-5 min-[801px]:grid-cols-2 min-[801px]:items-start min-[801px]:gap-12"
      >
        <div className="sticky top-[72px] z-[4] h-[212px] min-[801px]:top-24 min-[801px]:order-last min-[801px]:h-[min(660px,80svh)]">
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
                className="reveal relative cursor-default pb-4 outline-none last:pb-0"
              >
                <span
                  aria-hidden="true"
                  className={`absolute -left-[31px] top-7 size-3 rounded-full border-[1.5px] border-ink transition-colors duration-200 min-[801px]:-left-[47px] ${on ? "bg-blue" : "bg-paper"}`}
                />
                <div
                  className={`flex items-start gap-5 rounded-[14px] border-[1.5px] p-5 transition-[transform,box-shadow,border-color] duration-200 ease-out active:scale-[.99] min-[801px]:p-6 ${last ? "bg-sky" : "bg-card"} ${on ? "-translate-y-0.5 border-blue shadow-[6px_6px_0_var(--ink)]" : "border-ink"}`}
                >
                  <b className="display text-[40px] min-[801px]:text-[56px]">
                    {String(i + 1).padStart(2, "0")}
                  </b>
                  <div>
                    <h3 className="mono">
                      {step.name}
                      {last && " ✓"}
                    </h3>
                    <p className="mt-1.5 text-ink/80">{step.text}</p>
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
