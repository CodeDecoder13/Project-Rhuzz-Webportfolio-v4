import type { Metadata } from "next";
import Legal, { H2, P } from "@/components/Legal";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <Legal title="Privacy Policy">
      <H2>1. Who is responsible</H2>
      <P>
        Rhuzzel Paramio, Philippines. Contact: {site.email}. This policy is written with the Philippine Data Privacy Act of 2012
        (RA 10173) in mind.
      </P>
      <H2>2. What I collect</H2>
      <ul className="list-disc pl-5 text-muted">
        <li>
          <b>Contact form:</b> name, email address, subject and message you submit.
        </li>
        <li>
          <b>Technical data:</b> this site uses no analytics. The hosting provider may keep standard server logs (such as IP
          address) for security and reliability.
        </li>
        <li>
          <b>Preferences:</b> your sound choice (localStorage) and whether you have seen the intro screen (sessionStorage) are
          stored in your browser. They are not sent to a server.
        </li>
      </ul>
      <H2>3. Why I use it</H2>
      <P>To reply to your message and to keep the site secure and working. I do not sell your data.</P>
      <H2>4. Who sees it</H2>
      <P>
        Only service providers needed to run the site: Vercel (hosting) and Resend (delivers contact-form messages to my inbox).
        They process data on my behalf.
      </P>
      <H2>5. How long I keep it</H2>
      <P>Contact messages: [12 months] or until you ask me to delete them.</P>
      <H2>6. Your rights</H2>
      <P>
        You may ask to access, correct or delete your data, or to object to its processing. Email {site.email} and I will respond
        within [30 days].
      </P>
      <H2>7. Cookies</H2>
      <P>This site sets no cookies. Audio never plays unless you turn it on.</P>
      <H2>8. Security</H2>
      <P>The site uses HTTPS and limits access to messages. No system is perfectly secure.</P>
      <H2>9. Changes</H2>
      <P>Updates will appear here with a new date.</P>
    </Legal>
  );
}
