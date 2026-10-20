import type { Metadata } from "next";
import { Section, SectionHead, card } from "@/components/Section";
import { certs } from "@/content/certs";

export const metadata: Metadata = { title: "Certifications" };

export default function CertificationsPage() {
  return (
    <main className="pt-14">
      <Section>
        <SectionHead title="Certifications" />
        <ul className="grid grid-cols-1 gap-4 min-[801px]:grid-cols-3">
          {certs.map((c) => (
            <li key={c.name} className={card}>
              <h2 className="display text-[26px] leading-[1.05]">{c.name}</h2>
              <p className="mono mt-2 text-muted">
                {c.issuer} · {c.year}
              </p>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  );
}
