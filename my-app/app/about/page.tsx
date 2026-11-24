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

const ld = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: "https://rhuzz.online/about",
  mainEntity: { "@type": "Person", name: "Rhuzzel Paramio", url: "https://rhuzz.online" },
}).replace(/</g, "\\u003c");

export default function AboutPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />
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
