import { PartsMarkupLaborFormValues, SalesTaxFormValues } from "types/general-settings"

export const shopInformationData = {
  companyName: 'VIP Auto Repair',
  phoneMain: '(302) 555-1234',
  phoneL2: '(302) 555-5678',
  email: 'info@vipautorepair.com',
  street: '123 Mechanic Lane',
  city: 'Wilmington',
  state: 'DE',
  zipCode: '19802',
  fax: '(302) 555-9999',
  web: 'www.vipautorepair.com',
  contactName: 'John Doe',
  stateRegNo: 'DE-123456789',
  epaNo: '1234567890',
}

// ===== TERMS AND CONDITION =====
export const termsAndConditionTabs = [
  { label: 'Estimate footer', value: 1 },
  { label: 'Invoice footer', value: 2 },
  { label: 'Statement footer', value: 3 },
  { label: 'Florida state rq.', value: 4 },
  { label: 'Warranty', value: 5 },
  { label: 'Self check-in terms', value: 6 },
]

export const estimateFooterDefaultValues = {
  termsAndConditions: `I hereby authorize the repair work herein set forth to be done along with the necessary materials and agree that you are not responsible for loss or damage to vehicle or articles left in vehicle in case of fire, theft or any other cause beyond your control or for any delays caused by unavailability of parts or delay in parts shipments by the supplier or transporter. I hereby grant you and/or your employee's permission to operate the vehicle herein described on streets, highways, or elsewhere for the purpose for testing and/or inspection. I understand that pursuant to said express garage keeper's lien, I have no right of possession to the above vehicle until the repairs have been paid in full or until you/or your employees have voluntarily released the vehicle to me. At the discretion of ____Shop Name___. a storage charge of $ 20.00 per day will be levied for vehicles left 48 hours after completion of repairs.`,
  otherInformation: `Estimate and Diagnosis Fee are based on hourly rate. Estimate good for 30 days. I hereby authorize the above repairs, including sublet work, along with the necessary materials. If I cancel repairs prior to their completion for any reason, a tear down and reassembly fee of $________ will be applied.`,
}

export const invoiceFooterDefaultValues = {
  invoiceTermsAndConditions: "I hereby authorize the repair work herein set forth to be done along with the necessary materials and agree that you are not responsible for loss or damage to vehicle or articles left in vehicle in case of fire, theft or any other cause beyond your control or for any delays caused by unavailability of parts or delay in parts shipments by the supplier or transporter. I hereby grant you and/or your employees permission to operate the vehicle herein described on streets, highways, or elsewhere for the purpose for testing and/or inspection. I understand that pursuant to said express garage keeper`s lien, I have no right of possession to the above vehicle until the repairs have been paid in full or until you/or your employees have voluntarily released the vehicle to me. At the discretion of Vip Shop Management, Inc. a storage charge of $ 20.00 per day will be levied for vehicles left 48 hours after completion of repairs.",
  invoiceOtherInformation: "COMPLETION STATEMENT: Replaced parts either were returned to me or i authorized repair facility to dispose them. Before removing vehicle from facility i have examined vehicle and its content and find them to be in the same condition as when vehicle arrived at facility.",
  invoiceStateRequirement: "ALL REPAIRS PROPERLY PERFORMED P.A. 300",
}

export const statementFooterDefaultValues = {
  statementTermsAndConditions: "Estimate and Diagnosis Fee are based on hourly rate.Estimate good for 30 days. I hereby authorize the above repairs, including sublet work, along with the necessary materials. If I cancel repairs prior to their completion for any reason, a tear down and reassembly fee of $________ will be applied.",
}

