import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { paperClasses } from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import MuiAppBar from '@mui/material/AppBar';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import { useSettingsContext } from 'providers/SettingsProvider';
import { topnavVibrantStyle } from 'theme/styles/vibrantNav';
import IconifyIcon from 'components/base/IconifyIcon';
import VibrantBackground from 'components/common/VibrantBackground';
import AppbarActionItems from '../common/AppbarActionItems';
import SearchBox from '../common/search-box/SearchBox';
import Image from 'next/image';
import logo from '../../../../public/assets/logos/logo.svg';

const TopNavStacked = () => {
  const {
    config: { navColor },
    handleDrawerToggle,
  } = useSettingsContext();

  const { up } = useBreakpoints();
  const upSm = up('sm');
  const upMd = up('md');

  return (
    <>
      <MuiAppBar
        position="fixed"
        sx={[
          {
            width: 1,
            zIndex: ({ zIndex }) => ({
              md: zIndex.drawer + 1,
            }),
            [`&.${paperClasses.root}`]: {
              outline: 'none',
            },
          },
          navColor === 'vibrant' && topnavVibrantStyle,
        ]}
      >
        {navColor === 'vibrant' && <VibrantBackground position="top" />}
        <Toolbar variant="appbarStacked" sx={(theme ) => ({ height: 82, bgcolor: theme.palette.primary.dark, px: { xs: 3, md: 5 } })}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              minWidth: 260,
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                display: { xs: 'flex', md: 'none' },
              }}
            >
              <IconifyIcon icon="material-symbols:menu-rounded" sx={{ fontSize: 20 }} />
            </IconButton>
            {/* <Logo showName={upSm} /> */}
            <Image src={logo} alt="logo" width={74} height={28} />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            {upMd && (
              <SearchBox
                sx={[
                  {
                    width: 1,
                    maxWidth: 364,
                    ml: 0,
                  },
                ]}
                slotProps={{
                  input: {
                    sx: {
                      backgroundColor: 'transparent',
                      '&.MuiInputBase-root': {
                        backgroundColor: 'transparent',
                      },
                      '&.Mui-focused': {
                        backgroundColor: 'transparent',
                      },
                      '& .MuiInputBase-input::-webkit-input-placeholder': {
                        color: 'var(--aurora-palette-neutral-contrastText) !important',
                        opacity: '1 !important',
                      },
                      '& .MuiInputBase-input::-moz-placeholder': {
                        color: 'var(--aurora-palette-neutral-contrastText) !important',
                        opacity: '1 !important',
                      },
                      '& .MuiInputAdornment-root .iconify': {
                        color: 'neutral.contrastText',
                      },
                    },
                  },
                }}
              />
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Button variant="soft" color='neutral'  sx={(theme) => ({ color: theme.palette.primary.dark, borderRadius: 1})} size="large" startIcon={<IconifyIcon icon="material-symbols:add-2-rounded" sx={{ fontSize: 24 }} />}>
                Create new estimate
              </Button>
              <AppbarActionItems sx={{ ml: 0 }} />
            </Box>
          </Box>
        </Toolbar>
        <Divider />
      </MuiAppBar>
    </>
  );
};

export default TopNavStacked;
