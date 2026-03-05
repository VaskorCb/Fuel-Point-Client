import { apiEndpoints } from 'routes/paths';
import axiosInstance from 'services/axiosInstance';
import { ApiResponse, BankDeposit, CreateBankDepositPayload } from 'types/petrol-pump';

interface GetBankDepositsParams {
  dateFrom?: string;
  dateTo?: string;
}

export const createBankDepositApi = (
  data: CreateBankDepositPayload,
): Promise<ApiResponse<BankDeposit>> => {
  return axiosInstance.post(apiEndpoints.bankDeposits, data);
};

export const getBankDepositsApi = (
  params: GetBankDepositsParams,
): Promise<ApiResponse<BankDeposit[]>> => {
  return axiosInstance.get(apiEndpoints.bankDeposits, { params });
};

export const getBankDepositApi = (id: number): Promise<ApiResponse<BankDeposit>> => {
  return axiosInstance.get(apiEndpoints.bankDepositById(id));
};
