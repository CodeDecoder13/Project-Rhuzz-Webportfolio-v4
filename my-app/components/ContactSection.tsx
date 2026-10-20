import Link from "next/link";
import { site } from "@/content/site";
import { Section } from "./Section";

export default function ContactSection() {
  return (
    <Section id="contact" className="bg-sky">
      <div className="mb-8 flex flex-wrap items-baseline gap-4">
        <span className="mono">07 /</span>
        <span className="mono">Replies in {site.replyTime}</span>
      </div>
      <h2 className="display text-[clamp(56px,13vw,200px)]">
        Let&apos;s ship
        <br />
        it ↗
      </h2>
      <p className="my-5">
        <Link
          href="/contact"
          className="inline-block rounded-full border-[1.5px] border-ink bg-ink px-[26px] py-3.5 font-mono text-[13px] uppercase tracking-[.06em] text-paper"
        >
          Send a message
        </Link>
      </p>
      <ul className="mono flex flex-wrap gap-x-6 gap-y-2">
        <li>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </li>
        <li>
          <a href={site.github}>GitHub</a>
        </li>
        <li>
          <a href={site.linkedin}>LinkedIn</a>
        </li>
        <li>{site.location}</li>
        <li>
          <a href={site.cv}>Download CV</a>
        </li>
      </ul>
    </Section>
  );
}
