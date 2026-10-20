import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      {/* #work target for the skip link; replaced by the project grid in Phase 5 */}
      <section id="work" className="min-h-[50vh]" />
    </main>
  );
}
