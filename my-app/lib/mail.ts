import { Resend } from "resend";
import {
  BLUE,
  INK,
  button,
  esc,
  grid,
  label,
  sans,
  shell,
  title,
} from "./emailKit";

type Mail = {
  name: string;
  email: string;
  subject: string;
  message: string;
  tag?: string;
};

export const from = () =>
  process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>";

// Message from a visitor (chat assistant or contact API) to Rhuzzel.
export function renderMail({
  name,
  email,
  subject,
  message,
  tag = "Portfolio",
}: Mail) {
  const n = esc(name);
  const e = esc(email);
  return shell(
    tag,
    [
      `${label("New message")}${title(esc(subject))}`,
      grid([
        ["From", n],
        [
          "Email",
          `<a href="mailto:${e}" style="color:${BLUE};text-decoration:underline">${e}</a>`,
        ],
      ]),
      `${label("Message")}<div style="border:2px solid ${INK};border-left:8px solid ${BLUE};border-radius:10px;padding:16px 18px;font:16px/1.65 ${sans};color:${INK};background:#ffffff">${esc(message).replace(/\r?\n/g, "<br>")}</div>`,
      button(
        `mailto:${e}?subject=${encodeURIComponent(`Re: ${subject}`)}`,
        `Reply to ${n.split(" ")[0]} &rarr;`,
      ),
    ],
    "Sent from the rhuzz portfolio &middot; hit reply to answer directly",
  );
}

// Shared by the contact API and the chat tool. Returns an error message, or null when sent.
export async function sendContact(a: Mail) {
  const { RESEND_API_KEY, CONTACT_TO } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO) return "Contact is not configured.";
  const { error } = await new Resend(RESEND_API_KEY).emails.send({
    from: from(),
    to: CONTACT_TO,
    replyTo: a.email,
    subject: `[${a.tag ?? "Portfolio"}] ${a.subject}`,
    html: renderMail(a),
    text: `From: ${a.name} <${a.email}>\nSubject: ${a.subject}\n\n${a.message}`, // plain-text fallback
  });
  return error ? "Could not send your message. Please try again." : null;
}
