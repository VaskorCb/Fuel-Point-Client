import { apiEndpoints } from 'routes/paths';
import axiosInstance from 'services/axiosInstance';
import { ApiResponse, CreateEmployeePayload, Employee } from 'types/petrol-pump';

export const getEmployeesApi = (): Promise<ApiResponse<Employee[]>> => {
  return axiosInstance.get(apiEndpoints.employees);
};

export const getEmployeeApi = (id: number): Promise<ApiResponse<Employee>> => {
  return axiosInstance.get(apiEndpoints.employeeById(id));
};

export const createEmployeeApi = (data: CreateEmployeePayload): Promise<ApiResponse<Employee>> => {
  return axiosInstance.post(apiEndpoints.employees, data);
};

export const updateEmployeeApi = (
  id: number,
  data: Partial<CreateEmployeePayload>,
): Promise<ApiResponse<Employee>> => {
  return axiosInstance.put(apiEndpoints.employeeById(id), data);
};

export const deleteEmployeeApi = (id: number): Promise<ApiResponse<void>> => {
  return axiosInstance.delete(apiEndpoints.employeeById(id));
};
