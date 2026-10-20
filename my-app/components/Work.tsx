import ProjectGrid from "./ProjectGrid";

export default function Work() {
  return (
    <section id="work" className="px-4 py-16 min-[801px]:px-8 min-[801px]:py-24">
      <div className="mb-8 flex flex-wrap items-baseline gap-4">
        <span className="mono">01 /</span>
        <h2 className="display text-[clamp(44px,8vw,110px)]">Selected work</h2>
      </div>
      <ProjectGrid />
    </section>
  );
}
