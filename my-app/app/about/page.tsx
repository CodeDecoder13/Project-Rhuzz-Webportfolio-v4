import type { Metadata } from "next";
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
      <AboutHero />
      <ProjectTeasers />
      <Profile />
      <Experience />
      <AboutContact />
    </main>
  );
}
