// Skills shown on /about, and where each one was used (project slugs and experience ids). Source: Paramio_cv-updated.pdf.
export const skillGroups = [
  {
    group: "Frontend",
    skills: ["Vue 3", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  { group: "Backend", skills: ["Laravel", "PostgreSQL", "Prisma"] },
  {
    group: "QA & DevOps",
    skills: ["Selenium (C#)", "Playwright (C#)", "Jenkins", "Railway"],
  },
  { group: "AI & automation", skills: ["n8n", "Google Gemini API", "Twilio"] },
] as const;

export const uses: Record<string, string[]> = {
  "Vue 3": ["omnipos", "whale-wallet", "devcollab", "project-airzen"],
  "Next.js": ["freelance-25", "portfolio-website-v2"],
  TypeScript: ["omnipos", "whale-wallet", "freelance-25"],
  "Tailwind CSS": ["omnipos", "whale-wallet", "devcollab", "freelance-25"],
  Laravel: ["omnipos", "whale-wallet", "devcollab", "project-airzen"],
  PostgreSQL: [
    "omnipos",
    "whale-wallet",
    "project-airzen",
    "freelance-25",
    "prisma",
  ],
  Prisma: ["freelance-25"],
  "Selenium (C#)": ["reed"],
  "Playwright (C#)": ["reed"],
  Jenkins: ["reed"],
  Railway: ["whale-wallet", "devcollab", "project-airzen"],
  n8n: ["prisma"],
  "Google Gemini API": ["whale-wallet"],
  Twilio: ["prisma"],
};

export const targetLabel: Record<string, string> = {
  omnipos: "OmniPOS",
  "whale-wallet": "Whale Wallet",
  devcollab: "DevCollab",
  "project-airzen": "AirZen",
  "portfolio-website-v2": "Portfolio V2",
  prisma: "Prisma International",
  "freelance-25": "Freelance 2025",
  reed: "Reed Elsevier",
  "freelance-23": "Freelance 2023",
};
