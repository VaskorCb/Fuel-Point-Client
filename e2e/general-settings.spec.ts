import { test, expect } from '@playwright/test';

const GENERAL_SETTINGS_URL = '/general-settings';

test.describe('General Settings Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(GENERAL_SETTINGS_URL);
  });

  test.describe('Tab Navigation', () => {
    test('loads with Shop information tab by default', async ({ page }) => {
      // URL should contain tab=shop-information
      await expect(page).toHaveURL(/tab=shop-information/);
    });

    test('displays all 8 setting tabs in the sidebar', async ({ page }) => {
      const tabs = [
        'Shop information',
        'Shop logo',
        'Sales tax',
        'Fees & setup',
        'Parts markup / labor',
        'Terms & conditions',
        'Invoice settings',
        'Device settings',
      ];

      for (const tab of tabs) {
        await expect(page.getByRole('tab', { name: tab })).toBeVisible();
      }
    });

    test('can navigate to Sales tax tab', async ({ page }) => {
      await page.getByRole('tab', { name: 'Sales tax' }).click();
      await expect(page).toHaveURL(/tab=sales-tax/);
    });

    test('can navigate to Fees & setup tab', async ({ page }) => {
      await page.getByRole('tab', { name: 'Fees & setup' }).click();
      await expect(page).toHaveURL(/tab=fees-and-setup/);
    });

    test('can navigate to Terms & conditions tab', async ({ page }) => {
      await page.getByRole('tab', { name: 'Terms & conditions' }).click();
      await expect(page).toHaveURL(/tab=terms-and-conditions/);
    });

    test('can navigate to Invoice settings tab', async ({ page }) => {
      await page.getByRole('tab', { name: 'Invoice settings' }).click();
      await expect(page).toHaveURL(/tab=invoice-settings/);
    });

    test('can navigate to Device settings tab', async ({ page }) => {
      await page.getByRole('tab', { name: 'Device settings' }).click();
      await expect(page).toHaveURL(/tab=device-settings/);
    });
  });

  test.describe('Shop Information Form', () => {
    test('displays all form fields with default values', async ({ page }) => {
      await expect(page.locator('#field-company-name')).toHaveValue('VIP Auto Repair');
      await expect(page.locator('#field-phone-main')).toHaveValue('(302) 555-1234');
      await expect(page.locator('#field-email')).toHaveValue('info@vipautorepair.com');
      await expect(page.locator('#field-city')).toHaveValue('Wilmington');
      await expect(page.locator('#field-state')).toHaveValue('DE');
      await expect(page.locator('#field-zip-code')).toHaveValue('19802');
    });

    test('can edit company name', async ({ page }) => {
      const input = page.locator('#field-company-name');
      await input.clear();
      await input.fill('New Shop Name');
      await expect(input).toHaveValue('New Shop Name');
    });

    test('can edit email', async ({ page }) => {
      const input = page.locator('#field-email');
      await input.clear();
      await input.fill('newemail@example.com');
      await expect(input).toHaveValue('newemail@example.com');
    });

    test('can edit address fields', async ({ page }) => {
      const street = page.locator('#field-street');
      await street.clear();
      await street.fill('456 New Street');
      await expect(street).toHaveValue('456 New Street');

      const city = page.locator('#field-city');
      await city.clear();
      await city.fill('New York');
      await expect(city).toHaveValue('New York');
    });

    test('displays Save Changes button', async ({ page }) => {
      await expect(page.getByRole('button', { name: /save changes/i })).toBeVisible();
    });
  });

  test.describe('Terms & Conditions', () => {
    test.beforeEach(async ({ page }) => {
      await page.getByRole('tab', { name: 'Terms & conditions' }).click();
      await expect(page).toHaveURL(/tab=terms-and-conditions/);
    });

    test('shows sub-tabs for terms and conditions', async ({ page }) => {
      const subTabs = [
        'Estimate footer',
        'Invoice footer',
        'Statement footer',
        'Florida state rq.',
        'Warranty',
        'Self check-in terms',
      ];

      for (const tab of subTabs) {
        await expect(page.getByRole('tab', { name: tab })).toBeVisible();
      }
    });

    test('defaults to Estimate footer sub-tab', async ({ page }) => {
      const tab = page.getByRole('tab', { name: 'Estimate footer' });
      await expect(tab).toHaveAttribute('aria-selected', 'true');
    });

    test('can switch to Invoice footer sub-tab', async ({ page }) => {
      await page.getByRole('tab', { name: 'Invoice footer' }).click();
      const tab = page.getByRole('tab', { name: 'Invoice footer' });
      await expect(tab).toHaveAttribute('aria-selected', 'true');
    });

    test('can switch to Florida state rq. sub-tab', async ({ page }) => {
      await page.getByRole('tab', { name: 'Florida state rq.' }).click();
      const tab = page.getByRole('tab', { name: 'Florida state rq.' });
      await expect(tab).toHaveAttribute('aria-selected', 'true');
    });

    test('can switch to Warranty sub-tab', async ({ page }) => {
      await page.getByRole('tab', { name: 'Warranty' }).click();
      const tab = page.getByRole('tab', { name: 'Warranty' });
      await expect(tab).toHaveAttribute('aria-selected', 'true');
    });
  });

  test.describe('Florida State Requirements', () => {
    test.beforeEach(async ({ page }) => {
      await page.getByRole('tab', { name: 'Terms & conditions' }).click();
      await page.getByRole('tab', { name: 'Florida state rq.' }).click();
    });

    test('shows 3 checkboxes', async ({ page }) => {
      await expect(page.locator('#field-florida-written-estimate')).toBeVisible();
      await expect(page.locator('#field-florida-payment-method')).toBeVisible();
      await expect(page.locator('#field-florida-save-parts')).toBeVisible();
    });

    test('checkboxes are unchecked by default', async ({ page }) => {
      await expect(page.locator('#field-florida-written-estimate')).not.toBeChecked();
      await expect(page.locator('#field-florida-payment-method')).not.toBeChecked();
      await expect(page.locator('#field-florida-save-parts')).not.toBeChecked();
    });

    test('can toggle checkbox', async ({ page }) => {
      const checkbox = page.locator('#field-florida-written-estimate');
      await checkbox.check();
      await expect(checkbox).toBeChecked();
      await checkbox.uncheck();
      await expect(checkbox).not.toBeChecked();
    });

    test('Reset terms button unchecks all checkboxes', async ({ page }) => {
      // Check all first
      await page.locator('#field-florida-written-estimate').check();
      await page.locator('#field-florida-payment-method').check();
      await page.locator('#field-florida-save-parts').check();

      // Click reset
      await page.getByRole('button', { name: /reset terms/i }).click();

      // All should be unchecked
      await expect(page.locator('#field-florida-written-estimate')).not.toBeChecked();
      await expect(page.locator('#field-florida-payment-method')).not.toBeChecked();
      await expect(page.locator('#field-florida-save-parts')).not.toBeChecked();
    });

    test('shows Estimate footer sections', async ({ page }) => {
      await expect(page.locator('#field-florida-estimate-footer-1')).toBeVisible();
      await expect(page.locator('#field-florida-estimate-footer-2')).toBeVisible();
    });
  });

  test.describe('Fees & Setup', () => {
    test.beforeEach(async ({ page }) => {
      await page.getByRole('tab', { name: 'Fees & setup' }).click();
    });

    test('shows sub-tabs', async ({ page }) => {
      await expect(page.getByRole('tab', { name: 'Shop supplies' })).toBeVisible();
      await expect(page.getByRole('tab', { name: 'EPA setup' })).toBeVisible();
      await expect(page.getByRole('tab', { name: 'CC fee' })).toBeVisible();
      await expect(page.getByRole('tab', { name: 'State fees' })).toBeVisible();
    });

    test('can switch between sub-tabs', async ({ page }) => {
      await page.getByRole('tab', { name: 'EPA setup' }).click();
      const tab = page.getByRole('tab', { name: 'EPA setup' });
      await expect(tab).toHaveAttribute('aria-selected', 'true');
    });
  });

  test.describe('Tab Persistence via URL', () => {
    test('preserves tab state in URL', async ({ page }) => {
      await page.getByRole('tab', { name: 'Device settings' }).click();
      await expect(page).toHaveURL(/tab=device-settings/);

      // Reload the page
      await page.reload();
      await expect(page).toHaveURL(/tab=device-settings/);
    });

    test('can navigate directly to a tab via URL', async ({ page }) => {
      await page.goto(`${GENERAL_SETTINGS_URL}?tab=invoice-settings`);
      await expect(page).toHaveURL(/tab=invoice-settings/);
    });
  });
});
