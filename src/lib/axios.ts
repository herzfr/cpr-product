import axios, { AxiosError } from 'axios';
import axiosRetry from 'axios-retry';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
  headers: {
    'Content-Type': 'application/json',
    // 'Cache-Control': 'no-cache',
  },
});

axiosRetry(apiClient, {
  retries: 3,
  retryDelay: (retryCount) => axiosRetry.exponentialDelay(retryCount),
  retryCondition: (error: AxiosError) => {
    // Jangan retry jika 429 (Too Many Requests) untuk menghindari block permanen/CORS
    if (error.response?.status === 429) {
      return false;
    }
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      (error.response?.status ? error.response.status >= 500 : false)
    );
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: Error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error('API Error:', {
      url: error.config?.url ?? 'unknown',
      method: error.config?.method ?? 'unknown',
      status: error.response?.status ?? 'unknown',
      message: error.message,
    });

    return Promise.reject(error);
  },
);
