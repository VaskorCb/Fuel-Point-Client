'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useOwners, usePlatformStats } from 'services/users/users.hooks';
import { usePlatformSalesSummary, usePlatformSalesChart } from 'services/dashboard/dashboard.hooks';
import EChart from 'components/charts/EChart';

const formatCurrency = (n: number) =>
  `৳${n.toLocaleString('en-BD', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

export default function PlatformAdminPage() {
  const [chartPeriod, setChartPeriod] = useState<'7d' | '30d'>('7d');

  const { data: ownersData, isLoading: ownersLoading } = useOwners();
  const { data: statsData, isLoading: statsLoading } = usePlatformStats();
  const { data: salesSummaryData, isLoading: salesSummaryLoading } = usePlatformSalesSummary();
  const { data: salesChartData, isLoading: salesChartLoading } = usePlatformSalesChart(chartPeriod);

  const owners = ownersData?.data ?? [];
  const stats = statsData?.data;
  const salesSummary = salesSummaryData?.data;

  const salesChartOption = useMemo(() => {
    const data = salesChartData?.data ?? [];
    return {
      tooltip: {
        trigger: 'axis',
        formatter: (params: unknown) => {
          const p = (Array.isArray(params) ? params[0] : params) as { name: string; value: number };
          return `${p.name}<br/>Sales: ${formatCurrency(p.value)}`;
        },
      },
      grid: { left: 60, right: 16, top: 16, bottom: 30 },
      xAxis: {
        type: 'category',
        data: data.map((d) =>
          new Date(d.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
        ),
        axisLabel: { fontSize: 11 },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: (v: number) => (v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v)),
          fontSize: 11,
        },
        splitLine: { lineStyle: { type: 'dashed' } },
      },
      series: [
        {
          type: 'line',
          data: data.map((d) => d.totalAmount),
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { width: 2.5 },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(25, 118, 210, 0.25)' },
                { offset: 1, color: 'rgba(25, 118, 210, 0.02)' },
              ],
            },
          },
          itemStyle: { color: '#1976d2' },
        },
      ],
    };
  }, [salesChartData]);

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
        Platform Overview
      </Typography>

      {/* Quick actions */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <Button component={Link} href="/platform-admin/users" variant="outlined" size="medium">
          View All Users
        </Button>
        <Button component={Link} href="/platform-admin/subscriptions" variant="outlined" size="medium">
          Manage Subscriptions
        </Button>
      </Box>

      {/* Stats */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {[
          { label: 'Total Sales', value: salesSummary ? formatCurrency(salesSummary.totalSales) : '-', color: 'success.main', loading: salesSummaryLoading },
          { label: "Today's Sales", value: salesSummary ? formatCurrency(salesSummary.todaySales) : '-', color: 'primary.main', loading: salesSummaryLoading },
          { label: 'Total Owners', value: stats?.totalOwners ?? 0, color: 'primary.main', loading: statsLoading },
          { label: 'Active Stations', value: stats?.activeOwners ?? 0, color: 'success.main', loading: statsLoading },
          { label: 'Total Admins', value: stats?.totalAdmins ?? 0, color: 'info.main', loading: statsLoading },
          { label: 'Active Subs', value: stats?.activeSubscriptions ?? 0, color: 'success.main', loading: statsLoading },
          { label: 'Pending Subs', value: stats?.pendingSubscriptions ?? 0, color: 'warning.main', loading: statsLoading },
          { label: 'On Trial', value: stats?.trialSubscriptions ?? 0, color: 'info.main', loading: statsLoading },
        ].map((stat) => (
          <Grid key={stat.label} size={{ xs: 6, sm: 4, md: 2 }}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                {stat.loading ? (
                  <CircularProgress size={24} />
                ) : (
                  <Typography variant="h3" fontWeight={700} color={stat.color} sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
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

      {/* Platform Sales Chart */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="h6" fontWeight={600}>
              Platform Sales (All Stations)
            </Typography>
            <ToggleButtonGroup
              value={chartPeriod}
              exclusive
              onChange={(_, v) => v && setChartPeriod(v)}
              size="small"
            >
              <ToggleButton value="7d">7 Days</ToggleButton>
              <ToggleButton value="30d">30 Days</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box sx={{ height: 320 }}>
            <EChart
              option={salesChartOption}
              height={300}
              loading={salesChartLoading}
            />
          </Box>
        </CardContent>
      </Card>

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
