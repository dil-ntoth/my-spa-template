import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('/');

  expect(page.locator('code')).toHaveText(
    '{"name":"User Name","email":"user.name@email.com","uid":"uid","locale":"en","dateFormat":"%m/%d/%Y"}',
  );

  await page.getByRole('link', { name: 'Show Counter example' }).click();
  await page.getByRole('button', { name: 'Count is 0' }).click();
  await page.getByRole('button', { name: 'Count is 1' }).click();

  await page.getByRole('link', { name: 'Show Cards example' }).click();
  await expect(page.locator('body')).toContainText('Loading cards...');
  await expect(page.locator('body')).toContainText('Card 1 title');
});
