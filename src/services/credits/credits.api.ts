import { apiEndpoints } from 'routes/paths';
import axiosInstance from 'services/axiosInstance';
import {
  ApiResponse,
  CreateCreditPaymentPayload,
  CreditSummary,
  CreditTransaction,
  Customer,
} from 'types/petrol-pump';

export const createPaymentApi = (
  data: CreateCreditPaymentPayload,
): Promise<ApiResponse<CreditTransaction>> => {
  return axiosInstance.post(apiEndpoints.creditPayment, data);
};

export const getCreditsByCustomerApi = (
  customerId: number,
): Promise<ApiResponse<CreditTransaction[]>> => {
  return axiosInstance.get(apiEndpoints.credits, { params: { customerId } });
};

export const getOutstandingApi = (): Promise<ApiResponse<Customer[]>> => {
  return axiosInstance.get(apiEndpoints.creditsOutstanding);
};

export const getCreditSummaryApi = (): Promise<ApiResponse<CreditSummary>> => {
  return axiosInstance.get(apiEndpoints.creditsSummary);
};
