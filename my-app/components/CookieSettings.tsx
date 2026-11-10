"use client";

import { CONSENT_EVENT } from "@/lib/consent";

export default function CookieSettings({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(CONSENT_EVENT))}
      className={className}
    >
      Cookie settings
    </button>
  );
}
