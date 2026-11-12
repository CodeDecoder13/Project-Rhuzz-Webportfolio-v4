import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const COOKIE = "admin_session";
export const TTL_S = 60 * 60 * 8;

const sign = (data: string) =>
  createHmac("sha256", process.env.ADMIN_SESSION_SECRET!)
    .update(data)
    .digest("base64url");

// Both sides are hashed first so the comparison is constant-time whatever the lengths.
const same = (a: string, b: string) =>
  timingSafeEqual(
    createHash("sha256").update(a).digest(),
    createHash("sha256").update(b).digest(),
  );

export const passwordOk = (given: string) =>
  !!process.env.ADMIN_PASSWORD && same(given, process.env.ADMIN_PASSWORD);

export function makeToken(now = Date.now()) {
  const exp = String(Math.floor(now / 1000) + TTL_S);
  return `${exp}.${sign(exp)}`;
}

export function tokenOk(token: string | undefined, now = Date.now()) {
  if (!token || !process.env.ADMIN_SESSION_SECRET) return false;
  const [exp, mac] = token.split(".");
  if (!exp || !mac || !/^\d+$/.test(exp) || Number(exp) * 1000 < now)
    return false;
  return same(mac, sign(exp));
}

export async function isAdmin() {
  return tokenOk((await cookies()).get(COOKIE)?.value);
}

// CSRF defence on top of SameSite=Lax: a mutating request must come from this site.
export function sameOrigin(req: Request) {
  const o = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (!o || !host) return false;
  try {
    return new URL(o).host === host;
  } catch {
    return false;
  }
}

// Every mutating admin route calls this first: null means "go ahead".
export async function guard(req: Request): Promise<Response | null> {
  if (!sameOrigin(req))
    return Response.json({ error: "Forbidden." }, { status: 403 });
  if (!(await isAdmin()))
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  return null;
}
