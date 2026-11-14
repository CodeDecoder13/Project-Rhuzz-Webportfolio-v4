import type { Metadata } from "next";
import { Section, SectionHead, card } from "@/components/Section";
import { certs } from "@/content/certs";

export const metadata: Metadata = { title: "Certifications" };

export default function CertificationsPage() {
  return (
    <main className="page-in pt-14">
      <Section>
        <SectionHead title="Certifications" />
        <ul className="grid grid-cols-1 gap-4 min-[1000px]:grid-cols-2">
          {certs.map((c) => (
            <li
              key={c.name}
              className={`${card} flex items-start gap-5 max-[560px]:flex-col`}
            >
              {c.logo ? (
                // eslint-disable-next-line @next/next/no-img-element -- small static badge, already sized
                <img
                  src={c.logo}
                  alt=""
                  width={672}
                  height={352}
                  loading="lazy"
                  draggable={false}
                  className="aspect-square w-[150px] shrink-0 select-none object-cover max-[560px]:w-[120px]"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="display grid aspect-square w-[150px] shrink-0 place-items-center rounded-2xl bg-tint text-[44px] text-blue max-[560px]:w-[120px]"
                >
                  AI
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
                  <div className="min-w-0">
                    <p className="mono text-muted">
                      {c.issuer} · {c.year}
                    </p>
                    <h2 className="display mt-1 text-[clamp(24px,2.4vw,30px)] leading-[1.05]">
                      {c.name}
                    </h2>
                  </div>
                  {c.url && (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-fill mono shrink-0 whitespace-nowrap rounded-full border-[1.5px] border-ink px-3.5 py-1.5 text-[11px]"
                    >
                      Verify on Credly ↗
                      <span className="sr-only">
                        {" "}
                        ({c.name}, opens in a new tab)
                      </span>
                    </a>
                  )}
                </div>
                {c.description && (
                  <p className="mt-3 text-[15px] leading-relaxed text-ink/80">
                    {c.description}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  );
}
