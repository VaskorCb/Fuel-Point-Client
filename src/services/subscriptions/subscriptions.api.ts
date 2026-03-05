import { apiEndpoints } from 'routes/paths';
import axiosInstance from 'services/axiosInstance';
import { CreateSubscriptionPayload, SubscriptionDetail } from 'types/auth-and-onboarding';
import { ApiResponse } from 'types/petrol-pump';

export const startTrialApi = (): Promise<ApiResponse<SubscriptionDetail>> => {
  return axiosInstance.post(apiEndpoints.subscriptionTrial);
};

export const createSubscriptionApi = (
  data: CreateSubscriptionPayload,
): Promise<ApiResponse<SubscriptionDetail>> => {
  return axiosInstance.post(apiEndpoints.subscriptionSubscribe, data);
};

export const getCurrentSubscriptionApi = (): Promise<ApiResponse<SubscriptionDetail | null>> => {
  return axiosInstance.get(apiEndpoints.subscriptionCurrent);
};

export const getAllSubscriptionsApi = (
  status?: string,
): Promise<ApiResponse<SubscriptionDetail[]>> => {
  const params = status ? `?status=${status}` : '';
  return axiosInstance.get(`${apiEndpoints.subscriptions}${params}`);
};

export const activateSubscriptionApi = (id: number): Promise<ApiResponse<SubscriptionDetail>> => {
  return axiosInstance.post(apiEndpoints.subscriptionActivate(id));
};

export const expireOverdueApi = (): Promise<ApiResponse<{ count: number }>> => {
  return axiosInstance.post(apiEndpoints.subscriptionExpireOverdue);
};
