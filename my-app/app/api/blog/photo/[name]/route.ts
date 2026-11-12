import { PHOTO_NAME } from "@/lib/image";
import { getPhoto } from "@/lib/s3";

const types: Record<string, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

// Public read-only: only `posts/<uuid>.<ext>` keys can ever be built from the path.
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;
  if (!PHOTO_NAME.test(name)) return new Response("Not found", { status: 404 });
  try {
    const body = await getPhoto(`posts/${name}`);
    if (!body) return new Response("Not found", { status: 404 });
    return new Response(body, {
      headers: {
        "Content-Type": types[name.split(".")[1]],
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
