import { test, expect } from '@playwright/test';
import { loadApp, waitForMapLoaded } from './utils';

test.describe('filter', () => {
  test('reset button resets all of the controls', async ({ page }) => {
    await loadApp(page);

    await page.locator('.filter .group-container input').first().click();
    await page.locator('.filter .child-checkbox-container input').last().click();

    await page.getByText(/reset/i).first().click();

    // Check all group container inputs
    const groupInputs = page.locator('.filter .group-container input');
    const groupCount = await groupInputs.count();
    for (let i = 0; i < groupCount; i++) {
      await groupInputs.nth(i).check({ force: true });
    }

    // Check all child checkbox container inputs
    const childInputs = page.locator('.filter .child-checkbox-container input');
    const childCount = await childInputs.count();
    for (let i = 0; i < childCount; i++) {
        await childInputs.nth(i).check({ force: true });
    }
  });

  test('turning off checkboxes reduces the number of layers', async ({ page }) => {
    await loadApp(page);

    const originalCount = await page.evaluate(() => window.getVisibleLayers().length);

    await page.locator('.filter .group-container input').first().click({ force: true });

    await waitForMapLoaded(page);

    const newCount = await page.evaluate(() => window.getVisibleLayers().length);
    expect(newCount).toBeLessThan(originalCount);
  });
});
