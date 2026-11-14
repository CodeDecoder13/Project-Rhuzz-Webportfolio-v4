"use client";

import { useEffect, useId, useRef, useState } from "react";
import { viewMeta, views } from "@/content/personas";
import { isView, setView, useRestoreView, useView } from "@/lib/visitor";

// "Viewing as" switcher: a custom listbox (ARIA combobox pattern) so the open menu matches the site, not the OS.
export default function ViewSwitch({ className = "" }: { className?: string }) {
  const view = useView();
  const [said, setSaid] = useState("");
  const [open, setOpen] = useState(false);
  const [cur, setCur] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const id = useId();
  useRestoreView();

  const pick = (v: string) => {
    setOpen(false);
    root.current?.querySelector("button")?.focus();
    if (!isView(v) || v === view) return;
    setView(v);
    window.scrollTo(0, 0);
    setSaid(`Now showing the ${viewMeta[v].now} view`);
  };

  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) =>
      root.current?.contains(e.target as Node) || setOpen(false);
    document.addEventListener("pointerdown", away);
    return () => document.removeEventListener("pointerdown", away);
  }, [open]);

  const show = () => {
    setCur(Math.max(0, views.indexOf(view)));
    setOpen(true);
  };

  const onKey = (e: React.KeyboardEvent) => {
    const n = views.length;
    if (e.key === "Escape")
      return open ? (setOpen(false), e.preventDefault()) : undefined;
    if (e.key === "Tab") return setOpen(false);
    if (!["ArrowDown", "ArrowUp", "Home", "End", "Enter", " "].includes(e.key))
      return;
    e.preventDefault();
    if (!open) return show();
    if (e.key === "Enter" || e.key === " ") return pick(views[cur]);
    setCur(
      e.key === "Home"
        ? 0
        : e.key === "End"
          ? n - 1
          : (cur + (e.key === "ArrowDown" ? 1 : n - 1)) % n,
    );
  };

  return (
    <div className={className}>
      <div
        ref={root}
        className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[.14em] text-ink/60"
      >
        <span aria-hidden="true" className="max-[1400px]:sr-only">
          Viewing as
        </span>
        <div className="relative">
          <button
            type="button"
            role="combobox"
            aria-label="Viewing as"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={`${id}-list`}
            aria-activedescendant={open ? `${id}-${cur}` : undefined}
            onClick={() => (open ? setOpen(false) : show())}
            onKeyDown={onKey}
            className="group relative flex cursor-pointer items-center rounded-full border-[1.5px] border-ink/80 bg-card/80 py-[9px] pl-8 pr-9 font-mono text-[11px] uppercase tracking-[.1em] text-ink shadow-[0_1px_0_rgba(255,255,255,.6)_inset,0_6px_16px_-8px_rgba(11,27,51,.35)] backdrop-blur transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out hover:-translate-y-px hover:border-blue hover:bg-paper hover:shadow-[0_10px_22px_-10px_rgba(31,87,214,.55)] focus-visible:border-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue active:translate-y-0 active:scale-[.98] aria-expanded:border-blue aria-expanded:bg-paper"
          >
            <span
              aria-hidden="true"
              className="absolute left-3.5 size-1.5 rounded-full bg-blue shadow-[0_0_0_3px_color-mix(in_srgb,var(--blue)_22%,transparent)]"
            />
            {viewMeta[view].opt}
            <svg
              aria-hidden="true"
              viewBox="0 0 12 12"
              className="absolute right-3.5 size-3 transition-transform duration-200 group-aria-expanded:rotate-180"
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
          </button>
          <ul
            id={`${id}-list`}
            role="listbox"
            aria-label="Viewing as"
            className={`absolute left-0 top-[calc(100%+8px)] z-50 w-[270px] origin-top-left rounded-2xl border-[1.5px] border-ink bg-card/95 p-1.5 shadow-[0_24px_48px_-16px_rgba(11,27,51,.45)] backdrop-blur-xl transition-[opacity,transform] duration-150 ease-out max-[800px]:w-full ${open ? "scale-100 opacity-100" : "pointer-events-none invisible scale-95 opacity-0"}`}
          >
            {views.map((v, i) => {
              const m = viewMeta[v];
              const on = v === view;
              return (
                <li
                  key={v}
                  id={`${id}-${i}`}
                  role="option"
                  aria-selected={on}
                  onPointerMove={() => setCur(i)}
                  onClick={() => pick(v)}
                  className={`flex cursor-pointer items-center gap-3 rounded-[11px] px-3 py-2.5 normal-case tracking-normal transition-colors duration-100 ${i === cur ? "bg-ink text-paper" : "text-ink"}`}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[11px] uppercase tracking-[.1em]">
                      {m.opt}
                    </span>
                    <span
                      className={`mt-0.5 block font-sans text-[12px] leading-snug ${i === cur ? "text-paper/75" : "text-muted"}`}
                    >
                      {m.pick}
                    </span>
                  </span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 12 12"
                    className={`size-3.5 shrink-0 ${on ? "" : "invisible"}`}
                  >
                    <path
                      d="m2.5 6.5 2.3 2.3 4.7-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <p role="status" aria-live="polite" className="sr-only">
        {said}
      </p>
    </div>
  );
}
