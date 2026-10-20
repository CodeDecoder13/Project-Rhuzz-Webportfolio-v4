import { Resend } from "resend";
import { z } from "zod";
import { allow } from "@/lib/rateLimit";
import { contactSchema } from "@/lib/validators";

const fail = (error: string, status: number, extra?: object) => Response.json({ error, ...extra }, { status });

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (!allow(ip)) return fail("Too many messages. Please try again later.", 429);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return fail("Invalid request.", 400);
  }
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return fail("Invalid input.", 400, { fields: z.flattenError(parsed.error).fieldErrors });

  const { name, email, subject, message, website } = parsed.data;
  if (website) return Response.json({ ok: true }); // honeypot: pretend success, send nothing

  const { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO) return fail("Contact form is not configured.", 500);

  // Plain-text body: no HTML, so user input needs no escaping.
  const { error } = await new Resend(RESEND_API_KEY).emails.send({
    from: CONTACT_FROM || "Portfolio <onboarding@resend.dev>",
    to: CONTACT_TO,
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });
  if (error) return fail("Could not send your message. Please try again.", 502);
  return Response.json({ ok: true });
}
