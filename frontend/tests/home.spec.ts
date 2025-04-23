import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const heading = await page.getByRole("heading", { name: "Hello there!" });
  await expect(heading).toBeVisible();
});
