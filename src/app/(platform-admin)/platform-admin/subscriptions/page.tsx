'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import {
  useAllSubscriptions,
  useActivateSubscription,
  useExpireOverdue,
} from 'services/subscriptions/subscriptions.hooks';
import type { SubscriptionDetail, SubscriptionStatus } from 'types/auth-and-onboarding';
import toast from 'react-hot-toast';

const STATUS_TABS = ['ALL', 'PENDING', 'TRIAL', 'ACTIVE', 'EXPIRED'] as const;

const statusColor: Record<SubscriptionStatus, 'warning' | 'info' | 'success' | 'error'> = {
  PENDING: 'warning',
  TRIAL: 'info',
  ACTIVE: 'success',
  EXPIRED: 'error',
};

export default function SubscriptionsManagementPage() {
  const [tabIndex, setTabIndex] = useState(0);
  const statusFilter = tabIndex === 0 ? undefined : STATUS_TABS[tabIndex];

  const { data: subsData, isLoading } = useAllSubscriptions(statusFilter);
  const activateSubscription = useActivateSubscription();
  const expireOverdue = useExpireOverdue();

  const subscriptions = (subsData?.data ?? []) as SubscriptionDetail[];

  const handleActivate = async (id: number) => {
    try {
      await activateSubscription.mutateAsync(id);
      toast.success('Subscription activated successfully!');
    } catch {
      toast.error('Failed to activate subscription.');
    }
  };

  const handleExpireOverdue = async () => {
    try {
      const result = await expireOverdue.mutateAsync();
      const count = (result?.data as any)?.count ?? 0;
      toast.success(`${count} overdue subscription(s) expired.`);
    } catch {
      toast.error('Failed to expire overdue subscriptions.');
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h4" fontWeight={700}>
          Subscriptions
        </Typography>
        <Button
          variant="outlined"
          color="warning"
          onClick={handleExpireOverdue}
          disabled={expireOverdue.isPending}
        >
          {expireOverdue.isPending ? 'Expiring...' : 'Expire Overdue'}
        </Button>
      </Box>

      <Tabs
        value={tabIndex}
        onChange={(_, v) => setTabIndex(v)}
        sx={{ mb: 3 }}
      >
        {STATUS_TABS.map((label) => (
          <Tab key={label} label={label} />
        ))}
      </Tabs>

      <Card>
        <CardContent sx={{ p: 0 }}>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Owner</TableCell>
                    <TableCell>Station</TableCell>
                    <TableCell>Plan</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Start</TableCell>
                    <TableCell>End</TableCell>
                    <TableCell>Payment Note</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subscriptions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} align="center">
                        <Typography color="text.secondary" sx={{ py: 2 }}>
                          No subscriptions found.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    subscriptions.map((sub) => (
                      <TableRow key={sub.id}>
                        <TableCell>
                          <Typography variant="body2" fontWeight={600}>
                            {sub.owner?.name ?? '-'}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {sub.owner?.email ?? ''}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {sub.owner?.stationName ?? '-'}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={sub.planType}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={sub.status}
                            size="small"
                            color={statusColor[sub.status as SubscriptionStatus]}
                          />
                        </TableCell>
                        <TableCell>{formatDate(sub.startDate)}</TableCell>
                        <TableCell>{formatDate(sub.endDate)}</TableCell>
                        <TableCell>
                          <Typography
                            variant="body2"
                            sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis' }}
                          >
                            {sub.paymentNote ?? '-'}
                          </Typography>
                        </TableCell>
                        <TableCell>{formatDate(sub.createdAt)}</TableCell>
                        <TableCell>
                          {sub.status === 'PENDING' && (
                            <Button
                              variant="contained"
                              color="success"
                              size="small"
                              disabled={activateSubscription.isPending}
                              onClick={() => handleActivate(sub.id)}
                            >
                              Activate
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
