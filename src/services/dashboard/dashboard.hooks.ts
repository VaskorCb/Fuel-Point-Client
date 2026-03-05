'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from 'services/queryKeys';
import {
  getDashboardSummaryApi,
  getSalesChartApi,
  getTankLevelsApi,
  getCreditOverviewApi,
  getPlatformSalesSummaryApi,
  getPlatformSalesChartApi,
} from './dashboard.api';

export const useDashboardSummary = () => {
  return useQuery({
    queryKey: [...queryKeys.dashboard.summary],
    queryFn: () => getDashboardSummaryApi(),
    refetchInterval: 60000,
  });
};

export const useSalesChart = (period: string) => {
  return useQuery({
    queryKey: [...queryKeys.dashboard.salesChart(period)],
    queryFn: () => getSalesChartApi(period),
    enabled: !!period,
  });
};

export const useTankLevels = () => {
  return useQuery({
    queryKey: [...queryKeys.dashboard.tankLevels],
    queryFn: () => getTankLevelsApi(),
    refetchInterval: 60000,
  });
};

export const useCreditOverview = () => {
  return useQuery({
    queryKey: [...queryKeys.dashboard.creditOverview],
    queryFn: () => getCreditOverviewApi(),
  });
};

export const usePlatformSalesSummary = () => {
  return useQuery({
    queryKey: ['dashboard', 'platform', 'sales-summary'],
    queryFn: () => getPlatformSalesSummaryApi(),
    refetchInterval: 60000,
  });
};

export const usePlatformSalesChart = (period: string) => {
  return useQuery({
    queryKey: ['dashboard', 'platform', 'sales-chart', period],
    queryFn: () => getPlatformSalesChartApi(period),
    enabled: !!period,
  });
};
