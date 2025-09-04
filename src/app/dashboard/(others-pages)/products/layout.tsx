// app/credit/layout.tsx
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Ürünlerim | PriceSyncPro',
    description: 'Ürünlerim',
};

interface ProductsProps {
    children: React.ReactNode;
}

export default function Products({ children }: ProductsProps) {
    return (
                <>{children}</>
    );
}
