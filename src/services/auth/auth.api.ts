import { apiEndpoints } from 'routes/paths';
import axiosInstance from 'services/axiosInstance';
import {
  ForgotPasswordFormValues,
  ForgotPasswordResponseData,
  LoginFormValues,
  LoginResponseData,
  LogoutResponseData,
  ProfileResponseData,
  SetPasswordFormValues,
  SetPasswordResponseData,
  SignupFormValues,
  SignupResponseData,
} from 'types/auth-and-onboarding';

export const loginApi = (credentials: LoginFormValues): Promise<LoginResponseData> => {
  return axiosInstance.post(apiEndpoints.login, credentials);
};

export const signupApi = (data: SignupFormValues): Promise<SignupResponseData> => {
  return axiosInstance.post(apiEndpoints.register, data);
};

export const logoutApi = (): Promise<LogoutResponseData> => {
  return axiosInstance.post(apiEndpoints.logout);
};

export const getProfileApi = (): Promise<ProfileResponseData> => {
  return axiosInstance.get(apiEndpoints.profile);
};

export const sendPasswordResetLinkApi = (data: ForgotPasswordFormValues): Promise<ForgotPasswordResponseData> => {
  return axiosInstance.post(apiEndpoints.forgotPassword, data);
};

export const resetPasswordApi = (data: SetPasswordFormValues): Promise<SetPasswordResponseData> => {
  return axiosInstance.post(apiEndpoints.setPassword, data);
};
