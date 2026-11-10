import type { Metadata } from "next";
import ConsentGate from "@/components/ConsentGate";
import ContactChat from "@/components/ContactChat";
import CvRequest from "@/components/CvRequest";
import PageHero from "@/components/PageHero";
import { Section, SectionHead, card } from "@/components/Section";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main>
      <PageHero
        label="Contact Rhuzzel"
        word="CONTACT"
        photo={{
          src: "/assets/rhuzz-cutout-dark.png",
          w: 696,
          h: 1207,
          alt: "Rhuzzel Paramio in a black blazer and navy tie",
        }}
        eyebrow="got a project?"
        title={["Let’s", "talk"]}
        kicker="Chat · Book a call · Email"
        blurb="Ask my assistant anything, book 30 minutes, or send a note. I reply within my usual window."
        pill={`Based in ${site.location}`}
        actions={
          <>
            <a
              href={site.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-[1.5px] border-blue bg-blue px-5 py-2.5 font-mono text-xs uppercase tracking-[.06em] text-white transition-transform active:scale-[.97]"
            >
              Book a call
            </a>
            <CvRequest className="rounded-full border-[1.5px] border-ink bg-card px-5 py-2.5 font-mono text-xs uppercase tracking-[.06em] transition-transform active:scale-[.97]">
              Get my CV
            </CvRequest>
          </>
        }
        stats={[
          { value: site.replyTime, label: "Reply time" },
          { value: "30 min", label: "Intro call" },
          { value: "24/7", label: "Assistant online" },
        ]}
      />
      <Section>
        <SectionHead title="Contact" />
        <div className="grid grid-cols-1 gap-4 min-[801px]:grid-cols-[1.2fr_1fr]">
          <div className={card}>
            <ConsentGate>
              <ContactChat />
            </ConsentGate>
          </div>
          <div className={card}>
            <h2 className="display text-[clamp(28px,3.4vw,40px)] leading-[1.05]">
              Prefer a call?
            </h2>
            <p className="mb-4 mt-2 text-muted">
              Book 30 minutes and we&rsquo;ll talk it through. Based in{" "}
              {site.location}, replies within {site.replyTime}.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={site.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-[1.5px] border-blue bg-blue px-6 py-3 font-mono text-[13px] uppercase tracking-[.06em] text-white transition-transform active:scale-[.97]"
              >
                Book a call
              </a>
              <CvRequest className="rounded-full border-[1.5px] border-ink px-6 py-3 font-mono text-[13px] uppercase tracking-[.06em] transition-transform active:scale-[.97]">
                Get my CV
              </CvRequest>
            </div>
            <ul className="mt-6 grid divide-y divide-ink/20 border-t border-ink/20 font-mono text-[13px] uppercase tracking-[.06em]">
              {[
                [`mailto:${site.email}`, site.email],
                [site.github, "GitHub"],
                [site.linkedin, "LinkedIn"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="flex items-center justify-between py-3 text-blue"
                  >
                    {label} <span aria-hidden>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </main>
  );
}
