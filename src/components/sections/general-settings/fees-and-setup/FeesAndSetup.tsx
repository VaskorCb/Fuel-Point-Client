import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import dynamic from 'next/dynamic';
import { useState, SyntheticEvent, useCallback, useMemo, useEffect } from 'react';
import { feesAndSetupTabs } from 'data/general-settings/combined';
import {
  SETTINGS_SEARCH_NAVIGATE,
  SettingsSearchNavigateDetail,
} from 'utils/scroll-and-highlight';
import ShopSuppliesForm from './ShopSuppliesForm';
import EPASetupForm from './EPASetupForm';
import CCFeeForm from './CCFeeForm';
import CustomTabPanel from '../../../common/CustomTabPanel';

const StateFeesForm = dynamic(() => import('./StateFeesForm'), { ssr: false });


const FeesAndSetup = () => {
  const [value, setValue] = useState<number>(1);

  useEffect(() => {
    const handler = (e: Event) => {
      const { tab, subTab } = (e as CustomEvent<SettingsSearchNavigateDetail>).detail;
      if (tab === 'fees-and-setup' && subTab !== undefined) {
        setValue(subTab);
      }
    };
    window.addEventListener(SETTINGS_SEARCH_NAVIGATE, handler);
    return () => window.removeEventListener(SETTINGS_SEARCH_NAVIGATE, handler);
  }, []);

  const handleChange = useCallback((_event: SyntheticEvent, newValue: number): void => {
    setValue(newValue);
  }, []);

  const tabData = useMemo(() => feesAndSetupTabs, []);

  const tabContent = useMemo(() => [
    { component: <ShopSuppliesForm />, index: 1 },
    { component: <EPASetupForm />, index: 2 },
    { component: <CCFeeForm />, index: 3 },
    { component: <StateFeesForm />, index: 4 },
  ], []);

  return (
    <Box sx={{ width: 1 }}>
      <Tabs value={value} onChange={handleChange} aria-label="fees and setup tabs" sx={{
        px: 3,
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: 'background.paper',
        borderLeft: '1px solid',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}>
        {tabData.map(({ label, value: tabValue }) => (
          <Tab key={tabValue} label={label} value={tabValue} />
        ))}
      </Tabs>
      <Box sx={{ mt: 5, mx: 3 }}>
        {tabContent.map(({ component, index }) => (
          <CustomTabPanel key={index} value={value} index={index}>
            {component}
          </CustomTabPanel>
        ))}
      </Box>
    </Box>
  );
};

export default FeesAndSetup;