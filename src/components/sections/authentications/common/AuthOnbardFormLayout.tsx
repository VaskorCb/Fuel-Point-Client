'use client';

import { PropsWithChildren } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import petrolPumpIcon from 'assets/logos/petrol-pump-icon.svg';

interface AuthFormLayoutProps extends PropsWithChildren {
  illustration?: string;
  illustrationAlt?: string;
  footerText?: string;
  footerHref?: string;
  showIllustration?: boolean;
}

const AuthFormLayout = ({ children }: AuthFormLayoutProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: 480,
        py: { xs: 6, sm: 8 },
        px: { xs: 5, sm: 6, md: 8 },
      }}
    >
      {/* Logo - centered at top, clickable to go home */}
      <Box
        component={Link}
        href="/"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          mb: 5,
          textDecoration: 'none',
          color: 'inherit',
          '&:hover': { opacity: 0.85 },
        }}
      >
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: (theme) => theme.palette.primary.main,
            flexShrink: 0,
          }}
        >
          <Image src={petrolPumpIcon} alt="Fuel Point" width={32} height={32} />
        </Box>
        <Typography variant="h5" fontWeight={800} letterSpacing="-0.02em">
          Fuel Point
        </Typography>
      </Box>
      <Box sx={{ flex: 1, width: 1 }}>{children}</Box>
    </Box>
  );
};

export default AuthFormLayout;
