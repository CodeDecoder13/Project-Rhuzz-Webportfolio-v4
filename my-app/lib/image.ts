// Detects the real image type from the first bytes; the browser-declared type is never trusted.
export type ImageKind = { ext: "jpg" | "png" | "webp"; type: string };

export function sniffImage(b: Uint8Array): ImageKind | null {
  const at = (i: number, s: string) =>
    [...s].every((c, k) => b[i + k] === c.charCodeAt(0));
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff)
    return { ext: "jpg", type: "image/jpeg" };
  if (
    b[0] === 0x89 &&
    at(1, "PNG") &&
    b[4] === 0x0d &&
    b[5] === 0x0a &&
    b[6] === 0x1a &&
    b[7] === 0x0a
  )
    return { ext: "png", type: "image/png" };
  if (at(0, "RIFF") && at(8, "WEBP"))
    return { ext: "webp", type: "image/webp" };
  return null;
}

export const MAX_PHOTO = 5 * 1024 * 1024;
const U = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}";
export const UUID = new RegExp(`^${U}$`);
export const PHOTO_NAME = new RegExp(`^${U}\\.(jpg|png|webp)$`);

// Public URL for a stored key like `posts/<uuid>.jpg`; anything unexpected yields no image.
export const photoUrl = (key: string | null) =>
  key?.startsWith("posts/") && PHOTO_NAME.test(key.slice(6))
    ? `/api/blog/photo/${key.slice(6)}`
    : null;
