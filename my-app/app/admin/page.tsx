import type { Metadata } from "next";
import { Suspense } from "react";
import AdminPanel from "@/components/admin/AdminPanel";
import LoginForm from "@/components/admin/LoginForm";
import { postDate } from "@/components/blog/PostCard";
import { isAdmin } from "@/lib/adminAuth";
import { listPosts } from "@/lib/db";
import { missingAuth, missingDb, missingS3 } from "@/lib/env";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const Names = ({ names }: { names: string[] }) => (
  <ul className="mono mt-2 list-disc pl-5">
    {names.map((n) => (
      <li key={n}>{n}</li>
    ))}
  </ul>
);

// Reads the session cookie, so it must stream inside <Suspense>.
async function Gate() {
  const auth = [...missingAuth(), ...missingDb()];
  if (auth.length)
    return (
      <div>
        <p>
          Admin is not configured (database or sign-in settings). Missing
          environment variables:
        </p>
        <Names names={auth} />
      </div>
    );
  if (!(await isAdmin())) return <LoginForm />;

  let posts;
  try {
    posts = await listPosts();
  } catch {
    return <p role="alert">Could not reach the database.</p>;
  }
  const s3 = missingS3();
  return (
    <div className="grid gap-6">
      {s3.length > 0 && (
        <div>
          <p>Photo storage is not configured. Missing environment variables:</p>
          <Names names={s3} />
        </div>
      )}
      <AdminPanel
        photosOk={!s3.length}
        posts={posts.map((p) => ({
          id: p.id,
          title: p.title,
          descriptionHtml: p.descriptionHtml,
          hasPhoto: !!p.photoKey,
          createdAt: postDate(p.createdAt),
        }))}
      />
    </div>
  );
}

export default function AdminPage() {
  return (
    <main
      id="work"
      className="mx-auto w-full max-w-4xl px-4 pb-24 pt-28 min-[801px]:px-8"
    >
      <h1 className="display text-[clamp(44px,8vw,96px)]">Admin</h1>
      <div className="mt-6">
        <Suspense fallback={<p className="mono text-muted">Loading…</p>}>
          <Gate />
        </Suspense>
      </div>
    </main>
  );
}
