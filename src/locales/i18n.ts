'use client';

import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEn from './langs/en.json';

const localeImports: Record<string, () => Promise<{ default: Record<string, string> }>> = {
  frFR: () => import('./langs/fr.json'),
  bnBD: () => import('./langs/bn.json'),
  zhCN: () => import('./langs/zh.json'),
  hiIN: () => import('./langs/hi.json'),
  arSA: () => import('./langs/ar.json'),
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      enUS: { translation: translationEn },
    },
    lng: 'enUS',
    ns: ['translation'],
    fallbackLng: 'enUS',
    debug: false,
  });

// Lazy-load non-English translations on language change
i18n.on('languageChanged', async (lng) => {
  if (lng === 'enUS' || i18n.hasResourceBundle(lng, 'translation')) return;

  const loader = localeImports[lng];
  if (loader) {
    const module = await loader();
    i18n.addResourceBundle(lng, 'translation', module.default, true, true);
  }
});

export default i18n;
