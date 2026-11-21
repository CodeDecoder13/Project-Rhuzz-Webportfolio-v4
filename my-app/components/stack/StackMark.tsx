import type { CSSProperties } from "react";
import { darkIcons, type StackItem } from "@/content/stack";

const GLYPH = {
  receipt: "M6 2.8h12v18.4l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5-2 1.5zM9 8h6M9 11.5h6M9 15h3.5",
  chat: "M4 4.5h16v11.5h-8.5L7 20v-4H4zM8 9h8M8 12.2h5",
};

// Decorative: the button around it carries the accessible name.
export function StackMark({ item }: { item: StackItem }) {
  if (item.icon) {
    const url = `/assets/stack/${item.icon}.svg`;
    return darkIcons.has(item.icon) ? (
      <span className="so-mask" style={{ "--u": `url(${url})` } as CSSProperties} />
    ) : (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={url} alt="" draggable={false} loading="lazy" />
    );
  }
  if (item.glyph)
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d={GLYPH[item.glyph]} />
      </svg>
    );
  const t = item.t ?? item.name;
  const fs = [0, 20, 19, 16, 13.5, 11.5, 10, 8.8][Math.min(t.length, 7)];
  return (
    <svg className="so-txt" viewBox="0 0 48 48" aria-hidden="true">
      <text x="24" y="24.5" dominantBaseline="central" textAnchor="middle" fontFamily="ui-monospace, Consolas, monospace" fontSize={fs} fontWeight="700" fill="currentColor">
        {t}
      </text>
    </svg>
  );
}
