'use client';

import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';

const FuelStationBackground = () => {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {/* Base gradient */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? `linear-gradient(160deg, ${theme.palette.grey[900]} 0%, ${theme.palette.grey[950]} 50%, ${alpha(theme.palette.primary.dark, 0.4)} 100%)`
              : `linear-gradient(160deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.primary.light, 0.04)} 40%, ${theme.palette.background.default} 100%)`,
        }}
      />
      {/* Gradient orbs - fuel station vibe */}
      <Box
        sx={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '60%',
          height: '60%',
          borderRadius: '50%',
          background: (theme) =>
            `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-15%',
          left: '-15%',
          width: '50%',
          height: '50%',
          borderRadius: '50%',
          background: (theme) =>
            `radial-gradient(circle, ${alpha(theme.palette.primary.dark, 0.12)} 0%, transparent 70%)`,
          filter: 'blur(50px)',
        }}
      />
      {/* Subtle grid - fuel station / industrial feel */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: (theme) =>
            `linear-gradient(${alpha(theme.palette.primary.main, 0.03)} 1px, transparent 1px),
             linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.03)} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
    </Box>
  );
};

export default FuelStationBackground;
