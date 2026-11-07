import { Resend } from "resend";

type Mail = {
  name: string;
  email: string;
  subject: string;
  message: string;
  tag?: string;
};

// User input goes into HTML, so every value is escaped first.
const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const INK = "#0B1B33";
const BLUE = "#1F5FBF";
const SKY = "#8DBBF2";
const PAPER = "#F2F6FB";
const mono = "'Courier New',Courier,monospace";
const sans = "Arial,Helvetica,sans-serif";

const label = (t: string) =>
  `<div style="font:700 11px ${mono};letter-spacing:.12em;text-transform:uppercase;color:${BLUE};margin:0 0 4px">${t}</div>`;

// Neo-brutalist email: thick ink borders and a hard blue offset shadow (drawn with borders so it survives Gmail/Outlook).
// Inline styles and tables only, which is what mail clients reliably render.
export function renderMail({
  name,
  email,
  subject,
  message,
  tag = "Portfolio",
}: Mail) {
  const n = esc(name);
  const e = esc(email);
  return `<!doctype html><html><body style="margin:0;padding:0;background:${PAPER}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAPER}"><tr><td align="center" style="padding:32px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border:3px solid ${INK};border-right:9px solid ${BLUE};border-bottom:9px solid ${BLUE};border-radius:14px">
  <tr><td style="background:${INK};padding:18px 24px;border-bottom:3px solid ${INK};border-radius:10px 10px 0 0">
    <span style="font:700 26px ${sans};color:#ffffff;letter-spacing:-.01em">rhuzz<span style="color:${SKY}">.</span></span>
    <span style="float:right;font:700 11px ${mono};letter-spacing:.12em;text-transform:uppercase;color:${INK};background:${SKY};border:2px solid ${SKY};border-radius:999px;padding:5px 12px">${esc(tag)}</span>
  </td></tr>
  <tr><td style="padding:28px 24px 8px">
    ${label("New message")}
    <div style="font:900 30px/1.1 ${sans};color:${INK};letter-spacing:-.02em">${esc(subject)}</div>
  </td></tr>
  <tr><td style="padding:16px 24px 8px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:2px solid ${INK};border-radius:10px;background:${PAPER}">
      <tr>
        <td style="padding:14px 16px;border-right:2px solid ${INK};width:50%;vertical-align:top">${label("From")}<div style="font:700 16px ${sans};color:${INK}">${n}</div></td>
        <td style="padding:14px 16px;vertical-align:top">${label("Email")}<a href="mailto:${e}" style="font:700 16px ${sans};color:${BLUE};text-decoration:underline;word-break:break-all">${e}</a></td>
      </tr>
    </table>
  </td></tr>
  <tr><td style="padding:16px 24px 8px">
    ${label("Message")}
    <div style="border:2px solid ${INK};border-left:8px solid ${BLUE};border-radius:10px;padding:16px 18px;font:16px/1.65 ${sans};color:${INK};background:#ffffff">${esc(message).replace(/\r?\n/g, "<br>")}</div>
  </td></tr>
  <tr><td style="padding:20px 24px 28px">
    <a href="mailto:${e}?subject=${encodeURIComponent(`Re: ${subject}`)}" style="display:inline-block;background:${BLUE};color:#ffffff;font:700 13px ${mono};letter-spacing:.08em;text-transform:uppercase;text-decoration:none;border:3px solid ${INK};border-right-width:6px;border-bottom-width:6px;border-radius:999px;padding:12px 24px">Reply to ${n.split(" ")[0]} &rarr;</a>
  </td></tr>
  <tr><td style="background:${PAPER};border-top:2px solid ${INK};padding:14px 24px;border-radius:0 0 10px 10px;font:11px ${mono};letter-spacing:.06em;color:#51627A;text-transform:uppercase">Sent from the rhuzz portfolio &middot; hit reply to answer directly</td></tr>
</table>
</td></tr></table></body></html>`;
}

// Shared by the contact API and the chat tool. Returns an error message, or null when sent.
export async function sendContact(a: Mail) {
  const { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO) return "Contact is not configured.";
  const { error } = await new Resend(RESEND_API_KEY).emails.send({
    from: CONTACT_FROM || "Portfolio <onboarding@resend.dev>",
    to: CONTACT_TO,
    replyTo: a.email,
    subject: `[${a.tag ?? "Portfolio"}] ${a.subject}`,
    html: renderMail(a),
    text: `From: ${a.name} <${a.email}>\nSubject: ${a.subject}\n\n${a.message}`, // plain-text fallback
  });
  return error ? "Could not send your message. Please try again." : null;
}
