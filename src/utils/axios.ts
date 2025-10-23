// utils/axios.ts
'use client'; // Client component olduğunu belirt

import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from "@/utils/api/endpoints";

// Axios instance oluşturma
const axiosInstance: AxiosInstance = axios.create({
    baseURL: `https://${API_BASE_URL}`, // HTTP protokolünü ekle
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Request interceptor - her istekte token ekleme
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        console.log('Request URL:', `${config.baseURL}${config.url}`); // Debug için URL'i logla

        // Tarayıcı ortamında olduğumuzu kontrol et
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error: AxiosError): Promise<AxiosError> => {
        return Promise.reject(error);
    }
);

// Response interceptor - token hatalarını yakalama
axiosInstance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => response,
    (error: AxiosError) => {
        // Timeout hatası kontrolü
        if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
            console.error('İstek zaman aşımına uğradı:', error.message);
            
            // Timeout için özel hata objesi oluştur
            const timeoutError = {
                ...error,
                response: {
                    ...error.response,
                    data: {
                        data: null,
                        errorMessages: ['İstek zaman aşımına uğradı. Lütfen tekrar deneyin.'],
                        isSuccessful: false,
                        statusCode: 408
                    },
                    status: 408
                }
            };
            return Promise.reject(timeoutError);
        }

        // 401 Unauthorized hatası durumunda
        if (error.response?.status === 401) {
            console.error('Unauthorized access - redirecting to login');
            
            // Token'ı temizle
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
                sessionStorage.removeItem('token');
                
                // Login sayfasında değilse yönlendir
                if (!window.location.pathname.includes('/login')) {
                    window.location.href = '/login';
                }
            }
        }

        // Network hatası kontrolü
        if (!error.response) {
            console.error('Bağlantı Hatası!', error.message);
        }

        return Promise.reject(error);
    }
);

// Axios instance'ını export et
export default axiosInstance;
