'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'services/queryKeys';
import {
  getCreditsByCustomerApi,
  getOutstandingApi,
  getCreditSummaryApi,
  createPaymentApi,
} from './credits.api';

export const useCreditsByCustomer = (customerId: number) => {
  return useQuery({
    queryKey: [...queryKeys.credits.byCustomer(customerId)],
    queryFn: () => getCreditsByCustomerApi(customerId),
    enabled: customerId > 0,
  });
};

export const useOutstandingCredits = () => {
  return useQuery({
    queryKey: [...queryKeys.credits.outstanding],
    queryFn: () => getOutstandingApi(),
  });
};

export const useCreditSummary = () => {
  return useQuery({
    queryKey: [...queryKeys.credits.summary],
    queryFn: () => getCreditSummaryApi(),
  });
};

export const useCreateCreditPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPaymentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['credits'] });
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
};
