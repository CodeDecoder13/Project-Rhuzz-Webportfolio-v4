import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { listPosts, safe } from "@/lib/db";
import { Section, SectionHead } from "../Section";
import PostCard from "./PostCard";

async function Latest() {
  await connection(); // new posts appear on the next request, no rebuild
  const posts = (await safe(listPosts, [])).slice(0, 3);
  if (!posts.length) return null; // no posts, no empty block on Home
  return (
    <Section id="achievements">
      <SectionHead title="Latest achievements" />
      <ul className="grid gap-6 min-[801px]:grid-cols-2 min-[1101px]:grid-cols-3">
        {posts.map((p) => (
          <li key={p.id} className="reveal flex">
            <div className="flex w-full">
              <PostCard post={p} />
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-8">
        <Link
          href="/blog"
          className="btn-fill mono inline-block rounded-full border-[1.5px] border-ink px-5 py-2.5"
        >
          See all achievements →
        </Link>
      </p>
    </Section>
  );
}

export default function LatestPosts() {
  return (
    <Suspense fallback={null}>
      <Latest />
    </Suspense>
  );
}
