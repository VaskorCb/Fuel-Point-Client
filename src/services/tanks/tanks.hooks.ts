'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'services/queryKeys';
import {
  getTanksApi,
  getTankApi,
  createTankApi,
  updateTankApi,
  createDippingApi,
  getDippingsApi,
  getTankAlertsApi,
} from './tanks.api';

export const useTanks = () => {
  return useQuery({
    queryKey: [...queryKeys.tanks.all],
    queryFn: () => getTanksApi(),
  });
};

export const useTank = (id: number) => {
  return useQuery({
    queryKey: [...queryKeys.tanks.detail(id)],
    queryFn: () => getTankApi(id),
    enabled: id > 0,
  });
};

export const useCreateTank = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTankApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tanks'] });
    },
  });
};

export const useUpdateTank = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Parameters<typeof updateTankApi>[1] }) =>
      updateTankApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tanks'] });
    },
  });
};

export const useCreateDipping = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tankId, data }: { tankId: number; data: Parameters<typeof createDippingApi>[1] }) =>
      createDippingApi(tankId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tanks'] });
    },
  });
};

export const useTankDippings = (tankId: number) => {
  return useQuery({
    queryKey: [...queryKeys.tanks.dippings(tankId)],
    queryFn: () => getDippingsApi(tankId),
    enabled: tankId > 0,
  });
};

export const useTankAlerts = () => {
  return useQuery({
    queryKey: [...queryKeys.tanks.alerts],
    queryFn: () => getTankAlertsApi(),
  });
};
