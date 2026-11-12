import { cookies } from "next/headers";
import { TTL_S, readToken, type Kind } from "./token";

export const COOKIE = "admin_session";
export const PENDING = "admin_pending";

const attrs = (maxAge: number) =>
  `Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${
    process.env.NODE_ENV === "production" ? "; Secure" : ""
  }`;

export const setCookie = (kind: Kind, token: string) =>
  `${kind === "session" ? COOKIE : PENDING}=${token}; ${attrs(TTL_S[kind])}`;
export const clearCookie = (kind: Kind) =>
  `${kind === "session" ? COOKIE : PENDING}=; ${attrs(0)}`;

export async function sessionUser() {
  return readToken("session", (await cookies()).get(COOKIE)?.value);
}
export const isAdmin = async () => !!(await sessionUser());

export async function pendingUser() {
  return readToken("pending", (await cookies()).get(PENDING)?.value);
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

export const clientIp = (req: Request) =>
  req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";

// Every mutating admin route calls this first: null means "go ahead". Only a full session passes.
export async function guard(req: Request): Promise<Response | null> {
  if (!sameOrigin(req))
    return Response.json({ error: "Forbidden." }, { status: 403 });
  if (!(await isAdmin()))
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  return null;
}
