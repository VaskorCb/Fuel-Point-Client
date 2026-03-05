import { atom } from 'jotai';
import { AuthStatus, AuthUser } from 'types/auth-and-onboarding';

export const userAtom = atom<AuthUser | null | undefined>(null);
export const authStatusAtom = atom<AuthStatus>('loading');

export const isAuthenticatedAtom = atom((get) => get(authStatusAtom) === 'authenticated');
export const userRoleAtom = atom((get) => get(userAtom)?.role ?? null);

export const subscriptionAtom = atom((get) => get(userAtom)?.subscription ?? null);
export const hasActiveSubscriptionAtom = atom((get) => {
  const sub = get(subscriptionAtom);
  if (!sub) return false;
  return sub.status === 'TRIAL' || sub.status === 'ACTIVE';
});
