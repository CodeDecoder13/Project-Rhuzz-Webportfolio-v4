// Answers stay at 40-60 words so engines can quote them whole. Every fact comes from site.ts, about.ts and services.ts.
export const faq = [
  {
    q: "Who is Rhuzzel Paramio?",
    a: "Rhuzzel Paramio is a full-stack engineer, QA specialist and AI engineer in the Philippines. He graduated in Computer Science (Software Engineering) from FEU Institute of Technology and builds web platforms in Laravel, Vue 3 and Next.js, then proves they work with automated tests.",
  },
  {
    q: "What services does Rhuzzel offer?",
    a: "Three services: full-stack builds on Vue, Next.js and Laravel; automation and QA with Selenium and Playwright; and CI/CD and DevOps using Docker, GitHub Actions, Jenkins, Railway and Vercel. Each project ships with tests, so a client sees evidence that the work passes before it goes live.",
  },
  {
    q: "What does a QA engineer do on a web project?",
    a: "A QA engineer finds problems before users do. That means exploratory and regression testing by hand, automated UI and API suites in tools like Selenium or Playwright, and running those suites in a CI pipeline on every change so a broken release is caught early rather than after launch.",
  },
  {
    q: "Which tools and languages does Rhuzzel use?",
    a: "On the build side: Laravel, Vue 3, Next.js, TypeScript, Tailwind and PostgreSQL. On the testing side: Selenium with C# and NUnit, and Playwright with TypeScript. Delivery runs through GitHub Actions, Jenkins or Azure DevOps, with Docker, and deployment to Railway or Vercel. The Tech stack page lists all of it.",
  },
  {
    q: "Does Rhuzzel have certifications?",
    a: "Yes. Seven certifications are listed on the Certifications page, and each one links to its Credly record so it can be verified independently. They are shown with their badges and a short description of what each covers.",
  },
  {
    q: "How can I see proof that the work is tested?",
    a: "The QA and testing page publishes a real Playwright test report, including the run date and a breakdown by suite, so the numbers can be checked rather than taken on trust. Project pages describe the problem, the solution and the result for each build.",
  },
  {
    q: "How do I contact Rhuzzel, and how fast is the reply?",
    a: "Use the Contact page to send a message, email directly, or book a 30-minute call on Calendly. Replies usually arrive within 24 to 48 hours. A CV is available on request from the footer and is emailed rather than linked publicly.",
  },
  {
    q: "Is Rhuzzel available for freelance or contract work?",
    a: "Rhuzzel has worked freelance and on contract, including full-stack builds with built-in test plans and a current contract role as a Junior IT Architect. For a new project, book a call or send a message with the scope, and he will reply with whether and how he can help.",
  },
] as const;
