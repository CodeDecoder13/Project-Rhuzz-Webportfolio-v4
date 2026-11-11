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
  // Everyday wording for recruiters and business owners (no tool names). Drafted from the facts above; owner to approve.
  plain?: {
    summary: string;
    problem?: string;
    solution: string;
    result: string;
  };
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
    plain: {
      summary: "My second personal website, rebuilt to be easier to grow.",
      problem: "The first version worked but was hard to keep adding to.",
      solution:
        "Rebuilt it with a modern toolkit so every part is reusable and easier to change.",
      result:
        "My first step into professional web development: a site that is easier to maintain and extend.",
    },
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
    plain: {
      summary: "A live dashboard that shows how clean the air is indoors.",
      solution:
        "Rebuilt my college thesis into a live web app: small sensors measure temperature, humidity, gases and dust, and a dashboard turns the readings into an air-quality score with recommendations.",
      result: "Live on its own web address.",
    },
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
    plain: {
      summary: "My first website, built from scratch before I knew the tools.",
      solution:
        "Built by hand with the web's basic building blocks and no shortcuts. Every layout, animation and interaction was written by hand.",
      result:
        "My discovery phase: I learned how the web works at its core, and it is still online.",
    },
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
    plain: {
      summary: "A simple team task board for planning and tracking work.",
      solution:
        "Built a clean task board the whole team can use, with a modern look and none of the clutter of heavy project tools.",
      result: "A clean, modern board my team uses to work together day to day.",
    },
    cover: "/assets/webdev/devcollab.png",
    title: "DevCollab",
    category: "Web Dev",
    stack: ["Vue 3", "Laravel 12", "Shadcn Vue", "Tailwind", "PostgreSQL"],
    live: "https://devcollab-production-9ce4.up.railway.app",
    coverBg: "#1F5FBF",
    coverFg: "#F2F6FB",
    problem:
      "My team needed a simple, modern place to plan and track work together, without the clutter of heavy project tools.",
    solution:
      "Built a personal Kanban board for the team: a Vue 3 front end with Shadcn Vue and Tailwind, a Laravel 12 API and a PostgreSQL database.",
    result: "A clean, modern board my team uses to work together day to day.",
  },
  {
    slug: "eagles-fraternal-portal",
    plain: {
      summary:
        "A members-and-records system for a fraternity, built for a real client.",
      solution:
        "Built the whole system for them, including an admin area for officers.",
      result:
        "Live on the internet and built as a real project for a real client, my friend's fraternity.",
    },
    cover: "/assets/webdev/eagles.png",
    title: "Eagles Fraternal Portal",
    category: "Web Dev",
    stack: ["Vue 3", "Laravel 12", "Shadcn Vue", "Tailwind", "PostgreSQL"],
    live: "https://eagles-portal-management-production.up.railway.app/admin",
    coverBg: "#DCE8F7",
    coverFg: "#0B1B33",
    problem:
      "A friend's fraternity needed one internal system for its members and records instead of scattered chats and spreadsheets.",
    solution:
      "Built it for them as a full-stack web app: a Vue 3 front end with Shadcn Vue and Tailwind, a Laravel 12 API and a PostgreSQL database, with an admin side for officers.",
    result:
      "Deployed on Railway and built as a real project for a real client, my friend's fraternity.",
  },
  {
    slug: "portfolio-website-v3",
    plain: {
      summary: "My current portfolio site: more polished and animated.",
      problem:
        "The second version worked, but the design was still plain and I wanted something more polished and alive.",
      solution:
        "Rebuilt it with a stronger visual design, smoother animations and cleaner, better-organised parts.",
      result:
        "An improvement on V2: a more refined, better-structured portfolio that shows how far my web development has come.",
    },
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
    plain: {
      summary: "One sales system that runs many shops and branches.",
      solution:
        "A single system where each business keeps its own data, staff and subscription. It has a live checkout screen, stock and branch management, staff shifts, reports and a kitchen order screen.",
      result: "Faster checkout.",
    },
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
    plain: {
      summary:
        "A money app that shows how much you can safely spend until payday.",
      solution:
        "A finance app that forecasts your balance from bills, subscriptions and spending. An AI assistant logs expenses, reads receipts from payment apps and banks, and edits bills by chat, with every figure it quotes checked against your own data.",
      result:
        "A daily safe-to-spend amount until payday. Protected with two-step sign-in and passkeys, ready to support a companion mobile app, and tested with about 250 automatic checks.",
    },
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
