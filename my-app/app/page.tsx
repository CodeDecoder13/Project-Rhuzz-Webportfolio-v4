import About from "@/components/About";
import ContactSection from "@/components/ContactSection";
import Hero from "@/components/Hero";
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
      <Manifesto />
      <Services />
      <Lifecycle />
      <Proof />
      <About />
      <ContactSection />
    </main>
  );
}
