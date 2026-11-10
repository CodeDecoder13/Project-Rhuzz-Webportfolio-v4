// Cookie/storage choice, kept in this browser only. "all" also allows third-party embeds (the Calendly booking window).
export const CONSENT_KEY = "cookie-consent";
export const CONSENT_EVENT = "rhuzz:cookies";
export type Consent = "all" | "necessary";

export function readConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "all" || v === "necessary" ? v : null;
  } catch {
    return null;
  }
}
