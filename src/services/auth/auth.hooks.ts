'use client';

import { useAtom, useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import paths from 'routes/paths';
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
import { queryKeys } from 'services/queryKeys';
import { loginApi, signupApi, logoutApi, sendPasswordResetLinkApi, resetPasswordApi } from './auth.api';
import toast from 'react-hot-toast';

export function useAuth() {
  const [user, setUser] = useAtom(userAtom);
  const [authStatus, setAuthStatus] = useAtom(authStatusAtom);
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const router = useRouter();
  const queryClient = useQueryClient();

  // Login mutation
  const loginMutation = useMutation<LoginResponseData, ApiError, LoginFormValues>({
    mutationFn: loginApi,
    onSuccess: (data) => {
      console.log("data", data);
      setUser(data.data?.user || null);
      setAuthStatus('authenticated');
      queryClient.setQueryData(queryKeys.auth.profile, data.data?.user || null);
    },
  });

  // Signup mutation
  const signupMutation = useMutation<SignupResponseData, ApiError, SignupFormValues>({
    mutationFn: signupApi,
    onSuccess: (data) => {
      setUser(data.data?.user || null);
      setAuthStatus('authenticated');
      queryClient.setQueryData(queryKeys.auth.profile, data.data?.user || null);
    },
  });

  // Logout mutation
  const logoutMutation = useMutation<LogoutResponseData, ApiError, void>({
    mutationFn: logoutApi,
    onSettled: () => {
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

