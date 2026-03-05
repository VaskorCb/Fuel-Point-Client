'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'services/queryKeys';
import {
  startTrialApi,
  createSubscriptionApi,
  getCurrentSubscriptionApi,
  getAllSubscriptionsApi,
  activateSubscriptionApi,
  expireOverdueApi,
} from './subscriptions.api';

export const useStartTrial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: startTrialApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subscriptions.current });
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.profile });
    },
  });
};

export const useCreateSubscription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSubscriptionApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subscriptions.current });
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.profile });
    },
  });
};

export const useCurrentSubscription = () => {
  return useQuery({
    queryKey: queryKeys.subscriptions.current,
    queryFn: getCurrentSubscriptionApi,
  });
};

export const useAllSubscriptions = (status?: string) => {
  return useQuery({
    queryKey: [...queryKeys.subscriptions.all, status],
    queryFn: () => getAllSubscriptionsApi(status),
  });
};

export const useActivateSubscription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: activateSubscriptionApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subscriptions.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.users.platformStats });
    },
  });
};

export const useExpireOverdue = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: expireOverdueApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subscriptions.all });
    },
  });
};
