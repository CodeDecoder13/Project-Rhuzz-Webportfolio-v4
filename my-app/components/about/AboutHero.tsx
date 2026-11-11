import { projects } from "@/content/projects";
import { certs } from "@/content/certs";
import { copy } from "@/content/personas";
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
      kicker={copy.pageHero.aboutKicker}
      blurb={copy.pageHero.aboutBlurb}
      pill="Metro Manila · working worldwide"
      stats={[
        { value: 3, label: "Years building", plus: true },
        { value: projects.length, label: "Projects live" },
        { value: certs.length, label: "Certifications" },
      ]}
    />
  );
}
