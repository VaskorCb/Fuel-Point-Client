import { apiEndpoints } from 'routes/paths';
import axiosInstance from 'services/axiosInstance';
import {
  ApiResponse,
  CreateExpensePayload,
  Expense,
  ExpenseSummary,
} from 'types/petrol-pump';

interface GetExpensesParams {
  category?: string;
  dateFrom?: string;
  dateTo?: string;
}

export const createExpenseApi = (data: CreateExpensePayload): Promise<ApiResponse<Expense>> => {
  return axiosInstance.post(apiEndpoints.expenses, data);
};

export const getExpensesApi = (params: GetExpensesParams): Promise<ApiResponse<Expense[]>> => {
  return axiosInstance.get(apiEndpoints.expenses, { params });
};

export const getExpenseApi = (id: number): Promise<ApiResponse<Expense>> => {
  return axiosInstance.get(apiEndpoints.expenseById(id));
};

export const updateExpenseApi = (
  id: number,
  data: Partial<CreateExpensePayload>,
): Promise<ApiResponse<Expense>> => {
  return axiosInstance.put(apiEndpoints.expenseById(id), data);
};

export const deleteExpenseApi = (id: number): Promise<ApiResponse<void>> => {
  return axiosInstance.delete(apiEndpoints.expenseById(id));
};

export const getExpenseSummaryApi = (
  month: number,
  year: number,
): Promise<ApiResponse<ExpenseSummary>> => {
  return axiosInstance.get(apiEndpoints.expensesSummary, { params: { month, year } });
};