export const floridaStateReqDefaultValues = {
  writtenEstimate: false,
  paymentMethod: false,
  saveReplacementParts: false,
  estimateFooter1: "Estimate and Diagnosis Fee are based on hourly rate. Estimate good for 30 days. Not responsible for damage caused by theft, fire or acts of nature. I hereby authorize the above repairs, including sublet work, along with the necessary materials. You and your employees may operate my vehicle for the purpose of testing, inspection and delivery at my risk. If I cancel repairs prior to their completion for any reason, a tear down and reassembly fee of $________ will be applied.",
  estimateFooter2: "**This charge represents costs and profits to the motor vehicle repair facility for miscellaneous shop supplies or waste disposal. ***FS403.718 mandates a $1.00 fee for each new tire sold in the State of Florida. ***FS403.7185 mandates a $1.50 fee for each new or remanufactured battery sold in the State of Florida.",
}

export const warrantyDefaultValues = {
  warranty: "1 year/12000 miles",
  limitedWarranty: "None",
}

export const selfCheckInTermsDefaultValues = {
  selfCheckInEstimateFooter1: "I hereby authorize the repair work herein set forth to be done along with the necessary materials and agree that you are not responsible for loss or damage to vehicle or articles left in vehicle in case of fire, theft or any other cause beyond your control or for any delays caused by unavailability of parts or delay in parts shipments by the supplier or transporter. I hereby grant you and/or your employees permission to operate the vehicle herein described on streets, highways, or elsewhere for the purpose for testing and/or inspection. I understand that pursuant to said express garage keeper`s lien, I have no right of possession to the above vehicle until the repairs have been paid in full or until you/or your employees have voluntarily released the vehicle to me. At the discretion of ___SHOP NAME__. a storage charge of $ 20.00 per day will be levied for vehicles left 48 hours after completion of repairs.",
}

// ===== FEES AND SETUP =====
export const feesAndSetupTabs = [
  { label: 'Shop supplies', value: 1 },
  { label: 'EPA setup', value: 2 },
  { label: 'CC fee', value: 3 },
  { label: 'State fees', value: 4 },
]

export const shopSuppliesDefaultValues = {
  suppliesType: 'percentage',
  shopSuppliesValue: 50,
  shopSuppliesUnit: '%',
  minimum: 0,
  maximum: 0,
}

export const epaSetupDefaultValues = {
  epaType: 'percentage',
  epaValue: 50,
  epaUnit: '%',
  minimum: 0,
  maximum: 0,
}

export const ccFeeDefaultValues = {
  inPersonUnit: '%',
  inPersonValue: 0,
  onlineUnit: '%',
  onlineValue: 0,
}

export const stateFeesDefaultData = {
  fees: [
    {
      id: 'state-mandates-new-tires',
      name: 'State Mandates - New Tires - Passenger Light Truck',
      autoApply: false,
      amount: 0.00,
      taxable: 'N/A',
      enabled: false,
    },
    {
      id: 'scrap-tire-environmental-fee-1',
      name: 'Scrap Tire Environmental Fee',
      autoApply: false,
      amount: 0.00,
      taxable: 'N/A',
      enabled: false,
    },
    {
      id: 'scrap-tire-environmental-fee-2',
      name: 'Scrap Tire Environmental Fee',
      autoApply: false,
      amount: 0.00,
      taxable: 'N/A',
      enabled: false,
    },
    {
      id: 'state-mandates',
      name: 'State Mandates',
      autoApply: false,
      amount: 0.00,
      taxable: 'N/A',
      enabled: false,
    },
  ],
  laborDescriptions: [
    {
      id: 'mount-and-balance',
      name: 'Mount and balance',
      autoApply: false,
      amount: 35.00,
      taxable: 'N/A',
      enabled: false,
    },
  ],
}

