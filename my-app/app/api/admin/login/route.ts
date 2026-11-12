import { clientIp, sameOrigin, setCookie } from "@/lib/adminAuth";
import { count, hit } from "@/lib/dbLimit";
import { missingAuth, missingDb } from "@/lib/env";
import { sendCode, userByEmail } from "@/lib/otp";
import { dummyVerify, verifyPin } from "@/lib/pin";
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

  // Counters live in Postgres so every serverless instance shares them. Any DB error blocks the attempt (fail closed).
  const failed = async () => {
    // the IP is always counted; the email only while that IP is under its cap, so one source cannot fill the table
    await hit(ipKey, FAIL_WINDOW);
    if ((await count(ipKey, FAIL_WINDOW)) <= MAX_FAILS)
      await hit(mailKey, FAIL_WINDOW);
    return invalid();
  };

  try {
    if (
      body.website ||
      (await count(ipKey, FAIL_WINDOW)) >= MAX_FAILS ||
      (await count(mailKey, FAIL_WINDOW)) >= MAX_FAILS
    )
      return await invalid(); // honeypot or locked out: indistinguishable from a wrong PIN
    if (!email || !/^\d{6}$/.test(pin)) return await failed();

    const user = await userByEmail(email);
    const ok = user ? verifyPin(pin, user.pin_hash) : dummyVerify(pin);
    if (!user || !ok) return await failed();
    if ((await hit(`otp:${email}`, HOUR)) > 5)
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
