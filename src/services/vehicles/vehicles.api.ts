import { apiEndpoints } from 'routes/paths';
import axiosInstance from 'services/axiosInstance';
import { ApiResponse, Vehicle, CreateVehiclePayload } from 'types/petrol-pump';

export const searchVehicleApi = (vehicleNumber: string): Promise<ApiResponse<Vehicle | null>> => {
  return axiosInstance.get(apiEndpoints.vehicleSearch, { params: { vehicleNumber } });
};

export const getCustomerVehiclesApi = (customerId: number): Promise<ApiResponse<Vehicle[]>> => {
  return axiosInstance.get(apiEndpoints.vehicles, { params: { customerId } });
};

export const createVehicleApi = (data: CreateVehiclePayload): Promise<ApiResponse<Vehicle>> => {
  return axiosInstance.post(apiEndpoints.vehicles, data);
};

export const deleteVehicleApi = (id: number): Promise<ApiResponse<void>> => {
  return axiosInstance.delete(apiEndpoints.vehicleById(id));
};
