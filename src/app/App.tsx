'use client';

import { ReactNode, useEffect, useLayoutEffect } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import SettingsPanelProvider from 'providers/SettingsPanelProvider';
import { useSettingsContext } from 'providers/SettingsProvider';
import { REFRESH } from 'reducers/SettingsReducer';

// const SettingsPanel = dynamic(() => import('components/settings-panel/SettingsPanel'), {
//   ssr: false,
// });

// const SettingPanelToggler = dynamic(() => import('components/settings-panel/SettingPanelToggler'), {
//   ssr: false,
// });

const App = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const pathname = usePathname();
  const { configDispatch } = useSettingsContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useLayoutEffect(() => {
    configDispatch({ type: REFRESH });
  }, [configDispatch]);

  return (
    <SettingsPanelProvider>
      {children}
      {/* <SettingsPanel /> */}
      {/* <SettingPanelToggler /> */}
    </SettingsPanelProvider>
  );
};

export default App;