// ===== INVOICE SETTINGS =====
export const invoiceSettingsSwitches = [
  {
    name: "applyPaymentAfterConversion",
    label: "Apply Payment After Conversion",
    section: "Estimate & Invoice",
    id: "field-apply-payment-after-conversion",
  },
  {
    name: "showBarcode",
    label: "Show Barcode",
    section: "Estimate & Invoice",
    id: "field-show-barcode",
  },
  {
    name: "printQrWithVin",
    label: "Print QR Code with Complete VIN",
    section: "Estimate & Invoice",
    id: "field-print-qr-with-vin",
  },
  {
    name: "useVendorsListPrice",
    label: "Use Vendor's List Price Instead (If available)",
    section: "Estimate & Invoice",
    id: "field-use-vendors-list-price",
  },
  {
    name: "show1stSignature",
    label: "Show 1st Signature",
    section: "Estimate & Invoice",
    id: "field-show-1st-signature",
  },
  {
    name: "eCustomerSignature",
    label: "E Customer Signature",
    section: "Estimate & Invoice",
    id: "field-e-customer-signature",
  },
  {
    name: "showLaborHours",
    label: "Show Labor Hours",
    section: "Estimate & Invoice",
    id: "field-show-labor-hours",
  },
  {
    name: "saveEstimateBeforeInvoice",
    label: "Save Estimate Before Converting it to Invoice",
    section: "Estimate & Invoice",
    id: "field-save-estimate-before-invoice",
  },
  {
    name: "laborGuideAutoFill",
    label: "Labor Guide Auto Fill",
    section: "Estimate & Invoice",
    id: "field-labor-guide-auto-fill",
  },
  {
    name: "addPartNumberToDescription",
    label: "Add Part# to Parts Description",
    section: "Print & Display",
    id: "field-add-part-number",
  },
  {
    name: "addCustomPartNumberToDescription",
    label: "Add Custom Part# to Parts Description",
    section: "Print & Display",
    id: "field-add-custom-part-number",
  },
  {
    name: "showLogo",
    label: "Show Logo",
    section: "Print & Display",
    id: "field-show-logo",
  },
  {
    name: "printEachMechanic",
    label: "Print Each Mechanic Worked on Vehicle",
    section: "Print & Display",
    id: "field-print-each-mechanic",
  },
  {
    name: "printAuthorization",
    label: "Print Authorization",
    section: "Print & Display",
    id: "field-print-authorization",
  },
  {
    name: "printJobsWithSubtotal",
    label: "Print Format: Jobs With SubTotal",
    section: "Print & Display",
    id: "field-print-jobs-with-subtotal",
  },
  {
    name: "printSubtotalOnly",
    label: "Print Format: SubTotal Only",
    section: "Print & Display",
    id: "field-print-subtotal-only",
  },
  {
    name: "alwaysExpandEstimateListview",
    label: "Always Expand Estimate Listview",
    section: "Print & Display",
    id: "field-always-expand-estimate",
  },
  {
    name: "autoCompleteTiresInventory",
    label: "Auto Complete Tires Inventory",
    section: "Automation & System",
    id: "field-auto-complete-tires",
  },
  {
    name: "autoCompleteGeneralInventory",
    label: "Auto Complete General Inventory",
    section: "Automation & System",
    id: "field-auto-complete-general",
  },
  {
    name: "autoFillWarrantyOnClick",
    label: "Auto-Fill Warranty on Click",
    section: "Automation & System",
    id: "field-auto-fill-warranty-click",
  },
  {
    name: "autoFillWarrantyOnCreate",
    label: "Auto-Fill Warranty When Creating Estimate",
    section: "Automation & System",
    id: "field-auto-fill-warranty-create",
  },
  {
    name: "forwardNotificationsToGmail",
    label: "Forward Notifications to Gmail",
    section: "Automation & System",
    id: "field-forward-notifications",
  },
  {
    name: "enforceMileageBeforePayment",
    label: "Enforce Mileage Before Payment",
    section: "Automation & System",
    id: "field-enforce-mileage",
  },
  {
    name: "showThankYou",
    label: "Show Thank You",
    section: "Automation & System",
    id: "field-show-thank-you",
  },
  {
    name: "tabletMode",
    label: "Tablet Mode",
    section: "Automation & System",
    id: "field-tablet-mode",
  },
]

