'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { useOwners, usePlatformStats } from 'services/users/users.hooks';

export default function PlatformAdminPage() {
  const { data: ownersData, isLoading: ownersLoading } = useOwners();
  const { data: statsData, isLoading: statsLoading } = usePlatformStats();

  const owners = ownersData?.data ?? [];
  const stats = statsData?.data;

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
        Platform Overview
      </Typography>

      {/* Stats */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {[
          { label: 'Total Owners', value: stats?.totalOwners ?? 0, color: 'primary.main' },
          { label: 'Active Stations', value: stats?.activeOwners ?? 0, color: 'success.main' },
          { label: 'Total Admins', value: stats?.totalAdmins ?? 0, color: 'info.main' },
          { label: 'Active Subs', value: stats?.activeSubscriptions ?? 0, color: 'success.main' },
          { label: 'Pending Subs', value: stats?.pendingSubscriptions ?? 0, color: 'warning.main' },
          { label: 'On Trial', value: stats?.trialSubscriptions ?? 0, color: 'info.main' },
        ].map((stat) => (
          <Grid key={stat.label} size={{ xs: 6, sm: 4, md: 2 }}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                {statsLoading ? (
                  <CircularProgress size={24} />
                ) : (
                  <Typography variant="h3" fontWeight={700} color={stat.color}>
                    {stat.value}
                  </Typography>
                )}
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Owners Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Registered Station Owners
          </Typography>
          {ownersLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Station</TableCell>
                    <TableCell>Code</TableCell>
                    <TableCell>District</TableCell>
                    <TableCell>Joined</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {owners.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        <Typography color="text.secondary">No registered owners yet.</Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    owners.map((owner: any) => (
                      <TableRow key={owner.id}>
                        <TableCell>{owner.name ?? '-'}</TableCell>
                        <TableCell>{owner.email}</TableCell>
                        <TableCell>{owner.stationName ?? '-'}</TableCell>
                        <TableCell>{owner.stationCode ?? '-'}</TableCell>
                        <TableCell>{owner.district ?? '-'}</TableCell>
                        <TableCell>
                          {owner.createdAt
                            ? new Date(owner.createdAt).toLocaleDateString('en-GB', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })
                            : '-'}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={owner.onboardingDone ? 'Active' : 'Pending'}
                            color={owner.onboardingDone ? 'success' : 'warning'}
                            size="small"
                          />
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
