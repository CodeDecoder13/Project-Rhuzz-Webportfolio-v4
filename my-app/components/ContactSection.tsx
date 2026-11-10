import Link from "next/link";
import { site } from "@/content/site";
import CvRequest from "./CvRequest";
import { Section } from "./Section";

export default function ContactSection() {
  return (
    <Section id="contact" fit className="bg-sky">
      <div className="mb-8 flex flex-wrap items-baseline gap-4">
        <span className="mono">Replies in {site.replyTime}</span>
      </div>
      <h2 className="reveal display text-[clamp(56px,min(13vw,19svh),200px)]">
        Let&apos;s ship it ↗
      </h2>
      <p className="reveal my-5">
        <Link
          href="/contact"
          className="btn-fill inline-block rounded-full border-[1.5px] border-ink bg-ink px-[26px] py-3.5 font-mono text-[13px] uppercase tracking-[.06em] text-paper"
        >
          Send a message
        </Link>
      </p>
      <ul className="reveal mono flex flex-wrap gap-x-6 gap-y-2">
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
          <CvRequest className="uppercase">Get my CV</CvRequest>
        </li>
      </ul>
    </Section>
  );
}
