import type { Metadata } from "next";
import { Anton, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import CookieConsent from "@/components/CookieConsent";
import Gate from "@/components/Gate";
import ImageGuard from "@/components/ImageGuard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RevealRoot from "@/components/RevealRoot";
import MusicPlayer from "@/components/MusicPlayer";
import { site } from "@/content/site";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});
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
  metadataBase: new URL("https://rhuzz.online"),
  title: {
    default:
      "Rhuzzel Paramio — Full-stack Engineer / QA Specialist / AI Engineer",
    template: "%s — Rhuzzel Paramio",
  },
  description:
    "Portfolio of Rhuzzel Paramio: web systems built, then broken, then shipped with proof that they pass.",
  alternates: { canonical: "./" }, // each page names itself as the canonical URL so Google indexes one version
  // Search Console "HTML tag" verification: set GOOGLE_SITE_VERIFICATION to the content="..." value it gives you.
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
};

const personLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: "https://rhuzz.online",
  email: site.email,
  sameAs: [site.github, site.linkedin],
}).replace(/</g, "\\u003c");

const THEME_INIT = `try{var t=localStorage.getItem("theme");if(t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.dataset.theme="dark"}catch(e){}`;

// ?for=dev|recruiter|business|all (share link) or the saved choice sets the view before paint; values are checked against the fixed list.
const PERSONA_INIT = `try{var d=document.documentElement,V=["dev","recruiter","business","all"],p=new URLSearchParams(location.search).get("for");if(V.indexOf(p)>-1){localStorage.setItem("persona",p);sessionStorage.setItem("gate","1")}else p=localStorage.getItem("persona");if(p&&p!=="all"&&V.indexOf(p)>-1)d.dataset.persona=p}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Sets the theme before first paint so there is no flash: saved choice, else the system preference. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <script dangerouslySetInnerHTML={{ __html: PERSONA_INIT }} />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-40 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to projects
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: personLd }}
        />
        <Header />
        {children}
        <Footer />
        <RevealRoot />
        <MusicPlayer />
        <Gate />
        <CookieConsent />
        <ImageGuard />
      </body>
    </html>
  );
}
