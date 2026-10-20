import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-4 text-center">
      <div>
        <p className="mono">404</p>
        <h1 className="display text-[clamp(56px,13vw,200px)]">Not found</h1>
        <p className="my-4 text-muted">This page failed its own test.</p>
        <Link href="/" className="rounded-full border-[1.5px] border-ink bg-ink px-[26px] py-3.5 font-mono text-[13px] uppercase tracking-[.06em] text-paper">
          Back home
        </Link>
      </div>
    </main>
  );
}
