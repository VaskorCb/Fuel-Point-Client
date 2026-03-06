'use client';

import Image from 'next/image';
import Box from '@mui/material/Box';

const FuelStationAnimatedPanel = () => {
  return (
    <Box
      sx={{
        display: { xs: 'none', lg: 'flex' },
        flex: 1,
        minHeight: '100vh',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Image
        src="/assets/images/fuel-station-hero.jpeg"
        alt="Fuel Point - 3D Fuel Station"
        fill
        priority
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
    </Box>
  );
};

export default FuelStationAnimatedPanel;
