import { guard } from "@/lib/adminAuth";
import { createPost } from "@/lib/db";
import { parsePostForm, storePhoto } from "@/lib/postForm";
import { deletePhoto } from "@/lib/s3";

export async function POST(req: Request) {
  const denied = await guard(req);
  if (denied) return denied;
  const p = await parsePostForm(req);
  if (typeof p === "string")
    return Response.json({ error: p }, { status: 400 });

  let key: string | null = null;
  if (p.photo) {
    const r = await storePhoto(p.photo);
    if ("error" in r) return Response.json({ error: r.error }, { status: 400 });
    key = r.key;
  }
  try {
    const post = await createPost(p.title, p.html, key);
    return Response.json({ ok: true, id: post.id });
  } catch {
    await deletePhoto(key);
    return Response.json({ error: "Database error." }, { status: 500 });
  }
}
