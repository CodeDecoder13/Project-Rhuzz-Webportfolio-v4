"use client";

import { animate, inView } from "motion";
import { useEffect } from "react";

const from = "perspective(900px) translateY(48px) rotateX(-14deg)";
const to = "perspective(900px) translateY(0px) rotateX(0deg)";

// Below-the-fold .reveal elements flip up in 3D as they scroll in. Everything above the fold, and anyone
// with JS off or reduced motion, just sees the content. ponytail: CSS 3D transforms, not three.js (a canvas for this is overkill).
export default function RevealRoot() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const armed = new WeakSet<Element>();
    let raf = 0;

    const arm = () => {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
        const r = el.getBoundingClientRect();
        // Pages the router keeps mounted but hidden have no box yet; they get armed when they show.
        if (armed.has(el) || (!r.width && !r.height) || r.top < innerHeight)
          return;
        armed.add(el);
        const nth = [...(el.parentElement?.children ?? [])]
          .filter((c) => c.classList.contains("reveal"))
          .indexOf(el);
        el.style.opacity = "0";
        el.style.transform = from;
        el.style.transformOrigin = "50% 100%";
        inView(
          el,
          () => {
            animate(
              el,
              { opacity: [0, 1], transform: [from, to] },
              {
                duration: 0.8,
                delay: (nth % 3) * 0.08,
                ease: [0.23, 1, 0.32, 1],
              },
            ).finished.then(() =>
              ["opacity", "transform", "transform-origin"].forEach((p) =>
                el.style.removeProperty(p),
              ),
            );
          },
          { margin: "0px 0px -8% 0px" },
        );
      });
    };

    arm();
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(arm);
    });
    mo.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "hidden", "class"],
    });
    return () => {
      mo.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
