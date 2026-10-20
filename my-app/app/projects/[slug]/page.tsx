import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/ProjectDetail";
import { projects } from "@/content/projects";

export const generateStaticParams = () => projects.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: p.title, description: `${p.category} project: ${p.stack.join(", ")}.` } : {};
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((x) => x.slug === slug);
  if (index < 0) notFound();
  return (
    <main className="mx-auto w-full max-w-3xl px-4 pb-24 pt-28 min-[801px]:px-8">
      <Link href="/projects" className="mono mb-6 inline-block hover:text-blue">
        ← All projects
      </Link>
      <ProjectDetail project={projects[index]} index={index} />
    </main>
  );
}
