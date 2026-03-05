import { apiEndpoints } from 'routes/paths';
import axiosInstance from 'services/axiosInstance';
import { ApiResponse, CreateSalePayload, DailySummary, Sale } from 'types/petrol-pump';

interface GetSalesParams {
  shiftId?: number;
  fuelTypeId?: number;
  paymentMethod?: string;
  dateFrom?: string;
  dateTo?: string;
}

export const createSaleApi = (data: CreateSalePayload): Promise<ApiResponse<Sale>> => {
  return axiosInstance.post(apiEndpoints.sales, data);
};

export const getSalesApi = (params: GetSalesParams): Promise<ApiResponse<Sale[]>> => {
  return axiosInstance.get(apiEndpoints.sales, { params });
};

export const getSaleApi = (id: number): Promise<ApiResponse<Sale>> => {
  return axiosInstance.get(apiEndpoints.saleById(id));
};

export const getDailySummaryApi = (
  date: string,
): Promise<ApiResponse<DailySummary>> => {
  return axiosInstance.get(apiEndpoints.salesDailySummary, { params: { date } });
};
