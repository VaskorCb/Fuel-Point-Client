'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'services/queryKeys';
import type { CreateExpensePayload } from 'types/petrol-pump';
import {
  getExpensesApi,
  getExpenseApi,
  createExpenseApi,
  updateExpenseApi,
  deleteExpenseApi,
  getExpenseSummaryApi,
} from './expenses.api';

interface ExpensesParams {
  date?: string;
  category?: string;
  page?: number;
  limit?: number;
}

export const useExpenses = (params: ExpensesParams) => {
  return useQuery({
    queryKey: [...queryKeys.expenses.all, params],
    queryFn: () => getExpensesApi(params),
  });
};

export const useExpense = (id: number) => {
  return useQuery({
    queryKey: [...queryKeys.expenses.detail(id)],
    queryFn: () => getExpenseApi(id),
    enabled: id > 0,
  });
};

export const useCreateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createExpenseApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
  });
};

export const useUpdateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreateExpensePayload> }) =>
      updateExpenseApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
  });
};

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExpenseApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
  });
};

export const useExpenseSummary = (month: number, year: number) => {
  return useQuery({
    queryKey: [...queryKeys.expenses.summary(month, year)],
    queryFn: () => getExpenseSummaryApi(month, year),
    enabled: month > 0 && year > 0,
  });
};
