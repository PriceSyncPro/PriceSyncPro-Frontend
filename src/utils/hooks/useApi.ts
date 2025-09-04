// hooks/useApi.ts
import { useState, useCallback } from 'react';
import axios from '../axios';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

interface ApiState {
    loading: boolean;
    error: string | null;
}
interface ErrorResponse {
    message: string;
    [key: string]: unknown;
}

interface ApiHook extends ApiState {
    get: <T>(url: string, config?: AxiosRequestConfig) => Promise<T>;
    post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => Promise<T>;
    put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => Promise<T>;
    delete: <T>(url: string, config?: AxiosRequestConfig) => Promise<T>;
}

export function useApi(): ApiHook {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const request = useCallback(async <T>(
        method: string,
        url: string,
        data: unknown = null,
        config: AxiosRequestConfig = {}
    ): Promise<T> => {
        setLoading(true);
        setError(null);

        try {
            const response: AxiosResponse<T> = await axios({
                method,
                url,
                data,
                ...config
            });

            return response.data;
        } catch (err) {
            const axiosError = err as AxiosError<ErrorResponse>;
            const errorMessage = axiosError.response?.data?.message || 'Bir hata oluştu';
            setError(errorMessage as string);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const get = useCallback(<T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
        request<T>('get', url, null, config), [request]);

    const post = useCallback(<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
        request<T>('post', url, data, config), [request]);

    const put = useCallback(<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
        request<T>('put', url, data, config), [request]);

    const del = useCallback(<T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
        request<T>('delete', url, null, config), [request]);

    return {
        loading,
        error,
        get,
        post,
        put,
        delete: del
    };
}
