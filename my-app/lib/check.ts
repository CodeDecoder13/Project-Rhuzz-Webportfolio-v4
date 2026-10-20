import assert from "node:assert/strict";
import { allow } from "./rateLimit.ts";
import { contactSchema } from "./validators.ts";

const t = 1_000_000;
for (let i = 0; i < 5; i++) assert.ok(allow("ip", t), "first 5 pass");
assert.equal(allow("ip", t), false, "6th in the hour is blocked");
assert.ok(allow("other", t), "other IPs are independent");
assert.ok(allow("ip", t + 3_600_001), "window expires after an hour");

const ok = { name: "A", email: "a@b.co", subject: "Hi", message: "Hello" };
assert.ok(contactSchema.safeParse(ok).success);
assert.equal(contactSchema.safeParse({ ...ok, email: "nope" }).success, false);
assert.equal(contactSchema.safeParse({ ...ok, subject: "a\r\nBcc: x@y.z" }).success, false);
assert.equal(contactSchema.safeParse({ ...ok, message: "  " }).success, false);
console.log("lib ok");
