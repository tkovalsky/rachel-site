import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  // your tests live here
  testDir: "src/app/tests",
  timeout: 30_000,
  retries: 1,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:3000",   // <— important
    trace: "retain-on-failure",
    headless: true,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: "npm run start:test",      // starts a server for the tests
    url: "http://localhost:3000/",
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
});