import assert from "node:assert/strict";
import { projects } from "./projects.ts";

assert.equal(new Set(projects.map((p) => p.slug)).size, projects.length, "slugs must be unique");
assert.ok(projects.every((p) => p.stack.length >= 1), "every project needs a stack item");
const n = (c: string) => projects.filter((p) => p.category === c).length;
assert.deepEqual([projects.length, n("Web Dev"), n("QA"), n("Capstone")], [8, 7, 0, 1]);
console.log("content ok");
