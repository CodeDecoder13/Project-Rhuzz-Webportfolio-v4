import assert from "node:assert/strict";
import { projects } from "./projects.ts";
import { stories } from "./stories.ts";

assert.equal(
  new Set(projects.map((p) => p.slug)).size,
  projects.length,
  "slugs must be unique",
);
assert.ok(
  projects.every((p) => p.stack.length >= 1),
  "every project needs a stack item",
);
const n = (c: string) => projects.filter((p) => p.category === c).length;
assert.deepEqual(
  [projects.length, n("Web Dev"), n("QA"), n("Capstone")],
  [8, 7, 0, 1],
);
// Each case-study page should carry 400+ words (story plus problem/solution/result) for search and answer engines.
for (const p of projects) {
  const words = [...(stories[p.slug] ?? []).map((s) => s.p), p.problem, p.solution, p.result].join(" ").split(/\s+/).length;
  assert.ok(words >= 400, `${p.slug} case study has ${words} words, needs 400+`);
}
console.log("content ok");

// Adaptive views: every audience has every copy block, and the plain views contain no tool names.
import { copy, jargon, views, type Copy } from "./personas.ts";

const plain = ["recruiter", "business"] as const;
const walk = (x: unknown, out: string[] = []): string[] => {
  if (typeof x === "string") out.push(x);
  else if (Array.isArray(x)) x.forEach((i) => walk(i, out));
  else if (x && typeof x === "object")
    Object.values(x).forEach((i) => walk(i, out));
  return out;
};
const copies: Copy[] = [
  copy.heroSub,
  copy.servicesHead,
  copy.proofHead,
  copy.manifesto.intro,
  copy.manifesto.rule,
  copy.manifesto.now,
  copy.manifesto.shipped,
  copy.contactHead,
  copy.pageHero.aboutKicker,
  copy.pageHero.aboutBlurb,
  copy.pageHero.projectsKicker,
  copy.pageHero.projectsBlurb,
  copy.footerTag,
];
for (const c of copies)
  assert.ok(c.all.length > 0, "every Copy needs an `all` string");
for (const v of views) {
  assert.equal(copy.heroBadge[v].length, 3, `badge for ${v}`);
  assert.ok(
    copy.chat[v].hello && copy.chat[v].chips.length === 3,
    `chat for ${v}`,
  );
}
for (const v of plain) {
  const strings = [
    ...copies.map((c) => c[v] ?? c.all),
    ...copy.heroBadge[v],
    ...copy.services[v].flatMap((s) => [s.title, s.promise]),
    ...walk(copy.chat[v]),
    ...copy.about.bio.map((b) => b[v] ?? ""),
    ...Object.values(copy.about.journey),
    ...projects.flatMap((p) => walk(p.plain ?? {})),
  ];
  for (const s of strings)
    assert.ok(!jargon.test(s), `${v} copy has tool jargon: ${s}`);
}
for (const p of projects)
  assert.ok(
    p.plain,
    `${p.slug} needs plain wording for the recruiter and business views`,
  );
assert.ok(
  !/\d+\s?%/.test(
    walk([copy.heroSub.business, copy.services.business]).join(" "),
  ),
  "no invented percentages in business copy",
);
console.log("views ok");


// Tech stack: a fundamentals core plus two rings per category, every logo file and link target exists.
import { existsSync } from "node:fs";
import { links, stack } from "./stack.ts";

const ids = new Set<string>();
for (const c of stack) {
  assert.ok(c.core.items.length >= 3 && c.core.items.length <= 5, `${c.id} core size`);
  for (const r of [c.core, ...c.rings]) {
    assert.ok(r.items.length >= 1 && r.items.length <= 8, `${c.id}/${r.label} ring size`);
    for (const it of r.items) {
      assert.ok(!ids.has(`${c.id}:${it.id}`), `duplicate item ${it.id}`);
      ids.add(`${c.id}:${it.id}`);
      assert.ok(!it.icon || existsSync(`public/assets/stack/${it.icon}.svg`), `${it.name} logo file missing`);
      assert.ok(it.icon || it.glyph || it.t, `${it.name} needs a logo, glyph or text badge`);
    }
  }
}
const slugs = new Set(projects.map((p) => p.slug));
for (const [k, [, href]] of Object.entries(links)) {
  const m = href.match(/^\/projects\/(.+)$/);
  assert.ok(!m || slugs.has(m[1]), `stack link ${k} points at a missing project`);
}
console.log("stack ok");
