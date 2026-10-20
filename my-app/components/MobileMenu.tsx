"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function MobileMenu({ links, cv }: { links: readonly (readonly [string, string])[]; cv: string }) {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const item = "block rounded-[10px] px-3 py-3 hover:bg-line";
  return (
    <div className="col-start-3 justify-self-end min-[801px]:hidden">
      <button
        ref={button}
        type="button"
        aria-label="Menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(!open)}
        className="grid size-11 place-items-center rounded-full border-[1.5px] border-ink bg-paper"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          {open ? <path d="M4 4l12 12M16 4L4 16" /> : <path d="M3 5h14M3 10h14M3 15h14" />}
        </svg>
      </button>
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="mono absolute inset-x-4 top-full rounded-[14px] border-[1.5px] border-ink bg-paper p-2 text-sm shadow-[0_12px_32px_rgba(11,27,51,.18)]"
        >
          {links.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} className={item}>
              {label}
            </Link>
          ))}
          <a href={cv} onClick={() => setOpen(false)} className={item}>
            Download CV
          </a>
        </nav>
      )}
    </div>
  );
}
