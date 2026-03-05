import { apiEndpoints } from 'routes/paths';
import axiosInstance from 'services/axiosInstance';
import {
  ApiResponse,
  CreateFuelTypePayload,
  FuelPriceHistory,
  FuelType,
  UpdatePricePayload,
} from 'types/petrol-pump';

export const getFuelTypesApi = (): Promise<ApiResponse<FuelType[]>> => {
  return axiosInstance.get(apiEndpoints.fuelTypes);
};

export const getFuelTypeApi = (id: number): Promise<ApiResponse<FuelType>> => {
  return axiosInstance.get(apiEndpoints.fuelTypeById(id));
};

export const createFuelTypeApi = (data: CreateFuelTypePayload): Promise<ApiResponse<FuelType>> => {
  return axiosInstance.post(apiEndpoints.fuelTypes, data);
};

export const updateFuelTypeApi = (
  id: number,
  data: Partial<CreateFuelTypePayload>,
): Promise<ApiResponse<FuelType>> => {
  return axiosInstance.put(apiEndpoints.fuelTypeById(id), data);
};

export const updateFuelPriceApi = (
  id: number,
  data: UpdatePricePayload,
): Promise<ApiResponse<FuelType>> => {
  return axiosInstance.put(apiEndpoints.fuelTypePrice(id), data);
};

export const getFuelPriceHistoryApi = (
  id: number,
): Promise<ApiResponse<FuelPriceHistory[]>> => {
  return axiosInstance.get(apiEndpoints.fuelTypePriceHistory(id));
};
