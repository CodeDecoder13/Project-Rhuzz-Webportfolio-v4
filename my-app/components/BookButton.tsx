"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { readConsent } from "@/lib/consent";

// Opens the Calendly page in a modal. The iframe fills the panel, so there is no blank band around it.
// Without a Calendly URL (or JS) it is a plain link, so the button never dead-ends.
export default function BookButton({
  url,
  className,
  describedBy,
  label = "Book me",
}: {
  url: string;
  className: string;
  describedBy: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLAnchorElement>(null);
  const close = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const t = trigger.current;
    close.current?.focus();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      t?.focus();
    };
  }, [open]);

  if (!url)
    return (
      <Link
        href="/contact"
        aria-describedby={describedBy}
        className={className}
      >
        {label}
      </Link>
    );

  const src = `${url}?hide_gdpr_banner=1&embed_domain=${typeof location === "undefined" ? "" : location.hostname}&embed_type=PopupText&primary_color=1F5FBF&text_color=0B1B33`;
  return (
    <>
      <a
        ref={trigger}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-describedby={describedBy}
        aria-haspopup="dialog"
        onClick={(e) => {
          // Without "Accept all" nothing from Calendly loads here: the link opens Calendly in a new tab.
          if (readConsent() !== "all") return;
          e.preventDefault();
          setOpen(true);
        }}
        className={className}
      >
        {label}
      </a>
      {open &&
        createPortal(
          <div
            onClick={(e) => e.target === e.currentTarget && setOpen(false)}
            className="fixed inset-0 z-40 grid place-items-center bg-ink/75 p-0 backdrop-blur-sm min-[801px]:p-3"
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Book a call"
              className="flex h-dvh w-full max-w-[1240px] min-[801px]:h-[min(96dvh,860px)] animate-[rise_.25s_cubic-bezier(.23,1,.32,1)_both] flex-col overflow-hidden rounded-none min-[801px]:rounded-[16px] border-[1.5px] border-ink bg-card shadow-[8px_8px_0_var(--blue)]"
            >
              <div className="flex shrink-0 items-center justify-between border-b-[1.5px] border-ink bg-sky px-4 py-2.5">
                <span className="mono">Book a call · 30 min</span>
                <button
                  ref={close}
                  type="button"
                  onClick={() => setOpen(false)}
                  className="btn-fill mono rounded-full border-[1.5px] border-ink bg-card px-3 py-1"
                >
                  Close
                </button>
              </div>
              <iframe
                title="Book a call with Rhuzzel on Calendly"
                src={src}
                className="min-h-0 w-full flex-1 border-0"
              />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
