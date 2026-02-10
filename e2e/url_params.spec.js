import { expect, test } from '@playwright/test';
import { getMapExtent, loadApp } from './utils';

test.describe('url params', () => {
  test('sideBarClosed closes sidebar', async ({ page }) => {
    await loadApp(page, '/#sideBarClosed=true');

    await expect(page.getByTestId('center-container')).toHaveCSS('left', '0px');
  });

  test('selectedMap activates the correct tab', async ({ page }) => {
    await loadApp(page, '/#selectedMap=landuse');

    // Find the nav link for the tab
    const tabLink = page.locator('.nav-tabs .nav-link', {
      hasText: 'Centers & Land Uses',
    });
    await expect(tabLink).toHaveClass(/active/);

    const currentMapName = await page.evaluate(() => window.currentMapName);
    expect(currentMapName).toBe('trans:mapTitleLandUse');
  });

  test('scale, x, & y params set the map extent', async ({ page }) => {
    await loadApp(
      page,
      '/#scale=72224&sideBarClosed=true&x=-12461939&y=4976704',
    );

    const expectedExtent =
      '{"spatialReference":{"wkid":3857},"xmin":-12474168.924525611,"ymin":4970703.693279622,"xmax":-12449709.075474389,"ymax":4982704.306720378}';

    await expect
      .poll(
        async () => {
          const ext = await getMapExtent(page);
          return JSON.parse(ext);
        },
        { timeout: 45000 },
      )
      .toEqual(JSON.parse(expectedExtent));
  });

  test('loads the correct tabs', async ({ page }) => {
    await loadApp(page, '/#mapList=vision.recreation.econdev.atdata.landuse');

    const tabs = page.locator('.nav-tabs .nav-link');
    await expect(tabs.nth(0)).toHaveText('Vision');
    await expect(tabs.nth(1)).toHaveText('Parks & Public Spaces');
    await expect(tabs.nth(2)).toHaveText('Economic Opportunities');
    await expect(tabs.nth(3)).toHaveText('Active Transportation');
    await expect(tabs.nth(4)).toHaveText('Centers & Land Uses');
  });
});
