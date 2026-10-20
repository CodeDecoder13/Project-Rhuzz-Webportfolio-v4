import type { Metadata } from "next";
import Legal, { H2, P } from "@/components/Legal";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <Legal title="Terms & Conditions">
      <H2>1. About this site</H2>
      <P>
        This website is the personal portfolio of Rhuzzel Paramio (&quot;I&quot;, &quot;me&quot;), based in the Philippines. By using it
        you agree to these terms. If you disagree, please stop using the site.
      </P>
      <H2>2. Content and intellectual property</H2>
      <P>
        Text, design, logo and code samples are owned by me unless stated. Project names, logos and screenshots of client or
        third-party work belong to their owners and are shown for portfolio purposes. Do not copy or redistribute without written
        permission. [Add license for open-source repositories.]
      </P>
      <H2>3. Links and live demos</H2>
      <P>
        Demo links may point to third-party hosts. They are provided &quot;as is&quot;, may go offline, and may contain sample data. I am
        not responsible for external sites.
      </P>
      <H2>4. Contact form and messages</H2>
      <P>
        Messages you send are used only to reply to you (see the Privacy Policy). Do not send confidential, unlawful or abusive
        content. I may decline to respond.
      </P>
      <H2>5. No warranty and limitation of liability</H2>
      <P>
        The site is provided &quot;as is&quot; without warranties. To the extent permitted by law, I am not liable for losses arising from
        use of the site or reliance on its content.
      </P>
      <H2>6. Changes</H2>
      <P>I may update these terms. Continued use after changes means you accept them.</P>
      <H2>7. Governing law</H2>
      <P>[Philippine law / jurisdiction: confirm with a lawyer.]</P>
      <H2>8. Contact</H2>
      <P>{site.email}</P>
    </Legal>
  );
}
