import assert from "node:assert/strict";
import { allow } from "./rateLimit.ts";
import { contactSchema } from "./validators.ts";
import { cleanHtml } from "./sanitize.ts";
import { sniffImage } from "./image.ts";
import { hashPin, verifyPin } from "./pin.ts";
import { hashCode, makeToken, readToken } from "./token.ts";

const t = 1_000_000;
for (let i = 0; i < 5; i++) assert.ok(allow("ip", t), "first 5 pass");
assert.equal(allow("ip", t), false, "6th in the hour is blocked");
assert.ok(allow("other", t), "other IPs are independent");
assert.ok(allow("ip", t + 3_600_001), "window expires after an hour");

const ok = { name: "A", email: "a@b.co", subject: "Hi", message: "Hello" };
assert.ok(contactSchema.safeParse(ok).success);
assert.equal(contactSchema.safeParse({ ...ok, email: "nope" }).success, false);
assert.equal(
  contactSchema.safeParse({ ...ok, subject: "a\r\nBcc: x@y.z" }).success,
  false,
);
assert.equal(contactSchema.safeParse({ ...ok, message: "  " }).success, false);
// blog: sanitizer allowlist and image magic bytes
const dirty = cleanHtml(
  '<p onclick="x()">a<script>alert(1)</script><img src=x onerror=y></p><a href="javascript:alert(1)">j</a><a href="https://e.co">k</a><h1>h</h1>',
);
assert.ok(!/script|onclick|onerror|<img|javascript:|<h1/.test(dirty), dirty);
assert.ok(
  dirty.includes('href="https://e.co" target="_blank" rel="noopener nofollow"'),
  dirty,
);
assert.equal(sniffImage(Uint8Array.of(0xff, 0xd8, 0xff, 0xe0))?.ext, "jpg");
assert.equal(
  sniffImage(new TextEncoder().encode("RIFF\0\0\0\0WEBP"))?.ext,
  "webp",
);
assert.equal(
  sniffImage(new TextEncoder().encode('<svg xmlns=""></svg>')),
  null,
);
// admin: PIN hashing and signed tokens
process.env.ADMIN_SESSION_SECRET = "test-secret-not-real";
const stored = hashPin("123456");
assert.ok(stored.startsWith("scrypt$"));
assert.ok(verifyPin("123456", stored));
assert.equal(verifyPin("654321", stored), false);
assert.notEqual(hashPin("123456"), stored, "per-hash salt");
const pending = makeToken("pending", "u1");
assert.equal(readToken("pending", pending), "u1");
assert.equal(
  readToken("session", pending),
  null,
  "pending token is not a session",
);
assert.equal(
  readToken("session", makeToken("session", "u1") + "x"),
  null,
  "tampered",
);
assert.equal(
  readToken("pending", pending, Date.now() + 11 * 60_000),
  null,
  "expired",
);
assert.equal(readToken("pending", undefined), null);
assert.notEqual(hashCode("u1", "111111"), hashCode("u1", "111112"));
console.log("lib ok");
