import { after } from "next/server";
import { z } from "zod";
import { notifyOwner, sendCv } from "@/lib/cvMail";
import { checkEmail } from "@/lib/emailCheck";
import { allow } from "@/lib/rateLimit";
import { cvSchema } from "@/lib/validators";

const fail = (error: string, status: number, extra?: object) =>
  Response.json({ error, ...extra }, { status });

// Emails the resume to a visitor who gave their name, role and a deliverable address, then notifies Rhuzzel.
export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const body = await req.json().catch(() => null);
  const parsed = cvSchema.safeParse(body);
  if (!parsed.success)
    return fail("Invalid input.", 400, {
      fields: z.flattenError(parsed.error).fieldErrors,
    });
  const { name, role, email, website } = parsed.data;
  if (website) return Response.json({ ok: true }); // honeypot: pretend success, send nothing

  const bad = await checkEmail(email);
  if (bad) return fail(bad, 400, { fields: { email: [bad] } });

  // Only requests that would actually send an email count, so typos and validation errors never use up the allowance.
  // Per connection 8 an hour; ponytail: in-memory per serverless instance, so it only slows casual abuse.
  if (!allow(`cv:${ip}`, Date.now(), 8))
    return fail("Too many requests. Please try again in about an hour.", 429);

  // The same address can't be used to flood someone else's inbox: 2 resumes per address per hour.
  // Counted only once the address passed the checks, so typos don't use up the allowance.
  if (!allow(`cv-mail:${email.toLowerCase()}`, Date.now(), 2))
    return fail(
      "That address already received my resume. Check your inbox and spam folder.",
      429,
    );

  const err = await sendCv({ name, role, email });
  if (err)
    return fail(
      err,
      err.includes("not configured") || err.includes("missing") ? 500 : 502,
    );
  after(() => notifyOwner({ name, role, email })); // sent once the response is out
  return Response.json({ ok: true });
}
