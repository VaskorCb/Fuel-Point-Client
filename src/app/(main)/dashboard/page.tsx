'use client';

import { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
  alpha,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import {
  useDashboardSummary,
  useSalesChart,
  useTankLevels,
  useCreditOverview,
} from 'services/dashboard/dashboard.hooks';
import Link from 'next/link';
import paths from 'routes/paths';
import EChart from 'components/charts/EChart';
import { useAtomValue } from 'jotai';
import { subscriptionAtom, userRoleAtom } from 'store/auth';
import { Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';

const summaryCardKeys = [
  {
    key: 'sales',
    labelKey: 'todays_sales',
    icon: TrendingUpIcon,
    color: '#1976d2',
    bg: '#e3f2fd',
  },
  {
    key: 'collection',
    labelKey: 'todays_collection',
    icon: AccountBalanceWalletIcon,
    color: '#2e7d32',
    bg: '#e8f5e9',
  },
  {
    key: 'shifts',
    labelKey: 'active_shifts',
    icon: AccessTimeIcon,
    color: '#ed6c02',
    bg: '#fff3e0',
  },
  {
    key: 'expenses',
    labelKey: 'todays_expenses',
    icon: ReceiptLongIcon,
    color: '#d32f2f',
    bg: '#fbe9e7',
  },
] as const;

const statusConfigKeys: Record<string, { labelKey: string; color: 'success' | 'warning' | 'info' | 'error'; bannerColor: string; bannerBg: string }> = {
  TRIAL: { labelKey: 'free_trial', color: 'info', bannerColor: '#0288d1', bannerBg: '#e1f5fe' },
  ACTIVE: { labelKey: 'active', color: 'success', bannerColor: '#2e7d32', bannerBg: '#e8f5e9' },
  PENDING: { labelKey: 'pending_activation', color: 'warning', bannerColor: '#ed6c02', bannerBg: '#fff3e0' },
  EXPIRED: { labelKey: 'expired', color: 'error', bannerColor: '#d32f2f', bannerBg: '#fbe9e7' },
};

const planLabelKeys: Record<string, string> = {
  TRIAL: 'free_trial',
  MONTHLY: 'monthly_plan',
  YEARLY: 'yearly_plan',
  CUSTOM: 'custom_plan',
};

const DashboardPage = () => {
  const { t } = useTranslation();
  const [chartPeriod, setChartPeriod] = useState<string>('7d');
  const subscription = useAtomValue(subscriptionAtom);
  const role = useAtomValue(userRoleAtom);

  const { data: summary, isLoading: summaryLoading } = useDashboardSummary();
  const { data: salesChart, isLoading: salesChartLoading } = useSalesChart(chartPeriod);
  const { data: tankLevels, isLoading: tanksLoading } = useTankLevels();
  const { data: creditOverview } = useCreditOverview();

  const salesChartOption = useMemo(() => {
    const data = salesChart?.data ?? [];
    return {
      tooltip: {
        trigger: 'axis',
        formatter: (params: unknown) => {
          const p = (Array.isArray(params) ? params[0] : params) as {
            name: string;
            value: number;
          };
          return `${p.name}<br/>Sales: ৳${Number(p.value).toLocaleString()}`;
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
  }, [salesChart]);

  const collectionChartOption = useMemo(() => {
    const c = summary?.data?.todayCollection;
    const items = [
      { name: 'Cash', value: c?.cash ?? 0 },
      { name: 'bKash', value: c?.bkash ?? 0 },
      { name: 'Nagad', value: c?.nagad ?? 0 },
      { name: 'Credit', value: c?.credit ?? 0 },
    ].filter((i) => i.value > 0);

    const total = items.reduce((s, i) => s + i.value, 0);

    return {
      tooltip: {
        trigger: 'item',
        formatter: (params: unknown) => {
          const p = params as { name: string; value: number; percent: number };
          return `${p.name}: ৳${p.value.toLocaleString()} (${p.percent.toFixed(1)}%)`;
        },
      },
      legend: { bottom: 0, itemWidth: 10, itemHeight: 10, textStyle: { fontSize: 11 } },
      series: [
        {
          type: 'pie',
          radius: ['50%', '75%'],
          center: ['50%', '45%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'center',
            formatter: `৳${total.toLocaleString()}`,
            fontSize: 16,
            fontWeight: 'bold',
          },
          emphasis: {
            label: { show: true, fontSize: 16, fontWeight: 'bold' },
          },
          labelLine: { show: false },
          data: items,
          color: ['#4caf50', '#e91e63', '#ff9800', '#9c27b0'],
        },
      ],
    };
  }, [summary]);

  const tankChartOption = useMemo(() => {
    const tanks = tankLevels?.data ?? [];
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: (params: unknown) => {
          const items = params as Array<{ name: string; value: number; seriesName: string }>;
          const tank = tanks.find(
            (t) => `${t.tankNumber} (${t.fuelTypeName})` === items[0]?.name,
          );
          if (!tank) return '';
          return `${items[0].name}<br/>Current: ${tank.currentLevel}L / ${tank.capacity}L<br/>Fill: ${tank.percentage.toFixed(1)}%`;
        },
      },
      grid: { left: 120, right: 30, top: 8, bottom: 8 },
      xAxis: {
        type: 'value',
        max: 100,
        axisLabel: { formatter: '{value}%', fontSize: 11 },
        splitLine: { lineStyle: { type: 'dashed' } },
      },
      yAxis: {
        type: 'category',
        data: tanks.map((t) => `${t.tankNumber} (${t.fuelTypeName})`),
        axisLabel: { fontSize: 11 },
      },
      series: [
        {
          type: 'bar',
          data: tanks.map((t) => ({
            value: t.percentage,
            itemStyle: {
              color: t.isLow ? '#d32f2f' : t.percentage < 30 ? '#ff9800' : '#1976d2',
              borderRadius: [0, 4, 4, 0],
            },
          })),
          barWidth: 18,
          label: {
            show: true,
            position: 'right',
            formatter: (p: { value: number }) => `${p.value.toFixed(1)}%`,
            fontSize: 11,
          },
        },
      ],
    };
  }, [tankLevels]);

  const creditChartOption = useMemo(() => {
    const debtors = creditOverview?.data?.topDebtors ?? [];
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: (params: unknown) => {
          const p = (Array.isArray(params) ? params[0] : params) as {
            name: string;
            value: number;
          };
          return `${p.name}<br/>Outstanding: ৳${p.value.toLocaleString()}`;
        },
      },
      grid: { left: 100, right: 30, top: 8, bottom: 8 },
      xAxis: {
        type: 'value',
        axisLabel: {
          formatter: (v: number) => (v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v)),
          fontSize: 11,
        },
        splitLine: { lineStyle: { type: 'dashed' } },
      },
      yAxis: {
        type: 'category',
        data: debtors.map((d) => d.name),
        axisLabel: { fontSize: 11 },
      },
      series: [
        {
          type: 'bar',
          data: debtors.map((d) => d.currentBalance),
          barWidth: 18,
          itemStyle: { color: '#9c27b0', borderRadius: [0, 4, 4, 0] },
          label: {
            show: true,
            position: 'right',
            formatter: (p: { value: number }) => `৳${p.value.toLocaleString()}`,
            fontSize: 11,
          },
        },
      ],
    };
  }, [creditOverview]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" mb={3}>
        {t('dashboard')}
      </Typography>

      {/* Subscription Info Banner */}
      {(role === 'OWNER' || role === 'ADMIN') && subscription && (() => {
        const cfg = statusConfigKeys[subscription.status] ?? statusConfigKeys.EXPIRED;
        const endDate = subscription.endDate ? new Date(subscription.endDate) : null;
        const now = new Date();
        const daysRemaining = endDate ? Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))) : null;
        const planLabel = t(planLabelKeys[subscription.planType] ?? subscription.planType);

        return (
          <Card
            sx={{
              mb: 3,
              border: '1px solid',
              borderColor: alpha(cfg.bannerColor, 0.3),
              bgcolor: cfg.bannerBg,
              borderRadius: 3,
            }}
          >
            <CardContent sx={{ py: 2, px: 3, '&:last-child': { pb: 2 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CardMembershipIcon sx={{ color: cfg.bannerColor, fontSize: 28 }} />
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle1" fontWeight={700}>
                        {planLabel}
                      </Typography>
                      <Chip label={t(cfg.labelKey)} color={cfg.color} size="small" />
                    </Box>
                    {(subscription.status === 'TRIAL' || subscription.status === 'ACTIVE') && daysRemaining !== null && (
                      <Typography variant="body2" color="text.secondary">
                        {daysRemaining === 0
                          ? t('expires_today')
                          : daysRemaining === 1
                            ? t('day_remaining')
                            : t('days_remaining', { count: daysRemaining })}
                        {endDate && ` (${t('expires_on', { date: endDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) })})`}
                      </Typography>
                    )}
                    {subscription.status === 'PENDING' && (
                      <Typography variant="body2" color="text.secondary">
                        {t('subscription_pending_msg')}
                      </Typography>
                    )}
                    {subscription.status === 'EXPIRED' && (
                      <Typography variant="body2" color="text.secondary">
                        {t('subscription_expired_msg')}
                      </Typography>
                    )}
                  </Box>
                </Box>
                {(subscription.status === 'EXPIRED' || (daysRemaining !== null && daysRemaining <= 3 && subscription.status !== 'PENDING')) && (
                  <Button
                    variant="contained"
                    size="small"
                    component={Link}
                    href={paths.subscription}
                    sx={{ bgcolor: cfg.bannerColor, '&:hover': { bgcolor: alpha(cfg.bannerColor, 0.85) } }}
                  >
                    {subscription.status === 'EXPIRED' ? t('renew_now') : t('renew')}
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        );
      })()}

      {summaryLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {!summaryLoading && (
        <>
          {/* Summary Cards Row */}
          <Grid container spacing={3} mb={3}>
            {summaryCardKeys.map((card) => {
              const Icon = card.icon;
              let value = '0';
              let subtitle: string | null = null;

              if (card.key === 'sales') {
                value = `৳${summary?.data?.todaySales?.toLocaleString() ?? '0'}`;
              } else if (card.key === 'collection') {
                const total =
                  (summary?.data?.todayCollection?.cash ?? 0) +
                  (summary?.data?.todayCollection?.bkash ?? 0) +
                  (summary?.data?.todayCollection?.nagad ?? 0);
                value = `৳${total.toLocaleString()}`;
                subtitle = `Cash ৳${summary?.data?.todayCollection?.cash?.toLocaleString() ?? '0'} · bKash ৳${summary?.data?.todayCollection?.bkash?.toLocaleString() ?? '0'} · Nagad ৳${summary?.data?.todayCollection?.nagad?.toLocaleString() ?? '0'}`;
              } else if (card.key === 'shifts') {
                value = String(summary?.data?.activeShifts ?? 0);
              } else if (card.key === 'expenses') {
                value = `৳${summary?.data?.todayExpenses?.toLocaleString() ?? '0'}`;
              }

              return (
                <Grid key={card.key} size={{ xs: 12, sm: 6, md: 3 }}>
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: () => alpha(card.color, 0.15),
                      boxShadow: () => `0 2px 12px ${alpha(card.color, 0.08)}`,
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: () => `0 6px 20px ${alpha(card.color, 0.15)}`,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1.5 }}>
                        <Typography
                          variant="body2"
                          fontWeight={500}
                          color="text.secondary"
                        >
                          {t(card.labelKey)}
                        </Typography>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: card.bg,
                            flexShrink: 0,
                          }}
                        >
                          <Icon sx={{ fontSize: 22, color: card.color }} />
                        </Box>
                      </Box>
                      <Typography variant="h4" fontWeight={700} sx={{ color: card.color }}>
                        {value}
                      </Typography>
                      {subtitle && (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ mt: 1, display: 'block', lineHeight: 1.5 }}
                        >
                          {subtitle}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          {/* Sales Trend Chart */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="h6">{t('sales_trend')}</Typography>
                <ToggleButtonGroup
                  value={chartPeriod}
                  exclusive
                  onChange={(_, v) => v && setChartPeriod(v)}
                  size="small"
                >
                  <ToggleButton value="7d">{t('seven_days')}</ToggleButton>
                  <ToggleButton value="30d">{t('thirty_days')}</ToggleButton>
                </ToggleButtonGroup>
              </Box>
              <EChart option={salesChartOption} height={280} loading={salesChartLoading} />
            </CardContent>
          </Card>

          {/* Quick Actions Row */}
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <Button variant="contained" component={Link} href={paths.sales_new}>
              {t('new_sale')}
            </Button>
            <Button variant="outlined" component={Link} href={paths.shifts_start}>
              {t('start_shift')}
            </Button>
            <Button variant="outlined" component={Link} href={paths.expenses}>
              {t('add_expense')}
            </Button>
          </Box>

          {/* Collection Breakdown + Tank Levels */}
          <Grid container spacing={3} mb={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" mb={1}>
                    {t('collection_breakdown')}
                  </Typography>
                  <EChart option={collectionChartOption} height={260} loading={summaryLoading} />
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" mb={1}>
                    {t('tank_levels')}
                  </Typography>
                  {tanksLoading && <CircularProgress size={24} />}
                  {!tanksLoading && tankLevels?.data && tankLevels.data.length > 0 ? (
                    <EChart
                      option={tankChartOption}
                      height={Math.max(200, (tankLevels.data.length ?? 0) * 50)}
                    />
                  ) : (
                    !tanksLoading && (
                      <Typography variant="body2" color="text.secondary">
                        {t('no_tank_data')}
                      </Typography>
                    )
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Credit Overview */}
          <Card>
            <CardContent>
              <Typography variant="h6" mb={1}>
                {t('credit_baki_overview')}
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Typography variant="h4">
                    ৳{creditOverview?.data?.totalOutstanding?.toLocaleString() ?? '0'}
                  </Typography>
                  <Typography color="text.secondary" mb={2}>
                    {t('customers_outstanding', { count: creditOverview?.data?.debtorCount ?? 0 })}
                  </Typography>
                  {creditOverview?.data?.topDebtors?.map((d) => (
                    <Box key={d.id} display="flex" justifyContent="space-between" py={0.5}>
                      <Typography variant="body2">{d.name}</Typography>
                      <Typography variant="body2" fontWeight="bold">
                        ৳{d.currentBalance?.toLocaleString()}
                      </Typography>
                    </Box>
                  ))}
                  {(!creditOverview?.data?.topDebtors ||
                    creditOverview.data.topDebtors.length === 0) && (
                    <Typography variant="body2" color="text.secondary">
                      {t('no_outstanding_credits')}
                    </Typography>
                  )}
                </Grid>
                <Grid size={{ xs: 12, md: 8 }}>
                  {creditOverview?.data?.topDebtors &&
                  creditOverview.data.topDebtors.length > 0 ? (
                    <EChart
                      option={creditChartOption}
                      height={Math.max(180, creditOverview.data.topDebtors.length * 45)}
                    />
                  ) : (
                    <Box
                      sx={{
                        height: 180,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        {t('no_credit_data')}
                      </Typography>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </>
      )}
    </Box>
  );
};

export default DashboardPage;
