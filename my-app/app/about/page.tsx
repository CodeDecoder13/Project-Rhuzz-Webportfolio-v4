import type { Metadata } from "next";
import { AboutFocusProvider } from "@/components/about/AboutFocus";
import AboutHero from "@/components/about/AboutHero";
import {
  AboutContact,
  Experience,
  ProjectTeasers,
  Profile,
} from "@/components/about/AboutSections";

export const metadata: Metadata = { title: "About", description: "About Rhuzzel Paramio: B.S. Computer Science graduate and full-stack, QA and AI engineer in Metro Manila, with a timeline of roles since 2023." };

export default function AboutPage() {
  return (
    <main>
      <AboutFocusProvider>
        <AboutHero />
        <ProjectTeasers />
        <Profile />
        <Experience />
        <AboutContact />
      </AboutFocusProvider>
    </main>
  );
}
