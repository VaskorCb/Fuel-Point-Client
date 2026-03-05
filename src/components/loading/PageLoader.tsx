'use client';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Stack, { StackOwnProps } from '@mui/material/Stack';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import { keyframes } from '@mui/material/styles';
import { cssVarRgba } from 'lib/utils';

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
`;

const ripple = keyframes`
  0% { transform: scale(0.8); opacity: 0.6; }
  100% { transform: scale(2.2); opacity: 0; }
`;

const PageLoader = (props: StackOwnProps) => {
  return (
    <Stack
      {...props}
      sx={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          height: 1,
          flex: 1,
          gap: 2,
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Ripple effect */}
        <Box
          sx={(theme) => ({
            position: 'absolute',
            width: 60,
            height: 60,
            borderRadius: '50%',
            bgcolor: cssVarRgba(theme.vars.palette.primary.mainChannel, 0.15),
            animation: `${ripple} 1.5s ease-out infinite`,
          })}
        />
        {/* Spinner ring */}
        <CircularProgress
          variant="determinate"
          value={100}
          size={80}
          thickness={3}
          sx={(theme) => ({
            color: cssVarRgba(theme.vars.palette.primary.mainChannel, 0.1),
          })}
        />
        <CircularProgress
          size={80}
          thickness={3}
          sx={(theme) => ({
            position: 'absolute',
            color: cssVarRgba(theme.vars.palette.primary.mainChannel, 0.6),
          })}
        />
        {/* Fuel pump icon */}
        <LocalGasStationIcon
          sx={(theme) => ({
            position: 'absolute',
            fontSize: 30,
            color: theme.vars.palette.primary.main,
            animation: `${pulse} 1.5s ease-in-out infinite`,
          })}
        />
      </Box>
      <Typography
        variant="body2"
        fontWeight={600}
        sx={(theme) => ({
          color: theme.vars.palette.primary.main,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          opacity: 0.7,
        })}
      >
        Fuel Point
      </Typography>
    </Stack>
  );
};

export default PageLoader;
