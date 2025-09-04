"use client";
import React, { useState, useEffect } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import ProductsPage from "@/components/products/ProductsPage";
import { Pagination, Product, Statistic } from "@/utils/types/Product";
import { ProductService } from "@/utils/api/services/productService";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";


export default function Products() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [statistic, setStatistic] = useState<Statistic | null>(null);
    const [currentTab, setCurrentTab] = useState<string>("all");
    // İçeriğin fade-in animasyonu için state
    const [animateClass, setAnimateClass] = useState("opacity-0 translate-y-4");
    // URL'den sayfa numarasını al veya varsayılan olarak 1 kullan
    const currentPage = Number(searchParams.get("page") || 1);

    // Tab key'ine göre productStatus değerini belirle
    const getProductStatusFromTab = (tabKey: string): number | undefined => {
        switch (tabKey) {
            case "approved": return 5;
            case "awaiting": return 4;
            case "pending": return 3;
            case "rejected": return 1;
            case "error": return 2;
            case "inactive": return 0;
            case "all":
            default:
                return undefined; // Tümü için productStatus gönderilmez
        }
    };

    const fetchProducts = async (pageNumber: number = 1, tabKey: string = currentTab) => {
        setLoading(true);
        try {
            const productStatus = getProductStatusFromTab(tabKey);
            const response = await ProductService.getAll(pageNumber, 10, productStatus);
            if (response.isSuccessful && response.data && response.data.items) {
                setProducts(response.data.items as unknown as Product[]);
                if (response.data.metadata?.pagination) {
                    setPagination(response.data.metadata.pagination);
                }
                if (response.data.metadata?.statistic) {
                    setStatistic(response.data.metadata.statistic);
                }
                setError(null);
            } else {
                const errorMessage =
                    response.errorMessages?.[0] || "Ürünler yüklenirken bir hata oluştu";
                
                // Eğer 404 hatası ise (herhangi bir tab için), boş ürün listesi göster
                if (response.statusCode === 404) {
                    setProducts([]);
                    setError(null);
                    setPagination(null);
                    // Statistic'i sıfırlama, önceki değeri koru
                } else {
                    // Sadece gerçek hatalar için error state'i set et
                    setError(errorMessage);
                    toast.error(errorMessage);
                }
            }
        } catch (err) {
            console.error("Ürünler yüklenirken hata:", err);
            // Network hataları vs. için error state'i set et
            setError("Ürünler yüklenirken bir hata oluştu");
            toast.error("Ürünler yüklenirken bir hata oluştu");
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage: number) => {
        router.push(`?page=${newPage}`);
    };

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    // Sayfa yüklendiğinde fade-in animasyonu için class bilgisini güncelle
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimateClass("opacity-100 translate-y-0 transition-all duration-700");
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const handleDeleteProduct = async (id: string) => {
        try {
            const response = await ProductService.delete(id);
            if (response.isSuccessful) {
                setProducts(products.filter((product) => product.id !== id));
                toast.success("Ürün başarıyla silindi");
                if (products.length === 1 && pagination && pagination.currentPage > 1) {
                    handlePageChange(pagination.currentPage - 1);
                } else {
                    fetchProducts(currentPage);
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
                setProducts(
                    products.map((p) => (p.id === product.id ? { ...p, productStatus: 5 } : p))
                );
                toast.success("Ürün başarıyla onaylandı");
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
        router.push("/product/add");
    };

    const handleEditProduct = (product: Product) => {
        router.push(`/product/edit/${product.id}`);
    };

    // Tab değişikliği handler'ı
    const handleTabChange = (tabKey: string) => {
        setCurrentTab(tabKey);
        // URL'den page parametresini kaldır ve yeni tab için ilk sayfadan başla
        router.push(window.location.pathname);
        fetchProducts(1, tabKey); // Yeni tab için ilk sayfadan başla
    };

    // Destek butonunun tıklama işlemi için örnek yönlendirme
    const handleSupport = () => {
        router.push("/support");
    };

    // Yüklenme ekranı: ComponentCard içinde orta nokta, ekranın tamamını kaplamaz
    if (loading) {
        return (
            <ComponentCard title="Ürünlerim">
                <div className={`flex flex-col items-center justify-center py-12 ${animateClass}`}>
                    <div className="mb-4">
                        <svg
                            className="w-16 h-16 text-indigo-500 dark:text-indigo-400 animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                        </svg>
                    </div>
                    <p className="text-xl text-gray-600 dark:text-gray-300 font-medium">Yükleniyor...</p>
                </div>
            </ComponentCard>
        );
    }

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
                            onClick={() => fetchProducts(currentPage)}
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
                products={products}
                onDelete={handleDeleteProduct}
                onEdit={handleEditProduct}
                onAdd={handleAddProduct}
                onApprove={handleApproveProduct}
                pagination={pagination}
                onPageChange={handlePageChange}
                onTabChange={handleTabChange}
                activeTab={currentTab}
                statistic={statistic}
            />
        </div>
    );
}
