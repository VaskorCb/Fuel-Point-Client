'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'services/queryKeys';
import {
  getShiftsApi,
  getShiftApi,
  getActiveShiftsApi,
  startShiftApi,
  endShiftApi,
} from './shifts.api';

export const useShifts = (date?: string) => {
  return useQuery({
    queryKey: [...queryKeys.shifts.all, date],
    queryFn: () => getShiftsApi(date),
  });
};

export const useShift = (id: number) => {
  return useQuery({
    queryKey: [...queryKeys.shifts.detail(id)],
    queryFn: () => getShiftApi(id),
    enabled: id > 0,
  });
};

export const useActiveShifts = () => {
  return useQuery({
    queryKey: [...queryKeys.shifts.active],
    queryFn: () => getActiveShiftsApi(),
    refetchInterval: 30000,
  });
};

export const useStartShift = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: startShiftApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shifts'] });
    },
  });
};

export const useEndShift = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }: { id: number } & import('types/petrol-pump').EndShiftPayload) =>
      endShiftApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shifts'] });
    },
  });
};
