import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import App from 'app/App';
import 'locales/i18n';
import type { Metadata } from 'next';
import AuthProvider from 'providers/AuthProvider';
import BreakpointsProvider from 'providers/BreakpointsProvider';
import JotaiAppProvider from 'providers/JotaiProvider';
import LocalizationProvider from 'providers/LocalizationProvider';
import ToastProvider from 'providers/ToastProvider';
import QueryProvider from 'providers/QueryProvider';
import SettingsProvider from 'providers/SettingsProvider';
import ThemeProvider from 'providers/ThemeProvider';
import { type ReactNode } from 'react';
import { plusJakartaSans, splineSansMono } from 'theme/typography';

export const metadata: Metadata = {
  title: 'Fuel Point',
  description: 'Fuel station management — sales, shifts, tanks, and reports in one place.',
  icons: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      url: '/assets/logos/petrol-pump-icon.svg',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${plusJakartaSans.className} ${splineSansMono.className}`}
    >
      <body suppressHydrationWarning>
        <InitColorSchemeScript attribute="data-aurora-color-scheme" modeStorageKey="aurora-mode" />
        <AppRouterCacheProvider>
          <JotaiAppProvider>
            <QueryProvider>
              <SettingsProvider>
                <LocalizationProvider>
                  <ThemeProvider>
                    <ToastProvider />
                    <BreakpointsProvider>
                      <AuthProvider>
                        <App>{children}</App>
                      </AuthProvider>
                    </BreakpointsProvider>
                  </ThemeProvider>
                </LocalizationProvider>
              </SettingsProvider>
            </QueryProvider>
          </JotaiAppProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
