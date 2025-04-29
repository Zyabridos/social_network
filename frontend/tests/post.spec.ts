import { test, expect } from "@playwright/test";

test("has first post on the main page", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const heading = await page.getByRole("heading", { name: "My first post" });
  const content = page.locator('[data-name="post-content"]');
  await expect(content).toHaveText("Hello, world!");
  await expect(heading).toBeVisible();
});
