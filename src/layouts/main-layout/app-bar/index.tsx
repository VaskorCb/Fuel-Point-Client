import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { paperClasses } from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import { useSettingsContext } from 'providers/SettingsProvider';
import { topnavVibrantStyle } from 'theme/styles/vibrantNav';
import IconifyIcon from 'components/base/IconifyIcon';
import Logo from 'components/common/Logo';
import VibrantBackground from 'components/common/VibrantBackground';
import AppbarActionItems from '../common/AppbarActionItems';
import SearchBox, { SearchBoxButton } from '../common/search-box/SearchBox';

const AppBar = () => {
  const {
    config: { drawerWidth, sidenavType, navColor },
    handleDrawerToggle,
  } = useSettingsContext();

  const { up } = useBreakpoints();
  const upSm = up('sm');
  const upMd = up('md');

  const prevSidenavTypeRef = useRef(sidenavType);

  useEffect(() => {
    if (prevSidenavTypeRef.current !== sidenavType) {
      prevSidenavTypeRef.current = sidenavType;
    }
  }, [sidenavType]);

  return (
    <MuiAppBar
      position="fixed"
      sx={[
        {
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          borderBottom: `1px solid`,
          borderColor: 'divider',
          [`&.${paperClasses.root}`]: {
            outline: 'none',
          },
        },
        sidenavType === 'stacked' &&
          sidenavType === prevSidenavTypeRef.current &&
          ((theme) => ({
            transition: theme.transitions.create(['width'], {
              duration: theme.transitions.duration.standard,
            }),
          })),
        navColor === 'vibrant' && !upMd && topnavVibrantStyle,
      ]}
    >
      {navColor === 'vibrant' && !upMd && <VibrantBackground position="top" />}
      <Toolbar variant="appbar" sx={{ px: { xs: 1.5, sm: 2, md: 5 }, minHeight: { xs: 56, md: 64 } }}>
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            alignItems: 'center',
            gap: { xs: 0.5, sm: 1 },
            pr: { xs: 1, sm: 2 },
            minWidth: 0,
          }}
        >
          <Button
            color="neutral"
            variant="soft"
            shape="circle"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <IconifyIcon icon="material-symbols:menu-rounded" sx={{ fontSize: 20 }} />
          </Button>

          <Box>
            <Logo showName={upSm} />
          </Box>
        </Box>

        <Stack
          sx={{
            alignItems: 'center',
            flex: 1,
          }}
        >
          {upMd ? (
            <SearchBox
              sx={{
                width: 1,
                maxWidth: 420,
              }}
            />
          ) : (
            <SearchBoxButton />
          )}
          <AppbarActionItems />
        </Stack>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
