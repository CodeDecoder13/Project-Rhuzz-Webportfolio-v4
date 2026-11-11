import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import CvRequest from "./CvRequest";
import { copy } from "@/content/personas";
import BookButton from "./BookButton";
import { Section, Swap } from "./Section";

const big =
  "btn-fill inline-block rounded-full border-[1.5px] border-ink px-[26px] py-3.5 font-mono text-[13px] uppercase tracking-[.06em]";

export default function ContactSection() {
  return (
    <Section id="contact" fit className="relative overflow-hidden bg-sky">
      <div className="mb-8 flex flex-wrap items-baseline gap-4">
        <span className="mono">Replies in {site.replyTime}</span>
      </div>
      <h2 className="reveal display text-[clamp(56px,min(13vw,19svh),200px)]">
        <Swap c={copy.contactHead} />
      </h2>
      <p className="reveal my-5">
        <span data-for="all dev" className="contents">
          <Link
            href="/contact"
            className="btn-fill inline-block rounded-full border-[1.5px] border-ink bg-ink px-[26px] py-3.5 font-mono text-[13px] uppercase tracking-[.06em] text-paper"
          >
            Send a message
          </Link>
        </span>
        <span data-for="recruiter" className="contents">
          <CvRequest className={`${big} bg-ink text-paper`}>
            Get my CV
          </CvRequest>
        </span>
        <span data-for="business" className="contents">
          <BookButton
            url={site.calendly}
            describedBy="contact-book"
            label="Book a call"
            className={`${big} bg-ink text-paper`}
          />
          <span id="contact-book" className="sr-only">
            Schedule a 30-minute call
          </span>
        </span>
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
        <li data-for="all dev business">
          <CvRequest className="uppercase">Get my CV</CvRequest>
        </li>
      </ul>
      <Image
        data-for="recruiter business"
        src="/assets/rhuzz-cutout-dark.png"
        alt=""
        width={696}
        height={1207}
        className="pointer-events-none absolute bottom-0 right-[6%] hidden h-[82%] w-auto select-none opacity-95 min-[1000px]:block"
      />
    </Section>
  );
}
