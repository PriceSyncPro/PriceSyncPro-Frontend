"use client";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import ProductsPage from "@/components/products/ProductsPage";
import { Product } from "@/utils/types/Products";
import type { Pagination, Statistic } from "@/utils/types/Products";
import { ProductService } from "@/utils/api/services/productService";
import { getProductStatusFromTab } from "@/utils/helpers/productHelpers";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";



// Data structure for cached products
interface ProductsData {
    products: Product[];
    pagination: Pagination | null;
    statistic: Statistic | null;
    error: string | null;
}

// Suspense-compatible data fetcher
class ProductsDataFetcher {
    private static cache = new Map<string, ProductsData>();
    private static promises = new Map<string, Promise<ProductsData>>();
    private static globalStatistic: Statistic | null = null; // Global statistic storage

    static fetchProducts(pageNumber: number = 1, tabKey: string = "all") {
        const cacheKey = `${pageNumber}-${tabKey}`;
        
        // Return cached data if available
        if (this.cache.has(cacheKey)) {
            const cachedData = this.cache.get(cacheKey)!;
            // Use global statistic if available and current data doesn't have complete statistic
            if (this.globalStatistic && (!cachedData.statistic || cachedData.statistic.totalCount === 0)) {
                return {
                    ...cachedData,
                    statistic: this.globalStatistic
                };
            }
            return cachedData;
        }

        // Return existing promise if already fetching
        if (this.promises.has(cacheKey)) {
            throw this.promises.get(cacheKey);
        }

        // Create new promise and throw it (Suspense pattern)
        const promise = this.fetchData(pageNumber, tabKey, cacheKey);
        this.promises.set(cacheKey, promise);
        throw promise;
    }

    private static async fetchData(pageNumber: number, tabKey: string, cacheKey: string) {
        try {
            const productStatus = getProductStatusFromTab(tabKey);
            const response = await ProductService.getAll(pageNumber, 10, productStatus);
            
            let result;
            if (response.isSuccessful && response.data.items) {
                const statistic = response.data.metadata?.statistic || null;
                
                // Store global statistic from "all" tab or if we don't have one yet
                if ((tabKey === "all" || !this.globalStatistic) && statistic && statistic.totalCount > 0) {
                    this.globalStatistic = statistic;
                }
                
                result = {
                    products: response.data.items as unknown as Product[],
                    pagination: response.data.metadata?.pagination || null,
                    statistic: this.globalStatistic || statistic, // Use global statistic if available
                    error: null
                };
            } else {
                const errorMessage = response.errorMessages?.[0] || "Ürünler yüklenirken bir hata oluştu";
                
                if (response.statusCode === 404) {
                    result = {
                        products: [],
                        pagination: null,
                        statistic: this.globalStatistic, // Use global statistic even for empty results
                        error: null
                    };
                } else {
                    result = {
                        products: [],
                        pagination: null,
                        statistic: this.globalStatistic, // Use global statistic for errors too
                        error: errorMessage
                    };
                    toast.error(errorMessage);
                }
            }

            // Cache the result
            this.cache.set(cacheKey, result);
            this.promises.delete(cacheKey);
            return result;
        } catch (err) {
            console.error("Ürünler yüklenirken hata:", err);
            const errorResult = {
                products: [],
                pagination: null,
                statistic: this.globalStatistic, // Use global statistic for network errors
                error: "Ürünler yüklenirken bir hata oluştu"
            };
            
            this.cache.set(cacheKey, errorResult);
            this.promises.delete(cacheKey);
            toast.error("Ürünler yüklenirken bir hata oluştu");
            return errorResult;
        }
    }

    static clearCache() {
        this.cache.clear();
        this.promises.clear();
        this.globalStatistic = null; // Clear global statistic too
    }

    static invalidateCache(cacheKey?: string) {
        if (cacheKey) {
            this.cache.delete(cacheKey);
            this.promises.delete(cacheKey);
        } else {
            this.clearCache();
        }
    }

    static refreshGlobalStatistic() {
        // Force refresh global statistic by fetching "all" tab
        this.invalidateCache("1-all");
        this.globalStatistic = null;
    }

