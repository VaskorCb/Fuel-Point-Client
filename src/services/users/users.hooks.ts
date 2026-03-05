'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'services/queryKeys';
import { completeOnboardingApi, inviteUserApi, getTeamApi, getOwnersApi, getPlatformStatsApi, getAllUsersApi, StationInfoPayload } from './users.api';

export const useCompleteOnboarding = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: completeOnboardingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.profile });
    },
  });
};

export const useInviteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: inviteUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.team });
    },
  });
};

export const useTeam = () => {
  return useQuery({
    queryKey: queryKeys.users.team,
    queryFn: getTeamApi,
  });
};

export const useOwners = () => {
  return useQuery({
    queryKey: queryKeys.users.owners,
    queryFn: getOwnersApi,
  });
};

export const usePlatformStats = () => {
  return useQuery({
    queryKey: queryKeys.users.platformStats,
    queryFn: getPlatformStatsApi,
  });
};

export const useAllUsers = () => {
  return useQuery({
    queryKey: queryKeys.users.all,
    queryFn: getAllUsersApi,
  });
};
