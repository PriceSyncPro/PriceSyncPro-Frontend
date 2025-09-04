// app/credit/layout.tsx
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Kural Ekleme | PriceSyncPro',
    description: 'Rapor kuralı ekleme.',
};

interface RulesProps {
    children: React.ReactNode;
}

export default function Rules({ children }: RulesProps) {
    return (
                <>{children}</>
    );
}
