import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Section({ id, className, children }: { id?: string; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={cn("px-4 py-16 min-[801px]:px-8 min-[801px]:py-24", className)}>
      {children}
    </section>
  );
}

export function SectionHead({ n, title }: { n?: string; title: string }) {
  return (
    <div className="mb-8 flex flex-wrap items-baseline gap-4">
      {n && <span className="mono">{n} /</span>}
      <h2 className="display text-[clamp(44px,8vw,110px)]">{title}</h2>
    </div>
  );
}

export const card = "rounded-[14px] border-[1.5px] border-ink bg-card p-7";
