import type { Metadata } from "next";
import { faq } from "@/content/faq";
import { Section, SectionHead } from "@/components/Section";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about Rhuzzel Paramio: services, QA and testing, tools, certifications, availability and how to get in touch.",
};

const ld = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
}).replace(/</g, "\u003c");

export default function FaqPage() {
  return (
    <main className="page-in pt-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />
      <Section>
        <SectionHead title="FAQ" h1 />
        <dl className="max-w-3xl">
          {faq.map(({ q, a }) => (
            <div key={q} className="mb-8">
              <dt>
                <h2 className="display text-[clamp(24px,2.4vw,30px)] leading-[1.1]">{q}</h2>
              </dt>
              <dd className="mt-2 text-muted">{a}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </main>
  );
}
