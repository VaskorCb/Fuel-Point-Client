import { ReactElement, PropsWithChildren } from 'react';
import TabPanel from '@mui/lab/TabPanel';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import IconifyIcon from 'components/base/IconifyIcon';

interface GeneralSettingsTabPanelProps {
  label: string;
  title: string;
  value: string;
  panelIcon: string;
  setShowTabList: (value: boolean) => void;
}

const GeneralSettingsTabPanel = ({
  title,
  value,
  panelIcon,
  setShowTabList,
  children,
}: PropsWithChildren<GeneralSettingsTabPanelProps>): ReactElement => {
  return (
    <TabPanel value={value} sx={{ p: 0, height: "100%" }}>

      <Stack sx={{ gap: 1, alignItems: 'center', py: 5.5, px: 5, justifyContent: 'space-between' }}>
        <IconButton onClick={() => setShowTabList(true)} sx={{ display: { md: 'none' }, ml: -1.5 }}>
          <IconifyIcon
            flipOnRTL
            icon="material-symbols:chevron-left-rounded"
            sx={{ color: 'neutral.main', fontSize: 20 }}
          />
        </IconButton>

        <Typography
          variant="h4"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            fontSize: {
              xs: 'h6.fontSize',
              lg: 'h4.fontSize',
            },
          }}
        >
          <IconifyIcon
            icon={panelIcon}
            sx={{ fontSize: 32, display: { xs: 'none', md: 'inline' } }}
          />
          {title}
        </Typography>

        <Button type="submit" form={`${value}-form`} variant='contained'>Save Changes</Button>
      </Stack>
      <Divider />

      <Paper sx={{ height: 'calc(100dvh - 212px)', overflowY: 'auto' }}>
        {children}
      </Paper>
    </TabPanel>
  );
};

export default GeneralSettingsTabPanel;
