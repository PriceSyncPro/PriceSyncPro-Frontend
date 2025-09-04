// app/credit/layout.tsx
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Kredi Yükle | PriceSyncPro',
    description: 'Hesabınıza bakiye yükleyin, kredi kartı veya kupon ile kredi yükleyebilirsiniz.',
};

interface DepositCreditProps {
    children: React.ReactNode;
}

export default function DepositCredit({ children }: DepositCreditProps) {
    return (
                <>{children}</>
    );
}
