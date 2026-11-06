export type Track = "dev" | "qa";

// "How I work" comes in two flavours; each is six steps long so the panel and cards line up.
export const tracks: Record<
  Track,
  { label: string; ticket: string; steps: { name: string; text: string }[] }
> = {
  dev: {
    label: "Full-stack / AI Engineer",
    ticket: "Brief #07",
    steps: [
      {
        name: "Discover",
        text: "I start with the problem and the person: who it's for, what hurts, and what success looks like.",
      },
      {
        name: "Design",
        text: "Data model, API shape and key screens before any code, so the hard decisions get made early.",
      },
      {
        name: "Build",
        text: "Vue or Next.js up front, Laravel or Node behind it, typed end to end, in small reviewable commits.",
      },
      {
        name: "Add AI",
        text: "Where it earns its place: Gemini assistants, receipt reading, n8n automations. Every answer is checked against real data.",
      },
      {
        name: "Ship",
        text: "CI runs lint, types and tests, then Railway or Vercel deploys. Rollback is always one click away.",
      },
      {
        name: "Watch",
        text: "Logs, errors and real usage show what to fix next. Shipping is the start of the loop, not the end.",
      },
    ],
  },
  qa: {
    label: "QA Engineer",
    ticket: "Ticket #142",
    steps: [
      {
        name: "New",
        text: "A bug or a requirement lands. I reproduce it, write the steps down and decide what “fixed” looks like.",
      },
      {
        name: "Assigned",
        text: "One owner, one priority, one definition of done. Nothing sits in a shared inbox.",
      },
      {
        name: "In progress",
        text: "I fix the cause, not the symptom, and add a test that fails without the fix.",
      },
      {
        name: "Fixed",
        text: "Reviewed, merged, and the test that failed now passes in CI.",
      },
      {
        name: "Verified",
        text: "A second pass on a clean build: the original steps, plus the neighbours it could have broken.",
      },
      {
        name: "Closed",
        text: "Shipped with proof attached: the test run, the notes, the link. “Works on my machine” never closes a ticket.",
      },
    ],
  },
};
