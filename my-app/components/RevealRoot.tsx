"use client";

import { animate, inView, stagger } from "motion";
import { useEffect } from "react";

const from = "perspective(900px) translateY(44px) rotateX(-12deg)";
const to = "perspective(900px) translateY(0px) rotateX(0deg)";
const clear = (el: HTMLElement, props: string[]) =>
  props.forEach((p) => el.style.removeProperty(p));

// Below-the-fold content arrives like this (motion drives all of it):
//  .reveal      blocks flip up in 3D on a spring, fading and de-blurring as they land, staggered across a row
//  [data-split] big headings lift word by word out of a mask
// Anything already on screen, plus no-JS and reduced-motion visitors, just sees the content.
// ponytail: CSS 3D transforms, not three.js (a canvas for this is overkill).
export default function RevealRoot() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const armed = new WeakSet<Element>();
    let raf = 0;
    const offscreen = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      // Pages the router keeps mounted but hidden have no box yet; they get armed when they show.
      return !armed.has(el) && (r.width || r.height) && r.top >= innerHeight;
    };

    const arm = () => {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
        if (!offscreen(el)) return;
        armed.add(el);
        const nth = [...(el.parentElement?.children ?? [])]
          .filter((c) => c.classList.contains("reveal"))
          .indexOf(el);
        el.style.opacity = "0";
        el.style.transform = from;
        el.style.transformOrigin = "50% 100%";
        el.style.filter = "blur(6px)";
        inView(
          el,
          () => {
            const delay = (nth % 4) * 0.09;
            animate(
              el,
              { opacity: [0, 1], filter: ["blur(6px)", "blur(0px)"] },
              { duration: 0.7, delay, ease: "easeOut" },
            );
            animate(
              el,
              { transform: [from, to] },
              { type: "spring", duration: 1, bounce: 0.1, delay },
            ).finished.then(() =>
              clear(el, ["opacity", "transform", "transform-origin", "filter"]),
            );
          },
          { margin: "0px 0px -8% 0px" },
        );
      });

      document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
        if (!offscreen(el)) return;
        armed.add(el);
        const words = [...el.querySelectorAll<HTMLElement>("[data-word]")];
        words.forEach((w) => (w.style.transform = "translateY(112%)"));
        inView(
          el,
          () => {
            animate(
              words,
              { transform: ["translateY(112%)", "translateY(0%)"] },
              {
                type: "spring",
                duration: 1,
                bounce: 0.12,
                delay: stagger(0.08),
              },
            ).finished.then(() =>
              words.forEach((w) => clear(w, ["transform"])),
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
