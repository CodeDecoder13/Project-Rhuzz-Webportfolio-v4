import type { Metadata } from "next";
import { Section, SectionHead, card } from "@/components/Section";
import { certs } from "@/content/certs";

export const metadata: Metadata = { title: "Certifications" };

export default function CertificationsPage() {
  return (
    <main className="page-in pt-14">
      <Section>
        <SectionHead title="Certifications" />
        <ul className="grid grid-cols-1 gap-4 min-[801px]:grid-cols-3">
          {certs.map((c) => (
            <li key={c.name} className={`${card} flex flex-col`}>
              {c.logo && (
                // eslint-disable-next-line @next/next/no-img-element -- small static badge, already sized
                <img
                  src={c.logo}
                  alt=""
                  width={672}
                  height={352}
                  loading="lazy"
                  draggable={false}
                  className="mx-auto mb-4 aspect-square w-[160px] select-none object-cover"
                />
              )}
              <h2 className="display text-[26px] leading-[1.05]">{c.name}</h2>
              <p className="mono mt-2 text-muted">
                {c.issuer} · {c.year}
              </p>
              {c.url && (
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-fill mono mt-4 inline-block self-start rounded-full border-[1.5px] border-ink px-4 py-2"
                >
                  Verify on Credly ↗
                  <span className="sr-only">
                    {" "}
                    ({c.name}, opens in a new tab)
                  </span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </Section>
    </main>
  );
}
