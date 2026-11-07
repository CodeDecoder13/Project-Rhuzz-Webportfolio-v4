import type { Metadata } from "next";
import { AboutFocusProvider } from "@/components/about/AboutFocus";
import AboutHero from "@/components/about/AboutHero";
import {
  AboutContact,
  Experience,
  ProjectTeasers,
  Profile,
} from "@/components/about/AboutSections";

export const metadata: Metadata = { title: "About" };

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
