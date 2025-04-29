import { test, expect } from '@playwright/test';

test('has first post on the main page', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  const heading = await page.getByRole('heading', { name: 'My first post' });
  const firstContent = page.locator('.flex .text-base').nth(0);

  await expect(firstContent).toHaveText('Hello, world!');
  await expect(heading).toBeVisible();
});

test('expands content on click', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // find third post, since that is the one with long text
  const post = page.locator('.flex > div').nth(2);
  // temp solution - evnt add testId or data-name
  const content = post.locator('p.text-base');
  const button = post.locator('button');

  const beforeHeight = await content.evaluate(el => el.clientHeight);
  await button.click();
  const afterHeight = await content.evaluate(el => el.clientHeight);

  expect(afterHeight).toBeGreaterThan(beforeHeight);

  await expect(button).toHaveText(/hide/i);
});
