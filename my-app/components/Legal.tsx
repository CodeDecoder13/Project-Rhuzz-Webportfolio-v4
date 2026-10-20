import type { ReactNode } from "react";

export function H2({ children }: { children: ReactNode }) {
  return <h2 className="display mb-2 mt-10 text-[28px] leading-[1.1]">{children}</h2>;
}

export function P({ children }: { children: ReactNode }) {
  return <p className="text-muted">{children}</p>;
}

export default function Legal({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-[760px] px-6 pb-24 pt-32 leading-[1.7]">
      <div className="mono">Last updated: [DATE]</div>
      <h1 className="display mb-2 mt-3 text-[clamp(48px,9vw,96px)] leading-[.95]">{title}</h1>
      <div className="mono my-6 rounded-[14px] border-[1.5px] border-ink bg-sky px-[18px] py-3.5">
        Placeholder text. Replace and have it reviewed before publishing. Not legal advice.
      </div>
      {children}
    </main>
  );
}
