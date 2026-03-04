// ============================================================
// Settings Search Index
// ============================================================
// Each entry maps a searchable field to its location in the UI.
// `id`       – DOM id you must add to the corresponding input.
// `label`    – Primary display text shown in search results.
// `keywords` – Extra terms that improve discoverability.
// `tab`      – Value of the main GeneralSettings tab.
// `section`  – Human-readable group name for the dropdown.
// `subTab`   – (Optional) inner sub-tab index for tabs that
//              contain their own <Tabs> (fees-and-setup,
//              terms-and-conditions).
// ============================================================

export interface SearchIndexEntry {
  id: string;
  label: string;
  keywords: string[];
  tab: string;
  section: string;
  subTab?: number;
}

export const settingsSearchIndex: SearchIndexEntry[] = [
  // ── Shop Information ──────────────────────────────────────
  {
    id: 'field-company-name',
    label: 'Company name',
    keywords: ['business', 'shop name', 'company'],
    tab: 'shop-information',
    section: 'Shop information',
  },
  {
    id: 'field-phone-main',
    label: 'Phone (Main)',
    keywords: ['telephone', 'phone number', 'contact'],
    tab: 'shop-information',
    section: 'Shop information',
  },
  {
    id: 'field-phone-l2',
    label: 'Phone (L 2)',
    keywords: ['telephone', 'secondary phone', 'line 2'],
    tab: 'shop-information',
    section: 'Shop information',
  },
  {
    id: 'field-email',
    label: 'Email',
    keywords: ['e-mail', 'mail', 'contact email'],
    tab: 'shop-information',
    section: 'Shop information',
  },
  {
    id: 'field-street',
    label: 'Street',
    keywords: ['address', 'road', 'location'],
    tab: 'shop-information',
    section: 'Shop information',
  },
  {
    id: 'field-city',
    label: 'City',
    keywords: ['address', 'town', 'location'],
    tab: 'shop-information',
    section: 'Shop information',
  },
  {
    id: 'field-state',
    label: 'State',
    keywords: ['address', 'province', 'location'],
    tab: 'shop-information',
    section: 'Shop information',
  },
  {
    id: 'field-zip-code',
    label: 'Zip code',
    keywords: ['postal code', 'address', 'zip'],
    tab: 'shop-information',
    section: 'Shop information',
  },
  {
    id: 'field-fax',
    label: 'Fax',
    keywords: ['fax number', 'facsimile'],
    tab: 'shop-information',
    section: 'Shop information',
  },
  {
    id: 'field-web',
    label: 'Web',
    keywords: ['website', 'url', 'domain'],
    tab: 'shop-information',
    section: 'Shop information',
  },
  {
    id: 'field-contact-name',
    label: 'Contact Name (Manager)',
    keywords: ['manager', 'contact person', 'owner'],
    tab: 'shop-information',
    section: 'Shop information',
  },
  {
    id: 'field-state-reg-no',
    label: 'State Reg. No.',
    keywords: ['registration number', 'state registration', 'regulatory'],
    tab: 'shop-information',
    section: 'Shop information',
  },
  {
    id: 'field-epa-no',
    label: 'EPA No.',
    keywords: ['epa number', 'environmental protection'],
    tab: 'shop-information',
    section: 'Shop information',
  },

  // ── Shop Logo ─────────────────────────────────────────────
  {
    id: 'field-shop-logo-upload',
    label: 'Shop logo upload',
    keywords: ['logo', 'image', 'upload', 'brand'],
    tab: 'shop-logo',
    section: 'Shop logo',
  },

  // ── Sales Tax – Tax Rate Configuration ────────────────────
  {
    id: 'field-tax-rate-r1',
    label: 'Tax Rate (R1)',
    keywords: ['tax', 'rate', 'r1', 'percentage'],
    tab: 'sales-tax',
    section: 'Sales tax',
  },
  {
    id: 'field-tax-rate-r2',
    label: 'Tax Rate (R2)',
    keywords: ['tax', 'rate', 'r2', 'percentage'],
    tab: 'sales-tax',
    section: 'Sales tax',
  },
  {
    id: 'field-tax-rate-r3',
    label: 'Tax Rate (R3)',
    keywords: ['tax', 'rate', 'r3', 'percentage'],
    tab: 'sales-tax',
    section: 'Sales tax',
  },

  // ── Sales Tax – Apply Taxes ───────────────────────────────
  {
    id: 'field-apply-tax-parts',
    label: 'Apply tax on Parts',
    keywords: ['parts tax', 'tax on parts'],
    tab: 'sales-tax',
    section: 'Sales tax',
  },
  {
    id: 'field-apply-tax-labor',
    label: 'Apply tax on Labor',
    keywords: ['labor tax', 'tax on labor'],
    tab: 'sales-tax',
    section: 'Sales tax',
  },
  {
    id: 'field-apply-tax-fees',
    label: 'Apply tax on Fees',
    keywords: ['fees tax', 'tax on fees'],
    tab: 'sales-tax',
    section: 'Sales tax',
  },
  {
    id: 'field-apply-tax-epa',
    label: 'Apply tax on EPA',
    keywords: ['epa tax', 'environmental'],
    tab: 'sales-tax',
    section: 'Sales tax',
  },
  {
    id: 'field-apply-tax-shop-supplies',
    label: 'Apply tax on Shop supplies',
    keywords: ['supplies tax', 'shop supplies tax'],
    tab: 'sales-tax',
    section: 'Sales tax',
  },
  {
    id: 'field-apply-tax-tires',
    label: 'Apply tax on Tires',
    keywords: ['tires tax', 'tire tax'],
    tab: 'sales-tax',
    section: 'Sales tax',
  },
  {
    id: 'field-apply-tax-subcontract',
    label: 'Apply tax on Subcontract',
    keywords: ['subcontract tax'],
    tab: 'sales-tax',
    section: 'Sales tax',
  },
  {
    id: 'field-apply-tax-discount',
    label: 'Apply tax on Discount',
    keywords: ['discount tax'],
    tab: 'sales-tax',
    section: 'Sales tax',
  },

  // ── Fees & Setup – Shop Supplies (sub-tab 1) ─────────────
  {
    id: 'field-shop-supplies-toggle',
    label: 'Shop Supplies on?',
    keywords: ['shop supplies', 'enable supplies'],
    tab: 'fees-and-setup',
    section: 'Fees & setup › Shop supplies',
    subTab: 1,
  },
  {
    id: 'field-supplies-type',
    label: 'Supplies type',
    keywords: ['actual', 'percentage', 'shop supplies type'],
    tab: 'fees-and-setup',
    section: 'Fees & setup › Shop supplies',
    subTab: 1,
  },
  {
    id: 'field-shop-supplies-value',
    label: 'Shop supplies value',
    keywords: ['supplies amount', 'supplies rate'],
    tab: 'fees-and-setup',
    section: 'Fees & setup › Shop supplies',
    subTab: 1,
  },
  {
    id: 'field-shop-supplies-minimum',
    label: 'Shop supplies minimum',
    keywords: ['minimum', 'min supplies'],
    tab: 'fees-and-setup',
    section: 'Fees & setup › Shop supplies',
    subTab: 1,
  },
  {
    id: 'field-shop-supplies-maximum',
    label: 'Shop supplies maximum',
    keywords: ['maximum', 'max supplies'],
    tab: 'fees-and-setup',
    section: 'Fees & setup › Shop supplies',
    subTab: 1,
  },

  // ── Fees & Setup – EPA Setup (sub-tab 2) ──────────────────
  {
    id: 'field-epa-toggle',
    label: 'EPA on?',
    keywords: ['epa', 'enable epa'],
    tab: 'fees-and-setup',
    section: 'Fees & setup › EPA setup',
    subTab: 2,
  },
  {
    id: 'field-epa-type',
    label: 'EPA type',
    keywords: ['actual', 'percentage', 'epa type'],
    tab: 'fees-and-setup',
    section: 'Fees & setup › EPA setup',
    subTab: 2,
  },
  {
    id: 'field-epa-value',
    label: 'EPA value',
    keywords: ['epa amount', 'epa rate'],
    tab: 'fees-and-setup',
    section: 'Fees & setup › EPA setup',
    subTab: 2,
  },
  {
    id: 'field-epa-minimum',
    label: 'EPA minimum',
    keywords: ['minimum', 'min epa'],
    tab: 'fees-and-setup',
    section: 'Fees & setup › EPA setup',
    subTab: 2,
  },
  {
    id: 'field-epa-maximum',
    label: 'EPA maximum',
    keywords: ['maximum', 'max epa'],
    tab: 'fees-and-setup',
    section: 'Fees & setup › EPA setup',
    subTab: 2,
  },

  // ── Fees & Setup – CC Fee (sub-tab 3) ─────────────────────
  {
    id: 'field-cc-fee-toggle',
    label: 'Credit card fee setup',
    keywords: ['cc fee', 'credit card', 'card fee'],
    tab: 'fees-and-setup',
    section: 'Fees & setup › CC fee',
    subTab: 3,
  },
  {
    id: 'field-cc-in-person',
    label: 'CC fee – In person',
    keywords: ['in person', 'credit card fee', 'swipe'],
    tab: 'fees-and-setup',
    section: 'Fees & setup › CC fee',
    subTab: 3,
  },
  {
    id: 'field-cc-online',
    label: 'CC fee – Online',
    keywords: ['online', 'credit card fee', 'remote'],
    tab: 'fees-and-setup',
    section: 'Fees & setup › CC fee',
    subTab: 3,
  },

  // ── Fees & Setup – State Fees (sub-tab 4) ─────────────────
  {
    id: 'field-state-fees-table',
    label: 'State fees table',
    keywords: ['state mandates', 'scrap tire', 'state fees'],
    tab: 'fees-and-setup',
    section: 'Fees & setup › State fees',
    subTab: 4,
  },

  // ── Parts Markup / Labor – Smart Markup ───────────────────
  {
    id: 'field-parts-markup-default',
    label: 'Parts markup default',
    keywords: ['markup', 'parts markup', 'default markup'],
    tab: 'parts-markup-labor',
    section: 'Parts markup / labor',
  },
  {
    id: 'field-tires-markup',
    label: 'Tires markup',
    keywords: ['tires', 'tire markup'],
    tab: 'parts-markup-labor',
    section: 'Parts markup / labor',
  },
  {
    id: 'field-five-to-twenty-parts',
    label: '$5 to $20 parts markup',
    keywords: ['5 to 20', 'parts markup range'],
    tab: 'parts-markup-labor',
    section: 'Parts markup / labor',
  },
  {
    id: 'field-less-than-five-parts',
    label: 'Less than $5 parts markup',
    keywords: ['less than 5', 'small parts markup'],
    tab: 'parts-markup-labor',
    section: 'Parts markup / labor',
  },

  // ── Parts Markup / Labor – Labor Rates ────────────────────
  {
    id: 'field-labor-rate-standard',
    label: 'Hourly rate (Standard)',
    keywords: ['standard rate', 'labor rate', 'hourly'],
    tab: 'parts-markup-labor',
    section: 'Parts markup / labor',
  },
  {
    id: 'field-labor-rate-diessel',
    label: 'Hourly rate (Diessel)',
    keywords: ['diesel rate', 'diessel', 'labor rate'],
    tab: 'parts-markup-labor',
    section: 'Parts markup / labor',
  },
  {
    id: 'field-labor-rate-euro',
    label: 'Hourly rate (Euro)',
    keywords: ['euro rate', 'european', 'labor rate'],
    tab: 'parts-markup-labor',
    section: 'Parts markup / labor',
  },
  {
    id: 'field-labor-rate-warranty',
    label: 'Hourly rate (Warranty)',
    keywords: ['warranty rate', 'labor rate'],
    tab: 'parts-markup-labor',
    section: 'Parts markup / labor',
  },
  {
    id: 'field-labor-rate-fleet',
    label: 'Hourly rate (Fleet)',
    keywords: ['fleet rate', 'labor rate'],
    tab: 'parts-markup-labor',
    section: 'Parts markup / labor',
  },
  {
    id: 'field-labor-rate-custom',
    label: 'Hourly rate (Custom)',
    keywords: ['custom rate', 'labor rate'],
    tab: 'parts-markup-labor',
    section: 'Parts markup / labor',
  },

  // ── Terms & Conditions – Estimate Footer (sub-tab 1) ──────
  {
    id: 'field-estimate-terms',
    label: 'Estimate – Terms and Conditions',
    keywords: ['estimate footer', 'terms', 'conditions'],
    tab: 'terms-and-conditions',
    section: 'Terms & conditions › Estimate footer',
    subTab: 1,
  },
  {
    id: 'field-estimate-other-info',
    label: 'Estimate – Other Information',
    keywords: ['estimate', 'other information', 'footer'],
    tab: 'terms-and-conditions',
    section: 'Terms & conditions › Estimate footer',
    subTab: 1,
  },

  // ── Terms & Conditions – Invoice Footer (sub-tab 2) ───────
  {
    id: 'field-invoice-footer-terms',
    label: 'Invoice – Terms and Conditions',
    keywords: ['invoice footer', 'terms', 'conditions'],
    tab: 'terms-and-conditions',
    section: 'Terms & conditions › Invoice footer',
    subTab: 2,
  },
  {
    id: 'field-invoice-footer-other-info',
    label: 'Invoice – Other Information',
    keywords: ['invoice', 'other information', 'footer'],
    tab: 'terms-and-conditions',
    section: 'Terms & conditions › Invoice footer',
    subTab: 2,
  },
  {
    id: 'field-invoice-footer-state-req',
    label: 'Invoice – State requirement',
    keywords: ['state requirement', 'invoice footer'],
    tab: 'terms-and-conditions',
    section: 'Terms & conditions › Invoice footer',
    subTab: 2,
  },

  // ── Terms & Conditions – Statement Footer (sub-tab 3) ─────
  {
    id: 'field-statement-terms',
    label: 'Statement – Terms and Conditions',
    keywords: ['statement footer', 'terms', 'conditions'],
    tab: 'terms-and-conditions',
    section: 'Terms & conditions › Statement footer',
    subTab: 3,
  },

  // ── Terms & Conditions – Florida State Req (sub-tab 4) ────
  {
    id: 'field-florida-written-estimate',
    label: 'Written estimate (Florida)',
    keywords: ['florida', 'written estimate', 'state requirement'],
    tab: 'terms-and-conditions',
    section: 'Terms & conditions › Florida state req.',
    subTab: 4,
  },
  {
    id: 'field-florida-payment-method',
    label: 'Payment method (Florida)',
    keywords: ['florida', 'payment method', 'intended payment'],
    tab: 'terms-and-conditions',
    section: 'Terms & conditions › Florida state req.',
    subTab: 4,
  },
  {
    id: 'field-florida-save-parts',
    label: 'Save replacement parts (Florida)',
    keywords: ['florida', 'replacement parts', 'save parts'],
    tab: 'terms-and-conditions',
    section: 'Terms & conditions › Florida state req.',
    subTab: 4,
  },
  {
    id: 'field-florida-estimate-footer-1',
    label: 'Estimate footer 1 (Florida)',
    keywords: ['florida', 'estimate footer 1'],
    tab: 'terms-and-conditions',
    section: 'Terms & conditions › Florida state req.',
    subTab: 4,
  },
  {
    id: 'field-florida-estimate-footer-2',
    label: 'Estimate footer 2 (Florida)',
    keywords: ['florida', 'estimate footer 2'],
    tab: 'terms-and-conditions',
    section: 'Terms & conditions › Florida state req.',
    subTab: 4,
  },

  // ── Terms & Conditions – Warranty (sub-tab 5) ─────────────
  {
    id: 'field-warranty',
    label: 'Warranty',
    keywords: ['warranty', 'guarantee'],
    tab: 'terms-and-conditions',
    section: 'Terms & conditions › Warranty',
    subTab: 5,
  },
  {
    id: 'field-limited-warranty',
    label: 'Limited Warranty',
    keywords: ['limited warranty', 'restricted warranty'],
    tab: 'terms-and-conditions',
    section: 'Terms & conditions › Warranty',
    subTab: 5,
  },

  // ── Terms & Conditions – Self Check-in (sub-tab 6) ────────
  {
    id: 'field-self-checkin-footer',
    label: 'Self check-in estimate footer',
    keywords: ['self check-in', 'check in', 'estimate footer'],
    tab: 'terms-and-conditions',
    section: 'Terms & conditions › Self check-in',
    subTab: 6,
  },

  // ── Invoice Settings – Estimate & Invoice toggles ─────────
  {
    id: 'field-apply-payment-after-conversion',
    label: 'Apply Payment After Conversion',
    keywords: ['payment', 'conversion', 'estimate', 'invoice'],
    tab: 'invoice-settings',
    section: 'Invoice settings',
  },
  {
    id: 'field-show-barcode',
    label: 'Show Barcode',
    keywords: ['barcode', 'bar code'],
    tab: 'invoice-settings',
    section: 'Invoice settings',
  },
  {
    id: 'field-print-qr-with-vin',
    label: 'Print QR Code with Complete VIN',
    keywords: ['qr code', 'vin', 'print'],
    tab: 'invoice-settings',
    section: 'Invoice settings',
  },
  {
    id: 'field-use-vendors-list-price',
    label: "Use Vendor's List Price Instead",
    keywords: ['vendor', 'list price', 'vendor price'],
    tab: 'invoice-settings',
    section: 'Invoice settings',
  },
  {
    id: 'field-show-1st-signature',
    label: 'Show 1st Signature',
    keywords: ['signature', 'first signature'],
    tab: 'invoice-settings',
    section: 'Invoice settings',
  },
  {
    id: 'field-e-customer-signature',
    label: 'E Customer Signature',
    keywords: ['electronic signature', 'e-signature', 'customer'],
    tab: 'invoice-settings',
    section: 'Invoice settings',
  },
  {
    id: 'field-show-labor-hours',
    label: 'Show Labor Hours',
    keywords: ['labor hours', 'hours', 'display'],
    tab: 'invoice-settings',
    section: 'Invoice settings',
  },
  {
    id: 'field-save-estimate-before-invoice',
    label: 'Save Estimate Before Converting to Invoice',
    keywords: ['save estimate', 'convert', 'invoice'],
    tab: 'invoice-settings',
    section: 'Invoice settings',
  },
  {
    id: 'field-labor-guide-auto-fill',
    label: 'Labor Guide Auto Fill',
    keywords: ['labor guide', 'auto fill', 'autofill'],
    tab: 'invoice-settings',
    section: 'Invoice settings',
  },

  // ── Invoice Settings – Print & Display toggles ────────────
  {
    id: 'field-add-part-number',
    label: 'Add Part# to Parts Description',
    keywords: ['part number', 'description'],
    tab: 'invoice-settings',
    section: 'Invoice settings',
  },
  {
    id: 'field-add-custom-part-number',
    label: 'Add Custom Part# to Parts Description',
    keywords: ['custom part number', 'description'],
    tab: 'invoice-settings',
    section: 'Invoice settings',
  },
  {
    id: 'field-show-logo',
    label: 'Show Logo',
    keywords: ['logo', 'display logo', 'print logo'],
    tab: 'invoice-settings',
    section: 'Invoice settings',
  },
  {
    id: 'field-print-each-mechanic',
    label: 'Print Each Mechanic Worked on Vehicle',
    keywords: ['mechanic', 'print', 'vehicle'],
    tab: 'invoice-settings',
    section: 'Invoice settings',
  },
  {
    id: 'field-print-authorization',
    label: 'Print Authorization',
    keywords: ['authorization', 'print'],
    tab: 'invoice-settings',
    section: 'Invoice settings',
  },
  {
    id: 'field-print-jobs-with-subtotal',
    label: 'Print Format: Jobs With SubTotal',
    keywords: ['jobs', 'subtotal', 'print format'],
    tab: 'invoice-settings',
    section: 'Invoice settings',
  },
  {
    id: 'field-print-subtotal-only',
    label: 'Print Format: SubTotal Only',
    keywords: ['subtotal only', 'print format'],
    tab: 'invoice-settings',
    section: 'Invoice settings',
  },
  {
    id: 'field-always-expand-estimate',
    label: 'Always Expand Estimate Listview',
    keywords: ['expand', 'estimate', 'listview'],
    tab: 'invoice-settings',
    section: 'Invoice settings',
  },

  // ── Invoice Settings – Automation & System toggles ────────
  {
    id: 'field-auto-complete-tires',
    label: 'Auto Complete Tires Inventory',
    keywords: ['auto complete', 'tires', 'inventory'],
    tab: 'invoice-settings',
    section: 'Invoice settings',
  },
  {
    id: 'field-auto-complete-general',
    label: 'Auto Complete General Inventory',
    keywords: ['auto complete', 'general', 'inventory'],
    tab: 'invoice-settings',
    section: 'Invoice settings',
  },
  {
    id: 'field-auto-fill-warranty-click',
    label: 'Auto-Fill Warranty on Click',
    keywords: ['auto fill', 'warranty', 'click'],
    tab: 'invoice-settings',
    section: 'Invoice settings',
  },
  {
    id: 'field-auto-fill-warranty-create',
    label: 'Auto-Fill Warranty When Creating Estimate',
    keywords: ['auto fill', 'warranty', 'create estimate'],
    tab: 'invoice-settings',
    section: 'Invoice settings',
  },
  {
    id: 'field-forward-notifications',
    label: 'Forward Notifications to Gmail',
    keywords: ['notifications', 'gmail', 'email', 'forward'],
    tab: 'invoice-settings',
    section: 'Invoice settings',
  },
  {
    id: 'field-enforce-mileage',
    label: 'Enforce Mileage Before Payment',
    keywords: ['mileage', 'payment', 'enforce'],
    tab: 'invoice-settings',
    section: 'Invoice settings',
  },
  {
    id: 'field-show-thank-you',
    label: 'Show Thank You',
    keywords: ['thank you', 'message'],
    tab: 'invoice-settings',
    section: 'Invoice settings',
  },
  {
    id: 'field-tablet-mode',
    label: 'Tablet Mode',
    keywords: ['tablet', 'mode', 'device'],
    tab: 'invoice-settings',
    section: 'Invoice settings',
  },

  // ── Invoice Settings – Dropdowns & Memos ──────────────────
  {
    id: 'field-type-default',
    label: 'Type default',
    keywords: ['type', 'default', 'part', 'labor'],
    tab: 'invoice-settings',
    section: 'Invoice settings',
  },
  {
    id: 'field-invoice-title-font',
    label: 'Invoice title font',
    keywords: ['font', 'title', 'invoice font'],
    tab: 'invoice-settings',
    section: 'Invoice settings',
  },
  {
    id: 'field-parts-memo',
    label: 'Parts memo',
    keywords: ['parts', 'memo', 'note'],
    tab: 'invoice-settings',
    section: 'Invoice settings',
  },
  {
    id: 'field-thank-you-memo',
    label: 'Thank you memo',
    keywords: ['thank you', 'memo', 'note'],
    tab: 'invoice-settings',
    section: 'Invoice settings',
  },

  // ── Device Settings ───────────────────────────────────────
  {
    id: 'field-receive-data',
    label: 'Receive data',
    keywords: ['receive', 'data', 'device'],
    tab: 'device-settings',
    section: 'Device settings',
  },
  {
    id: 'field-tablet-pair-unpair',
    label: 'Tablet (Pair/Unpair)',
    keywords: ['tablet', 'pair', 'unpair', 'bluetooth'],
    tab: 'device-settings',
    section: 'Device settings',
  },
  {
    id: 'field-cash-drawer',
    label: 'Cash Drawer',
    keywords: ['cash', 'drawer', 'register'],
    tab: 'device-settings',
    section: 'Device settings',
  },
];
