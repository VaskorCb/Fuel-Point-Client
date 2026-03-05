'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'services/queryKeys';
import {
  getEmployeesApi,
  getEmployeeApi,
  createEmployeeApi,
  updateEmployeeApi,
  deleteEmployeeApi,
} from './employees.api';

export const useEmployees = () => {
  return useQuery({
    queryKey: [...queryKeys.employees.all],
    queryFn: () => getEmployeesApi(),
  });
};

export const useEmployee = (id: number) => {
  return useQuery({
    queryKey: [...queryKeys.employees.detail(id)],
    queryFn: () => getEmployeeApi(id),
    enabled: id > 0,
  });
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEmployeeApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Parameters<typeof updateEmployeeApi>[1] }) =>
      updateEmployeeApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmployeeApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });
};
