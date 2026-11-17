"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import CountUp from "./CountUp";

type Status = "passed" | "failed" | "flaky" | "skipped";
type T = { n: string; s: Status; ms: number };

const KEY = "proof-replay";
const cell: Record<Status, string> = {
  passed: "bg-blue",
  failed: "bg-fail",
  flaky: "bg-blue/50",
  skipped: "bg-muted/40",
};
const label: Record<Status, string> = {
  passed: "PASS",
  failed: "FAIL",
  flaky: "FLAKY",
  skipped: "SKIP",
};

// Without JS (and before hydration) this is the final static report. The replay is an optional extra
// that plays the last verified run back from the real data, once per visitor session.
export default function ReportLive({
  tests,
  counts,
  date,
  live,
  duration,
}: {
  tests: T[];
  counts: {
    total: number;
    passed: number;
    failed: number;
    skipped: number;
    flaky: number;
  };
  date: string;
  live: boolean;
  duration: string;
}) {
  const total = tests.length;
  const [step, setStep] = useState(total); // tests revealed so far; total = the final state
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");
  const [msg, setMsg] = useState("");
  const logRef = useRef<HTMLOListElement>(null);
  // False on the server, so the button only exists once JS runs.
  const canOffer = useSyncExternalStore(
    () => () => {},
    () => {
      try {
        return !sessionStorage.getItem(KEY);
      } catch {
        return true;
      }
    },
    () => false,
  );

  const summary = `${counts.passed} passed, ${counts.failed} failed, ${counts.skipped} skipped in ${duration}`;

  useEffect(() => {
    if (phase !== "running") return;
    const id = setTimeout(
      () => {
        setStep(step + 1);
        if (step + 1 >= total) {
          setPhase("done");
          setMsg(`Replay finished: ${summary}.`);
        }
      },
      // Capped so the whole replay stays around 8 s however many tests there are.
      Math.min(30 + tests[step].ms / 25, 140, 8000 / total),
    );
    return () => clearTimeout(id);
  }, [phase, step, total, tests, summary]);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [step]);

  // The button unmounts when the replay starts; hand keyboard focus to the log.
  const started = phase !== "idle";
  useEffect(() => {
    if (started) logRef.current?.focus({ preventScroll: true });
  }, [started]);

  function start() {
    if (phase === "running") return;
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !total) {
      setStep(total);
      setPhase("done");
      setMsg(`Replay finished: ${summary}.`);
      return;
    }
    setStep(0);
    setPhase("running");
    setMsg("Replay started.");
  }

  const shown = tests.slice(0, step);
  const passedSoFar = shown.filter((t) => t.s === "passed").length;

  return (
    <>
      <div className="display mt-3 text-[clamp(36px,min(9vw,11svh),120px)] leading-none">
        {phase === "idle" ? (
          <CountUp value={counts.passed} />
        ) : (
          <span>{passedSoFar}</span>
        )}
        <span className="text-[.4em]">/{counts.total}</span>
        <span className="mono ml-3 align-middle text-muted">tests passed</span>
      </div>
      {/* One cell per real test, in run order, coloured by its real result. */}
      <div
        aria-hidden="true"
        className="my-[clamp(8px,1.8svh,20px)] grid grid-cols-[repeat(auto-fill,minmax(9px,1fr))] gap-[3px]"
      >
        {tests.map((t, i) => (
          <span
            key={i}
            className={`h-[clamp(6px,1.2svh,10px)] rounded-[2px] ${i < step ? cell[t.s] : "bg-line"}`}
          />
        ))}
      </div>
      <p role="status" className="sr-only">
        {msg ||
          `${counts.passed} of ${counts.total} tests passed, ${counts.failed} failed, ${counts.skipped} skipped.`}
      </p>
      {canOffer && phase === "idle" && (
        <p className="mb-[clamp(8px,1.6svh,20px)]">
          <button
            type="button"
            onClick={start}
            className="btn-fill mono rounded-full border-[1.5px] border-ink px-4 py-2"
          >
            Run replay
          </button>
        </p>
      )}
      {phase !== "idle" && (
        <div className="mono mb-[clamp(8px,1.6svh,20px)] text-[13px]">
          <p className="text-muted">
            Replay of {live ? "the last verified run" : "a recorded run"},{" "}
            {date}
          </p>
          <ol
            ref={logRef}
            tabIndex={0}
            aria-label="Replay log"
            className="mt-2 max-h-[9.5em] overflow-y-auto rounded-[8px] border border-line px-3 py-2"
          >
            {shown.map((t, i) => (
              <li key={i} className="flex justify-between gap-3">
                <span className="min-w-0 truncate">
                  <b
                    className={`mr-2 font-medium ${t.s === "failed" ? "text-fail" : t.s === "passed" ? "text-blue" : "text-muted"}`}
                  >
                    {label[t.s]}
                  </b>
                  {t.n}
                </span>
                <span className="shrink-0 text-muted">{t.ms}ms</span>
              </li>
            ))}
            {phase === "done" && (
              <li className="mt-1 border-t border-line pt-1">
                Done: {summary}
              </li>
            )}
          </ol>
        </div>
      )}
    </>
  );
}
