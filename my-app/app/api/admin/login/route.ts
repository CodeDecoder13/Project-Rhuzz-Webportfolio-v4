import { clientIp, sameOrigin, setCookie } from "@/lib/adminAuth";
import { missingAuth, missingDb } from "@/lib/env";
import { sendCode, userByEmail } from "@/lib/otp";
import { dummyVerify, verifyPin } from "@/lib/pin";
import { allow, recent } from "@/lib/rateLimit";
import { makeToken } from "@/lib/token";

const FAIL_WINDOW = 15 * 60 * 1000;
const MAX_FAILS = 5;
const HOUR = 60 * 60 * 1000;

const fail = (error: string, status: number) =>
  Response.json({ error }, { status });

// Wrong PIN, unknown email, bad input and lockout all look exactly the same (and equally slow).
async function invalid() {
  await new Promise((r) => setTimeout(r, 300));
  return fail("Invalid email or PIN.", 401);
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail("Forbidden.", 403);
  if (missingAuth().length || missingDb().length)
    return fail("Admin is not configured.", 503);

  let body: { email?: unknown; pin?: unknown; website?: unknown };
  try {
    body = await req.json();
  } catch {
    return fail("Invalid request.", 400);
  }
  const email =
    typeof body.email === "string"
      ? body.email.trim().toLowerCase().slice(0, 254)
      : "";
  const pin = typeof body.pin === "string" ? body.pin : "";
  const ipKey = `pinfail:ip:${clientIp(req)}`;
  const mailKey = `pinfail:${email}`;
  const failed = () => {
    allow(ipKey, Date.now(), Infinity, FAIL_WINDOW);
    allow(mailKey, Date.now(), Infinity, FAIL_WINDOW);
    return invalid();
  };

  if (
    body.website ||
    recent(ipKey, FAIL_WINDOW) >= MAX_FAILS ||
    recent(mailKey, FAIL_WINDOW) >= MAX_FAILS
  )
    return invalid(); // honeypot or locked out: indistinguishable from a wrong PIN
  if (!email || !/^\d{6}$/.test(pin)) return failed();

  try {
    const user = await userByEmail(email);
    const ok = user ? verifyPin(pin, user.pin_hash) : dummyVerify(pin);
    if (!user || !ok) return failed();
    if (!allow(`otp:${email}`, Date.now(), 5, HOUR))
      return fail("Too many codes requested. Please try again later.", 429);
    if (await sendCode(user)) return fail("Could not send the code.", 502);
    const res = Response.json({ ok: true });
    res.headers.append(
      "Set-Cookie",
      setCookie("pending", makeToken("pending", user.id)),
    );
    return res;
  } catch {
    return fail("Admin is not configured. Run the database setup first.", 503);
  }
}
