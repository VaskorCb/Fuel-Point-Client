'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'services/queryKeys';
import type { CreateFuelTypePayload, UpdatePricePayload } from 'types/petrol-pump';
import {
  getFuelTypesApi,
  getFuelTypeApi,
  createFuelTypeApi,
  updateFuelTypeApi,
  updateFuelPriceApi,
  getFuelPriceHistoryApi,
} from './fuel-types.api';

export const useFuelTypes = () => {
  return useQuery({
    queryKey: [...queryKeys.fuelTypes.all],
    queryFn: getFuelTypesApi,
  });
};

export const useFuelType = (id: number) => {
  return useQuery({
    queryKey: [...queryKeys.fuelTypes.detail(id)],
    queryFn: () => getFuelTypeApi(id),
    enabled: id > 0,
  });
};

export const useCreateFuelType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFuelTypeApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fuel-types'] });
    },
  });
};

export const useUpdateFuelType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreateFuelTypePayload> }) =>
      updateFuelTypeApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fuel-types'] });
    },
  });
};

export const useUpdateFuelPrice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePricePayload }) =>
      updateFuelPriceApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fuel-types'] });
    },
  });
};

export const useFuelPriceHistory = (id: number) => {
  return useQuery({
    queryKey: [...queryKeys.fuelTypes.priceHistory(id)],
    queryFn: () => getFuelPriceHistoryApi(id),
    enabled: id > 0,
  });
};
