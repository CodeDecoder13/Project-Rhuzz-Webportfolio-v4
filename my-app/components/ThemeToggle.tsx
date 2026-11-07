"use client";

import { useSyncExternalStore, type MouseEvent } from "react";

const watch = (cb: () => void) => {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => mo.disconnect();
};
const isDark = () => document.documentElement.dataset.theme === "dark";

// The inline script in the root layout sets data-theme before first paint, so the icon swap is pure CSS (.theme-sun / .theme-moon).
// This only handles the click: persist the choice and animate the switch as a circle opening from the button.
export default function ThemeToggle() {
  const dark = useSyncExternalStore(watch, isDark, () => false);

  const toggle = (e: MouseEvent<HTMLButtonElement>) => {
    const next = dark ? "light" : "dark";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {}
    };
    const r = e.currentTarget.getBoundingClientRect();
    document.documentElement.style.setProperty(
      "--tx",
      `${r.left + r.width / 2}px`,
    );
    document.documentElement.style.setProperty(
      "--ty",
      `${r.top + r.height / 2}px`,
    );
    if (
      !document.startViewTransition ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      apply();
    else document.startViewTransition(apply);
  };

  return (
    <button
      type="button"
      aria-label="Dark mode"
      aria-pressed={dark}
      onClick={toggle}
      className="relative grid size-11 place-items-center rounded-full border-[1.5px] border-ink bg-paper transition-transform duration-150 ease-out active:scale-[.94]"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="theme-sun absolute size-5"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="theme-moon absolute size-5"
      >
        <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
      </svg>
    </button>
  );
}
