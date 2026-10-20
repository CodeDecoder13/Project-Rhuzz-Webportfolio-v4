import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";

const base = "https://rhuzz.online";
const routes = ["", "/projects", "/qa-testing", "/tech-stack", "/about", "/certifications", "/contact", "/terms", "/privacy"];

// No lastModified: Cache Components rejects new Date() here, and a fake fixed date would mislead crawlers.
export default function sitemap(): MetadataRoute.Sitemap {
  return [...routes, ...projects.map((p) => `/projects/${p.slug}`)].map((path) => ({ url: base + path }));
}
