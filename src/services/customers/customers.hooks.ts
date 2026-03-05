'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'services/queryKeys';
import type { CreateCustomerPayload } from 'types/petrol-pump';
import {
  getCustomersApi,
  getCustomerApi,
  createCustomerApi,
  updateCustomerApi,
  deleteCustomerApi,
} from './customers.api';

export const useCustomers = () => {
  return useQuery({
    queryKey: [...queryKeys.customers.all],
    queryFn: () => getCustomersApi(),
  });
};

export const useCustomer = (id: number) => {
  return useQuery({
    queryKey: [...queryKeys.customers.detail(id)],
    queryFn: () => getCustomerApi(id),
    enabled: id > 0,
  });
};

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCustomerApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreateCustomerPayload> }) =>
      updateCustomerApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCustomerApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
};
