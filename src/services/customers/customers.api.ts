import { apiEndpoints } from 'routes/paths';
import axiosInstance from 'services/axiosInstance';
import { ApiResponse, CreateCustomerPayload, Customer } from 'types/petrol-pump';

export const getCustomersApi = (): Promise<ApiResponse<Customer[]>> => {
  return axiosInstance.get(apiEndpoints.customers);
};

export const getCustomerApi = (id: number): Promise<ApiResponse<Customer>> => {
  return axiosInstance.get(apiEndpoints.customerById(id));
};

export const createCustomerApi = (data: CreateCustomerPayload): Promise<ApiResponse<Customer>> => {
  return axiosInstance.post(apiEndpoints.customers, data);
};

export const updateCustomerApi = (
  id: number,
  data: Partial<CreateCustomerPayload>,
): Promise<ApiResponse<Customer>> => {
  return axiosInstance.put(apiEndpoints.customerById(id), data);
};

export const deleteCustomerApi = (id: number): Promise<ApiResponse<void>> => {
  return axiosInstance.delete(apiEndpoints.customerById(id));
};
