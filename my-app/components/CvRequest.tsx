"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { copy } from "@/content/personas";
import { useView } from "@/lib/visitor";
import { cvRoles, cvSchema } from "@/lib/validators";

type Errors = Partial<Record<"name" | "role" | "email" | "consent", string>>;

const input =
  "w-full rounded-[10px] border-[1.5px] border-ink bg-card px-3.5 py-2.5 text-[16px]";

// "Get my CV" button + modal. The resume is emailed (never linked), so we ask who is taking it first.
export default function CvRequest({
  children,
  className,
  onClose,
}: {
  children: ReactNode;
  className?: string;
  onClose?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState("");
  const view = useView();
  const trigger = useRef<HTMLButtonElement>(null);
  const first = useRef<HTMLInputElement>(null);

  const close = () => {
    setOpen(false);
    setDone(null);
    setErrors({});
    setServerError("");
    onClose?.();
  };
  // The Esc listener below is set up once per open; this keeps it calling the latest close().
  const closeRef = useRef(close);
  useEffect(() => {
    closeRef.current = close;
  });

  useEffect(() => {
    if (!open) return;
    const t = trigger.current;
    first.current?.focus();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && closeRef.current();
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      t?.focus();
    };
  }, [open]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const data = {
      name: String(f.get("name") ?? ""),
      role: String(f.get("role") ?? ""),
      email: String(f.get("email") ?? ""),
      consent: f.get("consent") === "on",
      website: String(f.get("hp_trap") ?? ""),
    };
    const parsed = cvSchema.safeParse(data);
    if (!parsed.success) {
      const next: Errors = {};
      for (const i of parsed.error.issues) {
        const k = i.path[0] as keyof Errors;
        next[k] ??= i.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setServerError("");
    setBusy(true);
    try {
      const res = await fetch("/api/cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (res.ok) setDone(parsed.data.email);
      else {
        const j = await res.json().catch(() => null);
        if (j?.fields?.email?.[0]) setErrors({ email: j.fields.email[0] });
        else
          setServerError(j?.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const err = (k: keyof Errors) =>
    errors[k] && (
      <p id={`cv-${k}-err`} role="alert" className="mt-1 text-sm text-fail">
        {errors[k]}
      </p>
    );
  const aria = (k: keyof Errors) => ({
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? `cv-${k}-err` : undefined,
  });

  return (
    <>
      <button
        ref={trigger}
        type="button"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className={className}
      >
        {children}
      </button>
      {open &&
        createPortal(
          <div
            onClick={(e) => e.target === e.currentTarget && close()}
            className="fixed inset-0 z-40 grid place-items-center overflow-y-auto bg-ink/75 p-4 backdrop-blur-sm"
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="cv-title"
              className="my-auto w-full max-w-[520px] animate-[rise_.25s_cubic-bezier(.23,1,.32,1)_both] rounded-[16px] border-[1.5px] border-ink bg-card p-6 shadow-[8px_8px_0_var(--blue)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="mono text-blue">Resume</p>
                  <h2
                    id="cv-title"
                    className="display mb-1 mt-1 text-[34px] leading-[1.05]"
                  >
                    {done ? "Check your inbox" : "Get my resume"}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="btn-fill mono rounded-full border-[1.5px] border-ink bg-card px-3 py-1 text-[11px] uppercase"
                >
                  Close
                </button>
              </div>

              {done ? (
                <div className="mt-3 grid gap-4">
                  <p>
                    I just emailed my resume to{" "}
                    <b className="break-all">{done}</b>. It should arrive in a
                    minute. If you don&rsquo;t see it, check your spam folder.
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    className="btn-fill justify-self-start rounded-full border-[1.5px] border-blue bg-blue px-6 py-3 font-mono text-[13px] uppercase tracking-[.06em] text-white transition-transform active:scale-[.97]"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="mt-3 grid gap-4">
                  <p className="text-muted">
                    Tell me who you are and I&rsquo;ll email you the PDF.
                  </p>
                  <div>
                    <label htmlFor="cv-name" className="mono mb-1.5 block">
                      Name
                    </label>
                    <input
                      ref={first}
                      id="cv-name"
                      name="name"
                      autoComplete="name"
                      className={input}
                      {...aria("name")}
                    />
                    {err("name")}
                  </div>
                  <div>
                    <label htmlFor="cv-role" className="mono mb-1.5 block">
                      Your role
                    </label>
                    <select
                      id="cv-role"
                      name="role"
                      defaultValue={copy.cvRole[view]}
                      className={input}
                      {...aria("role")}
                    >
                      <option value="" disabled>
                        Select…
                      </option>
                      {cvRoles.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                    {err("role")}
                  </div>
                  <div>
                    <label htmlFor="cv-email" className="mono mb-1.5 block">
                      Email
                    </label>
                    <input
                      id="cv-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      className={input}
                      {...aria("email")}
                    />
                    {err("email")}
                  </div>
                  {/* Honeypot: hidden from people and assistive tech, bots fill it. */}
                  <div aria-hidden="true" className="absolute -left-[9999px]">
                    <input
                      type="text"
                      name="hp_trap"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <label className="flex cursor-pointer items-start gap-3 text-sm leading-snug">
                      <input
                        type="checkbox"
                        name="consent"
                        className="mt-0.5 size-5 shrink-0 accent-[var(--blue)]"
                        {...aria("consent")}
                      />
                      <span>
                        <b>Disclaimer:</b> by requesting my resume you agree to
                        share your name, role and email with me. I use them only
                        to send the resume and to follow up, and I never sell or
                        share them. See the{" "}
                        <Link
                          href="/privacy"
                          target="_blank"
                          className="text-blue underline"
                        >
                          Privacy Policy
                        </Link>
                        .
                      </span>
                    </label>
                    {err("consent")}
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="submit"
                      disabled={busy}
                      className="btn-fill rounded-full border-[1.5px] border-blue bg-blue px-6 py-3 font-mono text-[13px] uppercase tracking-[.06em] text-white transition-transform active:scale-[.97] disabled:opacity-60"
                    >
                      {busy ? "Sending…" : "Email me the resume"}
                    </button>
                    {serverError && (
                      <p role="alert" className="text-sm text-fail">
                        {serverError}
                      </p>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
