import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Work from "@/components/Work";
import { projects } from "@/content/projects";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <main>
      <PageHero
        label="Projects"
        word="PROJECTS"
        photo={{
          src: "/assets/portrait-crop.png",
          w: 690,
          h: 1452,
          alt: "Rhuzzel Paramio",
        }}
        eyebrow="selected work"
        title={["Things", "I’ve built"]}
        kicker="Web · QA · Capstone"
        blurb="Web apps, test frameworks and AI builds, each one shipped and tested."
        pill="Live demos and source"
        stats={[
          { value: projects.length, label: "Projects live" },
          {
            value: new Set(projects.map((p) => p.category)).size,
            label: "Categories",
          },
          { value: 3, label: "Years building", plus: true },
        ]}
      />
      <Work />
    </main>
  );
}
