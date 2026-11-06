import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Section({
  id,
  className,
  fit,
  children,
}: {
  id?: string;
  className?: string;
  fit?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "px-4 py-16 min-[801px]:px-8 min-[801px]:py-24",
        // one screen on desktop; sizes inside use svh so the content scales with the window
        fit &&
          "min-[801px]:flex min-[801px]:min-h-svh min-[801px]:flex-col min-[801px]:justify-center min-[801px]:!pb-8 min-[801px]:!pt-24",
        className,
      )}
    >
      {children}
    </section>
  );
}

// Words sit in a mask so RevealRoot can lift them in one by one.
export function SectionHead({ n, title }: { n?: string; title: string }) {
  return (
    <div className="mb-[clamp(12px,3svh,32px)] flex flex-wrap items-baseline gap-4">
      {n && <span className="mono">{n} /</span>}
      <h2
        data-split
        className="display text-[clamp(44px,min(8vw,10.5svh),110px)]"
      >
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
  "reveal rounded-[14px] border-[1.5px] border-ink bg-card p-[clamp(12px,2.6svh,28px)]";
