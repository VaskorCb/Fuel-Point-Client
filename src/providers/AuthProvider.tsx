'use client';

import { useSetAtom } from 'jotai';
import { type ReactNode, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { authStatusAtom, userAtom } from 'store/auth';
import { ApiError, ProfileResponseData } from 'types/auth-and-onboarding';
import { queryKeys } from 'services/queryKeys';
import { getProfileApi } from 'services/auth/auth.api';
import { getAuthToken } from 'actions/auth';
import { setAccessToken, getAccessToken } from 'services/axiosInstance';
import PageLoader from 'components/loading/PageLoader';

const AUTH_ROUTES = ['/sign-in', '/sign-up', '/forgot-password', '/2fa', '/set-password', '/logged-out', '/landing-preview', '/how-it-works'];

export default function AuthProvider({ children }: { children: ReactNode }) {
  const setUser = useSetAtom(userAtom);
  const setAuthStatus = useSetAtom(authStatusAtom);
  const router = useRouter();
  const pathname = usePathname();
  const [tokenRestored, setTokenRestored] = useState(() => !!getAccessToken());

  const isAuthRoute = AUTH_ROUTES.some((route) => pathname?.startsWith(route) || pathname === '/');

  // Restore token from Vercel cookie on page load/reload
  useEffect(() => {
    if (!tokenRestored && !isAuthRoute) {
      getAuthToken().then((token) => {
        if (token) setAccessToken(token);
        setTokenRestored(true);
      });
    } else {
      setTokenRestored(true);
    }
  }, [tokenRestored, isAuthRoute]);

  const profileQuery = useQuery<ProfileResponseData, ApiError>({
    queryKey: [...queryKeys.auth.profile],
    queryFn: getProfileApi,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !isAuthRoute && tokenRestored,
  });

  useEffect(() => {
    if (profileQuery.isSuccess && profileQuery.data?.data) {
      const { id, email, name, role, onboardingDone, ownerId, hasUsedTrial, subscription } =
        profileQuery.data.data;
      setUser({
        id, email, name, role, onboardingDone,
        ownerId: ownerId ?? null, hasUsedTrial, subscription,
      });
      setAuthStatus('authenticated');

      // Routing based on role, onboarding, and subscription status
      if (role === 'PLATFORM_OWNER') {
        if (!pathname.startsWith('/platform-admin')) {
          router.replace('/platform-admin');
        }
      } else if (role === 'OWNER' && !onboardingDone) {
        if (!pathname.startsWith('/onboarding')) {
          router.replace('/onboarding');
        }
      } else if (role === 'OWNER' || role === 'ADMIN') {
        const hasActive =
          subscription?.status === 'TRIAL' || subscription?.status === 'ACTIVE';
        if (!hasActive && !pathname.startsWith('/subscription')) {
          router.replace('/subscription');
        }
      }
    } else if (profileQuery.isError) {
      setUser(null);
      setAuthStatus('unauthenticated');
    }
  }, [
    profileQuery.isSuccess,
    profileQuery.isError,
    profileQuery.data,
    setUser,
    setAuthStatus,
    router,
    pathname,
  ]);

  if (!isAuthRoute && (!tokenRestored || profileQuery.isLoading)) {
    return <PageLoader sx={{ height: '100vh' }} />;
  }

  return <>{children}</>;
}
