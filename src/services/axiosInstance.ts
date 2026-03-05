import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { apiEndpoints } from 'routes/paths';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
let isRedirectingToSignIn = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
  config: InternalAxiosRequestConfig;
}[] = [];

const processQueue = (error: AxiosError | null) => {
  failedQueue.forEach(({ resolve, reject, config }) => {
    if (error) {
      reject(error);
    } else {
      resolve(axiosInstance(config));
    }
  });
  failedQueue = [];
};

// Response interceptor: unwrap data + handle 401
axiosInstance.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    const isAuthEndpoint =
      originalRequest?.url === apiEndpoints.refresh ||
      originalRequest?.url === apiEndpoints.login ||
      originalRequest?.url === apiEndpoints.register ||
      originalRequest?.url === apiEndpoints.profile;

    if (error.response?.status === 401 && !originalRequest?._retry && !isAuthEndpoint) {
      if (isRefreshing) {
        // Queue requests while refresh is in progress
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axios.post(`${BASE_URL}${apiEndpoints.refresh}`, {}, { withCredentials: true });

        processQueue(null);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError);
        if (
          typeof window !== 'undefined' &&
          !isRedirectingToSignIn &&
          !window.location.pathname.startsWith('/sign-in')
        ) {
          isRedirectingToSignIn = true;
          window.location.replace('/sign-in');
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Handle subscription required (403 with SUBSCRIPTION_REQUIRED error)
    if (error.response?.status === 403) {
      const data = error.response?.data as Record<string, unknown> | undefined;
      if (data?.error === 'SUBSCRIPTION_REQUIRED') {
        if (
          typeof window !== 'undefined' &&
          !window.location.pathname.startsWith('/subscription') &&
          !window.location.pathname.startsWith('/onboarding')
        ) {
          window.location.href = '/subscription';
        }
      }
    }

    return Promise.reject({
      status: error.response?.status,
      data: error.response?.data || error.message,
    });
  },
);

export default axiosInstance;
