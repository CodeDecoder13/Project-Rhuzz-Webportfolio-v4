"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { field, pill } from "./styles";

// The editor (Tiptap) is only ever downloaded on /admin.
const RichEditor = dynamic(() => import("./RichEditor"), {
  ssr: false,
  loading: () => <p className="mono text-muted">Loading editor…</p>,
});

export type AdminPost = {
  id: string;
  title: string;
  descriptionHtml: string;
  hasPhoto: boolean;
  createdAt: string;
};

function Editor({
  post,
  photosOk,
  onDone,
}: {
  post: AdminPost | null;
  photosOk: boolean;
  onDone: () => void;
}) {
  const router = useRouter();
  const [html, setHtml] = useState(post?.descriptionHtml ?? "");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    f.set("description", html);
    setBusy(true);
    setError("");
    const res = await fetch(
      post ? `/api/admin/posts/${post.id}` : "/api/admin/posts",
      { method: post ? "PUT" : "POST", body: f },
    ).catch(() => null);
    setBusy(false);
    if (res?.ok) {
      router.refresh();
      return onDone();
    }
    setError((await res?.json().catch(() => null))?.error ?? "Could not save.");
  }

  return (
    <form onSubmit={save} className="grid max-w-3xl gap-5">
      <h2 className="display text-[40px]">{post ? "Edit post" : "New post"}</h2>
      <label className="grid gap-1">
        <span className="mono">Title</span>
        <input
          name="title"
          required
          maxLength={150}
          defaultValue={post?.title}
          className={field}
        />
      </label>
      <div className="grid gap-1">
        <span id="desc-label" className="mono">
          Description
        </span>
        <RichEditor value={html} onChange={setHtml} labelledBy="desc-label" />
      </div>
      <div className="grid gap-2">
        <label className="grid gap-1">
          <span className="mono">Photo (JPEG, PNG or WebP, max 5 MB)</span>
          <input
            name="photo"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            disabled={!photosOk}
            className={field}
          />
        </label>
        {!photosOk && (
          <p className="text-fail">Photo storage is not configured.</p>
        )}
        {post?.hasPhoto && (
          <label className="flex items-center gap-2">
            <input type="checkbox" name="removePhoto" value="1" />
            Remove the current photo
          </label>
        )}
      </div>
      {error && (
        <p role="alert" className="text-fail">
          {error}
        </p>
      )}
      <div className="flex gap-3">
        <button disabled={busy} className={pill}>
          {busy ? "Saving…" : "Save post"}
        </button>
        <button type="button" onClick={onDone} className={pill}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function AdminPanel({
  posts,
  photosOk,
}: {
  posts: AdminPost[];
  photosOk: boolean;
}) {
  const router = useRouter();
  const [mode, setMode] = useState<AdminPost | "new" | null>(null);
  const [confirming, setConfirming] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => null);
    router.refresh();
  }

  async function remove(id: string) {
    setError("");
    const res = await fetch(`/api/admin/posts/${id}`, {
      method: "DELETE",
    }).catch(() => null);
    setConfirming(null);
    if (res?.ok) return router.refresh();
    setError("Could not delete the post.");
  }

  if (mode)
    return (
      <Editor
        key={mode === "new" ? "new" : mode.id}
        post={mode === "new" ? null : mode}
        photosOk={photosOk}
        onDone={() => setMode(null)}
      />
    );

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap gap-3">
        <button onClick={() => setMode("new")} className={pill}>
          New post
        </button>
        <button onClick={logout} className={pill}>
          Log out
        </button>
      </div>
      {error && (
        <p role="alert" className="text-fail">
          {error}
        </p>
      )}
      {!posts.length && <p>No posts yet.</p>}
      <ul className="grid gap-3">
        {posts.map((p) => (
          <li
            key={p.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-[14px] border-[1.5px] border-ink bg-card p-4"
          >
            <span>
              <span className="font-semibold">{p.title}</span>{" "}
              <span className="mono text-muted">{p.createdAt}</span>
            </span>
            {confirming === p.id ? (
              <span
                role="group"
                aria-label={`Confirm deleting ${p.title}`}
                className="flex flex-wrap items-center gap-2"
              >
                <span>Delete this post for good?</span>
                <button onClick={() => remove(p.id)} className={pill}>
                  Yes, delete
                </button>
                <button onClick={() => setConfirming(null)} className={pill}>
                  Keep
                </button>
              </span>
            ) : (
              <span className="flex gap-2">
                <button
                  onClick={() => setMode(p)}
                  aria-label={`Edit ${p.title}`}
                  className={pill}
                >
                  Edit
                </button>
                <button
                  onClick={() => setConfirming(p.id)}
                  aria-label={`Delete ${p.title}`}
                  className={pill}
                >
                  Delete
                </button>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
