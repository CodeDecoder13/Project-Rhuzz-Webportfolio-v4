"use client";

import { useState } from "react";
import { viewMeta, views, type View } from "@/content/personas";
import { isView, setView, useRestoreView, useView } from "@/lib/visitor";

// "Viewing as" switcher. A native select: keyboard, screen reader and the mobile wheel picker come for free.
export default function ViewSwitch({ className = "" }: { className?: string }) {
  const view = useView();
  const [said, setSaid] = useState("");
  useRestoreView();

  const change = (v: string) => {
    if (!isView(v)) return;
    setView(v);
    window.scrollTo(0, 0);
    setSaid(`Now showing the ${viewMeta[v].now} view`);
  };

  return (
    <div className={className}>
      <label className="group flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[.14em] text-ink/60">
        <span className="max-[1400px]:sr-only">Viewing as</span>
        <span className="relative inline-flex items-center">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 size-1.5 rounded-full bg-blue shadow-[0_0_0_3px_color-mix(in_srgb,var(--blue)_22%,transparent)]"
          />
          <select
            value={view}
            onChange={(e) => change(e.target.value)}
            className="cursor-pointer appearance-none rounded-full border-[1.5px] border-ink/80 bg-card/80 py-[9px] pl-8 pr-9 font-mono text-[11px] uppercase tracking-[.1em] text-ink shadow-[0_1px_0_rgba(255,255,255,.6)_inset,0_6px_16px_-8px_rgba(11,27,51,.35)] backdrop-blur transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out hover:-translate-y-px hover:border-blue hover:bg-paper hover:shadow-[0_10px_22px_-10px_rgba(31,87,214,.55)] focus-visible:border-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue active:translate-y-0 active:scale-[.98]"
          >
            {views.map((v: View) => (
              <option key={v} value={v}>
                {viewMeta[v].opt}
              </option>
            ))}
          </select>
          <svg
            aria-hidden="true"
            viewBox="0 0 12 12"
            className="pointer-events-none absolute right-3.5 size-3 text-ink transition-transform duration-200 group-hover:translate-y-px"
          >
            <path
              d="M2.5 4.5 6 8l3.5-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </label>
      <p role="status" aria-live="polite" className="sr-only">
        {said}
      </p>
    </div>
  );
}
