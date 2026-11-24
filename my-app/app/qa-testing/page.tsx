import type { Metadata } from "next";
import Link from "next/link";
import { copy } from "@/content/personas";
import Lifecycle from "@/components/Lifecycle";
import { Section, SectionHead, card } from "@/components/Section";
import TestReport from "@/components/TestReport";

export const metadata: Metadata = { title: "QA & testing", description: "Manual and automated QA by Rhuzzel Paramio: Selenium and Playwright suites, CI pipelines, and a published, live test report." };

const layers = [
  {
    title: "Manual",
    text: "Exploratory and regression testing, with bugs reported and tracked through their lifecycle.",
  },
  {
    title: "Automation",
    text: "Selenium (C#, NUnit) and Playwright (TypeScript) suites covering UI and API checks.",
  },
  {
    title: "CI",
    text: "Suites run on every change through GitHub Actions, Jenkins or Azure DevOps pipelines.",
  },
];

export default function QaTestingPage() {
  return (
    <main className="page-in pt-14">
      <Section>
        <SectionHead title="QA & testing" h1 />
        <p data-for="recruiter business" className="mb-6 text-muted">
          {copy.plainIntro.qa}
        </p>
        <div className="grid grid-cols-1 gap-4 min-[801px]:grid-cols-3">
          {layers.map((l) => (
            <div key={l.title} className={card}>
              <h2 className="display text-[34px] leading-none">{l.title}</h2>
              <p className="mt-2 text-muted">{l.text}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section>
        <h2 className="display text-[clamp(28px,3vw,40px)] leading-[1.1]">What is end-to-end testing?</h2>
        <p className="mt-3 max-w-3xl text-muted">
          End-to-end testing is checking a whole product the way a user uses it: opening the page, signing in, completing a task and seeing the right result. I write these checks in Playwright and Selenium and run them on every change, so a broken journey is caught before release. More answers are on the <Link href="/faq" className="text-blue underline">FAQ page</Link>.
        </p>
      </Section>
      <Lifecycle />
      <Section>
        <TestReport />
      </Section>
    </main>
  );
}
