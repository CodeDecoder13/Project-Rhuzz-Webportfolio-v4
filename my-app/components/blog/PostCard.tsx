import Link from "next/link";
import type { Post } from "@/lib/db";
import { photoUrl } from "@/lib/image";
import { plainText } from "@/lib/sanitize";

export const postDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    dateStyle: "medium",
    timeZone: "UTC",
  });

export default function PostCard({ post }: { post: Post }) {
  const src = photoUrl(post.photoKey);
  const text = plainText(post.descriptionHtml);
  return (
    <article className="relative flex flex-col overflow-hidden rounded-[14px] border-[1.5px] border-ink bg-card">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element -- served by our own streaming route, not the image optimizer
        <img
          src={src}
          alt=""
          width={1200}
          height={750}
          loading="lazy"
          className="h-auto w-full border-b-[1.5px] border-ink"
        />
      ) : (
        <div
          aria-hidden="true"
          className="display grid aspect-[8/5] w-full place-items-center border-b-[1.5px] border-ink bg-tint text-[64px] text-blue"
        >
          WIN
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="mono text-muted">{postDate(post.createdAt)}</p>
        <h2 className="display text-[28px]">
          <Link
            href={`/blog/${post.id}`}
            className="after:absolute after:inset-0 hover:text-blue"
          >
            {post.title}
          </Link>
        </h2>
        <p className="line-clamp-3 text-[15px]">{text}</p>
      </div>
    </article>
  );
}

// Medium-style row for the /blog list: text on the left, small thumbnail on the right, hairline between posts.
export function PostRow({ post }: { post: Post }) {
  const src = photoUrl(post.photoKey);
  const text = plainText(post.descriptionHtml);
  const words = text.split(/\s+/).filter(Boolean).length;
  return (
    <article className="relative flex items-start justify-between gap-6 border-b border-line py-8 first:pt-0 max-[600px]:flex-col-reverse max-[600px]:gap-4">
      <div className="min-w-0 flex-1">
        <p className="mono text-muted">
          {postDate(post.createdAt)} · {Math.max(1, Math.round(words / 200))}{" "}
          min read
        </p>
        <h2 className="display mt-2 text-[clamp(26px,3.4vw,38px)] leading-[1.05]">
          <Link
            href={`/blog/${post.id}`}
            className="after:absolute after:inset-0 hover:text-blue"
          >
            {post.title}
          </Link>
        </h2>
        <p className="mt-3 line-clamp-3 text-[17px] leading-relaxed text-ink/80">
          {text}
        </p>
        <p className="mono mt-4 text-[var(--blue-text)]">Read more →</p>
      </div>
      {src && (
        // eslint-disable-next-line @next/next/no-img-element -- served by our own streaming route, not the image optimizer
        <img
          src={src}
          alt=""
          width={400}
          height={267}
          loading="lazy"
          className="h-auto w-[260px] shrink-0 rounded-[10px] border-[1.5px] border-ink max-[600px]:w-full"
        />
      )}
    </article>
  );
}
