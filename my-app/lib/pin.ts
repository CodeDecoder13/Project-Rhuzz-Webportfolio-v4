import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

// Stored as `scrypt$N$salt$hash` (hex). No imports from Next, so scripts/seed-admin.mjs can use it too.
const N = 16384;

export function hashPin(pin: string) {
  const salt = randomBytes(16);
  const key = scryptSync(pin, salt, 64, { N });
  return `scrypt$${N}$${salt.toString("hex")}$${key.toString("hex")}`;
}

export function verifyPin(pin: string, stored: string) {
  const [alg, n, salt, hash] = stored.split("$");
  if (alg !== "scrypt" || !n || !salt || !hash) return false;
  const want = Buffer.from(hash, "hex");
  const got = scryptSync(pin, Buffer.from(salt, "hex"), want.length, {
    N: Number(n),
  });
  return got.length === want.length && timingSafeEqual(got, want);
}

// Unknown email: burn the same scrypt time so response timing doesn't reveal which emails exist.
const DUMMY = hashPin("dummy-pin-for-timing");
export const dummyVerify = (pin: string) => {
  verifyPin(pin, DUMMY);
  return false;
};
