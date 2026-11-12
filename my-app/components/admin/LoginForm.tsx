"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { field, pill } from "./styles";

async function post(url: string, body?: object) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body ?? {}),
  }).catch(() => null);
  const data = await res?.json().catch(() => null);
  return {
    ok: !!res?.ok,
    error: (data?.error as string) ?? "Something went wrong.",
  };
}

// Step 1: email + 6-digit PIN. Step 2: the 6-digit code emailed to the admin.
export default function LoginForm() {
  const router = useRouter();
  const [step, setStep] = useState<"pin" | "code">("pin");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [wait, setWait] = useState(0);
  const codeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step === "code") codeRef.current?.focus();
  }, [step]);

  useEffect(() => {
    if (wait <= 0) return;
    const t = setTimeout(() => setWait(wait - 1), 1000);
    return () => clearTimeout(t);
  }, [wait]);

  async function submitPin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    setError("");
    const r = await post("/api/admin/login", {
      email: f.get("email"),
      pin: f.get("pin"),
      website: f.get("website"),
    });
    setBusy(false);
    if (!r.ok) return setError(r.error);
    setStatus("We emailed you a 6-digit code. It expires in 10 minutes.");
    setWait(60);
    setStep("code");
  }

  async function submitCode(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    setError("");
    const r = await post("/api/admin/login/verify", { code: f.get("code") });
    setBusy(false);
    if (r.ok) return router.refresh();
    setError(r.error);
  }

  async function resend() {
    setError("");
    const r = await post("/api/admin/login/resend");
    if (!r.ok) return setError(r.error);
    setStatus("A new code was sent.");
    setWait(60);
  }

  return (
    <div className="grid max-w-sm gap-4">
      <p role="status" aria-live="polite" className={status ? "" : "sr-only"}>
        {status}
      </p>
      {step === "pin" ? (
        <form onSubmit={submitPin} className="grid gap-4">
          <label className="grid gap-1">
            <span className="mono">Email</span>
            <input
              name="email"
              type="email"
              required
              autoComplete="username"
              className={field}
            />
          </label>
          <label className="grid gap-1">
            <span className="mono">PIN</span>
            <input
              name="pin"
              type="password"
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              required
              autoComplete="current-password"
              className={field}
            />
          </label>
          <input
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />
          {error && (
            <p role="alert" className="text-fail">
              {error}
            </p>
          )}
          <button disabled={busy} className={pill}>
            {busy ? "Checking…" : "Continue"}
          </button>
        </form>
      ) : (
        <form onSubmit={submitCode} className="grid gap-4">
          <label className="grid gap-1">
            <span className="mono">6-digit code</span>
            <input
              ref={codeRef}
              name="code"
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              required
              autoComplete="one-time-code"
              className={field}
            />
          </label>
          {error && (
            <p role="alert" className="text-fail">
              {error}
            </p>
          )}
          <div className="flex flex-wrap gap-3">
            <button disabled={busy} className={pill}>
              {busy ? "Signing in…" : "Sign in"}
            </button>
            <button
              type="button"
              onClick={resend}
              disabled={wait > 0}
              className={pill}
            >
              {wait > 0 ? `Resend code (${wait}s)` : "Resend code"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
