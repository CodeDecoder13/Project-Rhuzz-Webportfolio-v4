export type Level = "Expert" | "Advanced" | "Intermediate";

// Source: Paramio_cv-updated.pdf. Owner to confirm per-skill levels; default is Advanced.
const g = (names: string[], level: Level = "Advanced") =>
  names.map((name) => ({ name, level }));

export const stack = [
  {
    group: "Languages",
    skills: g([
      "PHP",
      "TypeScript",
      "JavaScript",
      "C#",
      "Python",
      "Java",
      "C++",
    ]),
  },
  {
    group: "Frontend",
    skills: g([
      "Vue 3",
      "React",
      "Next.js",
      "Angular",
      "Tailwind CSS",
      "Bootstrap",
      "Inertia.js",
      "HTML/CSS",
    ]),
  },
  {
    group: "Backend & data",
    skills: g([
      "Laravel",
      "Node.js (Express)",
      ".NET",
      "PostgreSQL",
      "MySQL",
      "Drizzle ORM",
      "Prisma",
    ]),
  },
  {
    group: "AI & automation",
    skills: g([
      "Google Gemini API",
      "LLM integration",
      "AI receipt reading",
      "AI chat assistants",
      "n8n",
      "Zapier",
      "Twilio",
      "Claude Code",
      "ChatGPT",
      "Gemini",
      "Grok",
    ]),
  },
  {
    group: "QA & DevOps",
    skills: g([
      "Selenium (C#)",
      "Playwright (C#)",
      "Jenkins",
      "JMeter",
      "Postman",
      "Azure DevOps",
      "Git",
      "GitHub",
      "Bitbucket",
      "Railway",
    ]),
  },
  {
    group: "CMS & tools",
    skills: g([
      "WordPress",
      "Elementor",
      "Forminator",
      "Figma",
      "Jira",
      "Tauri",
    ]),
  },
];
