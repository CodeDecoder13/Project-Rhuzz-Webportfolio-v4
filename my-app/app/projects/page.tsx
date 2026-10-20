import type { Metadata } from "next";
import Work from "@/components/Work";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <main className="pt-14">
      <Work />
    </main>
  );
}
