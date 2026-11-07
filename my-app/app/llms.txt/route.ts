import { about } from "@/content/about";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

const base = "https://rhuzz.online";

// llms.txt: a plain-text summary for AI assistants, built from the same content the site renders.
export function GET() {
  const text = `# ${site.name}

> ${site.role}, based in the ${site.location}. ${about.statement}

${about.bio.join("\n\n")}

## Pages
- [Home](${base}/)
- [About](${base}/about)
- [Projects](${base}/projects)
- [QA testing](${base}/qa-testing)
- [Tech stack](${base}/tech-stack)
- [Certifications](${base}/certifications)
- [Contact](${base}/contact)

## Projects
${projects.map((p) => `- [${p.title}](${base}/projects/${p.slug}): ${p.stack.join(", ")}${p.live ? `. Live: ${p.live}` : ""}`).join("\n")}

## Experience
${about.experience.map((e) => `- ${e.role}, ${e.org} (${e.period})`).join("\n")}

## Contact
- Email: ${site.email}
- GitHub: ${site.github}
- LinkedIn: ${site.linkedin}
- Book a call: ${site.calendly}
`;
  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
