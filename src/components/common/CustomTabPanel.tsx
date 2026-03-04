import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';

interface CustomTabPanelProps {
  children?: ReactNode;
  value: number;
  index: number;
}

const CustomTabPanel = React.memo(({ children, value, index, ...other }: CustomTabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`custom-tabpanel-${index}`}
      aria-labelledby={`custom-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
});

CustomTabPanel.displayName = 'CustomTabPanel';

export default CustomTabPanel;
