import { generalSettingsTabs } from 'data/general-settings/general-settings-tab';

describe('generalSettingsTabs', () => {
  it('has 8 tabs', () => {
    expect(generalSettingsTabs).toHaveLength(8);
  });

  it('has sequential IDs starting at 1', () => {
    generalSettingsTabs.forEach((tab, i) => {
      expect(tab.id).toBe(i + 1);
    });
  });

  it('each tab has required properties', () => {
    generalSettingsTabs.forEach((tab) => {
      expect(tab.label).toBeTruthy();
      expect(tab.title).toBeTruthy();
      expect(tab.value).toBeTruthy();
      expect(tab.icon).toBeTruthy();
      expect(tab.panelIcon).toBeTruthy();
      expect(tab.tabPanel).toBeDefined();
    });
  });

  it('has correct tab values', () => {
    const values = generalSettingsTabs.map((t) => t.value);
    expect(values).toEqual([
      'shop-information',
      'shop-logo',
      'sales-tax',
      'fees-and-setup',
      'parts-markup-labor',
      'terms-and-conditions',
      'invoice-settings',
      'device-settings',
    ]);
  });

  it('has correct tab labels', () => {
    const labels = generalSettingsTabs.map((t) => t.label);
    expect(labels).toEqual([
      'Shop information',
      'Shop logo',
      'Sales tax',
      'Fees & setup',
      'Parts markup / labor',
      'Terms & conditions',
      'Invoice settings',
      'Device settings',
    ]);
  });

  it('all icons are material-symbols', () => {
    generalSettingsTabs.forEach((tab) => {
      expect(tab.icon).toMatch(/^material-symbols:/);
      expect(tab.panelIcon).toMatch(/^material-symbols:/);
    });
  });

  it('first tab is shop-information (default)', () => {
    expect(generalSettingsTabs[0].value).toBe('shop-information');
  });
});
