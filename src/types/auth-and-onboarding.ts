// ─── Common ──────────────────────────────────────────────

export type UserRole = 'PLATFORM_OWNER' | 'OWNER' | 'ADMIN';

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

export type SubscriptionStatus = 'TRIAL' | 'PENDING' | 'ACTIVE' | 'EXPIRED';

export interface SubscriptionInfo {
  id: number;
  status: SubscriptionStatus;
  planType: string;
  startDate: string | null;
  endDate: string | null;
}

export interface SubscriptionDetail extends SubscriptionInfo {
  ownerId: number;
  amount: number | null;
  paymentNote: string | null;
  activatedAt: string | null;
  createdAt: string;
  updatedAt: string;
  owner?: {
    id: number;
    email: string;
    name: string;
    stationName: string | null;
    stationCode: string | null;
  };
}

export type PlanType = 'MONTHLY' | 'YEARLY' | 'CUSTOM';

export interface CreateSubscriptionPayload {
  planType: PlanType;
  paymentNote?: string;
}

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  onboardingDone: boolean;
  ownerId: number | null;
  hasUsedTrial?: boolean;
  subscription?: SubscriptionInfo | null;
}

// ─── API Response Shapes ─────────────────────────────────

export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  error: string;
  message: string | string[];
  path: string;
  timestamp: string;
}

/** The error shape created by the axios interceptor */
export interface ApiError {
  status: number;
  data: ApiErrorResponse;
}

// ─── Auth: Login ─────────────────────────────────────────

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface LoginResponseData {
  success: true;
  statusCode: number;
  data: {
    accessToken: string;
    refreshToken: string;
    user: AuthUser;
  };
  timestamp: string;
}

// ─── Auth: Signup ────────────────────────────────────────

export interface SignupFormValues {
  name: string;
  email: string;
  password: string;
}

export interface SignupResponseData {
  success: true;
  statusCode: number;
  data: {
    accessToken: string;
    refreshToken: string;
    user: AuthUser;
  };
  timestamp: string;
}

// ─── Auth: Profile ───────────────────────────────────────

export interface ProfileResponseData {
  success: true;
  statusCode: number;
  data: {
    id: number;
    email: string;
    name: string;
    role: UserRole;
    onboardingDone: boolean;
    ownerId: number | null;
    stationName?: string;
    stationCode?: string;
    stationAddress?: string;
    district?: string;
    thana?: string;
    phone?: string;
    bpcLicense?: string;
    hasUsedTrial?: boolean;
    subscription?: SubscriptionInfo | null;
    createdAt: string;
    updatedAt: string;
  };
  timestamp: string;
}

// ─── Auth: Logout ────────────────────────────────────────

export interface LogoutResponseData {
  success: true;
  statusCode: number;
  message: string;
  timestamp: string;
}

// ─── Auth: Forgot / Reset Password ──────────────────────

export interface ForgotPasswordFormValues {
  email: string;
}

export interface ForgotPasswordResponseData {
  success: true;
  statusCode: number;
  message: string;
  timestamp: string;
}

export interface SetPasswordFormValues {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
}

export interface SetPasswordResponseData {
  success: true;
  statusCode: number;
  message: string;
  timestamp: string;
}

// ─── Invite User ─────────────────────────────────────────

export interface InviteUserFormValues {
  name: string;
  email: string;
  password: string;
}

export interface TeamMember {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
}
