import Link from "next/link";
import { site } from "@/content/site";
import { copy } from "@/content/personas";
import { Swap } from "./Section";
import CookieSettings from "./CookieSettings";
import CvRequest from "./CvRequest";

const explore = [
  ["Home", "/"],
  ["About", "/about"],
  ["Projects", "/projects"],
  ["QA & testing", "/qa-testing", "all dev"],
  ["Tech stack", "/tech-stack", "all dev"],
  ["Certifications", "/certifications", "all dev recruiter"],
  ["Contact", "/contact"],
] as const;

const link = "text-sky hover:underline";
const head = "mono mb-3 text-[#9FB4D1]";

export default function Footer() {
  return (
    <footer className="island-light border-t border-white/10 bg-ink px-4 pt-16 text-paper min-[801px]:px-8">
      <div className="grid grid-cols-1 gap-10 min-[801px]:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="display text-[64px] text-paper">
            rhuzz<i className="not-italic text-sky">.</i>
          </Link>
          <p className="mt-3 max-w-[34ch] text-[#C9D6E8]">
            <Swap c={copy.footerTag} />
          </p>
          <p className="mono mt-4 text-[#9FB4D1]">
            {site.location} · Replies in {site.replyTime}
          </p>
        </div>
        <nav aria-label="Footer">
          <h2 className={head}>Explore</h2>
          <ul className="grid gap-2">
            {explore.map(([label, href, only]) => (
              <li key={href} data-for={only}>
                <Link href={href} className={link}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className={head}>Connect</h2>
          <ul className="grid gap-2">
            <li>
              <a href={`mailto:${site.email}`} className={link}>
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.github}
                aria-label="GitHub profile"
                className={link}
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={site.linkedin}
                aria-label="LinkedIn profile"
                className={link}
              >
                LinkedIn
              </a>
            </li>
            <li>
              <CvRequest className={link}>Get my CV</CvRequest>
            </li>
          </ul>
        </div>
        <div>
          <h2 className={head}>Legal</h2>
          <ul className="grid gap-2">
            <li>
              <Link href="/terms" className={link}>
                Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <Link href="/privacy" className={link}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/ai-consent" className={link}>
                AI Consent
              </Link>
            </li>
            <li>
              <Link href="/cookies" className={link}>
                Cookie Policy
              </Link>
            </li>
            <li>
              <CookieSettings className={link} />
            </li>
          </ul>
        </div>
      </div>
      {/* pb-24 keeps the bottom bar clear of the fixed music pill. */}
      <div className="mono mt-14 flex flex-wrap justify-between gap-3 border-t border-white/15 pb-24 pt-6 text-[#9FB4D1]">
        {/* Year is hardcoded: Cache Components rejects new Date() in server components. */}
        <span>© 2026 {site.name}</span>
        <span>Built with Next.js · Tailwind · Motion</span>
        <a href="#" className={link}>
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
