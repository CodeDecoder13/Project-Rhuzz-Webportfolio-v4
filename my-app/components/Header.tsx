import Link from "next/link";
import { site } from "@/content/site";
import MobileMenu from "./MobileMenu";

const nav = [
  ["About", "/about"],
  ["Projects", "/projects"],
  ["Contact", "/contact"],
] as const;

const pill = "rounded-full border-[1.5px] px-[18px] py-[9px] font-mono text-xs uppercase tracking-[.06em]";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-10 grid grid-cols-[1fr_auto_1fr] items-center gap-2 bg-gradient-to-b from-paper to-transparent px-4 py-4 min-[801px]:px-8">
      <Link href="/" className="display text-[34px]">
        rhuzz<i className="not-italic text-blue">.</i>
      </Link>
      <nav aria-label="Primary" className="mono hidden gap-7 min-[801px]:flex">
        {nav.map(([label, href]) => (
          <Link key={href} href={href} className="hover:text-blue">
            {label}
          </Link>
        ))}
      </nav>
      <div className="col-start-3 flex items-center justify-end gap-2.5 max-[800px]:hidden">
        <a href={site.cv} className={`${pill} border-ink text-ink`}>
          Download CV
        </a>
      </div>
      <MobileMenu links={nav} cv={site.cv} />
    </header>
  );
}
