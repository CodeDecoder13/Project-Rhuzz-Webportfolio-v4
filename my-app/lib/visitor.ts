import { useLayoutEffect, useSyncExternalStore } from "react";
import { views, type View } from "@/content/personas";

// The view lives on <html data-persona> (set before paint by the inline script in app/layout.tsx); CSS reads it directly.
export const VIEW_KEY = "persona";

export const isView = (v: unknown): v is View => views.includes(v as View);

/** The saved choice, or null if the visitor never picked (Esc / skip saves nothing). */
export function storedView(): View | null {
  try {
    const v = localStorage.getItem(VIEW_KEY);
    return isView(v) ? v : null;
  } catch {
    return null;
  }
}

const apply = (v: View) => {
  if (v === "all") delete document.documentElement.dataset.persona;
  else document.documentElement.dataset.persona = v;
};

export function setView(v: View) {
  apply(v);
  try {
    localStorage.setItem(VIEW_KEY, v);
  } catch {}
}

const read = (): View => {
  const v = document.documentElement.dataset.persona;
  return isView(v) ? v : "all";
};
const watch = (cb: () => void) => {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-persona"],
  });
  return () => mo.disconnect();
};

// Server snapshot is "all": the server always renders the default view.
export const useView = () =>
  useSyncExternalStore(watch, read, () => "all" as View);

// Dev Strict Mode remounts reset <html> attributes the inline script set; re-apply the saved view before paint.
export function useRestoreView() {
  useLayoutEffect(() => {
    const v = storedView();
    if (v && read() !== v) apply(v);
  }, []);
}
