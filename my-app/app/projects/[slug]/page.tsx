import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/ProjectDetail";
import { projects } from "@/content/projects";

export const generateStaticParams = () => projects.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: p.title, description: `${p.title}: a ${p.category} project by Rhuzzel Paramio, built with ${p.stack.slice(0, 4).join(", ")}. Read the problem, solution and result.` } : {};
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((x) => x.slug === slug);
  if (index < 0) notFound();
  const p = projects[index];
  const ld = JSON.stringify({
    "@context": "https://schema.org",
    "@type": p.live ? "SoftwareApplication" : "CreativeWork",
    name: p.title,
    description: p.problem,
    url: `https://rhuzz.online/projects/${p.slug}`,
    ...(p.live && { applicationCategory: "WebApplication", operatingSystem: "Web" }),
    keywords: p.stack.join(", "),
    author: { "@type": "Person", name: "Rhuzzel Paramio", url: "https://rhuzz.online" },
  }).replace(/</g, "\\u003c");
  return (
    <main className="page-in mx-auto w-full max-w-3xl px-4 pb-24 pt-28 min-[801px]:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />
      <Link href="/projects" className="mono mb-6 inline-block hover:text-blue">
        ← All projects
      </Link>
      <ProjectDetail project={projects[index]} index={index} page />
    </main>
  );
}
