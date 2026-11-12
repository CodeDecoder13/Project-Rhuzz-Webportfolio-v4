import { guard } from "@/lib/adminAuth";
import { deletePost, getPost, updatePost } from "@/lib/db";
import { UUID } from "@/lib/image";
import { parsePostForm, storePhoto } from "@/lib/postForm";
import { deletePhoto } from "@/lib/s3";

const err = (error: string, status: number) =>
  Response.json({ error }, { status });

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const denied = await guard(req);
  if (denied) return denied;
  const { id } = await params;
  if (!UUID.test(id)) return err("Not found.", 404);
  const p = await parsePostForm(req);
  if (typeof p === "string") return err(p, 400);

  try {
    const old = await getPost(id);
    if (!old) return err("Not found.", 404);
    let key = p.removePhoto ? null : old.photoKey;
    let uploaded: string | null = null;
    if (p.photo) {
      const r = await storePhoto(p.photo);
      if ("error" in r) return err(r.error, 400);
      key = uploaded = r.key;
    }
    try {
      await updatePost(id, p.title, p.html, key);
    } catch {
      await deletePhoto(uploaded);
      return err("Database error.", 500);
    }
    if (old.photoKey && old.photoKey !== key) await deletePhoto(old.photoKey);
    return Response.json({ ok: true });
  } catch {
    return err("Database error.", 500);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const denied = await guard(req);
  if (denied) return denied;
  const { id } = await params;
  if (!UUID.test(id)) return err("Not found.", 404);
  try {
    const gone = await deletePost(id);
    if (!gone) return err("Not found.", 404);
    await deletePhoto(gone.photoKey);
    return Response.json({ ok: true });
  } catch {
    return err("Database error.", 500);
  }
}
