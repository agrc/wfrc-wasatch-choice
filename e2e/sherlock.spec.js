import { expect, test } from '@playwright/test';
import { loadApp } from './utils';

test.describe('sherlock', () => {
  test('search and select using keyboard', async ({ page }) => {
    await loadApp(page);

    const input = page.locator('.sherlock input').first();
    await input.waitFor({ state: 'visible', timeout: 30000 });

    await input.click(); // Ensure focus
    await input.pressSequentially('herri', { delay: 100 });

    await page.waitForTimeout(2000); // Wait for suggestions fetch

    const suggestions = page.locator('.sherlock__matches');
    await expect(suggestions).toBeVisible();

    // Navigate suggestions
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await expect(input).toHaveValue('Herriman');
  });

  test('search and select match with mouse', async ({ page }) => {
    await loadApp(page);

    const input = page.locator('.sherlock input').first();
    await input.waitFor({ state: 'visible', timeout: 30000 });

    await input.pressSequentially('herri', { delay: 100 });

    await page.getByText('Herriman', { exact: true }).click();

    await expect(page.locator('.sherlock input').first()).toHaveValue('Herriman');
  });
});
