import { randomUUID } from "node:crypto";
import { MAX_PHOTO, sniffImage } from "./image";
import { missingS3 } from "./env";
import { putPhoto } from "./s3";
import { cleanHtml, plainText } from "./sanitize";

export type Parsed = {
  title: string;
  html: string;
  photo: File | null;
  removePhoto: boolean;
};

// Manual validation of the multipart body; returns an error message or the clean fields.
export async function parsePostForm(req: Request): Promise<Parsed | string> {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return "Invalid request.";
  }
  const title = String(form.get("title") ?? "").trim();
  if (!title || title.length > 150)
    return "Title is required (max 150 characters).";
  const html = cleanHtml(String(form.get("description") ?? ""));
  if (!plainText(html)) return "Description is required.";
  if (html.length > 50_000) return "Description is too long.";
  const f = form.get("photo");
  const photo = f instanceof File && f.size > 0 ? f : null;
  return { title, html, photo, removePhoto: form.get("removePhoto") === "1" };
}

// Checks size and real file type, uploads under a server-generated key. Returns the key or an error.
export async function storePhoto(
  file: File,
): Promise<{ key: string } | { error: string }> {
  if (missingS3().length) return { error: "Photo storage is not configured." };
  if (file.size > MAX_PHOTO) return { error: "Photo must be 5 MB or smaller." };
  const bytes = new Uint8Array(await file.arrayBuffer());
  const kind = sniffImage(bytes);
  if (!kind) return { error: "Photo must be a JPEG, PNG or WebP image." };
  const key = `posts/${randomUUID()}.${kind.ext}`;
  try {
    await putPhoto(key, bytes, kind.type);
  } catch {
    return { error: "Photo upload failed." };
  }
  return { key };
}
