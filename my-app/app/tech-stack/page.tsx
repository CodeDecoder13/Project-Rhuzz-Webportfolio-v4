import type { Metadata } from "next";
import { copy } from "@/content/personas";
import { Section, SectionHead } from "@/components/Section";
import { StackOrbit } from "@/components/stack/StackOrbit";
import { toolbox } from "@/content/stack";

export const metadata: Metadata = { title: "Tech stack" };

export default function TechStackPage() {
  return (
    <main className="page-in pt-14">
      <Section>
        <SectionHead title="Tech stack" />
        <p data-for="recruiter business" className="mb-6 text-muted">
          {copy.plainIntro.stack}
        </p>
        <StackOrbit />
        <p className="mono mt-6 border-t-[1.5px] border-line pt-6 text-muted">
          Also in the toolbox: {toolbox.join(", ")}
        </p>
      </Section>
    </main>
  );
}
