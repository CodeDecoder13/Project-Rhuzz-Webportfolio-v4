"use client";

import { useEffect } from "react";

// Hides the browser's "Save image as" by blocking the right-click menu and dragging on images.
// ponytail: this stops casual saving only; DevTools, screenshots and the network tab can't be blocked from a web page.
export default function ImageGuard() {
  useEffect(() => {
    const block = (e: Event) => {
      if (
        e.target instanceof Element &&
        e.target.closest("img, picture, canvas")
      )
        e.preventDefault();
    };
    document.addEventListener("contextmenu", block);
    document.addEventListener("dragstart", block);
    return () => {
      document.removeEventListener("contextmenu", block);
      document.removeEventListener("dragstart", block);
    };
  }, []);
  return null;
}
