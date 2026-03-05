'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'services/queryKeys';
import {
  getSuppliesApi,
  getSupplyApi,
  createSupplyApi,
} from './supplies.api';

interface SuppliesParams {
  dateFrom?: string;
  dateTo?: string;
}

export const useSupplies = (params: SuppliesParams) => {
  return useQuery({
    queryKey: [...queryKeys.supplies.all, params],
    queryFn: () => getSuppliesApi(params),
  });
};

export const useSupply = (id: number) => {
  return useQuery({
    queryKey: [...queryKeys.supplies.detail(id)],
    queryFn: () => getSupplyApi(id),
    enabled: id > 0,
  });
};

export const useCreateSupply = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSupplyApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplies'] });
      queryClient.invalidateQueries({ queryKey: ['tanks'] });
    },
  });
};
