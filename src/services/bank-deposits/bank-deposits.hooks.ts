'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'services/queryKeys';
import {
  getBankDepositsApi,
  getBankDepositApi,
  createBankDepositApi,
} from './bank-deposits.api';

interface BankDepositsParams {
  dateFrom?: string;
  dateTo?: string;
}

export const useBankDeposits = (params: BankDepositsParams) => {
  return useQuery({
    queryKey: [...queryKeys.bankDeposits.all, params],
    queryFn: () => getBankDepositsApi(params),
  });
};

export const useBankDeposit = (id: number) => {
  return useQuery({
    queryKey: [...queryKeys.bankDeposits.detail(id)],
    queryFn: () => getBankDepositApi(id),
    enabled: id > 0,
  });
};

export const useCreateBankDeposit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBankDepositApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bank-deposits'] });
    },
  });
};
