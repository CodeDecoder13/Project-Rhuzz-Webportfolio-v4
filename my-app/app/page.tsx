import About from "@/components/About";
import ContactSection from "@/components/ContactSection";
import Hero from "@/components/Hero";
import LatestPosts from "@/components/blog/LatestPosts";
import Lifecycle from "@/components/Lifecycle";
import Manifesto from "@/components/Manifesto";
import Proof from "@/components/Proof";
import Services from "@/components/Services";
import Work from "@/components/Work";

export default function Home() {
  return (
    <main>
      <Hero />
      <Work />
      <LatestPosts />
      <Manifesto />
      <Services />
      <Lifecycle only={["all", "dev"]} />
      <Proof />
      <About n="06" />
      <ContactSection />
    </main>
  );
}
