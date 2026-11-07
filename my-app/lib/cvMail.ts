import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { Resend } from "resend";
import { about } from "@/content/about";
import { site } from "@/content/site";
import {
  BLUE,
  INK,
  MUTED,
  button,
  esc,
  grid,
  label,
  pill,
  sans,
  shell,
  title,
} from "./emailKit";
import { from } from "./mail";

const base = "https://rhuzz.online";
// The PDF lives outside /public so it can only be reached through this email flow.
const CV_PATH = join(process.cwd(), "private", "Paramio_cv-updated.pdf");

type Req = { name: string; role: string; email: string };

// To the visitor: the resume is attached; the body is a short, friendly intro with the next steps.
function visitorHtml({ name }: Req) {
  const first = esc(name.split(" ")[0]);
  const now = about.experience[0];
  return shell(
    "Resume",
    [
      `${label("Your resume")}${title(`Thanks for stopping by, ${first}.`)}`,
      `<p style="margin:0;font:16px/1.65 ${sans};color:${INK}">My resume is attached to this email as a PDF. Here is the short version of who I am, so you have it in one place.</p>`,
      `<div style="border:2px solid ${INK};border-left:8px solid ${BLUE};border-radius:10px;padding:16px 18px;font:16px/1.65 ${sans};color:${INK}"><b>${esc(site.name)}</b><br>${esc(site.role)}<br><span style="color:${MUTED}">${esc(about.statement)} I build web systems, then try to break them.</span></div>`,
      grid([
        [
          "Now",
          `${esc(now.role.replace(" (Contractor)", ""))}<br><span style="font-weight:400;color:${MUTED}">${esc(now.org.split(" (")[0])}</span>`,
        ],
        ["Stack", "Laravel, Vue 3, Next.js, Playwright"],
        ["Shipped", "OmniPOS, Whale Wallet, AirZen"],
        [
          "Based in",
          `${esc(site.location)}<br><span style="font-weight:400;color:${MUTED}">Replies in ${esc(site.replyTime)}</span>`,
        ],
      ]),
      `${label("Next step")}${button(esc(site.calendly), "Book a 30-min call &rarr;")}${button(`${base}/projects`, "See my projects", "#ffffff", INK)}`,
      `<p style="margin:0;font:14px/1.6 ${sans};color:${MUTED}">Questions? Just reply to this email and it reaches me directly. Find me on <a href="${esc(site.github)}" style="color:${BLUE}">GitHub</a> or <a href="${esc(site.linkedin)}" style="color:${BLUE}">LinkedIn</a>.</p>`,
    ],
    "You got this because you requested my resume on rhuzz.online.<br>I only use your details to follow up. Not you? Ignore this email.",
  );
}

// To Rhuzzel: who took the resume, so he can follow up.
function ownerHtml({ name, role, email }: Req, when: string) {
  const n = esc(name);
  const e = esc(email);
  return shell(
    "CV sent",
    [
      `${label("Resume requested")}${title(`${n} got your CV`)}`,
      grid([
        ["Name", n],
        ["Role", pill(esc(role))],
        [
          "Email",
          `<a href="mailto:${e}" style="color:${BLUE};text-decoration:underline">${e}</a>`,
        ],
        ["When", esc(when)],
      ]),
      `<p style="margin:0;font:14px/1.6 ${sans};color:${MUTED}">They agreed to share their name, role and email with you. The resume was emailed to this address.</p>`,
      button(
        `mailto:${e}?subject=${encodeURIComponent("Thanks for requesting my resume")}`,
        `Reply to ${n.split(" ")[0]} &rarr;`,
      ) +
        button(
          `https://www.google.com/search?q=${encodeURIComponent(`${name} ${role} linkedin`)}`,
          "Look them up",
          "#ffffff",
          INK,
        ),
    ],
    "Sent from the rhuzz portfolio &middot; resume request",
  );
}

// Emails the CV to the visitor, then tells Rhuzzel. Returns an error message, or null on success.
export async function sendCv(r: Req) {
  const { RESEND_API_KEY, CONTACT_TO } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO)
    return "Resume emails are not configured.";
  const resend = new Resend(RESEND_API_KEY);
  let pdf: Buffer;
  try {
    pdf = await readFile(CV_PATH);
  } catch {
    return "The resume file is missing on the server.";
  }
  const { error } = await resend.emails.send({
    from: from(),
    to: r.email,
    replyTo: CONTACT_TO,
    subject: `${site.name}: resume`,
    html: visitorHtml(r),
    text: `Hi ${r.name.split(" ")[0]},\n\nThanks for stopping by. My resume is attached as a PDF.\n\nBook a call: ${site.calendly}\nPortfolio: ${base}\n\n${site.name}\n${site.role}`,
    attachments: [{ filename: "Rhuzzel-Paramio-Resume.pdf", content: pdf }],
  });
  if (error)
    return "Could not send the email. Please check the address and try again.";
  // The visitor already has the resume; a failed heads-up to me must not turn that into an error.
  const when =
    new Date().toLocaleString("en-PH", {
      timeZone: "Asia/Manila",
      dateStyle: "medium",
      timeStyle: "short",
    }) + " (PH time)";
  await resend.emails
    .send({
      from: from(),
      to: CONTACT_TO,
      replyTo: r.email,
      subject: `[CV] ${r.name} (${r.role}) got your resume`,
      html: ownerHtml(r, when),
      text: `${r.name} requested your resume.\nRole: ${r.role}\nEmail: ${r.email}\nWhen: ${when}`,
    })
    .catch(() => null);
  return null;
}
