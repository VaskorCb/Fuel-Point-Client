'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'services/queryKeys';
import {
  getPumpsApi,
  getPumpApi,
  createPumpApi,
  updatePumpApi,
  createNozzleApi,
  updateNozzleApi,
  getNozzlesApi,
} from './pumps.api';

export const usePumps = () => {
  return useQuery({
    queryKey: [...queryKeys.pumps.all],
    queryFn: () => getPumpsApi(),
  });
};

export const usePump = (id: number) => {
  return useQuery({
    queryKey: [...queryKeys.pumps.detail(id)],
    queryFn: () => getPumpApi(id),
    enabled: id > 0,
  });
};

export const useCreatePump = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPumpApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pumps'] });
    },
  });
};

export const useUpdatePump = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Parameters<typeof updatePumpApi>[1] }) =>
      updatePumpApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pumps'] });
    },
  });
};

export const useCreateNozzle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ pumpId, data }: { pumpId: number; data: Parameters<typeof createNozzleApi>[1] }) =>
      createNozzleApi(pumpId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pumps'] });
      queryClient.invalidateQueries({ queryKey: ['nozzles'] });
    },
  });
};

export const useUpdateNozzle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Parameters<typeof updateNozzleApi>[1] }) =>
      updateNozzleApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pumps'] });
      queryClient.invalidateQueries({ queryKey: ['nozzles'] });
    },
  });
};

export const useNozzles = () => {
  return useQuery({
    queryKey: [...queryKeys.pumps.nozzles],
    queryFn: () => getNozzlesApi(),
  });
};
