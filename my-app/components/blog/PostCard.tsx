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
          className="aspect-[8/5] w-full border-b-[1.5px] border-ink object-cover"
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
