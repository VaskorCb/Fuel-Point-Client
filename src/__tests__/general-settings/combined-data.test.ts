import {
  shopInformationData,
  termsAndConditionTabs,
  estimateFooterDefaultValues,
  invoiceFooterDefaultValues,
  statementFooterDefaultValues,
  floridaStateReqDefaultValues,
  warrantyDefaultValues,
  selfCheckInTermsDefaultValues,
  feesAndSetupTabs,
  shopSuppliesDefaultValues,
  epaSetupDefaultValues,
  ccFeeDefaultValues,
  stateFeesDefaultData,
  invoiceSettingsSwitches,
  invoiceSettingsDefaultValues,
  deviceSettingsDefaultValues,
  deviceSettingsFields,
  currencyUnitOptions,
  taxableOptions,
  salesTaxData,
  partsMarkupLaborData,
} from 'data/general-settings/combined';

describe('General Settings Combined Data', () => {
  describe('shopInformationData', () => {
    it('has all required fields populated', () => {
      expect(shopInformationData.companyName).toBe('VIP Auto Repair');
      expect(shopInformationData.phoneMain).toBeTruthy();
      expect(shopInformationData.email).toContain('@');
      expect(shopInformationData.street).toBeTruthy();
      expect(shopInformationData.city).toBeTruthy();
      expect(shopInformationData.state).toBeTruthy();
      expect(shopInformationData.zipCode).toBeTruthy();
    });
  });

  describe('termsAndConditionTabs', () => {
    it('has 6 tabs', () => {
      expect(termsAndConditionTabs).toHaveLength(6);
    });

    it('has correct tab labels', () => {
      const labels = termsAndConditionTabs.map((t) => t.label);
      expect(labels).toEqual([
        'Estimate footer',
        'Invoice footer',
        'Statement footer',
        'Florida state rq.',
        'Warranty',
        'Self check-in terms',
      ]);
    });

    it('has sequential values starting at 1', () => {
      termsAndConditionTabs.forEach((tab, i) => {
        expect(tab.value).toBe(i + 1);
      });
    });
  });

  describe('estimateFooterDefaultValues', () => {
    it('has termsAndConditions field', () => {
      expect(estimateFooterDefaultValues.termsAndConditions).toBeTruthy();
      expect(typeof estimateFooterDefaultValues.termsAndConditions).toBe('string');
    });

    it('has otherInformation field', () => {
      expect(estimateFooterDefaultValues.otherInformation).toBeTruthy();
      expect(typeof estimateFooterDefaultValues.otherInformation).toBe('string');
    });
  });

  describe('invoiceFooterDefaultValues', () => {
    it('has all three fields', () => {
      expect(invoiceFooterDefaultValues.invoiceTermsAndConditions).toBeTruthy();
      expect(invoiceFooterDefaultValues.invoiceOtherInformation).toBeTruthy();
      expect(invoiceFooterDefaultValues.invoiceStateRequirement).toBeTruthy();
    });
  });

  describe('statementFooterDefaultValues', () => {
    it('has statementTermsAndConditions', () => {
      expect(statementFooterDefaultValues.statementTermsAndConditions).toBeTruthy();
    });
  });

  describe('floridaStateReqDefaultValues', () => {
    it('has boolean flags defaulting to false', () => {
      expect(floridaStateReqDefaultValues.writtenEstimate).toBe(false);
      expect(floridaStateReqDefaultValues.paymentMethod).toBe(false);
      expect(floridaStateReqDefaultValues.saveReplacementParts).toBe(false);
    });

    it('has estimate footer strings', () => {
      expect(floridaStateReqDefaultValues.estimateFooter1).toBeTruthy();
      expect(floridaStateReqDefaultValues.estimateFooter2).toBeTruthy();
    });
  });

  describe('warrantyDefaultValues', () => {
    it('has warranty and limitedWarranty fields', () => {
      expect(warrantyDefaultValues.warranty).toBe('1 year/12000 miles');
      expect(warrantyDefaultValues.limitedWarranty).toBe('None');
    });
  });

  describe('selfCheckInTermsDefaultValues', () => {
    it('has selfCheckInEstimateFooter1 field', () => {
      expect(selfCheckInTermsDefaultValues.selfCheckInEstimateFooter1).toBeTruthy();
    });
  });

  describe('feesAndSetupTabs', () => {
    it('has 4 tabs', () => {
      expect(feesAndSetupTabs).toHaveLength(4);
    });

    it('has correct labels', () => {
      const labels = feesAndSetupTabs.map((t) => t.label);
      expect(labels).toEqual(['Shop supplies', 'EPA setup', 'CC fee', 'State fees']);
    });
  });

  describe('shopSuppliesDefaultValues', () => {
    it('has correct structure', () => {
      expect(shopSuppliesDefaultValues.suppliesType).toBe('percentage');
      expect(shopSuppliesDefaultValues.shopSuppliesValue).toBe(50);
      expect(shopSuppliesDefaultValues.shopSuppliesUnit).toBe('%');
      expect(shopSuppliesDefaultValues.minimum).toBe(0);
      expect(shopSuppliesDefaultValues.maximum).toBe(0);
    });
  });

  describe('epaSetupDefaultValues', () => {
    it('has correct structure', () => {
      expect(epaSetupDefaultValues.epaType).toBe('percentage');
      expect(epaSetupDefaultValues.epaValue).toBe(50);
      expect(epaSetupDefaultValues.epaUnit).toBe('%');
    });
  });

  describe('ccFeeDefaultValues', () => {
    it('has in-person and online fee fields', () => {
      expect(ccFeeDefaultValues.inPersonUnit).toBe('%');
      expect(ccFeeDefaultValues.inPersonValue).toBe(0);
      expect(ccFeeDefaultValues.onlineUnit).toBe('%');
      expect(ccFeeDefaultValues.onlineValue).toBe(0);
    });
  });

  describe('stateFeesDefaultData', () => {
    it('has fees array with 4 entries', () => {
      expect(stateFeesDefaultData.fees).toHaveLength(4);
    });

    it('has laborDescriptions with 1 entry', () => {
      expect(stateFeesDefaultData.laborDescriptions).toHaveLength(1);
      expect(stateFeesDefaultData.laborDescriptions[0].name).toBe('Mount and balance');
    });

    it('each fee has required fields', () => {
      stateFeesDefaultData.fees.forEach((fee) => {
        expect(fee).toHaveProperty('id');
        expect(fee).toHaveProperty('name');
        expect(fee).toHaveProperty('autoApply');
        expect(fee).toHaveProperty('amount');
        expect(fee).toHaveProperty('taxable');
        expect(fee).toHaveProperty('enabled');
      });
    });
  });

  describe('invoiceSettingsSwitches', () => {
    it('has 25 switches', () => {
      expect(invoiceSettingsSwitches).toHaveLength(25);
    });

    it('each switch has required fields', () => {
      invoiceSettingsSwitches.forEach((sw) => {
        expect(sw).toHaveProperty('name');
        expect(sw).toHaveProperty('label');
        expect(sw).toHaveProperty('section');
        expect(sw).toHaveProperty('id');
      });
    });

    it('has switches in 3 sections', () => {
      const sections = [...new Set(invoiceSettingsSwitches.map((s) => s.section))];
      expect(sections).toEqual(['Estimate & Invoice', 'Print & Display', 'Automation & System']);
    });
  });

  describe('invoiceSettingsDefaultValues', () => {
    it('all boolean settings default to false', () => {
      const boolKeys = Object.entries(invoiceSettingsDefaultValues).filter(
        ([, v]) => typeof v === 'boolean',
      );
      boolKeys.forEach(([key, value]) => {
        expect(value).toBe(false);
      });
    });

    it('has string settings with defaults', () => {
      expect(invoiceSettingsDefaultValues.typeDefault).toBe('Part');
      expect(invoiceSettingsDefaultValues.invoiceTitleFont).toBe('Recharge');
      expect(invoiceSettingsDefaultValues.partsMemo).toBeTruthy();
      expect(invoiceSettingsDefaultValues.thankYouMemo).toBeTruthy();
    });
  });

  describe('deviceSettingsDefaultValues', () => {
    it('all default to false', () => {
      expect(deviceSettingsDefaultValues.receiveData).toBe(false);
      expect(deviceSettingsDefaultValues.tabletPairUnpair).toBe(false);
      expect(deviceSettingsDefaultValues.cashDrawer).toBe(false);
    });
  });

  describe('deviceSettingsFields', () => {
    it('has 3 fields', () => {
      expect(deviceSettingsFields).toHaveLength(3);
    });
  });

  describe('currencyUnitOptions', () => {
    it('has % and $ options', () => {
      expect(currencyUnitOptions).toEqual([
        { value: '%', label: '%' },
        { value: '$', label: '$' },
      ]);
    });
  });

  describe('taxableOptions', () => {
    it('has N/A, Yes, and No', () => {
      expect(taxableOptions).toEqual([
        { value: 'N/A', label: 'N/A' },
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' },
      ]);
    });
  });

  describe('salesTaxData', () => {
    it('has taxRateConfiguration with 3 rates', () => {
      expect(salesTaxData.taxRateConfiguration.r1TaxRate).toBeDefined();
      expect(salesTaxData.taxRateConfiguration.r2TaxRate).toBeDefined();
      expect(salesTaxData.taxRateConfiguration.r3TaxRate).toBeDefined();
    });

    it('has applyTaxes with 8 categories', () => {
      const keys = Object.keys(salesTaxData.applyTaxes);
      expect(keys).toHaveLength(8);
      expect(keys).toContain('parts');
      expect(keys).toContain('labor');
      expect(keys).toContain('fees');
      expect(keys).toContain('epa');
      expect(keys).toContain('shop_supplies');
      expect(keys).toContain('tires');
      expect(keys).toContain('subcontract');
      expect(keys).toContain('discount');
    });

    it('all tax categories are active by default', () => {
      Object.values(salesTaxData.applyTaxes).forEach((category) => {
        expect(category.active).toBe(true);
      });
    });
  });

  describe('partsMarkupLaborData', () => {
    it('has smartMarkup with 4 types', () => {
      const keys = Object.keys(partsMarkupLaborData.smartMarkup);
      expect(keys).toHaveLength(4);
    });

    it('has laborHourlyRates with 6 types', () => {
      const keys = Object.keys(partsMarkupLaborData.laborHourlyRates);
      expect(keys).toHaveLength(6);
      expect(keys).toContain('standard');
      expect(keys).toContain('diessel');
      expect(keys).toContain('euro');
      expect(keys).toContain('warranty');
      expect(keys).toContain('fleet');
      expect(keys).toContain('custom');
    });
  });
});
