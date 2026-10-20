import { Section } from "./Section";

export default function Manifesto() {
  return (
    <Section className="bg-ink text-paper">
      <div className="mb-8 flex flex-wrap items-baseline gap-4">
        <span className="mono">02 /</span>
        <span className="mono text-[#9FB4D1]">Behind the work</span>
      </div>
      <p className="display text-[clamp(36px,7vw,96px)] leading-[.95]">
        Ship it.
        <br />
        Then <span className="text-sky">break it.</span>
        <br />
        Fix what broke.
        <br />
        Prove it <span className="text-sky">passes.</span>
        <br />
        Repeat.
      </p>
    </Section>
  );
}
