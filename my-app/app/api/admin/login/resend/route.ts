import { clientIp, pendingUser, sameOrigin } from "@/lib/adminAuth";
import { resendWait, sendCode, userById } from "@/lib/otp";
import { hit } from "@/lib/dbLimit";

const err = (error: string, status: number) =>
  Response.json({ error }, { status });

export async function POST(req: Request) {
  if (!sameOrigin(req)) return err("Forbidden.", 403);
  const id = await pendingUser(); // proves the PIN step was passed
  if (!id) return err("Unauthorized.", 401);
  try {
    const user = await userById(id);
    if (!user) return err("Unauthorized.", 401);
    if (
      (await hit(`otp:${user.email}`, 60 * 60 * 1000)) > 5 ||
      (await hit(`otpip:${clientIp(req)}`, 60 * 60 * 1000)) > 10
    )
      return err("Too many codes requested. Please try again later.", 429);
    if ((await resendWait(id)) > 0)
      return err("Please wait a minute before requesting another code.", 429);
    if (await sendCode(user)) return err("Could not send the code.", 502);
    return Response.json({ ok: true });
  } catch {
    return err("Could not send the code.", 502);
  }
}
