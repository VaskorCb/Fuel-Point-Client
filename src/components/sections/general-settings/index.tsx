'use client';

import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import TabContext from '@mui/lab/TabContext';
import Drawer from '@mui/material/Drawer';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { useRouter, useSearchParams } from 'next/navigation';
import { useNavContext } from 'layouts/main-layout/NavProvider';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import { useSettingsContext } from 'providers/SettingsProvider';
import SimpleBar from 'components/base/SimpleBar';
import SideTabList from 'components/sections/general-settings/SideTabList';
import GeneralSettingsTabPanel from 'components/sections/general-settings/common/GeneralSettingsTabPanel';
import { generalSettingsTabs } from 'data/general-settings/general-settings-tab';

const TAB_PARAM = 'tab';
const DEFAULT_TAB = generalSettingsTabs[0].value;

const GeneralSettings = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabParam = searchParams.get(TAB_PARAM);
  const matched = generalSettingsTabs.find((t) => t.value === tabParam);
  const activeTab = matched ? matched.value : DEFAULT_TAB;

  const { down } = useBreakpoints();
  const [showTabList, setShowTabList] = useState(true);
  const {
    config: { textDirection },
  } = useSettingsContext();
  const { topbarHeight } = useNavContext();

  const downMd = down('md');

  const handleChange = useCallback((_event: SyntheticEvent, newValue: string): void => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(TAB_PARAM, newValue);
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  // Set default tab param if none is present
  useEffect(() => {
    if (!tabParam) {
      const params = new URLSearchParams(searchParams.toString());
      params.set(TAB_PARAM, DEFAULT_TAB);
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [tabParam, router, searchParams]);

  return (
    // <AccountsProvider>
    <TabContext value={activeTab}>
      <Stack>
        {downMd ? (
          <Drawer
            hideBackdrop
            anchor={textDirection === 'ltr' ? 'left' : 'right'}
            open={showTabList}
            onClose={() => setShowTabList(false)}
            ModalProps={{
              keepMounted: true,
              disablePortal: true,
            }}
            slotProps={{
              paper: {
                sx: {
                  bgcolor: 'background.elevation1',
                  width: 1,
                  overflow: 'hidden',
                  pointerEvents: 'auto',
                  height: ({ mixins }) => mixins.contentHeight(topbarHeight),
                  top: ({ mixins }) => mixins.topOffset(topbarHeight, 1),
                },
              },
            }}
            sx={{
              pointerEvents: 'none',
            }}
          >
            <SimpleBar>
              <SideTabList activeTab={activeTab} setShowTabList={setShowTabList} handleChange={handleChange} />
            </SimpleBar>
          </Drawer>
        ) : (
          <Paper
            background={1}
            sx={{
              width: { md: 324, lg: 405 },
              position: 'sticky',
              top: ({ mixins }) => mixins.topOffset(topbarHeight),
              height: ({ mixins }) => mixins.contentHeight(topbarHeight),
            }}
          >
            <SimpleBar>
              <SideTabList activeTab={activeTab} setShowTabList={setShowTabList} handleChange={handleChange} />
            </SimpleBar>
          </Paper>
        )}

        <Paper sx={{ flex: 1, px: 0 }}>
          {generalSettingsTabs.map((tab) => (
            <GeneralSettingsTabPanel
              key={tab.id}
              label={tab.label}
              value={tab.value}
              title={tab.title}
              panelIcon={tab.panelIcon}
              setShowTabList={setShowTabList}
            >
              {tab.tabPanel}
            </GeneralSettingsTabPanel>
          ))}
        </Paper>
      </Stack>
    </TabContext>
    // </AccountsProvider>
  );
};

export default GeneralSettings;
