'use client';

import { PropsWithChildren, useLayoutEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider, useColorScheme } from '@mui/material/styles';
import { REFRESH } from 'reducers/SettingsReducer';
import { createTheme } from 'theme/theme';
import PageLoader from 'components/loading/PageLoader';
import { useSettingsContext } from './SettingsProvider';

const RTLMode = dynamic(() => import('theme/RTLMode'), {
  ssr: false,
  loading: () => <PageLoader sx={{ height: '100vh' }} />,
});

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const {
    config: { textDirection, locale, themePreset, primaryColor },
    configDispatch,
  } = useSettingsContext();
  const { systemMode, setMode } = useColorScheme();

  const customTheme = useMemo(() => {
    return createTheme({ direction: textDirection, locale, preset: themePreset, primaryColor });
  }, [textDirection, locale, themePreset, primaryColor]);

  useLayoutEffect(() => {
    configDispatch({ type: REFRESH });

    const root = document.documentElement;
    if (themePreset) {
      root.setAttribute('data-aurora-preset', themePreset);
    } else {
      root.removeAttribute('data-aurora-preset');
    }
  }, [setMode, themePreset, systemMode, primaryColor, configDispatch]);

  return (
    <MuiThemeProvider
      disableTransitionOnChange
      theme={customTheme}
      defaultMode="light"
      modeStorageKey="aurora-mode"
    >
      <CssBaseline enableColorScheme />
      <RTLMode>{children}</RTLMode>
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
