import { expect, test } from '@playwright/test';
import { loadApp } from './utils';

test.describe('tab-picker', () => {
  test('removes a tab', async ({ page }) => {
    await loadApp(page);

    await expect(page.getByLabel('Transportation Tab')).toBeVisible();

    await page.getByTestId('tab-configuration').click();

    await page.getByRole('listbox', { name: /maps displayed/i }).selectOption('transportation');
    await page.getByRole('option', { name: /^transportation$/i }).dblclick();

    await page.getByRole('button', { name: /finish/i }).click();

    await expect(page.getByLabel('Transportation Tab')).not.toBeVisible();
  });

  test('replaces a tab', async ({ page }) => {
    await loadApp(page);

    await page.getByTestId('tab-configuration').click();

    await page.getByRole('listbox', { name: /maps displayed/i }).selectOption('transportation');

    await page.getByRole('option', { name: /^transportation$/i }).dblclick();

    await page.getByRole('listbox', { name: /available/i }).selectOption('projections');

    await page.getByRole('option', { name: /projections/i }).dblclick();

    await page.getByRole('button', { name: /finish/i }).click();

    await expect(page.getByLabel('Growth Projections Tab')).toBeVisible();
  });

  test('shows too many tabs alert', async ({ page }) => {
    await loadApp(page);

    await page.getByTestId('tab-configuration').click();

    const available = page.getByRole('listbox', { name: /available/i });

    await available.selectOption('projections');
    await page.getByRole('option', { name: /projections/i }).dblclick();

    await available.selectOption('stationareaplanning');
    await page.getByRole('option', { name: /station area planning/i }).dblclick();

    // Removed gflu as it is not a valid map key in current config

    await available.selectOption('tip');
    await page.getByRole('option', { name: /tip projects/i }).dblclick();

    await available.selectOption('tlc');
    await page.getByRole('option', { name: /tlc projects/i }).dblclick();

    await available.selectOption('atdata');
    await page.getByRole('option', { name: /active transportation/i }).dblclick();

    await expect(page.getByRole('alert')).toContainText(/maximum/i);
  });
});
