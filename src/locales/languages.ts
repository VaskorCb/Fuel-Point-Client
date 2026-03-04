import { SupportedLocales } from 'config';

export interface SupportedLanguage {
  label: string;
  shortLabel: string;
  icon: string;
  locale: SupportedLocales;
  currency: string;
  currencySymbol: string;
}
export const languages: SupportedLanguage[] = [
  {
    label: 'EN',
    shortLabel: 'eng',
    icon: 'twemoji:flag-united-states',
    locale: 'en-US',
    currency: 'USD',
    currencySymbol: '$',
  },
  {
    label: 'FR',
    shortLabel: 'fra',
    icon: 'twemoji:flag-france',
    locale: 'fr-FR',
    currency: 'EUR',
    currencySymbol: '€',
  },
  {
    label: 'BN',
    shortLabel: 'ben',
    icon: 'twemoji:flag-bangladesh',
    locale: 'bn-BD',
    currency: 'BDT',
    currencySymbol: '৳',
  },
  {
    label: '官话',
    shortLabel: 'zho',
    icon: 'twemoji:flag-china',
    locale: 'zh-CN',
    currency: 'CNY',
    currencySymbol: '¥',
  },
  {
    label: 'हिन्दी',
    shortLabel: 'hin',
    icon: 'twemoji:flag-india',
    locale: 'hi-IN',
    currency: 'INR',
    currencySymbol: '₹',
  },
  {
    label: 'Arabic',
    shortLabel: 'ara',
    icon: 'twemoji:flag-saudi-arabia',
    locale: 'ar-SA',
    currency: 'SAR',
    currencySymbol: '﷼',
  },
];
