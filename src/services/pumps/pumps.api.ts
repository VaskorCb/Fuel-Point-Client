import { apiEndpoints } from 'routes/paths';
import axiosInstance from 'services/axiosInstance';
import {
  ApiResponse,
  CreateNozzlePayload,
  CreatePumpPayload,
  Nozzle,
  Pump,
} from 'types/petrol-pump';

export const getPumpsApi = (): Promise<ApiResponse<Pump[]>> => {
  return axiosInstance.get(apiEndpoints.pumps);
};

export const getPumpApi = (id: number): Promise<ApiResponse<Pump>> => {
  return axiosInstance.get(apiEndpoints.pumpById(id));
};

export const createPumpApi = (data: CreatePumpPayload): Promise<ApiResponse<Pump>> => {
  return axiosInstance.post(apiEndpoints.pumps, data);
};

export const updatePumpApi = (
  id: number,
  data: Partial<CreatePumpPayload>,
): Promise<ApiResponse<Pump>> => {
  return axiosInstance.put(apiEndpoints.pumpById(id), data);
};

export const createNozzleApi = (
  pumpId: number,
  data: CreateNozzlePayload,
): Promise<ApiResponse<Nozzle>> => {
  return axiosInstance.post(apiEndpoints.pumpNozzles(pumpId), data);
};

export const updateNozzleApi = (
  id: number,
  data: Partial<CreateNozzlePayload>,
): Promise<ApiResponse<Nozzle>> => {
  return axiosInstance.put(apiEndpoints.nozzleById(id), data);
};

export const getNozzlesApi = (): Promise<ApiResponse<Nozzle[]>> => {
  return axiosInstance.get(apiEndpoints.nozzles);
};
