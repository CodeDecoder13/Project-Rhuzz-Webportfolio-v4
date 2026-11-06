import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("px-4 py-16 min-[801px]:px-8 min-[801px]:py-24", className)}
    >
      {children}
    </section>
  );
}

// Words sit in a mask so RevealRoot can lift them in one by one.
export function SectionHead({ n, title }: { n?: string; title: string }) {
  return (
    <div className="mb-8 flex flex-wrap items-baseline gap-4">
      {n && <span className="mono">{n} /</span>}
      <h2 data-split className="display text-[clamp(44px,8vw,110px)]">
        {title.split(" ").map((w, i) => (
          <span
            key={i}
            className="mr-[.25em] inline-block overflow-hidden align-bottom last:mr-0"
          >
            <span data-word className="inline-block">
              {w}
            </span>
          </span>
        ))}
      </h2>
    </div>
  );
}

export const card =
  "reveal rounded-[14px] border-[1.5px] border-ink bg-card p-7";
