import { expect, test } from '@playwright/test';
import {
  dragElementBy,
  getMapExtent,
  loadApp,
  waitForMapLoaded,
} from './utils';

test.describe('tabs', () => {
  test('switching tabs preserves map extent', async ({ page }) => {
    await loadApp(page);

    const zoomIn = page.locator('[title="Zoom in"]');
    await zoomIn.click();
    await zoomIn.click();

    // wait for zoom to finish
    await page.waitForTimeout(2000);

    const originalExtent = await getMapExtent(page);

    await page.getByLabel('Centers & Land Uses Tab').click();

    await waitForMapLoaded(page);

    const newExtent = await getMapExtent(page);

    expect(JSON.parse(newExtent)).toEqual(JSON.parse(originalExtent));
  });

  test('map layer visibility is preserved when switching back and forward between tabs', async ({
    page,
  }) => {
    await loadApp(page);

    await page.getByRole('checkbox', { name: /transportation/i }).click();

    await waitForMapLoaded(page);

    const originalVisibleLayers = await page.evaluate(() =>
      window.getVisibleLayers(),
    );

    await page.getByLabel('Centers & Land Uses Tab').click();

    await waitForMapLoaded(page);

    await page.getByLabel('Vision Tab').click();

    await waitForMapLoaded(page);

    const newVisibleLayers = await page.evaluate(() =>
      window.getVisibleLayers(),
    );
    expect(newVisibleLayers).toEqual(originalVisibleLayers);
  });

  test('drag and drop to rearrange tabs', async ({ page }) => {
    await loadApp(page);

    const tab1 = page.getByLabel('Centers & Land Uses Tab');
    await dragElementBy(page, tab1, -400, 0);

    const tab2 = page.getByLabel('Transportation Tab');
    await dragElementBy(page, tab2, 400, 0);

    await expect(page.locator('.nav-tabs .nav-link').nth(0)).toHaveText(
      'Centers & Land Uses',
    );
    await expect(page.locator('.nav-tabs .nav-link').nth(4)).toHaveText(
      'Transportation',
    );

    const url = page.url();
    expect(url).toContain('landuse.vision.econdev.recreation.transportation');
  });
});
