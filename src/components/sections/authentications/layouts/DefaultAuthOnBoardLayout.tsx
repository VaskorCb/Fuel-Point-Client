'use client';

import { PropsWithChildren, Suspense } from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import IconifyIcon from 'components/base/IconifyIcon';
import DefaultLoader from 'components/loading/DefaultLoader';
import FuelStationAnimatedPanel from 'components/sections/authentications/common/FuelStationAnimatedPanel';

const DefaultAuthOnBoardLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
        bgcolor: 'background.default',
      }}
    >
      {/* Left: Animated fuel station panel (desktop only) */}
      <FuelStationAnimatedPanel />

      {/* Right: Auth form */}
      <Box
        sx={{
          flex: { xs: 1, lg: '0 0 50%' },
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 3, sm: 5, md: 6 },
          py: { xs: 5, sm: 8 },
          position: 'relative',
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.grey[900], 0.5)} 100%)`
              : `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.grey[50], 0.8)} 100%)`,
        }}
      >
        {/* Very subtle grid on form side */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: (theme) =>
              `linear-gradient(${alpha(theme.palette.divider, 0.02)} 1px, transparent 1px),
               linear-gradient(90deg, ${alpha(theme.palette.divider, 0.02)} 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
            pointerEvents: 'none',
          }}
        />
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            width: 1,
            maxWidth: 480,
            minWidth: 0,
          }}
        >
          {/* Back to home - outside card */}
          <Button
            component={Link}
            href="/"
            startIcon={<IconifyIcon icon="material-symbols:arrow-back-rounded" sx={{ fontSize: 20 }} />}
            sx={{
              mb: 2,
              color: 'text.secondary',
              fontWeight: 600,
              '&:hover': {
                bgcolor: 'action.hover',
                color: 'text.primary',
              },
            }}
          >
            Back to home
          </Button>

          <Box
            sx={{
              bgcolor: 'background.paper',
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: (theme) =>
                theme.palette.mode === 'dark'
                  ? `0 8px 32px ${alpha(theme.palette.common.black, 0.4)}`
                  : `0 8px 32px ${alpha(theme.palette.grey[500], 0.12)}`,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Suspense fallback={<DefaultLoader />}>{children}</Suspense>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DefaultAuthOnBoardLayout;
