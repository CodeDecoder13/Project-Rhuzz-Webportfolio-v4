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
      <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-[.06em]">
        <span className="max-[1100px]:sr-only">Viewing as</span>
        <select
          value={view}
          onChange={(e) => change(e.target.value)}
          className="rounded-full border-[1.5px] border-ink bg-paper px-3 py-[9px] font-mono text-xs uppercase tracking-[.06em] text-ink"
        >
          {views.map((v: View) => (
            <option key={v} value={v}>
              {viewMeta[v].opt}
            </option>
          ))}
        </select>
      </label>
      <p role="status" aria-live="polite" className="sr-only">
        {said}
      </p>
    </div>
  );
}
