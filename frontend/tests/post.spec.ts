import { test, expect } from '@playwright/test';

test("logs frontend API url", async ({ page }) => {
  page.on("console", (msg) => {
    if (msg.type() === "log") {
      console.log("[browser log]:", msg.text());
    }
  });

  await page.goto("http://localhost:3000/");
  await page.waitForLoadState("networkidle");


  await page.waitForTimeout(2000);
});


test('has first post on the main page', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.waitForSelector('[data-name="post-title-1"]', { timeout: 10000 });

  const heading = page.locator('[data-name="post-title-1"]');
  const firstContent = page.locator('[data-name="post-content-1"]');

  await expect(heading).toBeVisible();
  await expect(firstContent).toHaveText('Hello, world!');
  await page.screenshot({ path: 'screenshot.png', fullPage: true });
});

test('expands content on click', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.waitForSelector('[data-name="post-3"]');

  const post = page.locator('[data-name="post-3"]');
  const content = post.locator('[data-name="post-content-3"]');
  const button = post.getByRole('button');

  const beforeHeight = await content.evaluate(el => el.clientHeight);
  await button.click();
  const afterHeight = await content.evaluate(el => el.clientHeight);

  expect(afterHeight).toBeGreaterThan(beforeHeight);
  await expect(button).toHaveText(/hide/i);
  await page.screenshot({ path: 'screenshot.png', fullPage: true });
});
