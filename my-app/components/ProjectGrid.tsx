"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/content/projects";
import ProjectDetail, { Tags } from "./ProjectDetail";

const cats = ["All", "Web Dev", "QA", "Capstone"] as const;
// Small labels sit in a chip: the brief's cover colours alone don't reach AA contrast at 12px.
const chip = "mono absolute rounded-full bg-paper px-2 py-px text-ink";
const initials = (t: string) => t.split(" ").map((w) => w[0]).slice(0, 3).join("");

function Card({ p, i, onOpen }: { p: Project; i: number; onOpen: (el: HTMLElement) => void }) {
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={(e) => onOpen(e.currentTarget)}
      className="flex flex-col overflow-hidden rounded-2xl border-[1.5px] border-ink bg-card text-left transition-[transform,box-shadow] duration-[250ms] hover:-translate-y-1 hover:shadow-[6px_6px_0_var(--ink)] focus-visible:-translate-y-1 focus-visible:shadow-[6px_6px_0_var(--ink)]"
    >
      <div
        className="relative grid aspect-[16/10] place-items-center border-b-[1.5px] border-ink"
        style={{ background: p.coverBg, color: p.coverFg }}
      >
        {p.cover ? (
          <Image src={p.cover} alt="" fill sizes="(max-width: 800px) 100vw, 33vw" className="object-cover" />
        ) : (
          <>
            <b className="display text-[clamp(48px,6vw,84px)] opacity-90">{initials(p.title)}</b>
            <span className={chip + " bottom-2.5 right-3"}>image placeholder</span>
          </>
        )}
        <span className={chip + " left-3.5 top-3"}>{String(i + 1).padStart(2, "0")}</span>
      </div>
      <div className="px-[18px] pb-[18px] pt-4">
        <h3 className="display text-[26px] leading-[1.05]">{p.title}</h3>
        <div className="mono mb-2.5 mt-1.5 text-muted">
          {p.category}
          {p.featured && <span className="ml-1.5 rounded-full bg-ink px-2 py-px text-[10px] text-sky">FEATURED</span>}
        </div>
        <Tags items={p.stack.slice(0, 4)} />
      </div>
    </button>
  );
}

export default function ProjectGrid() {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [open, setOpen] = useState<number | null>(null);
  const base = useRef("/");
  const opener = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const openAt = (i: number, el: HTMLElement) => {
    opener.current = el;
    base.current = location.pathname;
    history.pushState(null, "", `/projects/${projects[i].slug}`);
    setOpen(i);
  };
  const close = () => {
    history.replaceState(null, "", base.current);
    setOpen(null);
  };

  useEffect(() => {
    if (open === null) return;
    closeBtn.current?.focus();
    const trigger = opener.current;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    // Browser back/forward leaves the drawer URL, so close without touching history.
    const onPop = () => setOpen(null);
    document.addEventListener("keydown", onKey);
    window.addEventListener("popstate", onPop);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("popstate", onPop);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <div role="group" aria-label="Filter projects" className="mb-6 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={cat === c}
            onClick={() => setCat(c)}
            className="mono rounded-full border-[1.5px] border-ink px-4 py-1.5 aria-pressed:bg-ink aria-pressed:text-paper"
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 min-[801px]:grid-cols-3">
        {projects.map((p, i) => (cat === "All" || p.category === cat) && <Card key={p.slug} p={p} i={i} onOpen={(el) => openAt(i, el)} />)}
      </div>
      {open !== null && (
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Project details"
          className="fixed inset-y-0 right-0 z-[25] w-[min(480px,100%)] animate-[drawer_.3s_both] overflow-auto border-l-[1.5px] border-ink bg-card p-7"
        >
          <button
            ref={closeBtn}
            type="button"
            onClick={close}
            className="mono float-right rounded-full border-[1.5px] border-ink px-3 py-1"
          >
            Close
          </button>
          <ProjectDetail project={projects[open]} index={open} />
        </aside>
      )}
    </>
  );
}
