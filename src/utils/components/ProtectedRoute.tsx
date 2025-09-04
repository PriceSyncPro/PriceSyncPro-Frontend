'use client';

import {JSX, ReactNode, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
    children: ReactNode;
    requiredPermission?: string;
}

export default function ProtectedRoute({
                                           children,
                                           requiredPermission
                                       }: ProtectedRouteProps): JSX.Element | null {
    const { user, loading, hasPermission } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/signin');
            } else if (requiredPermission && !hasPermission(requiredPermission)) {
                router.push('/unauthorized');
            }
        }
    }, [user, loading, requiredPermission, hasPermission, router]);

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white/90 z-50">
                <div className="flex flex-col items-center">
                    {/* Minimalist yükleme çemberi */}
                    <div className="w-12 h-12 border-2 border-gray-200 border-t-gray-800 rounded-full animate-spin mb-4"></div>

                    {/* Basit metin */}
                    <p className="text-gray-700 text-sm font-light tracking-wider">Yükleniyor</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    if (requiredPermission && !hasPermission(requiredPermission)) {
        return null;
    }

    return <>{children}</>;
}