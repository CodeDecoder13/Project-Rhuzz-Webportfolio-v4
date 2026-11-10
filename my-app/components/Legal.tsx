import type { ReactNode } from "react";

// Hardcoded: Cache Components rejects new Date() in server components. Update when the policies are next reviewed.
export const LEGAL_DATE = "November 10, 2026";

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="reveal display mb-2 mt-10 text-[28px] leading-[1.1]">
      {children}
    </h2>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="reveal text-muted">{children}</p>;
}

export default function Legal({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <main className="page-in mx-auto w-full max-w-[760px] px-6 pb-24 pt-32 leading-[1.7]">
      <div className="mono">Last updated and reviewed: {LEGAL_DATE}</div>
      <h1 className="display mb-2 mt-3 text-[clamp(48px,9vw,96px)] leading-[.95]">
        {title}
      </h1>
      <div className="mono my-6 rounded-[14px] border-[1.5px] border-ink bg-sky px-[18px] py-3.5">
        Reviewed on {LEGAL_DATE}. General information about this site, not
        legal advice.
      </div>
      {children}
    </main>
  );
}