export const invoiceSettingsDefaultValues = {
  applyPaymentAfterConversion: false,
  showBarcode: false,
  printQrWithVin: false,
  useVendorsListPrice: false,
  show1stSignature: false,
  eCustomerSignature: false,
  showLaborHours: false,
  saveEstimateBeforeInvoice: false,
  laborGuideAutoFill: false,
  addPartNumberToDescription: false,
  addCustomPartNumberToDescription: false,
  showLogo: false,
  printEachMechanic: false,
  printAuthorization: false,
  printJobsWithSubtotal: false,
  printSubtotalOnly: false,
  alwaysExpandEstimateListview: false,
  autoCompleteTiresInventory: false,
  autoCompleteGeneralInventory: false,
  autoFillWarrantyOnClick: false,
  autoFillWarrantyOnCreate: false,
  forwardNotificationsToGmail: false,
  enforceMileageBeforePayment: false,
  showThankYou: false,
  tabletMode: false,
  typeDefault: 'Part',
  invoiceTitleFont: 'Recharge',
  partsMemo: 'All parts are new unless shown as used',
  thankYouMemo: 'Thank you for your business!',
}

export const invoiceSettingsSections = ['Estimate & Invoice', 'Print & Display', 'Automation & System']

export const typeDefaultOptions = [
  { value: 'Part', label: 'Part' },
  { value: 'Labor', label: 'Labor' },
  { value: 'Other', label: 'Other' },
]

export const invoiceTitleFontOptions = [
  { value: 'Recharge', label: 'Recharge' },
  { value: 'Arial', label: 'Arial' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Helvetica', label: 'Helvetica' },
]

// ===== DEVICE SETTINGS =====
export const deviceSettingsDefaultValues = {
  receiveData: false,
  tabletPairUnpair: false,
  cashDrawer: false,
}

export const deviceSettingsFields = [
  { name: 'receiveData', label: 'Receive data', showBorder: true },
  { name: 'tabletPairUnpair', label: 'Tablet (Pair/Unpair)', linkText: 'Print preview', showBorder: true },
  { name: 'cashDrawer', label: 'Cash Drawer', linkText: 'Open drawer', showBorder: false },
]

// ===== COMMON =====
export const currencyUnitOptions = [
  { value: '%', label: '%' },
  { value: '$', label: '$' },
]

export const taxableOptions = [
  { value: 'N/A', label: 'N/A' },
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' },
]

export const salesTaxData: SalesTaxFormValues =
{
  taxRateConfiguration: {
    r1TaxRate: {
      currency: "%",
      rate: "0.00",
    },
    r2TaxRate: {
      currency: "%",
      rate: "0.00",
    },
    r3TaxRate: {
      currency: "%",
      rate: "0.00",
    },
  },
  applyTaxes: {
    parts: {
      active: true,
      taxType: "R1",
    },
    labor: {
      active: true,
      taxType: "R2",
    },
    fees: {
      active: true,
      taxType: "R3",
    },
    epa: {
      active: true,
      taxType: "R3",
    },
    shop_supplies: {
      active: true,
      taxType: "R3",
    },
    tires: {
      active: true,
      taxType: "R3",
    },
    subcontract: {
      active: true,
      taxType: "R3",
    },
    discount: {
      active: true,
      taxType: "R3",
    },
  },
}

export const partsMarkupLaborData: PartsMarkupLaborFormValues = {
  smartMarkup: {
    partsMarkup: {
      currency: "%",
      rate: "0.00",
    },
    tiresMarkup: {
      currency: "$",
      rate: "0.00",
    },
    fiveToTwentyParts: {
      currency: "%",
      rate: "0.00",
    },
    lessThanFiveParts: {
      currency: "%",
      rate: "0.00",
    },
  },
  laborHourlyRates: {
    standard: {
      currency: "%",
      rate: "0.00",
    },
    diessel: {
      currency: "%",
      rate: "0.00",
    },
    euro: {
      currency: "%",
      rate: "0.00",
    },
    warranty: {
      currency: "%",
      rate: "0.00",
    },
    fleet: {
      currency: "%",
      rate: "0.00",
    },
    custom: {
      currency: "%",
      rate: "0.00",
    },
  },
}
