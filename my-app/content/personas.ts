// Who is looking, and the alternative wording each audience gets. The server renders every variant; CSS shows one.
// Keep this file import-free so `node content/check.ts` can load it.
export const views = ["all", "dev", "recruiter", "business"] as const;
export type View = (typeof views)[number];

export const viewMeta: Record<
  View,
  { opt: string; pick: string; who: string; now: string }
> = {
  all: {
    opt: "Everything",
    pick: "Just looking, show everything",
    who: "",
    now: "everything",
  },
  dev: {
    opt: "Developer view",
    pick: "I build software",
    who: "Developer, QA, student, tech lead",
    now: "developer",
  },
  recruiter: {
    opt: "Recruiter view",
    pick: "I'm hiring",
    who: "Recruiter, HR, hiring manager",
    now: "recruiter",
  },
  business: {
    opt: "Business view",
    pick: "I need something built",
    who: "Owner, founder, client",
    now: "business",
  },
};

// A string per audience. Missing key = same as `all`.
export type Copy = Partial<Record<View, string>> & { all: string };

export const copy = {
  heroSub: {
    all: "I build web systems, then try to break them. Shipped with proof that they pass.",
    dev: "Laravel with Vue or Next.js, typed end to end, tested before it ships. I build it, then try to break it.",
    recruiter:
      "I build websites and web apps from start to finish, and I check my own work for mistakes before anyone else has to.",
    business:
      "I build the web system your business runs on, and I test it before your customers do. One sales system I built made checkout faster.",
  } as Copy,
  heroBadge: {
    all: ["Full-stack Engineer", "QA Specialist", "AI Engineer"],
    dev: ["Full-stack", "QA automation", "AI integration"],
    recruiter: ["Builds web apps", "Checks they work", "Adds AI helpers"],
    business: [
      "Web apps built",
      "Tested before launch",
      "Automation that saves time",
    ],
  } as Record<View, string[]>,
  servicesHead: {
    all: "What I do",
    recruiter: "What I can do for your team",
    business: "What I can build for you",
  } as Copy,
  services: {
    recruiter: [
      {
        title: "Builds complete web apps",
        promise:
          "The screens people use and the system behind them, handled by one person.",
      },
      {
        title: "Finds problems before users do",
        promise:
          "Checks each feature by hand, then sets up automatic checks that run again after every change.",
      },
      {
        title: "Releases updates safely",
        promise:
          "New versions go live through the same checked steps every time, not by hand.",
      },
    ],
    business: [
      {
        title: "A web app built around your business",
        promise:
          "Sales, stock, bookings or member records in one place. Example: one system I built runs several shop branches from a single platform.",
      },
      {
        title: "Fewer bugs reaching your customers",
        promise:
          "Every release is tested before it goes live, so problems are found by me, not by the people paying you.",
      },
      {
        title: "Updates without the drama",
        promise:
          "Changes go live through a repeatable, automated process, so updates are quick and low-risk.",
      },
    ],
  },
  proofHead: { all: "Proof", recruiter: "Certificates" } as Copy,
  manifesto: {
    intro: {
      all: "a full-stack engineer and QA specialist building web systems that hold up after launch.",
      recruiter:
        "a software builder and tester making websites and apps that hold up after launch.",
      business:
        "a software builder and tester making websites and apps that hold up after launch.",
    } as Copy,
    rule: {
      all: "I think about the requirement, the user, the edge case, the failure, and the fix. Then I build around what actually needs to happen. Vue and Laravel or Next.js, the rule stays the same:",
      recruiter:
        "I think about the requirement, the user, the edge case, the failure, and the fix. Then I build around what actually needs to happen. Whatever the tools, the rule stays the same:",
      business:
        "I think about the requirement, the user, the edge case, the failure, and the fix. Then I build around what actually needs to happen. Whatever the tools, the rule stays the same:",
    } as Copy,
    now: {
      all: "Junior IT Architect at Prisma International. Websites, internal tools and n8n automation for global clients.",
      recruiter:
        "Junior IT Architect at Prisma International. Websites, internal tools and time-saving automation for global clients.",
      business:
        "Junior IT Architect at Prisma International. Websites, internal tools and time-saving automation for global clients.",
    } as Copy,
    shipped: {
      all: "OmniPOS (30% faster checkout), Whale Wallet (Gemini receipt reader) and AirZen (ESP32 sensors to a Laravel API).",
      recruiter:
        "OmniPOS (a sales system with faster checkout), Whale Wallet (an app that reads receipts with AI) and AirZen (a live indoor air-quality dashboard).",
      business:
        "OmniPOS (a sales system with faster checkout), Whale Wallet (an app that reads receipts with AI) and AirZen (a live indoor air-quality dashboard).",
    } as Copy,
  },
  about: {
    bio: [
      {
        all: "",
        recruiter:
          "I'm a Computer Science (Software Engineering) graduate from FEU Institute of Technology. I build and ship complete web platforms, and I add AI where it earns its place: chat assistants, receipt reading and automated workflows.",
        business:
          "I'm a Computer Science (Software Engineering) graduate from FEU Institute of Technology. I build and ship complete web platforms, and I add AI where it earns its place: chat assistants, receipt reading and automated workflows.",
      },
      {
        all: "",
        recruiter:
          "I came up through software testing: at Reed Elsevier I wrote automatic checks that run before every release, then did freelance work where I owned both the build and the test plan. That habit stuck. Before I write a feature, I ask how someone would break it.",
        business:
          "I came up through software testing: at Reed Elsevier I wrote automatic checks that run before every release, then did freelance work where I owned both the build and the test plan. That habit stuck. Before I write a feature, I ask how someone would break it.",
      },
    ] as Copy[],
    // Journey rows that name tools or jargon get plain wording for non-technical visitors.
    journey: {
      "2023": "Software testing intern / developer, Reed Elsevier PH",
    } as Record<string, string>,
  },
  contactHead: {
    all: "Let's ship it ↗",
    recruiter: "Let's talk ↗",
    business: "Tell me what you need ↗",
  } as Copy,
  pageHero: {
    aboutKicker: {
      all: "Full-stack · QA · AI Engineer",
      recruiter: "Builder · Tester · AI helper",
      business: "Builder · Tester · AI helper",
    } as Copy,
    aboutBlurb: {
      all: "I build web systems, test them like someone who didn’t write them, and add AI where it earns its place.",
      recruiter:
        "I build websites and apps, check them like someone who didn’t write them, and add AI helpers where they earn their place.",
      business:
        "I build web systems around your business, test them like someone who didn’t write them, and add AI where it earns its place.",
    } as Copy,
    projectsKicker: {
      all: "Web · QA · Capstone",
      recruiter: "Websites · Apps · Final-year project",
      business: "Websites · Apps · Final-year project",
    } as Copy,
    projectsBlurb: {
      all: "Web apps, test frameworks and AI builds, each one shipped and tested.",
      recruiter: "Things I built, what they do and who uses them.",
      business:
        "Real systems for real people. What the problem was and what changed.",
    } as Copy,
    contactEyebrow: {
      all: "got a project?",
      recruiter: "hiring?",
    } as Copy,
  },
  footerTag: {
    all: "Full-stack Engineer / QA Specialist / AI Engineer. I build web systems, then try to break them.",
    recruiter:
      "Builds websites and web apps from start to finish, and checks they work.",
    business:
      "Builds websites and web apps around your business, and tests them before launch.",
  } as Copy,
  plainIntro: {
    qa: "How I check that software works before people use it.",
    stack:
      "The tools I use to build and test software, and how well I know each one.",
  },
  // Recruiter About page: plain glosses instead of tool chips, plain experience points.
  skillGloss: [
    [
      "Screens people use",
      "Building the parts of a website or app that visitors see and click.",
    ],
    [
      "Systems behind them",
      "Building the hidden part that stores data and does the work.",
    ],
    [
      "Checking quality",
      "Testing software by hand and with automatic checks, and releasing it safely.",
    ],
    ["AI and automation", "Adding AI helpers and automating repeated work."],
  ] as [string, string][],
  experiencePlain: {
    prisma: [
      "Lead builder of the company websites for Prisma Languages and LGIS Group, including animated number counters and an interactive coverage map.",
      "Built an automatic booking and matching system for interpreters, with AI-assisted request reading and duplicate prevention.",
      "Fixed a website security problem, handled a web address migration and fixed text-message compliance.",
    ],
    "freelance-25": [
      "Built a healthcare web application for elderly care, owning both the screens and the system behind them.",
      "Added secure sign-in, a layout that works on phones and a well-organised database for sensitive patient data.",
      "Wrote test plans and tested releases before delivery.",
    ],
    reed: [
      "Wrote automatic checks that widened how much of the software was tested.",
      "Ran those checks automatically before releases and wrote the documentation.",
      "Kept the check scripts under version control and joined pre-release quality checks.",
    ],
    "freelance-23": [
      "Completed assigned building and testing tasks independently and handled confidential client information with discretion.",
    ],
  } as Record<string, string[]>,
  chat: {
    all: {
      hello:
        "Hi, I'm Rhuzz. Ask me about Rhuzzel's work, or anything else, or tell me what you have in mind and I'll pass it on to him.",
      chips: [
        "What does Rhuzzel do?",
        "Show me his projects",
        "I'd like to hire him",
      ],
    },
    dev: {
      hello:
        "Hi, I'm Rhuzz. Ask me how Rhuzzel builds and tests things, what he has shipped, or anything else.",
      chips: [
        "What's his tech stack?",
        "How does he test?",
        "Show me his projects",
      ],
    },
    recruiter: {
      hello:
        "Hi, I'm Rhuzz. Ask me about Rhuzzel's experience, education or how to get his CV, and I'll pass on any message to him.",
      chips: ["Is he available?", "Summarise his experience", "Send me his CV"],
    },
    business: {
      hello:
        "Hi, I'm Rhuzz. Tell me what your business needs and I'll explain how Rhuzzel could help, or pass your message on to him.",
      chips: [
        "What can he build for me?",
        "How does a project start?",
        "Book a call",
      ],
    },
  } as Record<View, { hello: string; chips: string[] }>,
  cvRole: {
    all: "",
    dev: "Developer / engineer",
    recruiter: "Recruiter / HR",
    business: "Client / business owner",
  } as Record<View, string>,
};

// Plain-wording rule for the recruiter and business views (enforced by content/check.ts and the e2e tests).
export const jargon =
  /\b(laravel|vue|next\.?js|api|ci\/cd|playwright|selenium|postgresql|docker|pipelines?|deploy\w*|stack|full-stack|qa|gemini|n8n|typescript|tailwind|phpunit|jenkins|railway|vercel|javascript|esp32|twilio|wordpress)\b/i;
