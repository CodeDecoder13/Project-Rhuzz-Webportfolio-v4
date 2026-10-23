export type Category = "Web Dev" | "QA" | "Capstone";

export type Project = {
  slug: string;
  title: string;
  category: Category;
  featured?: boolean;
  hidden?: boolean;
  stack: string[];
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
const all: Project[] = [
  {
    slug: "selenium-test-framework-v2",
    hidden: true,
    title: "Selenium Test Framework V2",
    category: "QA",
    featured: true,
    stack: ["Selenium", "C#", "NUnit", "ExtentReports"],
    coverBg: "#1F5FBF",
    coverFg: "#F2F6FB",
    ...placeholder,
  },
  {
    slug: "playwright-e2e-suite",
    hidden: true,
    title: "Playwright E2E Suite",
    category: "QA",
    stack: ["Playwright", "TypeScript", "GitHub Actions", "Allure"],
    coverBg: "#8DBBF2",
    coverFg: "#0B1B33",
    ...placeholder,
  },
  {
    slug: "portfolio-website-v2",
    cover: "/assets/webdev/portfolio-v2.png",
    title: "Portfolio Website V2",
    category: "Web Dev",
    stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion", "Supabase"],
    live: "https://project-rhuzzparamio.vercel.app",
    coverBg: "#DCE8F7",
    coverFg: "#0B1B33",
    ...placeholder,
  },
  {
    slug: "cicd-pipeline-templates",
    hidden: true,
    title: "CI/CD Pipeline Templates",
    category: "QA",
    stack: ["Jenkins", "GitHub Actions", "Azure DevOps", "Docker", "Bash"],
    coverBg: "#4E86D4",
    coverFg: "#F2F6FB",
    ...placeholder,
  },
  {
    slug: "project-airzen",
    cover: "/assets/webdev/project-airzen.png",
    title: "Project Airzen",
    category: "Capstone",
    stack: ["Python", "Docker", "Kubernetes", "CodeIgniter", "Flutter"],
    coverBg: "#0B1B33",
    coverFg: "#8DBBF2",
    ...placeholder,
  },
  {
    slug: "portfolio-website-v1",
    cover: "/assets/webdev/portfolio-v1.png",
    title: "Portfolio Website V1",
    category: "Web Dev",
    stack: ["HTML", "CSS", "JavaScript"],
    live: "https://project-rhuzz.vercel.app",
    coverBg: "#B8C7DD",
    coverFg: "#0B1B33",
    ...placeholder,
  },
  {
    slug: "construction-contractors-inc",
    cover: "/assets/webdev/nexora.png",
    hidden: true,
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
    cover: "/assets/webdev/devcollab.png",
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
    cover: "/assets/webdev/eagles.png",
    title: "Eagles Fraternal Portal",
    category: "Web Dev",
    stack: ["Vue 3", "Laravel 12", "Shadcn Vue", "Tailwind", "PostgreSQL"],
    live: "https://eagles-portal-management-production.up.railway.app/admin",
    coverBg: "#DCE8F7",
    coverFg: "#0B1B33",
    ...placeholder,
  },
  {
    slug: "portfolio-website-v3",
    title: "Portfolio Website V3",
    category: "Web Dev",
    cover: "/assets/webdev/portfolio-v3.png",
    stack: ["Next.js", "TypeScript", "Tailwind", "Motion"],
    live: "https://project-rhuzz-graduated-version-production-0689.up.railway.app",
    coverBg: "#0B1B33",
    coverFg: "#8DBBF2",
    ...placeholder,
  },
  {
    slug: "omnipos",
    title: "OmniPOS",
    category: "Web Dev",
    cover: "/assets/webdev/omnipos.png",
    stack: ["Vue 3", "Laravel 13", "Tailwind"],
    live: "https://omnipos.shop",
    coverBg: "#1F5FBF",
    coverFg: "#F2F6FB",
    ...placeholder,
  },
  {
    slug: "whale-wallet",
    title: "Whale Wallet",
    category: "Web Dev",
    cover: "/assets/webdev/whalewallet.png",
    stack: ["Vue 3", "Laravel 13", "Tailwind"],
    live: "https://whale-wallet.cloud",
    coverBg: "#8DBBF2",
    coverFg: "#0B1B33",
    ...placeholder,
  },
];

// ponytail: hidden projects stay in the file so un-hiding is deleting one line.
export const projects = all.filter((p) => !p.hidden);

