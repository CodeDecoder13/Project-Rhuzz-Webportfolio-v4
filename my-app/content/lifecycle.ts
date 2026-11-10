export type Track = "dev" | "qa";

// "How I work" comes in two flavours; each is six steps long so the panel and cards line up.
export const tracks: Record<
  Track,
  {
    label: string;
    ticket: string;
    steps: { name: string; text: string; output?: string }[];
  }
> = {
  dev: {
    label: "Full-stack / AI Engineer",
    ticket: "Brief #07",
    steps: [
      {
        name: "Discover",
        output: "A one-page brief",
        text: "I start with the problem and the person: who it's for, what hurts, and what success looks like.",
      },
      {
        name: "Design",
        output: "Data model, API routes, wireframes",
        text: "Data model, API shape and key screens before any code, so the hard decisions get made early.",
      },
      {
        name: "Build",
        output: "Typed code in small PRs",
        text: "Vue or Next.js up front, Laravel or Node behind it, typed end to end, in small reviewable commits.",
      },
      {
        name: "AI-assisted",
        output: "Faster drafts, generated tests, reviewed diffs",
        text: "Claude Code and Codex draft, refactor and write tests so I build faster. I review every line before it ships.",
      },
      {
        name: "Ship",
        output: "Green CI and a live URL",
        text: "CI runs lint, types and tests, then I deploy to the right cloud: Railway, Vercel, Hostinger, Google Cloud or Amazon.",
      },
      {
        name: "Watch",
        output: "Logs, alerts and the next fix",
        text: "Logs, errors and real usage show what to fix next. Shipping is the start of the loop, not the end.",
      },
    ],
  },
  qa: {
    label: "QA Engineer",
    ticket: "Ticket #142",
    steps: [
      {
        name: "Explore & test",
        text: "I open the web app or system first and look for UI defects, broken flows and edge cases, then test by hand against the requirement.",
      },
      {
        name: "Automate",
        text: "Every bug worth catching twice becomes an automated test (Playwright, API and regression checks) that runs on every change.",
      },
      {
        name: "Document",
        text: "Test cases, exact steps, expected vs actual, plus screenshots and logs. Anyone can reproduce it without asking me.",
      },
      {
        name: "Create ticket",
        text: "A clear ticket with severity, steps and evidence attached, assigned to one owner with one definition of done.",
      },
      {
        name: "Test again",
        text: "When the fix lands I retest on a clean build: the original steps, the automated suite, and the neighbours it could have broken.",
      },
      {
        name: "Closed",
        text: "Closed with proof attached: the test run, the notes, the link. “Works on my machine” never closes a ticket.",
      },
    ],
  },
};
