import { apiEndpoints } from 'routes/paths';
import axiosInstance from 'services/axiosInstance';
import { InviteUserFormValues, TeamMember } from 'types/auth-and-onboarding';
import { ApiResponse } from 'types/petrol-pump';

export interface StationInfoPayload {
  stationName?: string;
  stationCode?: string;
  stationAddress?: string;
  district?: string;
  thana?: string;
  phone?: string;
  bpcLicense?: string;
}

export const completeOnboardingApi = (data?: StationInfoPayload): Promise<{ success: true; message: string }> => {
  return axiosInstance.post(apiEndpoints.onboardingComplete, data || {});
};

export const inviteUserApi = (data: InviteUserFormValues): Promise<ApiResponse<TeamMember>> => {
  return axiosInstance.post(apiEndpoints.inviteUser, data);
};

export const getTeamApi = (): Promise<ApiResponse<TeamMember[]>> => {
  return axiosInstance.get(apiEndpoints.team);
};

export const getOwnersApi = (): Promise<ApiResponse<any[]>> => {
  return axiosInstance.get(apiEndpoints.owners);
};

export const getPlatformStatsApi = (): Promise<ApiResponse<any>> => {
  return axiosInstance.get(apiEndpoints.platformStats);
};
