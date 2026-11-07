"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { uses } from "@/content/skills";

type Focus = {
  skill: string | null;
  setSkill: (s: string | null) => void;
  role: string;
  setRole: (r: string) => void;
};
const Ctx = createContext<Focus | null>(null);

// One shared focus for the /about page: a picked skill lights up the projects and roles that used it,
// and the selected role is shared between the experience explorer and the timeline.
export function AboutFocusProvider({ children }: { children: ReactNode }) {
  const [skill, setSkill] = useState<string | null>(null);
  const [role, setRole] = useState("prisma");
  const value = useMemo(
    () => ({ skill, setSkill, role, setRole }),
    [skill, role],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useFocus() {
  const c = useContext(Ctx);
  if (!c) throw Error("useFocus needs AboutFocusProvider");
  return c;
}

// true when nothing is picked, or when the picked skill was used in this target
export function useMatches(target: string) {
  const { skill } = useFocus();
  return skill === null || (uses[skill] ?? []).includes(target);
}

// A project card that dims when the picked skill wasn't used in it, and says so when it was.
export function FocusItem({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  const { skill } = useFocus();
  const match = useMatches(slug);
  return (
    <li
      className={`reveal relative transition-[opacity,filter] duration-300 ease-out ${skill && !match ? "opacity-35 saturate-50" : ""}`}
    >
      {children}
      {skill && match && (
        <span className="mono pointer-events-none absolute right-3 top-3 rounded-full border-[1.5px] border-ink bg-blue px-2.5 py-0.5 text-[10px] text-white">
          ✓ {skill}
        </span>
      )}
    </li>
  );
}
