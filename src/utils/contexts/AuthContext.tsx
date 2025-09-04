// utils/contexts/AuthContext.tsx
'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {LoginCredentials, AuthContextType, RegisterCredentials} from '@/utils/types/auth';
import {User} from '@/utils/types/user'
import AuthService from '@/utils/api/services/authService';
import UserService from '@/utils/api/services/userService';
import { jwtDecode } from "jwt-decode";

// Minimalist yükleme komponenti (burası yeni eklenen kısım)
const LoadingOverlay: React.FC = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white/90 z-50">
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-2 border-gray-200 border-t-gray-800 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-700 text-sm font-light tracking-wider">Yükleniyor</p>
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
    // Yönlendirme işleminin devam ettiğini takip etmek için ref
    const isRedirecting = useRef(false);
    // Sayfa yüklendiğinde token kontrolü
    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // Token süresi kontrolü için decode
                    const decoded = jwtDecode<{ exp: number }>(token);
                    const currentTime = Date.now() / 1000;
                    
                    if (decoded.exp < currentTime) {
                        localStorage.removeItem('token');
                        setUser(null);
                    } else {
                        // UserService'den kullanıcı bilgilerini çek
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
                    console.log(error)
                    setUser(null);
                }
            }
            setLoading(false);
        };
        initAuth();
    }, []);
    // Periyodik token kontrolü - Yönlendirme mantığını düzelttik
    useEffect(() => {
        // Yalnızca kullanıcı oturum açmışsa ve yükleme tamamlanmışsa kontrol et
        if (!loading && user) {
            const checkToken = () => {
                const token = localStorage.getItem('token');
                // Token yoksa ve kullanıcı oturumu açık görünüyorsa
                if (!token && user && !isRedirecting.current) {
                    console.log('Token silindi, oturumu kapatılıyor...');
                    setUser(null);
                    // Yönlendirme işlemi başladı
                    isRedirecting.current = true;
                    // Eğer zaten signin sayfasında değilsek yönlendir
                    if (pathname !== '/signin') {
                        router.push('/signin');
                    }
                    // Yönlendirme işlemi tamamlandı
                    setTimeout(() => {
                        isRedirecting.current = false;
                    }, 1000);
                }
            };
            // Her 2 saniyede bir token kontrolü yap
            const interval = setInterval(checkToken, 2000);
            return () => clearInterval(interval);
        }
    }, [user, loading, router, pathname]);
    // Login fonksiyonu
    const login = async (credentials: LoginCredentials): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            const response = await AuthService.login(credentials);
            // API başarısız yanıt döndüyse
            if (!response.isSuccessful) {
                // API'den gelen hata mesajlarını göster
                const errorMessage = response.errorMessages && response.errorMessages.length > 0
                    ? response.errorMessages[0]
                    : 'Giriş başarısız';
                setError(errorMessage);
                return false;
            }
            // API başarılı yanıt döndüyse
            const { accessToken } = response.data || {};
            if (!accessToken) {
                setError('Token alınamadı');
                return false;
            }
            localStorage.setItem('token', accessToken);
            try {
                // Token'dan sadece expiry date'i al
                const decoded = jwtDecode<{ exp: number }>(accessToken);
                
                // UserService'den kullanıcı bilgilerini çek
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
                
                // Doğrudan window.location kullanarak yönlendirme
                window.location.href = '/dashboard';
                return true;
            } catch (error) {
                console.error('Kullanıcı bilgileri alınırken hata:', error);
                localStorage.removeItem('token');
                setError('Kullanıcı bilgileri alınamadı');
                return false;
            }
            setSuccess('Giriş Başarılı. Yönlendiriliyorsunuz...')
        } catch (error: unknown) {
            console.error('Login hatası:', error);
            // Axios hata yanıtından API hata mesajlarını al
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
        try {
            const response = await AuthService.register(credentials);
            // API başarısız yanıt döndüyse
            if (!response.isSuccessful) {
                // API'den gelen hata mesajlarını göster
                const errorMessage = response.errorMessages && response.errorMessages.length > 0
                    ? response.errorMessages[0]
                    : 'Kayıt başarısız';
                setError(errorMessage);
                return false;
            }
            setSuccess('Kayıt işlemi başarıyla tamamlandı. Giriş sayfasına yönlendiriliyorsunuz.')
            // Kısa bir gecikme ile yönlendirme (toast mesajını görebilmesi için)
            setTimeout(() => {
                window.location.href = '/signin';
            }, 2000);
            return true;
        } catch (error: unknown) {
            console.error('Kayıt hatası:', error);
            // Axios hata yanıtından API hata mesajlarını al
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
    // Logout fonksiyonu
    const logout = async (): Promise<void> => {
        try {
            // API çağrısı yapmadan önce token kontrolü
            const token = localStorage.getItem('token');
            if (token) {
                await AuthService.logout();
            }
        } catch (error) {
            console.error('Çıkış hatası:', error);
        } finally {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            setUser(null);
            // Yönlendirme işlemi başladı
            isRedirecting.current = true;
            router.push('/signin');
            // Yönlendirme işlemi tamamlandı
            setTimeout(() => {
                isRedirecting.current = false;
            }, 1000);
        }
    };
    // Yetki kontrolü fonksiyonu
    const hasPermission = (): boolean => {
    return true;
};
    const contextValue: AuthContextType = {
        user,
        loading,
        error,
        success,
        login,
        register,
        logout,
        hasPermission,
        isAuthenticated: !!user
    };
    return (
        <AuthContext.Provider value={contextValue}>
            {loading && <LoadingOverlay />} {/* Yükleme durumunda overlay'i göster */}
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
