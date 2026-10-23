import type { Metadata } from "next";
import Lifecycle from "@/components/Lifecycle";
import { Section, SectionHead, card } from "@/components/Section";
import TestReport from "@/components/TestReport";

export const metadata: Metadata = { title: "QA & testing" };

const layers = [
  { title: "Manual", text: "Exploratory and regression testing, with bugs reported and tracked through their lifecycle." },
  { title: "Automation", text: "Selenium (C#, NUnit) and Playwright (TypeScript) suites covering UI and API checks." },
  { title: "CI", text: "Suites run on every change through GitHub Actions, Jenkins or Azure DevOps pipelines." },
];

export default function QaTestingPage() {
  return (
    <main className="pt-14">
      <Section>
        <SectionHead title="QA & testing" />
        <div className="grid grid-cols-1 gap-4 min-[801px]:grid-cols-3">
          {layers.map((l) => (
            <div key={l.title} className={card}>
              <h2 className="display text-[34px] leading-none">{l.title}</h2>
              <p className="mt-2 text-muted">{l.text}</p>
            </div>
          ))}
        </div>
      </Section>
      <Lifecycle />
      <Section>
        <TestReport />
      </Section>
    </main>
  );
}
