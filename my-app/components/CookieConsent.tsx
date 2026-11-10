"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CONSENT_EVENT,
  CONSENT_KEY,
  readConsent,
  type Consent,
} from "@/lib/consent";

// Shown to every new visitor until they choose. The choice stays in this browser; "Cookie settings" in the footer reopens it.
export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read the stored choice once hydrated
    if (readConsent() === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_EVENT, reopen);
  }, []);

  const choose = (c: Consent) => {
    try {
      localStorage.setItem(CONSENT_KEY, c);
    } catch {}
    setOpen(false);
  };

  if (!open) return null;
  return (
    <section
      aria-label="Cookie consent"
      className="fixed inset-x-4 bottom-4 z-[16] max-w-[460px] animate-[rise_.25s_cubic-bezier(.23,1,.32,1)_both] rounded-[16px] border-[1.5px] border-ink bg-card p-5 shadow-[6px_6px_0_var(--blue)] min-[801px]:inset-x-auto min-[801px]:left-4"
    >
      <p className="mono text-blue">Cookies</p>
      <h2 className="display mb-2 mt-1 text-[26px] leading-[1.05]">
        Your choice
      </h2>
      <p className="text-[14px] leading-snug text-muted">
        I use a few essential items to remember your theme, sound and consent.
        No analytics, no ads. &ldquo;Accept all&rdquo; also lets the booking
        window load Calendly inside the page, which may set its own cookies.
        Read the{" "}
        <Link href="/cookies" className="text-blue underline">
          Cookie Policy
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={() => choose("all")}
          className="btn-fill rounded-full border-[1.5px] border-blue bg-blue px-5 py-2.5 font-mono text-xs uppercase tracking-[.06em] text-white"
        >
          Accept all
        </button>
        <button
          type="button"
          onClick={() => choose("necessary")}
          className="btn-fill rounded-full border-[1.5px] border-ink px-5 py-2.5 font-mono text-xs uppercase tracking-[.06em]"
        >
          Necessary only
        </button>
      </div>
    </section>
  );
}
