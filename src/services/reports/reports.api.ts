import { apiEndpoints } from 'routes/paths';
import axiosInstance from 'services/axiosInstance';
import {
  ApiResponse,
  DailyReport,
  MonthlyReport,
  ProfitLossReport,
  Shift,
  StockReport,
} from 'types/petrol-pump';

export const getDailyReportApi = (
  date: string,
): Promise<ApiResponse<DailyReport>> => {
  return axiosInstance.get(apiEndpoints.reportDaily, { params: { date } });
};

export const getMonthlyReportApi = (
  month: number,
  year: number,
): Promise<ApiResponse<MonthlyReport>> => {
  return axiosInstance.get(apiEndpoints.reportMonthly, { params: { month, year } });
};

export const getFuelWiseReportApi = (
  dateFrom: string,
  dateTo: string,
): Promise<ApiResponse<DailyReport>> => {
  return axiosInstance.get(apiEndpoints.reportFuelWise, {
    params: { dateFrom, dateTo },
  });
};

export const getShiftWiseReportApi = (
  date: string,
): Promise<ApiResponse<Shift[]>> => {
  return axiosInstance.get(apiEndpoints.reportShiftWise, { params: { date } });
};

export const getProfitLossApi = (
  month: number,
  year: number,
): Promise<ApiResponse<ProfitLossReport>> => {
  return axiosInstance.get(apiEndpoints.reportProfitLoss, {
    params: { month, year },
  });
};

export const getStockReportApi = (): Promise<ApiResponse<StockReport[]>> => {
  return axiosInstance.get(apiEndpoints.reportStock);
};
