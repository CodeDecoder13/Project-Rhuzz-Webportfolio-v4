import { z } from "zod";
import { allow } from "@/lib/rateLimit";
import { sendContact } from "@/lib/mail";
import { contactSchema } from "@/lib/validators";

const fail = (error: string, status: number, extra?: object) =>
  Response.json({ error, ...extra }, { status });

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (!allow(ip))
    return fail("Too many messages. Please try again later.", 429);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return fail("Invalid request.", 400);
  }
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success)
    return fail("Invalid input.", 400, {
      fields: z.flattenError(parsed.error).fieldErrors,
    });

  const { name, email, subject, message, website } = parsed.data;
  if (website) return Response.json({ ok: true }); // honeypot: pretend success, send nothing

  const err = await sendContact({ name, email, subject, message });
  if (err) return fail(err, err.startsWith("Contact is") ? 500 : 502);
  return Response.json({ ok: true });
}
