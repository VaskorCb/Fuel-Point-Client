import { apiEndpoints } from 'routes/paths';
import axiosInstance from 'services/axiosInstance';
import { ApiResponse, CreateSupplyPayload, FuelSupply } from 'types/petrol-pump';

interface GetSuppliesParams {
  dateFrom?: string;
  dateTo?: string;
}

export const createSupplyApi = (data: CreateSupplyPayload): Promise<ApiResponse<FuelSupply>> => {
  return axiosInstance.post(apiEndpoints.supplies, data);
};

export const getSuppliesApi = (params: GetSuppliesParams): Promise<ApiResponse<FuelSupply[]>> => {
  return axiosInstance.get(apiEndpoints.supplies, { params });
};

export const getSupplyApi = (id: number): Promise<ApiResponse<FuelSupply>> => {
  return axiosInstance.get(apiEndpoints.supplyById(id));
};
