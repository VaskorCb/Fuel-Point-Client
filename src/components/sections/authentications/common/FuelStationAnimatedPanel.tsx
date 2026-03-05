'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

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
        p: 8,
        position: 'relative',
        overflow: 'hidden',
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? `linear-gradient(135deg, ${theme.palette.grey[900]} 0%, ${alpha(theme.palette.primary.dark, 0.3)} 50%, ${theme.palette.grey[950]} 100%)`
            : `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 50%, ${alpha(theme.palette.primary.dark, 0.9)} 100%)`,
        '@keyframes authOrb1': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(20px, -30px) scale(1.1)' },
        },
        '@keyframes authOrb2': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-15px, 25px)' },
        },
        '@keyframes authPumpPulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.9 },
        },
        '@keyframes authDropFloat': {
          '0%': { opacity: 0.3, transform: 'translateY(0) scale(0.8)' },
          '50%': { opacity: 1, transform: 'translateY(-8px) scale(1)' },
          '100%': { opacity: 0.3, transform: 'translateY(0) scale(0.8)' },
        },
        '@keyframes authRise': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '20%': { opacity: 0.6, transform: 'translateY(0)' },
          '80%': { opacity: 0.6, transform: 'translateY(-40px)' },
          '100%': { opacity: 0, transform: 'translateY(-60px)' },
        },
      }}
    >
      {/* Floating fuel bubbles in background */}
      {[...Array(6)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            left: `${15 + i * 15}%`,
            bottom: '-20px',
            width: 8 + (i % 3) * 4,
            height: 8 + (i % 3) * 4,
            borderRadius: '50%',
            background: (theme) => alpha(theme.palette.common.white, 0.15),
            animation: `authRise ${4 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${i * 0.8}s`,
          }}
        />
      ))}

      {/* Animated gradient orbs */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: (theme) => alpha(theme.palette.common.white, 0.08),
          filter: 'blur(60px)',
          animation: 'authOrb1 8s ease-in-out infinite',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          width: 250,
          height: 250,
          borderRadius: '50%',
          background: (theme) => alpha(theme.palette.common.white, 0.05),
          filter: 'blur(50px)',
          animation: 'authOrb2 10s ease-in-out infinite',
        }}
      />

      {/* Fuel pump SVG with animation */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 420,
          mb: 6,
        }}
      >
        <Box
          component="svg"
          viewBox="0 0 200 280"
          sx={{
            width: '100%',
            maxWidth: 280,
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.2))',
            '& .pump-body': {
              animation: 'authPumpPulse 3s ease-in-out infinite',
            },
            '& .fuel-drop': {
              animation: 'authDropFloat 2.5s ease-in-out infinite',
            },
            '& .fuel-drop-2': {
              animation: 'authDropFloat 2.5s ease-in-out infinite 0.5s',
            },
            '& .fuel-drop-3': {
              animation: 'authDropFloat 2.5s ease-in-out infinite 1s',
            },
          }}
        >
          {/* Pump body */}
          <rect
            className="pump-body"
            x="70"
            y="20"
            width="60"
            height="180"
            rx="6"
            fill="rgba(255,255,255,0.95)"
          />
          {/* Display screen */}
          <rect
            x="80"
            y="35"
            width="40"
            height="25"
            rx="4"
            fill="rgba(0,150,136,0.3)"
          />
          <rect x="85" y="40" width="30" height="15" rx="2" fill="rgba(255,255,255,0.9)" />
          {/* Nozzle arm */}
          <path
            d="M95 65 L130 65 L140 85 L140 95 L90 95 L90 85 Z"
            fill="rgba(255,255,255,0.9)"
          />
          {/* Hose */}
          <path
            d="M140 80 Q160 70 175 100 Q190 130 185 180"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
          {/* Nozzle head */}
          <circle cx="185" cy="180" r="18" fill="rgba(255,255,255,0.95)" />
          <circle cx="185" cy="180" r="8" fill="rgba(0,150,136,0.5)" />
          {/* Base */}
          <rect x="65" y="200" width="70" height="25" rx="4" fill="rgba(255,255,255,0.8)" />
          {/* Floating fuel drops */}
          <ellipse
            className="fuel-drop"
            cx="100"
            cy="120"
            rx="8"
            ry="12"
            fill="rgba(255,255,255,0.6)"
          />
          <ellipse
            className="fuel-drop-2"
            cx="130"
            cy="150"
            rx="6"
            ry="10"
            fill="rgba(255,255,255,0.5)"
          />
          <ellipse
            className="fuel-drop-3"
            cx="160"
            cy="130"
            rx="5"
            ry="8"
            fill="rgba(255,255,255,0.4)"
          />
        </Box>
      </Box>

      {/* Text overlay */}
      <Box sx={{ position: 'relative', textAlign: 'center', zIndex: 1 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: 'common.white',
            letterSpacing: '-0.02em',
            mb: 1,
            textShadow: '0 2px 20px rgba(0,0,0,0.2)',
          }}
        >
          Fuel Point
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: alpha('#fff', 0.9),
            maxWidth: 320,
            lineHeight: 1.6,
          }}
        >
          Manage your fuel station with ease. Sales, shifts, tanks, and reports — all in one place.
        </Typography>
      </Box>
    </Box>
  );
};

export default FuelStationAnimatedPanel;
