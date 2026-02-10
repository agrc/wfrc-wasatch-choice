import { expect, test } from '@playwright/test';
import { loadApp } from './utils';

test.describe('project-information', () => {
  test('populates the data when a feature is clicked', async ({ page }) => {
    await loadApp(
      page,
      '/#scale=577791&sideBarClosed=true&x=-12467542&y=4976323',
    );

    await page.locator('.esri-view-root canvas').click();

    await expect(
      page.locator('.project-information .details').first(),
    ).toBeVisible();
  });

  test('shows the details', async ({ page }) => {
    await loadApp(
      page,
      '/#scale=577791&sideBarClosed=true&x=-12467542&y=4976323',
    );

    await page.locator('.esri-view-root canvas').click({ force: true });

    await page.locator(':nth-child(1) > .title').first().click();

    await expect(page.locator('.esri-feature-content').first()).toBeVisible();
  });

  test('resets the scroll between map clicks', async ({ page }) => {
    await loadApp(
      page,
      '/#scale=577791&sideBarClosed=true&x=-12458002&y=4976716',
    );

    await page.locator('.esri-view-root canvas').click({ force: true });

    // Click the 18th item to scroll down or expand
    await page.locator(':nth-child(18) > .title').click();

    // Click elsewhere on map
    await page
      .locator('.esri-view-root canvas')
      .click({ position: { x: 400, y: 300 }, force: true });

    // Should be back at top, so first item is visible
    await expect(page.locator(':nth-child(1) > .title').first()).toBeVisible();
  });
});
