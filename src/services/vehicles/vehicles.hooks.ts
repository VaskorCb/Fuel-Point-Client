import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'services/queryKeys';
import {
  searchVehicleApi,
  getCustomerVehiclesApi,
  createVehicleApi,
  deleteVehicleApi,
} from './vehicles.api';

export const useSearchVehicle = (vehicleNumber: string) => {
  return useQuery({
    queryKey: queryKeys.vehicles.search(vehicleNumber),
    queryFn: () => searchVehicleApi(vehicleNumber),
    enabled: vehicleNumber.length >= 3,
    staleTime: 10_000,
  });
};

export const useCustomerVehicles = (customerId: number) => {
  return useQuery({
    queryKey: queryKeys.vehicles.byCustomer(customerId),
    queryFn: () => getCustomerVehiclesApi(customerId),
    enabled: customerId > 0,
  });
};

export const useCreateVehicle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createVehicleApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
};

export const useDeleteVehicle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteVehicleApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
};
