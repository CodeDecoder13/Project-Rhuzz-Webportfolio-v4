import { createHash, createHmac, timingSafeEqual } from "node:crypto";

// Signed, expiring tokens. `kind` is part of the signature, so a "pending" token can never pass as a "session".
export type Kind = "session" | "pending";
export const TTL_S: Record<Kind, number> = {
  session: 60 * 60 * 12,
  pending: 60 * 10,
};

const sign = (data: string) =>
  createHmac("sha256", process.env.ADMIN_SESSION_SECRET!)
    .update(data)
    .digest("base64url");

// Both sides are hashed first so the comparison is constant-time whatever the lengths.
export const same = (a: string, b: string) =>
  timingSafeEqual(
    createHash("sha256").update(a).digest(),
    createHash("sha256").update(b).digest(),
  );

export function makeToken(kind: Kind, userId: string, now = Date.now()) {
  const exp = Math.floor(now / 1000) + TTL_S[kind];
  const body = `${userId}.${exp}`;
  return `${body}.${sign(`${kind}.${body}`)}`;
}

// Returns the user id when the token is valid, unexpired and of the right kind.
export function readToken(
  kind: Kind,
  token: string | undefined,
  now = Date.now(),
): string | null {
  if (!token || !process.env.ADMIN_SESSION_SECRET) return null;
  const [id, exp, mac] = token.split(".");
  if (!id || !exp || !mac || !/^\d+$/.test(exp)) return null;
  if (Number(exp) * 1000 < now) return null;
  return same(mac, sign(`${kind}.${id}.${exp}`)) ? id : null;
}

// Only the hash of a one-time code is ever stored.
export const hashCode = (userId: string, code: string) =>
  sign(`otp.${userId}.${code}`);
