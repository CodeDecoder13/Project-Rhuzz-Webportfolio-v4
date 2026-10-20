import Link from "next/link";
import { site } from "@/content/site";

const a = "text-sky hover:underline";

export default function Footer() {
  return (
    // pb-24 keeps the credit line clear of the fixed music pill.
    <footer className="mono flex flex-wrap justify-between gap-3 bg-ink px-4 pb-24 pt-7 text-paper min-[801px]:px-8">
      {/* Year is hardcoded: Cache Components rejects new Date() in server components. */}
      <span>© 2026 {site.name}</span>
      <span>
        <Link href="/terms" className={a}>
          Terms &amp; Conditions
        </Link>{" "}
        ·{" "}
        <Link href="/privacy" className={a}>
          Privacy Policy
        </Link>
      </span>
      <span className="flex gap-3">
        <a href={site.github} aria-label="GitHub profile" className={a}>
          GitHub
        </a>
        <a href={site.linkedin} aria-label="LinkedIn profile" className={a}>
          LinkedIn
        </a>
        <a href={`mailto:${site.email}`} aria-label="Send an email" className={a}>
          Email
        </a>
      </span>
      <span className="w-full opacity-70">
        Music: &quot;Volatile Reaction&quot; by Kevin MacLeod (incompetech.com), CC BY 4.0
      </span>
    </footer>
  );
}
