import { apiEndpoints } from 'routes/paths';
import axiosInstance from 'services/axiosInstance';
import {
  ApiResponse,
  CreateDippingPayload,
  CreateTankPayload,
  Tank,
  TankDipping,
  TankLevel,
} from 'types/petrol-pump';

export const getTanksApi = (): Promise<ApiResponse<Tank[]>> => {
  return axiosInstance.get(apiEndpoints.tanks);
};

export const getTankApi = (id: number): Promise<ApiResponse<Tank>> => {
  return axiosInstance.get(apiEndpoints.tankById(id));
};

export const createTankApi = (data: CreateTankPayload): Promise<ApiResponse<Tank>> => {
  return axiosInstance.post(apiEndpoints.tanks, data);
};

export const updateTankApi = (
  id: number,
  data: Partial<CreateTankPayload>,
): Promise<ApiResponse<Tank>> => {
  return axiosInstance.put(apiEndpoints.tankById(id), data);
};

export const createDippingApi = (
  tankId: number,
  data: CreateDippingPayload,
): Promise<ApiResponse<TankDipping>> => {
  return axiosInstance.post(apiEndpoints.tankDipping(tankId), data);
};

export const getDippingsApi = (tankId: number): Promise<ApiResponse<TankDipping[]>> => {
  return axiosInstance.get(apiEndpoints.tankDippings(tankId));
};

export const getTankAlertsApi = (): Promise<ApiResponse<TankLevel[]>> => {
  return axiosInstance.get(apiEndpoints.tankAlerts);
};
