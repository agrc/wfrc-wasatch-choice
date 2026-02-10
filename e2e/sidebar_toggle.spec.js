import { expect, test } from '@playwright/test';
import { loadApp } from './utils';

test.describe('sidebar-toggle', () => {
  test('toggles the visibility of the side bar', async ({ page }) => {
    await loadApp(page);

    await page.locator('.map-lens__sidebar').click();

    await expect(page.locator('.side-bar')).not.toBeVisible();

    await page.locator('.map-lens__sidebar').click();

    await expect(page.locator('.side-bar')).toBeVisible();
  });
});
