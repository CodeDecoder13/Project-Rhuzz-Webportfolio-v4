import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("gate", "1"));
});

const origin = "http://localhost:3100";
const id = "00000000-0000-4000-8000-000000000000";

test("blog renders its heading and the empty state without a database", async ({
  page,
}) => {
  const res = await page.goto("/blog");
  expect(res?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Wins");
  await expect(
    page.getByRole("heading", { level: 2, name: "Latest posts" }),
  ).toBeVisible();
  // the database may or may not hold posts: either the empty notice or a post row is fine
  await expect(
    page.getByText("No posts yet").or(page.locator("article").first()),
  ).toBeVisible();
});

test("blog is in the nav", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "Primary" })
    .getByRole("link", { name: "Blog" })
    .click();
  await expect(page).toHaveURL("/blog");
});

test("a missing post is a 404 page, not a crash", async ({ page }) => {
  await page.goto(`/blog/${id}`);
  await expect(page.getByText("This page failed its own test")).toBeVisible();
});

test("admin shows a login or not-configured notice and is noindex", async ({
  page,
}) => {
  const res = await page.goto("/admin");
  expect(res?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Admin");
  await expect(
    page.getByLabel("PIN").or(page.getByText("Admin is not configured")),
  ).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
});

test("admin mutations refuse unauthenticated requests", async ({ request }) => {
  const targets = [
    ["post", "/api/admin/posts"],
    ["put", `/api/admin/posts/${id}`],
    ["delete", `/api/admin/posts/${id}`],
  ] as const;
  for (const [method, url] of targets) {
    // no Origin header: blocked as cross-site
    expect((await request[method](url)).status()).toBe(403);
    // same-site but no session cookie
    const res = await request[method](url, { headers: { Origin: origin } });
    expect(res.status()).toBe(401);
  }
  const cross = await request.post("/api/admin/login", {
    headers: { Origin: "https://evil.example" },
    data: { email: "a@b.co", pin: "123456" },
  });
  expect(cross.status()).toBe(403);
});

test("the code step and resend cannot be reached without passing the PIN step", async ({
  request,
}) => {
  for (const url of ["/api/admin/login/verify", "/api/admin/login/resend"]) {
    const res = await request.post(url, {
      headers: { Origin: origin },
      data: { code: "123456" },
    });
    expect(res.status()).toBe(401);
  }
});

test("a forged pending cookie grants no admin access", async ({ request }) => {
  const res = await request.post("/api/admin/posts", {
    headers: {
      Origin: origin,
      Cookie: "admin_pending=u.9999999999.abc; admin_session=u.9999999999.abc",
    },
  });
  expect(res.status()).toBe(401);
});

test("bad sign-in input gets one generic error", async ({ request }) => {
  const bodies = [
    { email: "nobody@example.com", pin: "123456" },
    { email: "not-an-email", pin: "abc" },
    {},
  ];
  const seen = new Set<string>();
  for (const data of bodies) {
    const res = await request.post("/api/admin/login", {
      headers: { Origin: origin },
      data,
    });
    // 503 only when the server has no admin config at all (CI); otherwise always the same 401 text
    expect([401, 503]).toContain(res.status());
    seen.add(`${res.status()} ${(await res.json()).error}`);
  }
  expect(seen.size).toBe(1);
});

test("photo route only serves well-formed keys", async ({ request }) => {
  for (const name of ["..%2Fsecret", "x.jpg", `${id}.svg`, "..%2F..%2Fetc"]) {
    expect((await request.get(`/api/blog/photo/${name}`)).status()).toBe(404);
  }
  // well-formed but no bucket configured: still a clean 404, never a 500
  expect((await request.get(`/api/blog/photo/${id}.jpg`)).status()).toBe(404);
});
