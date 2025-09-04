// app/credit/layout.tsx
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Kurallar | PriceSyncPro',
    description: 'Rapor kuralları.',
};

interface RulesProps {
    children: React.ReactNode;
}

export default function Rules({ children }: RulesProps) {
    return (
                <>{children}</>
    );
}
