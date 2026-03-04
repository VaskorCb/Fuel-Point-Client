
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState, SyntheticEvent, useCallback, useMemo, useEffect } from 'react';
import { termsAndConditionTabs } from 'data/general-settings/combined';
import {
  SETTINGS_SEARCH_NAVIGATE,
  SettingsSearchNavigateDetail,
} from 'utils/scroll-and-highlight';

import EstimateFooter from './EstimateFooterTab';
import InvoiceFooter from './InvoiceFooterTab';
import StatementFooter from './StatementFooterTab';
import FloridaStateReq from './FloridaStateReqTab';
import WarrantyTab from './WarrantyTab';
import SelfCheckInTermsTab from './SelfCheckInTermsTab';
import CustomTabPanel from '../../../common/CustomTabPanel';

const TermsAndCondition = () => {
  const [value, setValue] = useState<number>(1);

  useEffect(() => {
    const handler = (e: Event) => {
      const { tab, subTab } = (e as CustomEvent<SettingsSearchNavigateDetail>).detail;
      if (tab === 'terms-and-conditions' && subTab !== undefined) {
        setValue(subTab);
      }
    };
    window.addEventListener(SETTINGS_SEARCH_NAVIGATE, handler);
    return () => window.removeEventListener(SETTINGS_SEARCH_NAVIGATE, handler);
  }, []);

  const handleChange = useCallback((_event: SyntheticEvent, newValue: number): void => {
    setValue(newValue);
  }, []);

  const tabData = useMemo(() => termsAndConditionTabs, []);

  const tabContent = useMemo(() => [
    { component: <EstimateFooter />, index: 1 },
    { component: <InvoiceFooter />, index: 2 },
    { component: <StatementFooter />, index: 3 },
    { component: <FloridaStateReq />, index: 4 },
    { component: <WarrantyTab />, index: 5 },
    { component: <SelfCheckInTermsTab />, index: 6 },
  ], []);

  return (
    <Box sx={{ width: 1 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="terms and condition tabs"
        variant="scrollable"
        scrollButtons={false}
        sx={{
          px: 3,
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: 'background.paper',
          borderLeft: '1px solid',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        {tabData.map(({ label, value: tabValue }) => (
          <Tab key={tabValue} label={label} value={tabValue} />
        ))}
      </Tabs>
      <Box sx={{ p: 5 }}>
        {tabContent.map(({ component, index }) => (
          <CustomTabPanel key={index} value={value} index={index}>
            {component}
          </CustomTabPanel>
        ))}
      </Box>
    </Box>
  );
};

export default TermsAndCondition;