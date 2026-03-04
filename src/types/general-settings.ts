import { ComponentType, JSX } from "react";

export interface GeneralSettingsTab {
    id?: number;
    label: string;
    title: string;
    value: string;
    icon: string;
    panelIcon: string;
    tabPanel: JSX.Element;
    TabPanelComponent?: ComponentType;
  }

  export interface ShopInformationFormValues {
    companyName: string;
    phoneMain: string;
    phoneL2: string;
    email: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    fax: string;
    web: string;
    contactName: string;
    stateRegNo: string;
    epaNo: string;
  }

export type currency = "%" | "$"

export type TaxType = "R1" | "R2" | "R3" | null;

export interface TaxRate {
    
    r1TaxRate: {
      currency: currency;
      rate: string;
    },
    r2TaxRate: {
      currency: currency;
      rate: string;
      additionalTax?: string;
    },
    r3TaxRate: {
      currency: currency;
      rate: string;
    },
}

export interface ApplyTaxes {
  parts:{
    active: boolean;
    taxType: TaxType;
  },
  labor: {
    active: boolean;
    taxType: TaxType;
  },
  fees: {
    active: boolean;
    taxType: TaxType;
  },
  epa: {
    active: boolean;
    taxType: TaxType;
  },
  shop_supplies: {
    active: boolean;
    taxType: TaxType;
  },
  tires: {
    active: boolean;
    taxType: TaxType;
  },
  subcontract:{
    active: boolean;
    taxType: TaxType;
  },
  discount: {
    active: boolean;
    taxType: TaxType;
  },
}

export interface SalesTaxFormValues {
  taxRateConfiguration: TaxRate;
  applyTaxes: ApplyTaxes;
}


export interface SmartMarkup {
  partsMarkup:{
    currency: currency;
    rate: string;
  },
  tiresMarkup:{
    currency: currency;
    rate: string;
  },
  fiveToTwentyParts:{
    currency: currency;
    rate: string;
  },
  lessThanFiveParts:{
    currency: currency;
    rate: string;
  },
}

export interface LaborHourlyRates{
  standard:{
    currency: currency;
    rate: string;
  },
  diessel:{
    currency: currency;
    rate: string;
  },
  euro:{
    currency: currency;
    rate: string;
  },
  warranty:{
    currency: currency;
    rate: string;
  },
  fleet:{
    currency: currency;
    rate: string;
  },
  custom:{
    currency: currency;
    rate: string;
  },
}

export interface PartsMarkupLaborFormValues {
  smartMarkup: SmartMarkup;
  laborHourlyRates: LaborHourlyRates;
}
  