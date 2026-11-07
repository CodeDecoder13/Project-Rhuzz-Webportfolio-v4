import type { Metadata } from "next";
import Link from "next/link";
import Legal, { H2, P } from "@/components/Legal";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "AI Consent" };

export default function AiConsentPage() {
  return (
    <Legal title="AI Consent">
      <H2>1. What the AI assistant is</H2>
      <P>
        The chat on the Contact page is an automated AI assistant. It answers
        questions about Rhuzzel&rsquo;s work and can collect your name, email
        and message so I can reply to you. It is not a person, it can make
        mistakes, and it cannot make commitments on my behalf.
      </P>
      <H2>2. What it collects</H2>
      <ul className="list-disc pl-5 text-muted">
        <li>
          What you type in the chat, including any name, email address and
          message you choose to give it.
        </li>
        <li>
          Nothing else: no microphone, camera, location or tracking. Please do
          not share sensitive personal information in the chat.
        </li>
      </ul>
      <H2>3. Why it is used</H2>
      <P>
        Only to answer your questions and to gather the details I need to
        contact you. Your chat is not used for advertising or profiling, and I
        do not sell it.
      </P>
      <H2>4. Who it is shared with</H2>
      <P>
        Not shared with anyone beyond what is needed to run the chat. To produce
        replies, the text of your conversation is processed by an AI service
        provider acting on my behalf. When you confirm a message, it is
        delivered to my inbox by my email provider. Both are listed in the{" "}
        <Link href="/privacy" className="underline">
          Privacy Policy
        </Link>
        .
      </P>
      <H2>5. How it is kept safe</H2>
      <P>
        Chats travel over HTTPS, the AI service key never reaches your browser,
        and I only keep messages you asked me to send. The conversation itself
        is not stored on this site and disappears when you close or refresh the
        page. Messages you send are kept for [12 months] or until you ask me to
        delete them.
      </P>
      <H2>6. Your choice</H2>
      <P>
        Using the AI chat is optional. If you decline, you can email me at{" "}
        {site.email} or book a call instead. You will be asked again each time
        you open the Contact page. You may withdraw consent and ask me to delete
        anything you sent by emailing me; I will respond within [30 days].
      </P>
      <H2>7. Changes</H2>
      <P>Updates will appear here with a new date.</P>
    </Legal>
  );
}
