'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'services/queryKeys';
import {
  getSalesApi,
  getSaleApi,
  createSaleApi,
  getDailySummaryApi,
} from './sales.api';

interface SalesParams {
  date?: string;
  shiftId?: number;
  fuelTypeId?: number;
  employeeId?: number;
  page?: number;
  limit?: number;
}

export const useSales = (params: SalesParams) => {
  return useQuery({
    queryKey: [...queryKeys.sales.all, params],
    queryFn: () => getSalesApi(params),
  });
};

export const useSale = (id: number) => {
  return useQuery({
    queryKey: [...queryKeys.sales.detail(id)],
    queryFn: () => getSaleApi(id),
    enabled: id > 0,
  });
};

export const useCreateSale = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSaleApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

export const useDailySummary = (date: string) => {
  return useQuery({
    queryKey: [...queryKeys.sales.dailySummary(date)],
    queryFn: () => getDailySummaryApi(date),
    enabled: !!date,
  });
};
