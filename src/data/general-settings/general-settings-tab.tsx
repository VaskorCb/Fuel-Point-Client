import dynamic from 'next/dynamic';
import { GeneralSettingsTab } from 'types/general-settings';

import ShopInformation  from 'components/sections/general-settings/shop-information/ShopInformation';
const ShopLogo = dynamic(() => import('components/sections/general-settings/shop-logo/ShopLogo'));
const SalesTax = dynamic(() => import('components/sections/general-settings/sales-tax/SalesTax'));
const FeesAndSetup = dynamic(() => import('components/sections/general-settings/fees-and-setup/FeesAndSetup'));
const PartsMarkupLabor = dynamic(() => import('components/sections/general-settings/parts-markup-labor/PartsMarkupLabor'));
const TermsAndCondition = dynamic(() => import('components/sections/general-settings/terms-and-condition/TermsAndCondition'));
const InvoiceSettings = dynamic(() => import('components/sections/general-settings/invoice-settings/InvoiceSettings'));
const DeviceSettings = dynamic(() => import('components/sections/general-settings/device-settings/DeviceSettings'));


export const generalSettingsTabs: GeneralSettingsTab[] = [
  {
    id: 1,
    label: 'Shop information',
    title: 'Shop information',
    value: 'shop-information',
    icon: 'material-symbols:info-outline-rounded',
    panelIcon: 'material-symbols:info-outline-rounded',
    tabPanel: <ShopInformation />,
  },
  {
    id: 2,
    label: 'Shop logo',
    title: 'Shop logo',
    value: 'shop-logo',
    icon: 'material-symbols:image-outline-rounded',
    panelIcon: 'material-symbols:image-outline-rounded',
    tabPanel: <ShopLogo />,
  },
  {
    id: 3,
    label: 'Sales tax',
    title: 'Sales tax',
    value: 'sales-tax',
    icon: 'material-symbols:feed-outline-rounded',
    panelIcon: 'material-symbols:feed-outline-rounded',
    tabPanel: <SalesTax />,
  },
  {
    id: 4,
    label: 'Fees & setup',
    title: 'Fees & setup',
    value: 'fees-and-setup',
    icon: 'material-symbols:docs-add-on',
    panelIcon: 'material-symbols:docs-add-on',
    tabPanel: <FeesAndSetup />,
  },
  {
    id: 5,
    label: 'Parts markup / labor',
    title: 'Parts markup / labor',
    value: 'parts-markup-labor',
    icon: 'material-symbols:manage-accounts-outline',
    panelIcon: 'material-symbols:manage-accounts-outline',
    tabPanel: <PartsMarkupLabor />,
  },
  {
    id: 6,
    label: 'Terms & conditions',
    title: 'Terms & conditions',
    value: 'terms-and-conditions',
    icon: 'material-symbols:assignment-late-outline-rounded',
    panelIcon: 'material-symbols:assignment-late-outline-rounded',
    tabPanel: <TermsAndCondition />,
  },
  {
    id: 7,
    label: 'Invoice settings',
    title: 'Invoice settings',
    value: 'invoice-settings',
    icon: 'material-symbols:receipt-long-outline-rounded',
    panelIcon: 'material-symbols:receipt-long-outline-rounded',
    tabPanel: <InvoiceSettings />,
  },
  {
    id: 8,
    label: 'Device settings',
    title: 'Device settings',
    value: 'device-settings',
    icon: 'material-symbols:settings-outline-rounded',
    panelIcon: 'material-symbols:settings-outline-rounded',
    tabPanel: <DeviceSettings />,
  },
];
