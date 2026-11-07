"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { site } from "@/content/site";

// Asks for AI consent every time the Contact page is opened (pages stay mounted when you navigate away, so the path change re-arms it).
// The chat behind the modal is inert until the visitor agrees. Declining leaves the email and booking routes open.
export default function ConsentGate({ children }: { children: ReactNode }) {
  const path = usePathname();
  const [state, setState] = useState<"ask" | "yes" | "no">("ask");
  // false while prerendering (no document for the portal), true once hydrated
  const client = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const agree = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- re-ask on every visit
    if (path === "/contact") setState("ask");
  }, [path]);

  useEffect(() => {
    if (state !== "ask") return;
    agree.current?.focus();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setState("no");
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [state]);

  return (
    <>
      {state === "no" ? (
        <div className="grid h-[min(640px,calc(100svh-340px))] min-h-[420px] place-content-center gap-4 text-center">
          <p className="display text-[28px] leading-tight">AI chat is off</p>
          <p className="mx-auto max-w-[36ch] text-muted">
            No problem. Email me at{" "}
            <a href={`mailto:${site.email}`} className="text-blue underline">
              {site.email}
            </a>{" "}
            or book a call, and I&rsquo;ll reply within {site.replyTime}.
          </p>
          <button
            type="button"
            onClick={() => setState("ask")}
            className="mono mx-auto rounded-full border-[1.5px] border-ink px-4 py-2 text-[12px] uppercase transition-transform active:scale-[.96]"
          >
            Review AI consent
          </button>
        </div>
      ) : (
        <div inert={state !== "yes"}>{children}</div>
      )}
      {client &&
        state === "ask" &&
        createPortal(
          <div className="fixed inset-0 z-40 grid place-items-center bg-ink/75 p-4 backdrop-blur-sm">
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="ai-consent-title"
              className="w-full max-w-[520px] animate-[rise_.25s_cubic-bezier(.23,1,.32,1)_both] rounded-[16px] border-[1.5px] border-ink bg-card p-6 shadow-[8px_8px_0_var(--blue)]"
            >
              <p className="mono text-blue">AI consent</p>
              <h2
                id="ai-consent-title"
                className="display mb-3 mt-1 text-[32px] leading-[1.05]"
              >
                Before you chat
              </h2>
              <p className="text-muted">
                This chat is an AI assistant. To answer you and pass your
                message on, it gathers what you type, such as your name, email
                and message.
              </p>
              <ul className="my-4 grid gap-2 text-[15px]">
                {[
                  "Used only to answer you and to contact you back.",
                  "Kept safe: encrypted in transit, never sold, never shared beyond what running the chat needs.",
                  "Optional. You can decline and email me instead.",
                ].map((t) => (
                  <li key={t} className="flex gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-blue"
                    />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mb-5 text-sm text-muted">
                Read the full{" "}
                <Link
                  href="/ai-consent"
                  target="_blank"
                  className="text-blue underline"
                >
                  AI Consent
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  target="_blank"
                  className="text-blue underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  ref={agree}
                  type="button"
                  onClick={() => setState("yes")}
                  className="rounded-full border-[1.5px] border-blue bg-blue px-6 py-3 font-mono text-[13px] uppercase tracking-[.06em] text-white transition-transform active:scale-[.97]"
                >
                  I agree, start chat
                </button>
                <button
                  type="button"
                  onClick={() => setState("no")}
                  className="rounded-full border-[1.5px] border-ink px-6 py-3 font-mono text-[13px] uppercase tracking-[.06em] transition-transform active:scale-[.97]"
                >
                  No thanks
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
