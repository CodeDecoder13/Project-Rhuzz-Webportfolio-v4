const WINDOW_MS = 60 * 60 * 1000;
const MAX = 5;
const hits = new Map<string, number[]>();

// ponytail: per-instance memory. It resets on cold start and isn't shared across serverless
// instances, so it only slows casual abuse. Swap for Upstash/Vercel KV if that matters.
export function allow(key: string, now = Date.now()) {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  const ok = recent.length < MAX;
  if (ok) recent.push(now);
  hits.set(key, recent);
  return ok;
}
