import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  // Every test starts as a returning visitor who already chose cookies, so the banner never covers the page.
  use: {
    baseURL: "http://localhost:3100",
    storageState: {
      cookies: [],
      origins: [
        {
          origin: "http://localhost:3100",
          localStorage: [{ name: "cookie-consent", value: "necessary" }],
        },
      ],
    },
  },
  webServer: {
    command: "npm run build && npx next start -p 3100",
    url: "http://localhost:3100",
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
  },
});
