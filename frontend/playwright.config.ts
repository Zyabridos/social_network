import { defineConfig } from "@playwright/test";
import path from "path";

export default defineConfig({
  testDir: "./tests",
  timeout: 30 * 1000,
  // timeout: 5 * 1000,
  expect: {
    timeout: 10000,
  },
  reporter: [
    ["html", { outputFolder: path.resolve(__dirname, "playwright-report"), open: "never" }],
  ],
  // projects: [
  //   {
  //     name: "chromium",
  //     use: { ...devices["Desktop Chrome"] },
  //   },

  //   {
  //     name: "firefox",
  //     use: { ...devices["Desktop Firefox"] },
  //   },

  //   {
  //     name: "webkit",
  //     use: { ...devices["Desktop Safari"] },
  //   },
  // ],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000",
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
});
