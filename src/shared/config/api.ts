import { QueryClient } from '@tanstack/react-query';
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';

import { JWT_TOKEN_KEY } from '~shared/constants';

const apURL = import.meta.env.VITE_API_URL

export const saveToken = (jwt: string) => sessionStorage.setItem(JWT_TOKEN_KEY, jwt);
export const getToken = () => sessionStorage.getItem(JWT_TOKEN_KEY);
export const removeToken = () => sessionStorage.removeItem(JWT_TOKEN_KEY);

export const apiAxios: AxiosInstance = axios.create({
    baseURL: `${apURL}/api/v1`,
    timeout: 3000,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

apiAxios.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

apiAxios.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    async (error: any) => {
        const originalRequest = error.config;
        console.log(error)
        if (originalRequest.url?.includes('/user/refresh')) {
            if (error.response?.status === 401) {
                console.error('Refresh token expired');
                if (!window.location.pathname.startsWith('/auth')) {
                    window.location.pathname = 'auth/signin';
                }
                return Promise.reject(error.response.data);
            }
        }

        if (
            error.response?.status === 401 &&
            originalRequest &&
            !originalRequest._retry
        ) {
            try {
                await apiAxios.post('/user/refresh');
                return apiAxios(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
            }
        }

        const errorData: any = error.response?.data || {
            message: 'Unknown error occurred',
        };

        console.error('Error from backend:', errorData);
        return Promise.reject(error.response.data);
    }
);

export const query = {
    get: <T = any>(url: string, config?: AxiosRequestConfig) =>
        apiAxios.get<T>(url, config) as Promise<T>,

    post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
        apiAxios.post<T>(url, data, config) as Promise<T>,

    patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
        apiAxios.patch<T>(url, data, config) as Promise<T>,

    put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
        apiAxios.put<T>(url, data, config) as Promise<T>,

    delete: <T = any>(url: string, config?: AxiosRequestConfig) =>
        apiAxios.delete<T>(url, config) as Promise<T>,
};

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            retry: 3,
            refetchOnReconnect: true,
            refetchOnMount: true,
        },
    },
});