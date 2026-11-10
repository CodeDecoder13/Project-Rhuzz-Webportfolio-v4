import { projects } from "@/content/projects";
import { certs } from "@/content/certs";
import PageHero from "../PageHero";

// Half-body crop (head to hips) of About_me_nobg.png at its native 920x1330, so it stays sharp.
export const aboutPhoto = "/assets/about-half.png";

export default function AboutHero() {
  return (
    <PageHero
      label="About Rhuzzel"
      word="ABOUT"
      photo={{
        src: aboutPhoto,
        w: 920,
        h: 1330,
        alt: "Rhuzzel Paramio in a black blazer and navy tie",
      }}
      tag="Open to opportunities"
      eyebrow="hello, I’m"
      title={["Rhuzzel", "Paramio"]}
      kicker="Full-stack · QA · AI Engineer"
      blurb="I build web systems, test them like someone who didn’t write them, and add AI where it earns its place."
      pill="Metro Manila · working worldwide"
      stats={[
        { value: 3, label: "Years building", plus: true },
        { value: projects.length, label: "Projects live" },
        { value: certs.length, label: "Certifications" },
      ]}
    />
  );
}
