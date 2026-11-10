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
    problem:
      "The first version worked but was hard to grow: no components, no types, no real structure.",
    solution:
      "Rebuilt it on Next.js with TypeScript, Tailwind and Framer Motion, with Supabase behind it. Reusable components and proper routing replaced copy-pasted HTML.",
    result:
      "My first step into real web development: a framework-based site that is easier to maintain and extend.",
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
    stack: ["Laravel", "Vue", "PostgreSQL", "ESP32", "Railway"],
    coverBg: "#0B1B33",
    coverFg: "#8DBBF2",
    problem:
      "Indoor air quality is invisible without sensors and a clear way to read them.",
    solution:
      "Rebuilt my college thesis into a live web app: ESP32 sensors (temperature, humidity, CO, CO2, dust) post to a Laravel API that computes AQI with the EPA breakpoint formula and returns recommendations on a gauge dashboard.",
    result: "Deployed on a custom domain on Railway.",
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
    problem:
      "I wanted a first place online to show my work, and I had never built a website before.",
    solution:
      "Built it from scratch in plain HTML, CSS and JavaScript, with no framework. Every layout, animation and interaction was hand-written.",
    result:
      "My discovery phase: I learned how the web works at its core, and it is live on Vercel.",
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
    problem:
      "V2 got me into frameworks, but the design was still plain and I wanted a site that felt more polished and alive.",
    solution:
      "Rebuilt it on Next.js with TypeScript, Tailwind and Motion, with a stronger visual design, smoother animations and cleaner components than V2.",
    result:
      "An improvement on V2: a more refined, better-structured portfolio that shows how far my web development has come.",
  },
  {
    slug: "omnipos",
    title: "OmniPOS",
    category: "Web Dev",
    cover: "/assets/webdev/omnipos.png",
    stack: [
      "Laravel 12",
      "Vue 3",
      "TypeScript",
      "Inertia.js",
      "Tailwind CSS",
      "PostgreSQL",
    ],
    live: "https://omnipos.shop",
    coverBg: "#1F5FBF",
    coverFg: "#F2F6FB",
    problem:
      "Several businesses and branches needed one POS without sharing data, staff or subscriptions.",
    solution:
      "A multi-tenant platform with tenant-isolated architecture, a real-time POS interface, inventory and branch management, role-based access control, shift management, reporting dashboards and a Kitchen Display System.",
    result: "Cut checkout time by about 30%.",
  },
  {
    slug: "whale-wallet",
    title: "Whale Wallet",
    category: "Web Dev",
    cover: "/assets/webdev/whalewallet.png",
    stack: [
      "Laravel 13",
      "Vue 3",
      "TypeScript",
      "Inertia.js",
      "Tailwind CSS 4",
      "PostgreSQL",
      "Google Gemini",
      "Railway",
    ],
    live: "https://whale-wallet.cloud",
    coverBg: "#8DBBF2",
    coverFg: "#0B1B33",
    problem:
      "Filipino users struggle to see how much they can safely spend before payday.",
    solution:
      "A finance app that forecasts balances from bills, subscriptions and spending. A Google Gemini assistant logs expenses, reads GCash, Maya and bank receipts and edits bills by chat, with every quoted figure checked against the user's data.",
    result:
      "A daily safe-to-spend amount until payday. Secured with two-factor authentication and passkeys, a REST API for a companion mobile app, about 250 PHPUnit tests, deployed on Railway.",
  },
];

// ponytail: hidden projects stay in the file so un-hiding is deleting one line.
export const projects = all.filter((p) => !p.hidden);
