import {User} from '../types/user'

// Re-export User for convenience
export type {User} from '../types/user'

export interface LoginCredentials {
    emailOrUserName: string;
    password: string;
    rememberMe?: boolean;
}

export interface RegisterCredentials {
    email: string;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

export interface ApiResponse<T = unknown> {
    data: T | null;
    errorMessages: string[];
    isSuccessful: boolean;
    statusCode: number;
}

export interface LoginResponseData {
    token: string;
    tfaCode?: User;
    refreshToken?: string;
}

// LoginResponse artık ApiResponse'un özelleştirilmiş bir versiyonu
export type LoginResponse = ApiResponse<LoginResponseData>;

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    success: string | null;
    login: (credentials: LoginCredentials) => Promise<boolean>;
    register: (credentials: RegisterCredentials) => Promise<boolean>;
    logout: () => Promise<void>;
    clearError: () => void;
    clearSuccess: () => void;
    hasPermission: (permission: string) => boolean;
    isAuthenticated: boolean;
}
