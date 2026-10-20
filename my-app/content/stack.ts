export type Level = "Expert" | "Advanced" | "Intermediate";

// Owner to confirm per-skill levels; default is Advanced.
const g = (names: string[], level: Level = "Advanced") => names.map((name) => ({ name, level }));

export const stack = [
  { group: "Frontend", skills: g(["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML5/CSS3"]) },
  { group: "Backend", skills: g(["Node.js", "Laravel", ".NET", "Prisma", "Express.js", "GraphQL"]) },
  { group: "Database", skills: g(["PostgreSQL", "MySQL", "Supabase", "MongoDB", "Redis"]) },
  { group: "QA & DevOps", skills: g(["Selenium", "Playwright", "Jenkins", "Azure DevOps", "GitHub Actions", "Docker", "Git", "Jira"]) },
  {
    group: "Other tools",
    skills: g(["VS Code", "Postman", "Figma", "Notion", "Slack", "npm", "pnpm", "Vercel", "Netlify", "Linux", "REST", "WebSockets", "OAuth", "JWT", "Agile/Scrum"]),
  },
];
