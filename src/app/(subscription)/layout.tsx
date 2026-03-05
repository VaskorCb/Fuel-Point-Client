'use client';

import { PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LocalGasStation from '@mui/icons-material/LocalGasStation';

const SubscriptionLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top bar */}
      <Box
        sx={{
          py: 2,
          px: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <LocalGasStation sx={{ fontSize: 28, color: 'primary.main' }} />
        <Typography variant="h6" fontWeight={700} color="primary.main">
          Petrol Pump Manager
        </Typography>
      </Box>

      {/* Content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          py: { xs: 3, sm: 5 },
          px: { xs: 2, sm: 3 },
        }}
      >
        <Box sx={{ width: 1, maxWidth: 1100 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default SubscriptionLayout;
