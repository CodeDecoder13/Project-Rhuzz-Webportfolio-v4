import {
  clearCookie,
  clientIp,
  pendingUser,
  sameOrigin,
  setCookie,
} from "@/lib/adminAuth";
import { checkCode } from "@/lib/otp";
import { allow } from "@/lib/rateLimit";
import { makeToken } from "@/lib/token";

const err = (error: string, status: number) =>
  Response.json({ error }, { status });

export async function POST(req: Request) {
  if (!sameOrigin(req)) return err("Forbidden.", 403);
  const id = await pendingUser();
  if (!id) return err("Unauthorized.", 401); // no PIN step, no code step
  const win = 15 * 60 * 1000;
  if (
    !allow(`code:${id}`, Date.now(), 10, win) ||
    !allow(`codeip:${clientIp(req)}`, Date.now(), 20, win)
  )
    return err("Too many attempts. Please try again later.", 429);

  let body: { code?: unknown };
  try {
    body = await req.json();
  } catch {
    return err("Invalid request.", 400);
  }
  const code = typeof body.code === "string" ? body.code : "";
  if (!/^\d{6}$/.test(code)) return err("Enter the 6-digit code.", 400);

  try {
    if (!(await checkCode(id, code)))
      return err("Invalid or expired code.", 401);
  } catch {
    return err("Could not verify the code.", 503);
  }
  const res = Response.json({ ok: true });
  res.headers.append(
    "Set-Cookie",
    setCookie("session", makeToken("session", id)),
  );
  res.headers.append("Set-Cookie", clearCookie("pending"));
  return res;
}
