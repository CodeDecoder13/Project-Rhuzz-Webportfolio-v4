import type { Project } from "@/content/projects";

const link = "rounded-full border-[1.5px] px-[26px] py-3.5 font-mono text-[13px] uppercase tracking-[.06em]";

export function Tags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <li key={t} className="rounded-full border-[1.5px] border-ink px-2.5 py-0.5 font-mono text-[11px] font-medium">
          {t}
        </li>
      ))}
    </ul>
  );
}

// Shared by the drawer and the /projects/[slug] case-study page.
export default function ProjectDetail({ project: p, index }: { project: Project; index: number }) {
  return (
    <>
      <div className="mono">
        {String(index + 1).padStart(2, "0")} · {p.category}
      </div>
      <h2 className="display mb-3.5 mt-2 text-[44px] leading-none">{p.title}</h2>
      <Tags items={p.stack} />
      {(["problem", "solution", "result"] as const).map((k) => (
        <section key={k}>
          <h3 className="mt-[18px] font-semibold capitalize">{k}</h3>
          <p className="text-muted">{p[k]}</p>
        </section>
      ))}
      <p className="mt-6 flex gap-2">
        {p.live && (
          <a href={p.live} target="_blank" rel="noopener noreferrer" className={`${link} border-blue bg-blue text-white`}>
            Live demo ↗
          </a>
        )}
      </p>
    </>
  );
}
