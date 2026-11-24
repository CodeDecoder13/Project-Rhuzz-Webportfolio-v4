import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import PostBody from "@/components/blog/PostBody";
import { postDate } from "@/components/blog/PostCard";
import { getPost, safe } from "@/lib/db";
import { UUID, photoUrl } from "@/lib/image";

const plain = (html: string) => html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  await connection();
  const { id } = await params;
  const post = UUID.test(id) ? await safe(() => getPost(id), null) : null;
  if (!post) return { title: "Blog post" };
  return { title: post.title, description: plain(post.descriptionHtml).slice(0, 155) };
}

async function Post({ params }: { params: Promise<{ id: string }> }) {
  await connection();
  const { id } = await params;
  const post = UUID.test(id) ? await safe(() => getPost(id), null) : null;
  if (!post) notFound();
  const src = photoUrl(post.photoKey);
  const ld = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.createdAt,
    description: plain(post.descriptionHtml).slice(0, 155),
    ...(src && { image: `https://rhuzz.online${src}` }),
    url: `https://rhuzz.online/blog/${post.id}`,
    author: { "@type": "Person", name: "Rhuzzel Paramio", url: "https://rhuzz.online" },
  }).replace(/</g, "\\u003c");
  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />
      <p className="mono text-muted">
        <time dateTime={post.createdAt}>{postDate(post.createdAt)}</time> · By Rhuzzel Paramio
      </p>
      <h1 className="display mt-2 text-[clamp(40px,7vw,88px)]">{post.title}</h1>
      {src && (
        // eslint-disable-next-line @next/next/no-img-element -- served by our own streaming route, not the image optimizer
        <img
          src={src}
          alt=""
          width={1200}
          height={750}
          className="mt-8 h-auto w-full rounded-[14px] border-[1.5px] border-ink"
        />
      )}
      <div className="mt-8">
        <PostBody html={post.descriptionHtml} />
      </div>
    </article>
  );
}

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main
      id="work"
      className="mx-auto w-full max-w-[820px] px-4 pb-24 pt-28 min-[801px]:px-8"
    >
      <Link href="/blog" className="mono hover:text-blue">
        ← All posts
      </Link>
      <div className="mt-6">
        <Suspense fallback={<p className="mono text-muted">Loading…</p>}>
          <Post params={params} />
        </Suspense>
      </div>
    </main>
  );
}
