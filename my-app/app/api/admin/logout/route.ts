import { clearCookie, sameOrigin } from "@/lib/adminAuth";

export async function POST(req: Request) {
  if (!sameOrigin(req))
    return Response.json({ error: "Forbidden." }, { status: 403 });
  const res = Response.json({ ok: true });
  res.headers.append("Set-Cookie", clearCookie("session"));
  res.headers.append("Set-Cookie", clearCookie("pending"));
  return res;
}
