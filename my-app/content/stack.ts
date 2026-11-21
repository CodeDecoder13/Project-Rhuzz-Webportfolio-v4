export type StackItem = {
  id: string;
  name: string;
  icon?: string; // file in public/assets/stack/<icon>.svg
  t?: string; // short text badge when there is no logo file
  glyph?: "receipt" | "chat"; // generic glyph for capabilities (not a brand)
  todo?: true; // owner to confirm
  use?: string; // one sentence, only where the repo backs it
  links?: LinkKey[];
};
export type StackRing = { label: string; items: StackItem[] };
export type StackCategory = {
  id: string;
  name: string;
  hub: [string, string];
  blurb: string;
  core: StackRing; // Fundamentals, sits in the hub disc
  rings: [StackRing, StackRing];
};

export const links = {
  omnipos: ["OmniPOS", "/projects/omnipos"],
  whale: ["Whale Wallet", "/projects/whale-wallet"],
  devcollab: ["DevCollab", "/projects/devcollab"],
  airzen: ["Project Airzen", "/projects/project-airzen"],
  eagles: ["Eagles Portal", "/projects/eagles-fraternal-portal"],
  v1: ["Portfolio V1", "/projects/portfolio-website-v1"],
  v2: ["Portfolio V2", "/projects/portfolio-website-v2"],
  v3: ["Portfolio V3", "/projects/portfolio-website-v3"],
  about: ["Experience", "/about"],
  qa: ["QA & testing", "/qa-testing"],
  contact: ["Contact chat", "/contact"],
  certs: ["Certifications", "/certifications"],
} as const;
export type LinkKey = keyof typeof links;

// Near-black brand marks: drawn in the text colour so they stay visible in dark mode.
export const darkIcons = new Set([
  "nextdotjs",
  "github",
  "vercel",
  "railway",
  "prisma",
  "express",
  "x",
  "anthropic",
  "angular",
]);

const T = (id: string, name: string, o: Partial<StackItem> = {}): StackItem => ({ id, name, ...o });

