'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { setAuthCookies, clearAuthCookies } from 'actions/auth';
import { useAtom, useAtomValue } from 'jotai';
import paths from 'routes/paths';
import { setAccessToken } from 'services/axiosInstance';
import { queryKeys } from 'services/queryKeys';
import { authStatusAtom, isAuthenticatedAtom, userAtom } from 'store/auth';
import {
  ApiError,
  ForgotPasswordFormValues,
  ForgotPasswordResponseData,
  LoginFormValues,
  LoginResponseData,
  LogoutResponseData,
  SetPasswordFormValues,
  SetPasswordResponseData,
  SignupFormValues,
  SignupResponseData,
} from 'types/auth-and-onboarding';
import {
  loginApi,
  signupApi,
  logoutApi,
  sendPasswordResetLinkApi,
  resetPasswordApi,
} from './auth.api';

export function useAuth() {
  const [user, setUser] = useAtom(userAtom);
  const [authStatus, setAuthStatus] = useAtom(authStatusAtom);
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const router = useRouter();
  const queryClient = useQueryClient();

  // Login mutation
  const loginMutation = useMutation<LoginResponseData, ApiError, LoginFormValues>({
    mutationFn: loginApi,
    onSuccess: async (data) => {
      const tokens = data.data;
      if (tokens?.accessToken) {
        setAccessToken(tokens.accessToken);
      }
      if (tokens?.accessToken && tokens?.refreshToken) {
        await setAuthCookies(tokens.accessToken, tokens.refreshToken);
      }
      setUser(data.data?.user || null);
      setAuthStatus('authenticated');
      queryClient.setQueryData(queryKeys.auth.profile, data.data?.user || null);
    },
  });

  // Signup mutation
  const signupMutation = useMutation<SignupResponseData, ApiError, SignupFormValues>({
    mutationFn: signupApi,
    onSuccess: async (data) => {
      const tokens = data.data;
      if (tokens?.accessToken) {
        setAccessToken(tokens.accessToken);
      }
      if (tokens?.accessToken && tokens?.refreshToken) {
        await setAuthCookies(tokens.accessToken, tokens.refreshToken);
      }
      setUser(data.data?.user || null);
      setAuthStatus('authenticated');
      queryClient.setQueryData(queryKeys.auth.profile, data.data?.user || null);
    },
  });

  // Logout mutation
  const logoutMutation = useMutation<LogoutResponseData, ApiError, void>({
    mutationFn: logoutApi,
    onSettled: async () => {
      setAccessToken(null);
      await clearAuthCookies();
      setUser(null);
      setAuthStatus('unauthenticated');
      queryClient.removeQueries({ queryKey: [...queryKeys.auth.profile] });
      toast.success('Logged out successfully');
      router.push(paths.login);
    },
  });

  return {
    // State
    user,
    authStatus,
    isAuthenticated,

    // Login
    loginMutation,
    login: loginMutation.mutateAsync,

    // Signup
    signupMutation,
    signup: signupMutation.mutateAsync,

    // Logout
    logoutMutation,
    logout: logoutMutation.mutateAsync,
  };
}

export const useSendPasswordResetLink = () => {
  return useMutation<ForgotPasswordResponseData, ApiError, ForgotPasswordFormValues>({
    mutationFn: sendPasswordResetLinkApi,
  });
};

export const useResetPassword = () => {
  return useMutation<SetPasswordResponseData, ApiError, SetPasswordFormValues>({
    mutationFn: resetPasswordApi,
  });
};

