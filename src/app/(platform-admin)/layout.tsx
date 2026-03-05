'use client';

import { PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import LocalGasStation from '@mui/icons-material/LocalGasStation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import axiosInstance from 'services/axiosInstance';
import { apiEndpoints } from 'routes/paths';

const PlatformAdminLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const logout = useMutation({
    mutationFn: () => axiosInstance.post(apiEndpoints.logout),
    onSuccess: () => {
      queryClient.clear();
      router.replace('/sign-in');
    },
  });

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
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
        <Typography variant="h6" fontWeight={700} color="primary.main" sx={{ flexGrow: 1 }}>
          Petrol Pump Manager
        </Typography>
        <Button
          component={Link}
          href="/platform-admin"
          size="small"
          variant={pathname === '/platform-admin' ? 'contained' : 'text'}
        >
          Overview
        </Button>
        <Button
          component={Link}
          href="/platform-admin/subscriptions"
          size="small"
          variant={pathname === '/platform-admin/subscriptions' ? 'contained' : 'text'}
        >
          Subscriptions
        </Button>
        <Chip label="Platform Admin" color="warning" size="small" />
        <Button
          variant="outlined"
          size="small"
          color="inherit"
          onClick={() => logout.mutate()}
          disabled={logout.isPending}
        >
          Logout
        </Button>
      </Box>
      <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1200, mx: 'auto' }}>
        {children}
      </Box>
    </Box>
  );
};

export default PlatformAdminLayout;
