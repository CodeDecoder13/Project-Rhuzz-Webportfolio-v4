import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { Section, SectionHead, card } from "@/components/Section";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main className="pt-14">
      <Section>
        <SectionHead title="Contact" />
        <div className="grid grid-cols-1 gap-4 min-[801px]:grid-cols-[1.2fr_1fr]">
          <div className={card}>
            <ContactForm />
          </div>
          <div className={card}>
            <div className="mono mb-3">Elsewhere</div>
            <ul className="grid gap-2">
              <li>
                <a href={`mailto:${site.email}`} className="text-blue underline">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.github} className="text-blue underline">
                  GitHub
                </a>
              </li>
              <li>
                <a href={site.linkedin} className="text-blue underline">
                  LinkedIn
                </a>
              </li>
              <li>{site.location}</li>
              <li className="text-muted">Replies in {site.replyTime}</li>
              <li>
                <a href={site.cv} className="text-blue underline">
                  Download CV
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Section>
    </main>
  );
}
