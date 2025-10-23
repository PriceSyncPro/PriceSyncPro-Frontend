"use client";
import React, { JSX, useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { ProductService } from "@/utils/api/services/productService";
import { ruleService } from "@/utils/api/services/ruleService";
import { Product } from "@/utils/types/Product";
import { CreateRuleRequest } from "@/utils/types/Rule";
import { toast } from "sonner";

// Kural tipleri - ID 1 mutlaka bulunmalı
const RULE_TYPES = [
    { id: 1, name: "Temel Kural", icon: "⚙️", description: "Basit kurallar için" },
    { id: 2, name: "Fiyat Kuralı", icon: "💰", description: "Fiyat tabanlı kurallar" },
    { id: 3, name: "Stok Kuralı", icon: "📦", description: "Stok yönetimi kuralları" },
    { id: 4, name: "İndirim Kuralı", icon: "🎯", description: "İndirim ve kampanya kuralları" }
];

interface ApiErrorResponse {
    response?: {
        data?: {
            errorMessages?: string[];
            message?: string;
        };
    };
    message?: string;
}

export default function Page(): JSX.Element {
    const [showForm, setShowForm] = useState(false);
    const [selectedRuleType, setSelectedRuleType] = useState<number>(1);
    const [selectedProductId, setSelectedProductId] = useState<string>("");
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const router = useRouter();
    

    // Ürünleri yükle
    useEffect(() => {
        const fetchProducts = async () => {
            if (showForm) {
                setLoading(true);
                try {
                    const response = await ProductService.getAll(1, 100);
                    if (response.isSuccessful && response.data && response.data.items) {
                        setProducts(response.data.items as unknown as Product[]);
                    }
                } catch (error) {
                    console.error("Ürünler yüklenirken hata:", error);
                    toast.error('Ürünler yüklenirken hata oluştu');
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchProducts();
    }, [showForm]);

    const handleAddRule = async () => {
    // Hata mesajlarını temizle
    setErrorMessages([]);
    
    if (!selectedProductId) {
        const errorMsg = "Lütfen kural oluşturmak için bir ürün seçin!";
        setErrorMessages([errorMsg]);
        toast.error(errorMsg);
        return;
    }
    setSubmitting(true);
    try {
    const ruleData: CreateRuleRequest = {
        ruleType: selectedRuleType,
        productId: selectedProductId
    };
    const response = await ruleService.createRule(ruleData);
    
    if (response.isSuccessful) {
        const selectedProduct = getSelectedProduct();
        const selectedRuleTypeName = RULE_TYPES.find(rt => rt.id === selectedRuleType)?.name || "Kural";
        
        toast.success(`${selectedProduct?.name} ürünü için ${selectedRuleTypeName} başarıyla eklendi. Artık bu kural aktif olarak çalışacak.`);
        
        // Formu sıfırla
        setShowForm(false);
        setSelectedRuleType(1);
        setSelectedProductId("");
        setErrorMessages([]);
    } else {
        // API'den gelen hata mesajlarını state'e kaydet
        const errors = response.errorMessages || ["Bilinmeyen bir hata oluştu. Lütfen tekrar deneyin."];
        setErrorMessages(errors);
    }
} catch (error) {
    console.error("Kural ekleme hatası:", error);
    
    const apiError = error as ApiErrorResponse;
    let errorMessages: string[] = ["Sunucu ile bağlantı kurulurken bir hata oluştu. Lütfen tekrar deneyin."];
    
    if (apiError.response?.data?.errorMessages && Array.isArray(apiError.response.data.errorMessages)) {
        errorMessages = apiError.response.data.errorMessages;
    } else if (apiError.response?.data?.message) {
        errorMessages = [apiError.response.data.message];
    } else if (apiError.message) {
        errorMessages = [apiError.message];
    }
    
    setErrorMessages(errorMessages);
} finally {
    setSubmitting(false);
}
};

    const resetForm = () => {
        setShowForm(false);
        setSelectedRuleType(1);
        setSelectedProductId("");
        setErrorMessages([]);
    };

    const getSelectedProduct = () => {
        return products.find(product => product.id === selectedProductId);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                        <span className="text-2xl">🔧</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        Kural Yönetimi - Kural Ekle
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Akıllı kurallar oluşturarak ürünlerinizi otomatik olarak yönetin ve iş süreçlerinizi optimize edin
                    </p>
                </div>

                {!showForm ? (
                    /* Ana Sayfa */
                    <div className="space-y-6">

                        {/* Kural Tipleri Önizleme */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                                Mevcut Kural Tipleri
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                {RULE_TYPES.map((ruleType) => (
                                    <div key={ruleType.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                                        <div className="flex items-center mb-2">
                                            <span className="text-2xl mr-3">{ruleType.icon}</span>
                                            <div>
                                                <h4 className="font-medium text-gray-900 dark:text-white">
                                                    {ruleType.name}
                                                </h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {ruleType.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="text-center">
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                                >
                                    <span className="mr-2 text-xl">➕</span>
                                    Yeni Kural Oluştur
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Kural Ekleme Formu */
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        {/* Form Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="p-2 bg-white bg-opacity-20 rounded-lg mr-4">
                                        <span className="text-2xl">✨</span>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">
                                            Yeni Kural Oluştur
                                        </h2>
                                        <p className="text-blue-100">
                                            Ürününüz için özel kural tanımlayın
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={resetForm}
                                    className="text-white hover:text-blue-200 p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all duration-200"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="space-y-8">
                                {/* Kural Tipi Seçimi */}
                                <div>
                                    <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        Kural Tipi Seçin
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {RULE_TYPES.map((ruleType) => (
                                            <div
                                                key={ruleType.id}
                                                onClick={() => setSelectedRuleType(ruleType.id)}
                                                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                                                    selectedRuleType === ruleType.id
                                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900 shadow-lg'
                                                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                                                }`}
                                            >
                                                <div className="flex items-center">
                                                    <span className="text-3xl mr-4">{ruleType.icon}</span>
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold text-gray-900 dark:text-white">
                                                            {ruleType.name}
                                                        </h4>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                            {ruleType.description}
                                                        </p>
                                                    </div>
                                                    {selectedRuleType === ruleType.id && (
                                                        <div className="text-blue-500">
                                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Ürün Seçimi */}
                                <div>
                                    <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        Ürün Seçin
                                        {selectedProductId && (
                                            <span className="ml-2 text-sm text-blue-600 dark:text-blue-400">
                                                (Seçili: {getSelectedProduct()?.name})
                                            </span>
                                        )}
                                    </label>
                                    {loading ? (
    <div className="flex items-center justify-center py-12 bg-gray-50 dark:bg-gray-700 rounded-xl">
        <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Ürünler yükleniyor...</p>
        </div>
    </div>
) : products.length === 0 ? (
    <div className="flex items-center justify-center py-12 bg-gray-50 dark:bg-gray-700 rounded-xl">
        <div className="text-center">
            <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg flex items-center justify-center">
                    <span className="text-2xl text-white">📦</span>
                </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-medium mb-4">
                Ürün bulunamadı. Ürün eklemek için tıklayınız.
            </p>
            <button
                onClick={() => router.push('/dashboard/add-product')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
                Ürün Ekle
            </button>
        </div>
    </div>
) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-96 overflow-y-auto p-2">
        {products.map((product) => (
            <div
                key={product.id}
                onClick={() => setSelectedProductId(product.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedProductId === product.id
                        ? 'border-green-500 bg-green-50 dark:bg-green-900 shadow-lg'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-gray-50 dark:bg-gray-700'
                }`}
            >
                <div className="text-center">
                    <div className="mb-3">
                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                            <span className="text-2xl text-white">📦</span>
                        </div>
                    </div>
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1 line-clamp-2">
                        {product.name}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {product.productStatus === 1 ? "Aktif" : "Pasif"}
                    </p>
                    {selectedProductId === product.id && (
                        <div className="mt-2 text-green-500">
                            <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                    )}
                </div>
            </div>
        ))}
    </div>
)}
                                </div>

                                {/* Hata Mesajları */}
                                {errorMessages.length > 0 && (
                                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div className="ml-4 flex-1">
                                                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
                                                    Kural Oluşturulamadı
                                                </h3>
                                                <div className="space-y-2">
                                                    {errorMessages.map((error, index) => (
                                                        <div key={index} className="flex items-start">
                                                            <div className="flex-shrink-0 mt-1">
                                                                <div className="w-2 h-2 bg-red-500 dark:bg-red-400 rounded-full"></div>
                                                            </div>
                                                            <p className="ml-3 text-red-700 dark:text-red-300 text-sm leading-relaxed">
                                                                {error}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                                <button
                                                    onClick={() => setErrorMessages([])}
                                                    className="mt-4 inline-flex items-center px-3 py-1.5 bg-red-100 dark:bg-red-800 hover:bg-red-200 dark:hover:bg-red-700 text-red-800 dark:text-red-200 text-sm font-medium rounded-lg transition-colors duration-200"
                                                >
                                                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                    Kapat
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-600">
                                    <button
                                        onClick={handleAddRule}
                                        disabled={submitting || !selectedProductId}
                                        className="flex-1 inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none transition-all duration-200"
                                    >
                                        {submitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                                Kural Oluşturuluyor...
                                            </>
                                        ) : (
                                            <>
                                                <span className="mr-2 text-xl">🚀</span>
                                                Kuralı Oluştur
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={resetForm}
                                        disabled={submitting}
                                        className="flex-1 sm:flex-none px-8 py-4 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none transition-all duration-200"
                                    >
                                        İptal
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
