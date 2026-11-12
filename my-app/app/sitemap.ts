import type { MetadataRoute } from "next";
import { connection } from "next/server";
import { projects } from "@/content/projects";
import { listPosts, safe } from "@/lib/db";

const base = "https://rhuzz.online";
const routes = [
  "",
  "/projects",
  "/blog",
  "/qa-testing",
  "/tech-stack",
  "/about",
  "/certifications",
  "/contact",
  "/terms",
  "/privacy",
  "/ai-consent",
  "/cookies",
];

// No lastModified: Cache Components rejects new Date() here, and a fake fixed date would mislead crawlers.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection(); // post URLs come from the database, so this can only run per request
  const posts = await safe(listPosts, []); // fail soft: no DB, no post URLs
  return [
    ...routes,
    ...projects.map((p) => `/projects/${p.slug}`),
    ...posts.map((p) => `/blog/${p.id}`),
  ].map((path) => ({ url: base + path }));
}
