export type Category = "Web Dev" | "QA" | "Capstone";

export type Project = {
  slug: string;
  title: string;
  category: Category;
  featured?: boolean;
  stack: string[];
  code?: string;
  live?: string;
  cover?: string;
  coverBg: string;
  coverFg: string;
  problem: string;
  solution: string;
  result: string;
};

const placeholder = {
  problem: "Placeholder: what needed solving, and for whom.",
  solution: "Placeholder: what you built and the key decisions.",
  result: "Placeholder: a measurable outcome.",
};

// Repo URLs marked TODO in the brief are left undefined until the owner confirms them.
export const projects: Project[] = [
  {
    slug: "selenium-test-framework-v2",
    title: "Selenium Test Framework V2",
    category: "QA",
    featured: true,
    stack: ["Selenium", "C#", "NUnit", "ExtentReports"],
    code: "https://github.com/CodeDecoder13/Selenium-V.2",
    coverBg: "#1F5FBF",
    coverFg: "#F2F6FB",
    ...placeholder,
  },
  {
    slug: "playwright-e2e-suite",
    title: "Playwright E2E Suite",
    category: "QA",
    stack: ["Playwright", "TypeScript", "GitHub Actions", "Allure"],
    coverBg: "#8DBBF2",
    coverFg: "#0B1B33",
    ...placeholder,
  },
  {
    slug: "portfolio-website-v2",
    title: "Portfolio Website V2",
    category: "Web Dev",
    stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion", "Supabase"],
    code: "https://github.com/CodeDecoder13/Project-Webportfolio",
    live: "https://project-rhuzzparamio.vercel.app",
    coverBg: "#DCE8F7",
    coverFg: "#0B1B33",
    ...placeholder,
  },
  {
    slug: "cicd-pipeline-templates",
    title: "CI/CD Pipeline Templates",
    category: "QA",
    stack: ["Jenkins", "GitHub Actions", "Azure DevOps", "Docker", "Bash"],
    coverBg: "#4E86D4",
    coverFg: "#F2F6FB",
    ...placeholder,
  },
  {
    slug: "project-airzen",
    title: "Project Airzen",
    category: "Capstone",
    stack: ["Python", "Docker", "Kubernetes", "CodeIgniter", "Flutter"],
    code: "https://github.com/CodeDecoder13/AirZen",
    coverBg: "#0B1B33",
    coverFg: "#8DBBF2",
    ...placeholder,
  },
  {
    slug: "portfolio-website-v1",
    title: "Portfolio Website V1",
    category: "Web Dev",
    stack: ["HTML", "CSS", "JavaScript"],
    code: "https://github.com/CodeDecoder13/Project_Rhuzz",
    live: "https://project-rhuzz.vercel.app",
    coverBg: "#B8C7DD",
    coverFg: "#0B1B33",
    ...placeholder,
  },
  {
    slug: "construction-contractors-inc",
    title: "Construction Contractors Inc",
    category: "Web Dev",
    stack: ["Vue 3", "Laravel 12", "Shadcn Vue", "Tailwind", "PostgreSQL"],
    live: "https://construction-contractors-inc-production.up.railway.app",
    coverBg: "#8DBBF2",
    coverFg: "#0B1B33",
    ...placeholder,
  },
  {
    slug: "devcollab",
    title: "DevCollab",
    category: "Web Dev",
    stack: ["Vue 3", "Laravel 12", "Shadcn Vue", "Tailwind", "PostgreSQL"],
    live: "https://devcollab-production-9ce4.up.railway.app",
    coverBg: "#1F5FBF",
    coverFg: "#F2F6FB",
    ...placeholder,
  },
  {
    slug: "eagles-fraternal-portal",
    title: "Eagles Fraternal Portal",
    category: "Web Dev",
    stack: ["Vue 3", "Laravel 12", "Shadcn Vue", "Tailwind", "PostgreSQL"],
    live: "https://eagles-portal-management-production.up.railway.app/admin",
    coverBg: "#DCE8F7",
    coverFg: "#0B1B33",
    ...placeholder,
  },
];
