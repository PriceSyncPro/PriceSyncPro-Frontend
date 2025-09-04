// components/auth/AuthGuard.tsx
'use client';

import { useEffect, ReactNode, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/utils/contexts/AuthContext';

interface AuthGuardProps {
    children: ReactNode;
    requireAuth?: boolean;
    requiredRole?: string;
    redirectTo?: string;
    loadingComponent?: ReactNode;
}

export default function AuthGuard({
                                      children,
                                      requireAuth = true,
                                      requiredRole,
                                      redirectTo = requireAuth ? '/signin' : '/',
                                      loadingComponent = <div className="flex items-center justify-center min-h-screen">
                                          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                                      </div>
                                  }: AuthGuardProps) {
    const { isAuthenticated, loading, user } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    // Yönlendirme işleminin devam ettiğini takip etmek için ref
    const isRedirecting = useRef(false);

    // Ana kontrol - Yönlendirme mantığını düzelttik
    useEffect(() => {
        if (!loading && !isRedirecting.current) {
            // Giriş gerektiren sayfa ve kullanıcı giriş yapmamış
            if (requireAuth && !isAuthenticated) {
                if (pathname !== redirectTo) {
                    isRedirecting.current = true;
                    router.replace(redirectTo);
                    setTimeout(() => {
                        isRedirecting.current = false;
                    }, 1000);
                }
            }
            // Giriş yapmışsa erişilemeyen sayfa ve kullanıcı giriş yapmış
            else if (!requireAuth && isAuthenticated) {
                if (pathname !== redirectTo) {
                    isRedirecting.current = true;
                    router.replace(redirectTo);
                    setTimeout(() => {
                        isRedirecting.current = false;
                    }, 1000);
                }
            }
        }
    }, [isAuthenticated, loading, requireAuth, requiredRole, redirectTo, router, user, pathname]);

    // Yükleme durumunda
    if (loading) {
        return <>{loadingComponent}</>;
    }

    // Giriş gerektiren sayfa ve kullanıcı giriş yapmamış
    if (requireAuth && !isAuthenticated) {
        return <>{loadingComponent}</>;
    }

    // Giriş yapmışsa erişilemeyen sayfa ve kullanıcı giriş yapmış
    if (!requireAuth && isAuthenticated) {
        return <>{loadingComponent}</>;
    }

    // Rol kontrolü

    // Koşullar sağlanıyorsa içeriği göster
    return <>{children}</>;
}
