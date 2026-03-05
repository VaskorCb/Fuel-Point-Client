import { PropsWithChildren } from 'react';
import Box from '@mui/material/Box';

const LandingLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
      }}
    >
      {children}
    </Box>
  );
};

export default LandingLayout;
