// utils/contexts/AuthContext.tsx
'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { LoginCredentials, AuthContextType, RegisterCredentials } from '@/utils/types/auth';
import { User } from '@/utils/types/user';
import AuthService from '@/utils/api/services/authService';
import UserService from '@/utils/api/services/userService';
import { jwtDecode } from "jwt-decode";

const LoadingOverlay: React.FC = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white/90 dark:bg-gray-900/90 z-50">
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-2 border-gray-200 border-t-gray-800 dark:border-gray-700 dark:border-t-gray-200 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-700 dark:text-gray-300 text-sm font-light tracking-wider">Yükleniyor</p>
            </div>
        </div>
    );
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const router = useRouter();
    const pathname = usePathname();
    
    const isRedirecting = useRef(false);
    
    const publicRoutes = ['/', '/contact', '/pricing', '/privacy'];
    const authRoutes = ['/signin', '/signup'];
    
    const isPublicRoute = publicRoutes.includes(pathname);
    const isAuthRoute = authRoutes.includes(pathname);

    // Sayfa değiştiğinde mesajları temizle
    useEffect(() => {
        setError(null);
        setSuccess(null);
    }, [pathname]);

    // Sayfa yüklendiğinde token kontrolü
    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decoded = jwtDecode<{ exp: number }>(token);
                    const currentTime = Date.now() / 1000;
                    
                    if (decoded.exp < currentTime) {
                        localStorage.removeItem('token');
                        setUser(null);
                    } else {
                        const userProfile = await UserService.getProfile();
                        setUser({
                            ...userProfile,
                            id: userProfile.id,
                            userName: userProfile.userName,
                            fullName: userProfile.fullName,
                            firstName: userProfile.firstName,
                            lastName: userProfile.lastName,
                            email: userProfile.email,
                            balance: userProfile.balance,
                            expiryDate: new Date(decoded.exp * 1000)
                        });
                    }
                } catch (error) {
                    localStorage.removeItem('token');
                    console.log('Token validation error:', error);
                    setUser(null);
                }
            }
            setLoading(false);
        };
        initAuth();
    }, []);

    // Route guard ve token kontrolü
    useEffect(() => {
        if (!loading && !isRedirecting.current) {
            if (!user && !isPublicRoute && !isAuthRoute) {
                console.log('User not authenticated, redirecting to signin...');
                isRedirecting.current = true;
                router.replace('/signin');
                setTimeout(() => {
                    isRedirecting.current = false;
                }, 1000);
                return;
            }
            
            if (user && isAuthRoute) {
                console.log('User already authenticated, redirecting to dashboard...');
                isRedirecting.current = true;
                router.replace('/dashboard');
                setTimeout(() => {
                    isRedirecting.current = false;
                }, 1000);
                return;
            }
        }
    }, [user, loading, pathname, isPublicRoute, isAuthRoute, router]);

    // Periyodik token kontrolü
    useEffect(() => {
        if (!loading && user) {
            const checkToken = () => {
                const token = localStorage.getItem('token');
                
                if (!token && user && !isRedirecting.current) {
                    console.log('Token deleted, logging out...');
                    setUser(null);
                    setSuccess(null);
                    setError(null);
                    
                    isRedirecting.current = true;
                    
                    if (!isPublicRoute) {
                        router.push('/signin');
                    }
                    
                    setTimeout(() => {
                        isRedirecting.current = false;
                    }, 1000);
                }
                
                if (token) {
                    try {
                        const decoded = jwtDecode<{ exp: number }>(token);
                        const currentTime = Date.now() / 1000;
                        
                        if (decoded.exp < currentTime) {
                            console.log('Token expired, logging out...');
                            localStorage.removeItem('token');
                            setUser(null);
                            setSuccess(null);
                            setError(null);
                            
                            if (!isPublicRoute && !isRedirecting.current) {
                                isRedirecting.current = true;
                                router.push('/signin');
                                setTimeout(() => {
                                    isRedirecting.current = false;
                                }, 1000);
                            }
                        }
                    } catch (error) {
                        console.error('Token decode error:', error);
                        localStorage.removeItem('token');
                        setUser(null);
                        setSuccess(null);
                        setError(null);
                    }
                }
            };
            
            const interval = setInterval(checkToken, 30000);
            return () => clearInterval(interval);
        }
    }, [user, loading, router, pathname, isPublicRoute]);

    const login = async (credentials: LoginCredentials): Promise<boolean> => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        
        try {
            const response = await AuthService.login(credentials);
            
            if (!response.isSuccessful) {
                const errorMessage = response.errorMessages && response.errorMessages.length > 0
                    ? response.errorMessages[0]
                    : 'Giriş başarısız';
                setError(errorMessage);
                return false;
            }
            
            const { accessToken } = response.data || {};
            if (!accessToken) {
                setError('Token alınamadı');
                return false;
            }
            
            localStorage.setItem('token', accessToken);
            
            try {
                const decoded = jwtDecode<{ exp: number }>(accessToken);
                const userProfile = await UserService.getProfile();
                
                setUser({
                    ...userProfile,
                    id: userProfile.id,
                    userName: userProfile.userName,
                    fullName: userProfile.fullName,
                    firstName: userProfile.firstName,
                    lastName: userProfile.lastName,
                    email: userProfile.email,
                    balance: userProfile.balance,
                    expiryDate: new Date(decoded.exp * 1000)
                });
                
                setSuccess('Giriş Başarılı. Yönlendiriliyorsunuz...');
                
                setTimeout(() => {
                    router.replace('/dashboard');
                }, 1500);
                
                return true;
            } catch (error) {
                console.error('User profile fetch error:', error);
                localStorage.removeItem('token');
                setError('Kullanıcı bilgileri alınamadı');
                return false;
            }
            
        } catch (error: unknown) {
            console.error('Login error:', error);
            
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { data?: { errorMessages?: string[] } } };
                if (axiosError.response?.data?.errorMessages && axiosError.response.data.errorMessages.length > 0) {
                    setError(axiosError.response.data.errorMessages[0]);
                } else {
                    setError('Giriş başarısız. Lütfen daha sonra tekrar deneyin.');
                }
            } else {
                setError('Giriş başarısız. Lütfen daha sonra tekrar deneyin.');
            }
            return false;
        } finally {
            setLoading(false);
        }
    };

    const register = async (credentials: RegisterCredentials): Promise<boolean> => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        
        try {
            const response = await AuthService.register(credentials);
            
            if (!response.isSuccessful) {
                const errorMessage = response.errorMessages && response.errorMessages.length > 0
                    ? response.errorMessages[0]
                    : 'Kayıt başarısız';
                setError(errorMessage);
                return false;
            }
            
            setSuccess('Kayıt işlemi başarıyla tamamlandı. Giriş sayfasına yönlendiriliyorsunuz.');
            
            setTimeout(() => {
                router.replace('/signin');
            }, 2000);
            
            return true;
        } catch (error: unknown) {
            console.error('Register error:', error);
            
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { data?: { errorMessages?: string[] } } };
                if (axiosError.response?.data?.errorMessages && axiosError.response.data.errorMessages.length > 0) {
                    setError(axiosError.response.data.errorMessages[0]);
                } else {
                    setError('Kayıt başarısız. Lütfen daha sonra tekrar deneyin.');
                }
            } else {
                setError('Kayıt başarısız. Lütfen daha sonra tekrar deneyin.');
            }
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = async (): Promise<void> => {
        console.log('Logout başladı...');
        
        // Önce state'leri temizle
        setError(null);
        setSuccess(null);
        
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await AuthService.logout();
            }
        } catch (error) {
            console.error('Logout API error:', error);
        }
        
        // Token'ları temizle
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        
        // User'ı temizle
        setUser(null);
        
        // Yönlendirme yap
        console.log('Signin sayfasına yönlendiriliyor...');
        isRedirecting.current = true;
        
        // Doğrudan window.location kullan (daha güvenilir)
        window.location.href = '/signin';
    };

    const hasPermission = (): boolean => {
        return true;
    };

    const clearError = () => setError(null);
    const clearSuccess = () => setSuccess(null);

    const contextValue: AuthContextType = {
        user,
        loading,
        error,
        success,
        login,
        register,
        logout,
        hasPermission,
        isAuthenticated: !!user,
        clearError,
        clearSuccess
    };

    if (loading) {
        return (
            <AuthContext.Provider value={contextValue}>
                <LoadingOverlay />
            </AuthContext.Provider>
        );
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};