export const stack: StackCategory[] = [
  {
    id: "frontend",
    name: "Front end",
    hub: ["Front", "end"],
    blurb: "What people see and click. The web's three native languages first, then the frameworks built on them.",
    core: {
      label: "Fundamentals",
      items: [
        T("html5", "HTML5", { icon: "html5", use: "Portfolio V1 was hand-written HTML with no framework. It is still the base of every page I ship.", links: ["v1"] }),
        T("css3", "CSS3", { icon: "css", use: "Every layout and animation in Portfolio V1 was written by hand in CSS.", links: ["v1"] }),
        T("js", "JavaScript", { icon: "javascript", use: "Portfolio V1 interactions with no library, before I moved to TypeScript.", links: ["v1"] }),
      ],
    },
    rings: [
      {
        label: "Frameworks",
        items: [
          T("vue", "Vue 3", { icon: "vuedotjs", use: "The front end of OmniPOS, Whale Wallet, DevCollab and the Eagles Fraternal Portal, paired with Laravel.", links: ["omnipos", "whale", "devcollab", "eagles"] }),
          T("react", "React", { icon: "react", use: "Underneath every Next.js build, including this site.", links: ["v3"] }),
          T("next", "Next.js", { icon: "nextdotjs", use: "Portfolio V2 and V3, this site, and a HIPAA-compliant elderly-care app built freelance in 2025.", links: ["v3", "v2", "about"] }),
          T("angular", "Angular", { icon: "angular" }),
        ],
      },
      {
        label: "Libraries & typing",
        items: [
          T("ts", "TypeScript", { icon: "typescript", use: "Typed front ends on OmniPOS and Whale Wallet, and every Next.js build.", links: ["omnipos", "whale"] }),
          T("tailwind", "Tailwind CSS", { icon: "tailwindcss", use: "Styling on nearly everything: OmniPOS, Whale Wallet, DevCollab and the portfolio sites.", links: ["omnipos", "devcollab", "v3"] }),
          T("inertia", "Inertia.js", { icon: "inertia", use: "Joins Laravel to Vue without a separate API layer on OmniPOS and Whale Wallet.", links: ["omnipos", "whale"] }),
          T("bootstrap", "Bootstrap", { icon: "bootstrap" }),
        ],
      },
    ],
  },
  {
    id: "backend",
    name: "Back end",
    hub: ["Back", "end"],
    blurb: "Where the rules and the data live. Node's built-in modules first, then the frameworks and databases on top.",
    core: {
      label: "Node.js core",
      items: [
        T("crypto", "node:crypto", { t: "crypto", use: "This site's admin sign-in: HMAC-signed tokens, scrypt-hashed PINs and random one-time codes, with no auth library." }),
        T("fs", "node:fs", { t: "fs", use: "Reads the CV file this site emails on request." }),
        T("path", "node:path", { t: "path", use: "Builds the server path to that CV file." }),
        T("dns", "node:dns", { t: "dns", use: "Looks up a domain's mail records before this site sends an email to it." }),
        T("assert", "node:assert", { t: "assert", use: "The content and library checks behind npm test are plain node:assert scripts, with no test framework." }),
      ],
    },
    rings: [
      {
        label: "Frameworks",
        items: [
          T("express", "Node.js (Express)", { icon: "express" }),
          T("routes", "Next.js route handlers", { icon: "nextdotjs", use: "This site's contact form, chat, CV request and admin sign-in are all Next.js route handlers.", links: ["contact"] }),
          T("laravel", "Laravel", { icon: "laravel", use: "APIs and business logic for OmniPOS (multi-tenant POS), Whale Wallet, DevCollab, AirZen and the Eagles portal.", links: ["omnipos", "whale", "airzen"] }),
          T("dotnet", ".NET", { icon: "dotnet" }),
        ],
      },
      {
        label: "Data & languages",
        items: [
          T("postgres", "PostgreSQL", { icon: "postgresql", use: "The main database on OmniPOS, Whale Wallet and AirZen, and behind the n8n booking automation at Prisma International.", links: ["omnipos", "whale", "airzen"] }),
          T("mysql", "MySQL", { icon: "mysql" }),
          T("prisma", "Prisma", { icon: "prisma", use: "The data layer of the HIPAA-compliant elderly-care app (freelance, 2025).", links: ["about"] }),
          T("drizzle", "Drizzle ORM", { icon: "drizzle" }),
          T("php", "PHP", { icon: "php", use: "The language under every Laravel build. Whale Wallet carries about 250 PHPUnit tests.", links: ["whale"] }),
          T("csharp", "C#", { t: "C#", use: "Selenium and Playwright test suites at Reed Elsevier.", links: ["about"] }),
          T("python", "Python", { icon: "python", use: "Certified: IT Specialist in Python (Certiport).", links: ["certs"] }),
        ],
      },
    ],
  },
  {
    id: "cloud",
    name: "Cloud & hosting",
    hub: ["Cloud &", "hosting"],
    blurb: "Where the work runs. The network basics first, then the platforms that host it.",
    core: {
      label: "Fundamentals",
      items: [
        T("http", "HTTP", { t: "HTTP", use: "A REST API on Whale Wallet and hand-set security headers on this site. Networking basics certified by Cisco (CCNA: Introduction to Networks).", links: ["whale", "certs"] }),
        T("dns", "DNS", { t: "DNS", use: "Managed a domain migration at Prisma International; OmniPOS, Whale Wallet and AirZen run on their own domains.", links: ["about", "omnipos"] }),
        T("tls", "TLS / HTTPS", { t: "TLS", use: "This site sends an HSTS header so browsers only ever reach it over HTTPS." }),
      ],
    },
    rings: [
      {
        label: "Hosting",
        items: [
          T("railway", "Railway", { icon: "railway", use: "Hosts Whale Wallet, DevCollab, the Eagles portal and AirZen on its own domain.", links: ["whale", "devcollab", "airzen"] }),
          T("vercel", "Vercel", { icon: "vercel", use: "Hosts Portfolio V1 and V2.", links: ["v1", "v2"] }),
          T("supabase", "Supabase", { icon: "supabase", use: "The backend behind Portfolio V2.", links: ["v2"] }),
        ],
      },
      {
        label: "Source & pipelines",
        items: [
          T("github", "GitHub", { icon: "github" }),
          T("git", "Git", { icon: "git", use: "Kept the Reed Elsevier test scripts under version control, and every project since.", links: ["about"] }),
          T("bitbucket", "Bitbucket", { icon: "bitbucket" }),
          T("azure", "Azure DevOps", { t: "AZ" }),
          T("docker", "Docker", { icon: "docker", todo: true }),
          T("gha", "GitHub Actions", { icon: "githubactions", todo: true }),
        ],
      },
    ],
  },
  {
    id: "automation",
    name: "Automation",
    hub: ["Auto", "mation"],
    blurb: "Workflows that run themselves. The plumbing first, then the tools that move data and test builds.",
    core: {
      label: "Fundamentals",
      items: [
        T("rest", "REST APIs", { t: "REST", use: "Whale Wallet exposes a REST API for its companion mobile app. API basics certified by Cisco (DevNet Associate).", links: ["whale", "certs"] }),
        T("json", "JSON", { t: "JSON", use: "The format between every API and front end I build; this site's chat streams its replies as JSON lines.", links: ["contact"] }),
        T("webhooks", "Webhooks", { t: "hook", todo: true }),
      ],
    },
    rings: [
      {
        label: "Workflows",
        items: [
          T("n8n", "n8n", { icon: "n8n", use: "The interpreter booking and matching automation at Prisma International, with AI-assisted request extraction and duplicate prevention.", links: ["about"] }),
          T("zapier", "Zapier", { icon: "zapier" }),
          T("twilio", "Twilio", { t: "Tw", use: "Fixed A2P 10DLC SMS compliance at Prisma International.", links: ["about"] }),
        ],
      },
      {
        label: "Test automation",
        items: [
          T("selenium", "Selenium (C#)", { icon: "selenium", use: "WebDriver suites that widened test coverage at Reed Elsevier.", links: ["qa", "about"] }),
          T("playwright", "Playwright (C#)", { t: "Pw", use: "End-to-end suites at Reed Elsevier. This site is tested with Playwright and axe too.", links: ["qa"] }),
          T("jenkins", "Jenkins", { icon: "jenkins", use: "Ran the automated suites in CI/CD pipelines at Reed Elsevier.", links: ["about"] }),
          T("jmeter", "JMeter", { icon: "apachejmeter" }),
          T("postman", "Postman", { icon: "postman" }),
        ],
      },
    ],
  },
  {
    id: "ai",
    name: "AI & LLM",
    hub: ["AI &", "LLM"],
    blurb: "AI where it earns its place. The working parts of an LLM feature first, then the models and assistants.",
    core: {
      label: "Fundamentals",
      items: [
        T("prompts", "Prompt design", { t: "prompt", use: "This site's chat assistant runs on a system prompt built from the site's own content. Backed by Google Cloud's Intro to Generative AI badge.", links: ["contact", "certs"] }),
        T("llm-api", "LLM APIs", { t: "API", use: "Server-side calls to the Gemini API in Whale Wallet and in this site's chat.", links: ["whale", "contact"] }),
        T("streaming", "Streaming replies", { t: "stream", use: "This site's chat shows the answer as it is written, streamed from a route handler.", links: ["contact"] }),
        T("checks", "Output checks", { t: "check", use: "Whale Wallet checks every figure its assistant quotes against the user's own data before showing it.", links: ["whale"] }),
      ],
    },
    rings: [
      {
        label: "Build with",
        items: [
          T("gemini-api", "Google Gemini API", { icon: "googlegemini", use: "Powers the Whale Wallet assistant (logs expenses, reads receipts, edits bills by chat) and the chat on this site.", links: ["whale", "contact"] }),
          T("receipts", "AI receipt reading", { glyph: "receipt", use: "Whale Wallet turns GCash, Maya and bank receipts into logged expenses.", links: ["whale"] }),
          T("assistants", "AI chat assistants", { glyph: "chat", use: "The Whale Wallet money assistant, and the chat on this site's contact page.", links: ["whale", "contact"] }),
        ],
      },
      {
        label: "Daily assistants",
        items: [
          T("claude-code", "Claude Code", { icon: "anthropic" }),
          T("chatgpt", "ChatGPT", { t: "GPT" }),
          T("gemini", "Gemini", { icon: "googlegemini" }),
          T("grok", "Grok", { icon: "x" }),
        ],
      },
    ],
  },
];

// Left over from the old page; shown as a plain row.
export const toolbox = ["Java", "C++", "WordPress", "Elementor", "Forminator", "Figma", "Jira", "Tauri"];
