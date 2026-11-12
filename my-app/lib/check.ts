import assert from "node:assert/strict";
import { allow } from "./rateLimit.ts";
import { contactSchema } from "./validators.ts";
import { cleanHtml } from "./sanitize.ts";
import { sniffImage } from "./image.ts";

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
console.log("lib ok");
