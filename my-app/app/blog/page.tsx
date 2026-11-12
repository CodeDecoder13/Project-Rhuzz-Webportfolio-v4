import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import PageHero from "@/components/PageHero";
import PostCard from "@/components/blog/PostCard";
import { Section, SectionHead } from "@/components/Section";
import { listPosts, safe } from "@/lib/db";

export const metadata: Metadata = {
  title: "Blog",
  description: "Achievements and milestones from Rhuzzel Paramio.",
};

async function Posts() {
  await connection(); // posts change at request time, never at build time
  const posts = await safe(listPosts, []);
  if (!posts.length)
    return (
      <p className="rounded-[14px] border-[1.5px] border-ink bg-card p-8">
        No posts yet. Check back soon.
      </p>
    );
  return (
    <ul className="grid gap-6 min-[801px]:grid-cols-2 min-[1101px]:grid-cols-3">
      {posts.map((p) => (
        <li key={p.id} className="flex">
          <div className="flex w-full">
            <PostCard post={p} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function BlogPage() {
  return (
    <main>
      <PageHero
        label="Blog"
        word="BLOG"
        photo={{
          src: "/assets/portrait-crop.png",
          w: 690,
          h: 1452,
          alt: "Rhuzzel Paramio",
        }}
        eyebrow="achievements"
        title={["Wins", "& milestones"]}
        kicker="Shipped · Certified · Recognised"
        blurb="A running log of things worth celebrating, newest first."
        pill="Updated as it happens"
        stats={[
          { value: "Newest", label: "Listed first" },
          { value: "Plain", label: "No tracking" },
        ]}
      />
      <Section id="work">
        <SectionHead title="Latest posts" />
        <Suspense fallback={<p className="mono text-muted">Loading posts…</p>}>
          <Posts />
        </Suspense>
      </Section>
    </main>
  );
}
