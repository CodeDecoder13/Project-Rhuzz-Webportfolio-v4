import type { ReactNode } from "react";
import { views, type Copy, type View } from "@/content/personas";
import { cn } from "@/lib/cn";

// Who may see an element (space-separated for the CSS in globals.css). Absent = everyone.
export const forAttr = (only?: readonly View[]) => only?.join(" ");

// Renders one span per distinct wording; CSS shows the one for the current view. Missing views fall back to `all`.
export function Swap({ c }: { c: Copy }) {
  const by = new Map<string, View[]>();
  for (const v of views) {
    const t = c[v] ?? c.all;
    by.set(t, [...(by.get(t) ?? []), v]);
  }
  return [...by].map(([t, vs]) => (
    <span key={t} data-for={vs.join(" ")}>
      {t}
    </span>
  ));
}

export function Section({
  id,
  className,
  fit,
  only,
  children,
}: {
  id?: string;
  className?: string;
  fit?: boolean;
  only?: readonly View[];
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      data-for={forAttr(only)}
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
export function SectionHead({
  title,
  only,
}: {
  n?: string;
  title: string;
  only?: readonly View[];
}) {
  return (
    <div
      data-for={forAttr(only)}
      className="mb-[clamp(12px,3svh,32px)] flex flex-wrap items-baseline gap-4"
    >
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
