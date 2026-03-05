'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useSettingsContext } from 'providers/SettingsProvider';
import IconifyIcon from 'components/base/IconifyIcon';
import AppbarActionItems from '../common/AppbarActionItems';
import petrolPumpIcon from '../../../../public/assets/logos/petrol-pump-icon.svg';
import paths from 'routes/paths';

const TopNavStacked = () => {
  const router = useRouter();
  const { handleDrawerToggle } = useSettingsContext();

  return (
    <MuiAppBar
      position="fixed"
      elevation={0}
      sx={{
        width: 1,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: 'background.paper',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 56, sm: 64 },
          height: { xs: 56, sm: 64 },
          px: { xs: 1.5, sm: 2, md: 3 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: { xs: 1, sm: 2 },
        }}
      >
        {/* Left: Menu + Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 }, minWidth: 0, flex: 1 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{
              display: { md: 'none' },
              color: 'text.primary',
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <IconifyIcon icon="material-symbols:menu-rounded" sx={{ fontSize: 26 }} />
          </IconButton>

          <Box
            component="button"
            onClick={() => router.push(paths.dashboard)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              p: 0.5,
              borderRadius: 1,
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <Image
              src={petrolPumpIcon}
              alt="Fuel Point"
              width={32}
              height={32}
              style={{ flexShrink: 0 }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: 'text.primary',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              Fuel Point
            </Typography>
          </Box>
        </Box>

        {/* Right: Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.25, sm: 0.5 }, flexShrink: 0 }}>
          <AppbarActionItems sx={{ ml: 0 }} />
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};

export default TopNavStacked;
