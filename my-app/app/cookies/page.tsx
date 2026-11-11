import type { Metadata } from "next";
import Legal, { H2, P } from "@/components/Legal";
import CookieSettings from "@/components/CookieSettings";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Cookie Policy" };

const rows = [
  ["cookie-consent", "Remembers your cookie choice", "localStorage", "Until you clear it"],
  ["theme", "Remembers light or dark mode", "localStorage", "Until you clear it"],
  ["persona", "Remembers which version of the site you chose (recruiter, business, developer or everything)", "localStorage", "Until you clear it"],
  ["snd", "Remembers whether the soundtrack is on", "localStorage", "Until you clear it"],
  ["gate", "Remembers you passed the intro screen", "sessionStorage", "Until you close the tab"],
];

export default function CookiesPage() {
  return (
    <Legal title="Cookie Policy">
      <H2>1. What this covers</H2>
      <P>
        Cookies and similar browser storage are small pieces of data a website keeps in your browser. This policy explains
        what this site stores, why, and the choice you have. It sits alongside the Privacy Policy, written with the
        Philippine Data Privacy Act of 2012 (RA 10173) in mind.
      </P>
      <H2>2. What the site stores</H2>
      <div className="reveal overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-left text-[15px]">
          <thead>
            <tr className="mono border-b-[1.5px] border-ink">
              <th className="py-2 pr-3">Name</th>
              <th className="py-2 pr-3">Purpose</th>
              <th className="py-2 pr-3">Where</th>
              <th className="py-2">How long</th>
            </tr>
          </thead>
          <tbody className="text-muted">
            {rows.map(([n, p, w, h]) => (
              <tr key={n} className="border-b border-ink/20 align-top">
                <td className="mono py-2 pr-3 text-ink">{n}</td>
                <td className="py-2 pr-3">{p}</td>
                <td className="py-2 pr-3">{w}</td>
                <td className="py-2">{h}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <P>
        These are essential or preference items. They stay in your browser and are not sent to a server. The site sets no
        analytics, advertising or tracking cookies.
      </P>
      <H2>3. Third parties</H2>
      <P>
        If you choose &ldquo;Accept all&rdquo; and open the booking window, Calendly loads inside the page and may set its
        own cookies, under Calendly&rsquo;s policy. If you choose &ldquo;Necessary only&rdquo;, the booking link opens
        Calendly in a new tab instead, and nothing from Calendly loads on this site. The hosting provider (Vercel) may keep
        standard server logs, as described in the Privacy Policy.
      </P>
      <H2>4. Your choice</H2>
      <P>
        You are asked the first time you visit, and again if you clear your browser data. You can change your mind at any
        time, or delete the items above in your browser settings.
      </P>
      <p className="reveal mt-4">
        <CookieSettings className="btn-fill rounded-full border-[1.5px] border-ink px-5 py-2.5 font-mono text-xs uppercase tracking-[.06em]" />
      </p>
      <H2>5. Changes</H2>
      <P>Updates will appear here with a new date.</P>
      <H2>6. Contact</H2>
      <P>{site.email}</P>
    </Legal>
  );
}