    static updateCachedProducts(cacheKey: string, newProducts: Product[]) {
        const currentData = this.cache.get(cacheKey);
        if (currentData) {
            this.cache.set(cacheKey, {
                ...currentData,
                products: newProducts
            });
        }
    }
}

// Hook that uses Suspense data fetcher
function useProductsData(currentPage: number, currentTab: string) {
    const data = ProductsDataFetcher.fetchProducts(currentPage, currentTab);
    
    const refreshData = useCallback(() => {
        ProductsDataFetcher.invalidateCache(`${currentPage}-${currentTab}`);
    }, [currentPage, currentTab]);

    const updateProducts = useCallback((newProducts: Product[]) => {
        const cacheKey = `${currentPage}-${currentTab}`;
        ProductsDataFetcher.updateCachedProducts(cacheKey, newProducts);
    }, [currentPage, currentTab]);

    return {
        ...data,
        refreshData,
        updateProducts
    };
}

// Main Products Component
function ProductsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [currentTab, setCurrentTab] = useState<string>("all");
    const [animateClass, setAnimateClass] = useState("opacity-0 translate-y-4");
    const currentPage = Number(searchParams.get("page") || 1);

    // Loading state'i track etmek için
    const [isDataLoading, setIsDataLoading] = useState(false);
    
    // Suspense ile data fetch etmeye çalış, loading state'i yakala
    let products, pagination, statistic, error, refreshData, updateProducts;
    try {
        const data = useProductsData(currentPage, currentTab);
        products = data.products;
        pagination = data.pagination;
        statistic = data.statistic;
        error = data.error;
        refreshData = data.refreshData;
        updateProducts = data.updateProducts;
    } catch (promise) {
        // Promise throw edildiğinde loading state'i set et
        if (promise instanceof Promise) {
            setIsDataLoading(true);
            promise.finally(() => setIsDataLoading(false));
        }
        throw promise; // Suspense için promise'i tekrar throw et
    }

    // Helper function is now imported at the top


    const handlePageChange = (newPage: number) => {
        router.push(`?page=${newPage}`);
    };

    // No useEffect needed - Suspense handles data fetching automatically

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimateClass("opacity-100 translate-y-0 transition-all duration-700");
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const handleDeleteProduct = async (id: string) => {
        // Toast ile onay mesajı göster
        toast.custom(
            (t) => (
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-lg max-w-md">
                    <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                Ürünü Sil
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Bu ürünü silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                        <button
                            onClick={async () => {
                                toast.dismiss(t);
                                await performDelete(id);
                            }}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            Sil
                        </button>
                        <button
                            onClick={() => toast.dismiss(t)}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            İptal
                        </button>
                    </div>
                </div>
            ),
            {
                duration: Infinity, // Manuel olarak kapatılana kadar açık kalsın
            }
        );
    };

    const performDelete = async (id: string) => {
        try {
            const response = await ProductService.delete(id);
            if (response.isSuccessful) {
                const filteredProducts = products?.filter((product: Product) => product.id !== id) || [];
                updateProducts(filteredProducts);
                toast.success("Ürün başarıyla silindi");
                
                // Refresh global statistic after deletion
                ProductsDataFetcher.refreshGlobalStatistic();
                
                if (filteredProducts.length === 0 && pagination && pagination.currentPage > 1) {
                    handlePageChange(pagination.currentPage - 1);
                } else {
                    refreshData();
                }
            } else {
                const errorMessage = response.errorMessages?.[0] || "Ürün silinirken bir hata oluştu";
                toast.error(errorMessage);
            }
        } catch (err) {
            console.error("Ürün silinirken hata:", err);
            toast.error("Ürün silinirken bir hata oluştu");
        }
    };

    const handleApproveProduct = async (product: Product) => {
        try {
            const response = await ProductService.update(product.id, { productStatus: 5 });
            if (response.isSuccessful) {
                const updatedProducts = products?.map((p: Product) => (p.id === product.id ? { ...p, productStatus: 5 } : p)) || [];
                updateProducts(updatedProducts);
                toast.success("Ürün başarıyla onaylandı");
                
                // Refresh global statistic after approval
                ProductsDataFetcher.refreshGlobalStatistic();
            } else {
                const errorMessage = response.errorMessages?.[0] || "Ürün onaylanırken bir hata oluştu";
                toast.error(errorMessage);
            }
        } catch (err) {
            console.error("Ürün onaylanırken hata:", err);
            toast.error("Ürün onaylanırken bir hata oluştu");
        }
    };

    const handleAddProduct = () => {
        router.push("/dashboard/add-product");
    };

    const handleEditProduct = (product: Product) => {
        router.push(`/product/edit/${product.id}`);
    };

    // Tab değişikliği handler'ı
    const handleTabChange = (tabKey: string) => {
        setCurrentTab(tabKey);
        // URL'den page parametresini kaldır ve yeni tab için ilk sayfadan başla
        router.push(window.location.pathname);
        // Suspense otomatik olarak yeni data'yı fetch edecek
    };

    // Destek butonunun tıklama işlemi için örnek yönlendirme
    const handleSupport = () => {
        router.push("/support");
    };

    // Sadece gerçek network hataları için hata ekranı göster, 404 değil
    if (error && error !== "Ürün bulunamadı.") {
        return (
            <ComponentCard title="Ürünlerim">
                <div className={`flex flex-col items-center py-12 px-4 space-y-6 ${animateClass}`}>
                    <div className="mx-auto w-16 h-16 relative">
                        <svg
                            className="absolute top-0 left-0 w-full h-full text-red-400 dark:text-red-500 animate-ping"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                        </svg>
                        <svg
                            className="relative w-full h-full text-red-500 dark:text-red-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">Bir Hata Oluştu!</h2>
                    <p className="text-base text-gray-700 dark:text-gray-300 text-center">{error}</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={refreshData}
                            className="flex items-center mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded-md shadow-md dark:shadow-gray-800/20 transition"
                        >
                            <svg
                                className="w-5 h-5 mr-1"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {/* Refresh Icon */}
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 4v6h6M20 20v-6h-6M4 20h6m4-16h6"
                                />
                            </svg>
                            Tekrar Deneyin
                        </button>
                        <button
                            onClick={handleSupport}
                            className="flex items-center mt-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white rounded-md shadow-md dark:shadow-gray-800/20 transition"
                        >
                            <svg
                                className="w-5 h-5 mr-1"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {/* Lifebuoy / Support Icon */}
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8.257 3.099c.765-1.36 2.674-1.36 3.439 0l1.286 2.289a1 1 0 00.753.546l2.516.366c1.396.203 1.955 1.916.945 2.89l-1.823 1.777a1 1 0 00-.287.885l.431 2.512c.242 1.409-1.24 2.48-2.483 1.81L12 16.347a1 1 0 00-.931 0l-2.256 1.185c-1.244.67-2.725-.401-2.483-1.81l.431-2.512a1 1 0 00-.287-.885L4.614 9.19c-1.01-.974-.451-2.687.945 2.89l2.516-.366a1 1 0 00.753-.546L8.257 3.1z"
                                />
                            </svg>
                            Destek
                        </button>
                    </div>
                </div>
            </ComponentCard>
        );
    }

    return (
        <div className={animateClass}>
            <ProductsPage
                products={products || []}
                onDelete={handleDeleteProduct}
                onEdit={handleEditProduct}
                onAdd={handleAddProduct}
                onApprove={handleApproveProduct}
                pagination={pagination}
                onPageChange={handlePageChange}
                onTabChange={handleTabChange}
                activeTab={currentTab}
                statistic={statistic}
                isLoading={isDataLoading}
            />
        </div>
    );
}

// Wrapper component for layout - Suspense sadece data fetch için
function ProductsWithLayout() {
    return (
        <div className="opacity-100 translate-y-0 transition-all duration-700">
            <Suspense fallback={<div />}>
                <ProductsContent />
            </Suspense>
        </div>
    );
}

// Main wrapper component
export default function Products() {
    return <ProductsWithLayout />;
}
