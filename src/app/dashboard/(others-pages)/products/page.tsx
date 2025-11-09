"use client";
import React, { useState, useEffect, useCallback } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import ProductsPage from "@/components/products/ProductsPage";
import { Product } from "@/utils/types/Products";
import type { Pagination, Statistic } from "@/utils/types/Products";
import { ProductService } from "@/utils/api/services/productService";
import { getProductStatusFromTab } from "@/utils/helpers/productHelpers";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useDeleteModal } from "@/hooks/useModall";

export default function Products() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [currentTab, setCurrentTab] = useState<string>("all");
    const [animateClass, setAnimateClass] = useState("opacity-0 translate-y-4");
    const currentPage = Number(searchParams.get("page") || 1);

    const [products, setProducts] = useState<Product[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [statistic, setStatistic] = useState<Statistic | null>(null);
    const [globalStatistics, setGlobalStatistics] = useState<Statistic | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Ürünleri getir - useCallback ile optimize edildi
    const fetchProducts = useCallback(async (
        pageNumber: number = currentPage,
        tabKey: string = currentTab,
        skipGlobalStats: boolean = false,
        signal?: AbortSignal
    ) => {
        try {
            setIsLoading(true);
            setError(null);

            const productStatus = getProductStatusFromTab(tabKey);
            const response = await ProductService.getAll(pageNumber, 10, productStatus);

            // AbortController ile iptal edildiyse işlem yapma
            if (signal?.aborted) return;

            if (response.isSuccessful && response.data.items) {
                setProducts(response.data.items as unknown as Product[]);
                setPagination(response.data.metadata?.pagination || null);

                const stats = response.data.metadata?.Statistics;
                setStatistic(stats || null);

                if (!skipGlobalStats && (tabKey === "all" || !globalStatistics)) {
                    if (stats) {
                        setGlobalStatistics(stats);
                    }
                }
            } else {
                const errorMessage = response.errorMessages?.[0] || "Ürünler yüklenirken bir hata oluştu";

                if (response.statusCode === 404) {
                    setProducts([]);
                    setPagination(null);
                    setError(null);
                } else {
                    setProducts([]);
                    setPagination(null);
                    setError(errorMessage);
                    toast.error(errorMessage);
                }
            }
        } catch (err: any) {
            // AbortError'u ignore et
            if (err?.name === 'AbortError') return;

            console.error("Ürünler yüklenirken hata:", err);
            const errorMessage = "Ürünler yüklenirken bir hata oluştu";
            setError(errorMessage);
            setProducts([]);
            setPagination(null);
            toast.error(errorMessage);
        } finally {
            if (!signal?.aborted) {
                setIsLoading(false);
            }
        }
    }, []); // Bağımlılıksız, sadece fonksiyon tanımı değişmesin

    // Sayfa veya tab değiştiğinde veri çek - AbortController ile optimize edildi
    useEffect(() => {
        const controller = new AbortController();

        fetchProducts(currentPage, currentTab, false, controller.signal);

        return () => {
            controller.abort(); // Cleanup: önceki isteği iptal et
        };
    }, [currentPage, currentTab, fetchProducts]);

    // Animasyon için
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimateClass("opacity-100 translate-y-0 transition-all duration-700");
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const handlePageChange = useCallback((newPage: number) => {
        router.push(`?page=${newPage}`);
    }, [router]);

    // Delete modal hook
    const { openDeleteModal, DeleteModal } = useDeleteModal({
        onDelete: async (id: string) => {
            try {
                const response = await ProductService.delete(id);
                if (response.isSuccessful) {
                    toast.success("Ürün başarıyla silindi");

                    if (products.length === 1 && pagination && pagination.currentPage > 1) {
                        handlePageChange(pagination.currentPage - 1);
                    } else {
                        await fetchProducts(currentPage, currentTab);
                    }
                } else {
                    const errorMessage = response.errorMessages?.[0] || "Ürün silinirken bir hata oluştu";
                    toast.error(errorMessage);
                }
            } catch (err) {
                console.error("Ürün silinirken hata:", err);
                toast.error("Ürün silinirken bir hata oluştu");
            }
        },
        title: "Ürünü Sil",
        description: "Bu ürünü silmek istediğinizden emin misiniz? Bu işlem geri alınamaz ve ürün kalıcı olarak silinecektir."
    });

    const handleApproveProduct = useCallback(async (product: Product) => {
        try {
            const response = await ProductService.update(product.id, { productStatus: 5 });
            if (response.isSuccessful) {
                toast.success("Ürün başarıyla onaylandı");
                await fetchProducts(currentPage, currentTab);
            } else {
                const errorMessage = response.errorMessages?.[0] || "Ürün onaylanırken bir hata oluştu";
                toast.error(errorMessage);
            }
        } catch (err) {
            console.error("Ürün onaylanırken hata:", err);
            toast.error("Ürün onaylanırken bir hata oluştu");
        }
    }, [currentPage, currentTab, fetchProducts]);

    const handleAddProduct = useCallback(() => {
        router.push("/dashboard/add-product");
    }, [router]);

    const handleEditProduct = useCallback((product: Product) => {
        router.push(`/product/edit/${product.id}`);
    }, [router]);

    const handleTabChange = useCallback((tabKey: string) => {
        setCurrentTab(tabKey);
        router.push(window.location.pathname);
    }, [router]);

    const handleSupport = useCallback(() => {
        router.push("/support");
    }, [router]);

    // Error Component - Memoize edildi
    const ErrorComponent = useCallback(() => (
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
                        onClick={() => fetchProducts(currentPage, currentTab)}
                        className="flex items-center mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded-md shadow-md dark:shadow-gray-800/20 transition"
                    >
                        <svg
                            className="w-5 h-5 mr-1"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
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
    ), [error, animateClass, currentPage, currentTab, fetchProducts, handleSupport]);

    if (error && error !== "Ürün bulunamadı.") {
        return <ErrorComponent />;
    }

    return (
        <div className={animateClass}>
            <ProductsPage
                products={products}
                onDelete={openDeleteModal}
                onEdit={handleEditProduct}
                onAdd={handleAddProduct}
                onApprove={handleApproveProduct}
                pagination={pagination}
                onPageChange={handlePageChange}
                onTabChange={handleTabChange}
                activeTab={currentTab}
                statistic={globalStatistics || statistic}
                isLoading={isLoading}
            />

            <DeleteModal />
        </div>
    );
}