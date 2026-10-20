"use client";

import { useEffect, useRef, useState } from "react";

// Renders the true value on the server and without JS; animates 0 -> value once in view and always ends on value.
export default function CountUp({ value, ms = 1000 }: { value: number; ms?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - t0) / ms, 1);
        setN(p === 1 ? value : Math.round(value * p));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      setN(value);
    };
  }, [value, ms]);

  return <span ref={ref}>{n}</span>;
}
