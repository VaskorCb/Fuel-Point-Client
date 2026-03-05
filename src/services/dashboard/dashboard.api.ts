import { apiEndpoints } from 'routes/paths';
import axiosInstance from 'services/axiosInstance';
import type { ApiResponse, DashboardSummary, SalesChartData, TankLevel, CreditOverview } from 'types/petrol-pump';

export const getDashboardSummaryApi = (): Promise<ApiResponse<DashboardSummary>> => {
  return axiosInstance.get(apiEndpoints.dashboardSummary);
};

export const getSalesChartApi = (period: string): Promise<ApiResponse<SalesChartData[]>> => {
  return axiosInstance.get(apiEndpoints.dashboardSalesChart, { params: { period } });
};

export const getTankLevelsApi = (): Promise<ApiResponse<TankLevel[]>> => {
  return axiosInstance.get(apiEndpoints.dashboardTankLevels);
};

export const getCreditOverviewApi = (): Promise<ApiResponse<CreditOverview>> => {
  return axiosInstance.get(apiEndpoints.dashboardCreditOverview);
};

export interface PlatformSalesSummary {
  todaySales: number;
  todayTransactions: number;
  totalSales: number;
  totalTransactions: number;
}

export const getPlatformSalesSummaryApi = (): Promise<ApiResponse<PlatformSalesSummary>> => {
  return axiosInstance.get(apiEndpoints.dashboardPlatformSalesSummary);
};

export const getPlatformSalesChartApi = (period: string): Promise<ApiResponse<SalesChartData[]>> => {
  return axiosInstance.get(apiEndpoints.dashboardPlatformSalesChart, { params: { period } });
};
