
import axios from '@/utils/axios';
import { API_ENDPOINTS } from '@/utils/api/endpoints';
import {
    ApiResponse,
    LoginCredentials,
    LoginResponseData,
    RegisterCredentials,
    User
} from '@/utils/types/auth';

export class AuthService {
    static async login(credentials: LoginCredentials): Promise<ApiResponse<LoginResponseData>> {
        try {
            const response = await axios.post<ApiResponse<LoginResponseData>>(
                API_ENDPOINTS.AUTH.LOGIN,
                credentials
            );
            return response.data;
        } catch (error: unknown) {
            // Axios hatası durumunda, API yanıt formatına uygun bir hata nesnesi döndür
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { data?: ApiResponse<LoginResponseData>; status?: number } };
                if (axiosError.response?.data) {
                    return axiosError.response.data;
                }
            }

            // API yanıt formatına uygun bir hata nesnesi oluştur
            const errorMessage = error instanceof Error ? error.message : 'Bir hata oluştu';
            const statusCode = error && typeof error === 'object' && 'response' in error 
                ? (error as { response?: { status?: number } }).response?.status || 500 
                : 500;
            
            return {
                data: null,
                errorMessages: [errorMessage],
                isSuccessful: false,
                statusCode
            };
        }
    }
    static async register(credentials: RegisterCredentials): Promise<ApiResponse<LoginResponseData>> {
        try {
            const response = await axios.post<ApiResponse<LoginResponseData>>(
                API_ENDPOINTS.AUTH.REGISTER,
                credentials
            );
            return response.data;
        } catch (error: unknown) {
            // Axios hatası durumunda, API yanıt formatına uygun bir hata nesnesi döndür
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { data?: ApiResponse<LoginResponseData>; status?: number } };
                if (axiosError.response?.data) {
                    return axiosError.response.data;
                }
            }

            // API yanıt formatına uygun bir hata nesnesi oluştur
            const errorMessage = error instanceof Error ? error.message : 'Bir hata oluştu';
            const statusCode = error && typeof error === 'object' && 'response' in error 
                ? (error as { response?: { status?: number } }).response?.status || 500 
                : 500;
            
            return {
                data: null,
                errorMessages: [errorMessage],
                isSuccessful: false,
                statusCode
            };
        }
    }

    static async logout(): Promise<void> {
        // Tarayıcı ortamında olduğumuzu kontrol et
        if (typeof window !== 'undefined') {
            // localStorage'dan token'ı sil
            localStorage.removeItem('token');

            // Eğer sessionStorage'da da token varsa onu da sil
            sessionStorage.removeItem('token');
        }
    }

    static async getCurrentUser(): Promise<User> {
        const response = await axios.get<User>(API_ENDPOINTS.USER.ME);
        return response.data;
    }

    static async forgotPassword(email: string): Promise<{ message: string }> {
        const response = await axios.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
        return response.data;
    }

    static async resetPassword(token: string, password: string): Promise<{ message: string }> {
        const response = await axios.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
            token,
            password
        });
        return response.data;
    }
}

export default AuthService;
