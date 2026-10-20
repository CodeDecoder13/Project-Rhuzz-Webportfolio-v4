import type { Metadata } from "next";
import { Anton, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Gate from "@/components/Gate";
import Header from "@/components/Header";
import MusicPlayer from "@/components/MusicPlayer";
import "./globals.css";

const anton = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400" });
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "600"],
});
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  // ponytail: domain unconfirmed (brief: rhuzz.online), update when final
  metadataBase: new URL("https://rhuzz.online"),
  title: {
    default: "Rhuzzel Paramio — Full-stack Engineer / QA Specialist",
    template: "%s — Rhuzzel Paramio",
  },
  description:
    "Portfolio of Rhuzzel Paramio: web systems built, then broken, then shipped with proof that they pass.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-40 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to projects
        </a>
        <Header />
        {children}
        <MusicPlayer />
        <Gate />
      </body>
    </html>
  );
}
