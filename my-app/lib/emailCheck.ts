import { resolveMx, resolve4 } from "node:dns/promises";

// Throwaway-inbox domains: a resume sent there reaches nobody real.
const DISPOSABLE = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "guerrillamail.net",
  "10minutemail.com",
  "10minutemail.net",
  "tempmail.com",
  "temp-mail.org",
  "temp-mail.io",
  "yopmail.com",
  "yopmail.net",
  "trashmail.com",
  "throwawaymail.com",
  "getnada.com",
  "nada.email",
  "sharklasers.com",
  "maildrop.cc",
  "dispostable.com",
  "fakeinbox.com",
  "mailnesia.com",
  "mintemail.com",
  "mohmal.com",
  "emailondeck.com",
  "tempinbox.com",
  "discard.email",
  "spamgourmet.com",
  "mytemp.email",
  "tempr.email",
  "burnermail.io",
  "inboxkitten.com",
  "moakt.com",
  "tmail.ws",
]);

// Common typos of the big providers, so "name@gmial.com" gets a helpful message instead of a bounce.
const TYPOS: Record<string, string> = {
  "gmial.com": "gmail.com",
  "gmai.com": "gmail.com",
  "gmail.co": "gmail.com",
  "gmail.con": "gmail.com",
  "gnail.com": "gmail.com",
  "gmal.com": "gmail.com",
  "gamil.com": "gmail.com",
  "yaho.com": "yahoo.com",
  "yahooo.com": "yahoo.com",
  "yahoo.con": "yahoo.com",
  "hotmial.com": "hotmail.com",
  "hotmai.com": "hotmail.com",
  "hotmail.con": "hotmail.com",
  "outlok.com": "outlook.com",
  "outlook.con": "outlook.com",
};

// Returns an error message for an address that can't receive mail, or null when it looks deliverable.
// Checks, cheapest first: disposable list, known typos, then DNS (the domain must publish MX records, or at least an A record).
// ponytail: this can't prove a mailbox exists (that needs sending); it filters typos, throwaways and fake domains.
export async function checkEmail(email: string): Promise<string | null> {
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return "Enter a valid email";
  if (DISPOSABLE.has(domain))
    return "Please use a real email address, not a temporary one.";
  if (TYPOS[domain])
    return `Did you mean ${email.split("@")[0]}@${TYPOS[domain]}?`;
  const timeout = new Promise<never>((_, rej) =>
    setTimeout(
      () => rej(Object.assign(new Error("timeout"), { code: "ETIMEOUT" })),
      3000,
    ),
  );
  try {
    const mx = await Promise.race([resolveMx(domain), timeout]);
    if (mx.length) return null;
  } catch (e) {
    const code = (e as { code?: string }).code;
    if (code !== "ENODATA" && code !== "ENOTFOUND") return null; // DNS hiccup or timeout: don't block a real person
  }
  try {
    await Promise.race([resolve4(domain), timeout]);
    return null; // no MX but the domain resolves: mail falls back to the A record
  } catch (e) {
    const code = (e as { code?: string }).code;
    return code === "ENODATA" || code === "ENOTFOUND"
      ? "That email domain can't receive mail. Check the spelling."
      : null;
  }
}
