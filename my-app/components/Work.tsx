import ProjectGrid from "./ProjectGrid";
import { Section, SectionHead } from "./Section";

export default function Work() {
  return (
    <Section id="work">
      <SectionHead n="01" title="Selected work" />
      <ProjectGrid />
    </Section>
  );
}
