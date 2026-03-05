'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from 'services/queryKeys';
import {
  getDailyReportApi,
  getMonthlyReportApi,
  getFuelWiseReportApi,
  getShiftWiseReportApi,
  getProfitLossApi,
  getStockReportApi,
} from './reports.api';

export const useDailyReport = (date: string) => {
  return useQuery({
    queryKey: [...queryKeys.reports.daily(date)],
    queryFn: () => getDailyReportApi(date),
    enabled: !!date,
  });
};

export const useMonthlyReport = (month: number, year: number) => {
  return useQuery({
    queryKey: [...queryKeys.reports.monthly(month, year)],
    queryFn: () => getMonthlyReportApi(month, year),
    enabled: month > 0 && year > 0,
  });
};

export const useFuelWiseReport = (dateFrom: string, dateTo: string) => {
  return useQuery({
    queryKey: [...queryKeys.reports.fuelWise, dateFrom, dateTo],
    queryFn: () => getFuelWiseReportApi(dateFrom, dateTo),
    enabled: !!dateFrom && !!dateTo,
  });
};

export const useShiftWiseReport = (date: string) => {
  return useQuery({
    queryKey: [...queryKeys.reports.shiftWise(date)],
    queryFn: () => getShiftWiseReportApi(date),
    enabled: !!date,
  });
};

export const useProfitLoss = (month: number, year: number) => {
  return useQuery({
    queryKey: [...queryKeys.reports.profitLoss(month, year)],
    queryFn: () => getProfitLossApi(month, year),
    enabled: month > 0 && year > 0,
  });
};

export const useStockReport = () => {
  return useQuery({
    queryKey: [...queryKeys.reports.stock],
    queryFn: () => getStockReportApi(),
  });
};
