import { pool } from "./db";

// Durable rate limiter shared by every serverless instance (the in-memory one in rateLimit.ts resets on cold
// start, so an attacker could dodge it). One row per key; the window restarts once it has expired. Callers that
// guard login MUST fail closed: if this throws, treat the request as blocked.
const OLD = "now() - make_interval(secs => $2::double precision)";

// Count one attempt for `key`; resolves to the number of attempts in the current window (including this one).
export async function hit(key: string, windowMs: number): Promise<number> {
  const secs = windowMs / 1000;
  const { rows } = await pool().query<{ count: number }>(
    `INSERT INTO rate_limits (key, window_start, count) VALUES ($1, now(), 1)
     ON CONFLICT (key) DO UPDATE SET
       count = CASE WHEN rate_limits.window_start < ${OLD} THEN 1 ELSE rate_limits.count + 1 END,
       window_start = CASE WHEN rate_limits.window_start < ${OLD} THEN now() ELSE rate_limits.window_start END
     RETURNING count`,
    [key.slice(0, 300), secs],
  );
  if (Math.random() < 0.01)
    void pool()
      .query(
        "DELETE FROM rate_limits WHERE window_start < now() - interval '1 day'",
      )
      .catch(() => {});
  return rows[0].count;
}

// Attempts so far in the window, without counting a new one.
export async function count(key: string, windowMs: number): Promise<number> {
  const { rows } = await pool().query<{ count: number }>(
    `SELECT count FROM rate_limits WHERE key = $1 AND window_start >= ${OLD}`,
    [key.slice(0, 300), windowMs / 1000],
  );
  return rows[0]?.count ?? 0;
}
