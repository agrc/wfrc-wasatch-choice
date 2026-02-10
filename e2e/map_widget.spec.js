import { expect, test } from '@playwright/test';
import { loadApp } from './utils';

test.describe('map-widget', () => {
  test('button toggles pane visibility', async ({ page }) => {
    await loadApp(page);
    await page.waitForTimeout(2000);

    // Target the "Filter" widget specifically
    const btn = page.locator('.map-widget-button[title="Filter"]');
    await expect(btn).toBeVisible();

    const card = page.locator('.map-widget-card').filter({ hasText: 'Filter' });

    // Check initial state to determine flow
    const isInitiallyVisible = await card.isVisible();

    if (isInitiallyVisible) {
      console.log('Widget is initially visible. Closing...');
      await btn.click();
      await expect(card).not.toBeVisible();

      console.log('Opening back up...');
      await btn.click();
      await expect(card).toBeVisible();
    } else {
      console.log('Widget is initially hidden. Opening...');
      await btn.click();
      await expect(card).toBeVisible();

      console.log('Closing...');
      await btn.click();
      await expect(card).not.toBeVisible();
    }
  });

  test('close button closes pane', async ({ page }) => {
    await loadApp(page);
    await page.waitForTimeout(2000);

    const btn = page.locator('.map-widget-button[title="Filter"]');
    const card = page.locator('.map-widget-card').filter({ hasText: 'Filter' });

    // Ensure it is visible before testing close button
    if (!await card.isVisible()) {
      await btn.click();
    }
    await expect(card).toBeVisible();

    // Use .first() as there might be multiple close buttons (one for each widget)
    // Scope it to the card
    // Use .btn-close for Bootstrap 5 (Reactstrap 9) or .close for Bootstrap 4
    const closeBtn = card.locator('button.btn-close, button.close').first();
    await closeBtn.click();

    await expect(card).not.toBeVisible();
  });
});
