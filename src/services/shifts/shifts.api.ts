import { apiEndpoints } from 'routes/paths';
import axiosInstance from 'services/axiosInstance';
import { ApiResponse, EndShiftPayload, Shift, StartShiftPayload } from 'types/petrol-pump';

export const startShiftApi = (data: StartShiftPayload): Promise<ApiResponse<Shift>> => {
  return axiosInstance.post(apiEndpoints.shiftStart, data);
};

export const endShiftApi = (id: number, data: EndShiftPayload): Promise<ApiResponse<Shift>> => {
  return axiosInstance.put(apiEndpoints.shiftEnd(id), data);
};

export const getShiftsApi = (date?: string): Promise<ApiResponse<Shift[]>> => {
  return axiosInstance.get(apiEndpoints.shifts, { params: { date } });
};

export const getShiftApi = (id: number): Promise<ApiResponse<Shift>> => {
  return axiosInstance.get(apiEndpoints.shiftById(id));
};

export const getActiveShiftsApi = (): Promise<ApiResponse<Shift[]>> => {
  return axiosInstance.get(apiEndpoints.shiftsActive);
};
