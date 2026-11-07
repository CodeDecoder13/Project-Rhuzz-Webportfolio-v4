import { Resend } from "resend";

// Shared by the contact API and the chat tool. Plain-text body: no HTML, so user input needs no escaping.
// Returns an error message, or null when sent.
export async function sendContact(a: {
  name: string;
  email: string;
  subject: string;
  message: string;
  tag?: string;
}) {
  const { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO) return "Contact is not configured.";
  const { error } = await new Resend(RESEND_API_KEY).emails.send({
    from: CONTACT_FROM || "Portfolio <onboarding@resend.dev>",
    to: CONTACT_TO,
    replyTo: a.email,
    subject: `[${a.tag ?? "Portfolio"}] ${a.subject}`,
    text: `From: ${a.name} <${a.email}>\n\n${a.message}`,
  });
  return error ? "Could not send your message. Please try again." : null;
}
