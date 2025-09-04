// app/credit/layout.tsx
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Ürün Ekle | PriceSyncPro',
    description: 'Ürünlerinizi ekleyebilirsiniz.',
};

interface AddProductProps {
    children: React.ReactNode;
}

export default function AddProduct({ children }: AddProductProps) {
    return (
                <>{children}</>
    );
}
