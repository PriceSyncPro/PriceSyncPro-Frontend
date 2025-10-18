"use client";
import React, { useState, useMemo, useCallback, memo } from "react";
import { Product, Statistic } from "@/utils/types/Products";
import { Pagination as PaginationType } from "@/utils/types/Pagination";
import {
    Package,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getStatusText,getStatusInfo,getTabColor, createProductGroups, renderSmallEmptyMessage } from "./ProductsPageFunctions";
import Pagination from "./ProductsPagination";
import ProductDesktopTable from "./ProductsDesktopTable";
import ProductMobileCards from "./ProductMobileCards";



interface ProductsPageProps {
    products: Product[];
    onDelete: (id: string) => void;
    onEdit: (product: Product) => void;
    onAdd: () => void;
    onApprove?: (product: Product) => void;
    pagination?: PaginationType | null;
    onPageChange?: (page: number) => void;
    onTabChange?: (tabKey: string) => void;
    activeTab?: string;
    statistic?: Statistic | null;
    isLoading?: boolean; // Loading state prop'u eklendi
}

// Tab Content Loading Component
const TabContentLoading = memo(function TabContentLoading() {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="mb-6">
                <svg
                    className="w-12 h-12 text-indigo-500 dark:text-indigo-400 animate-spin"
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
            <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">Yükleniyor...</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Ürünler getiriliyor...</p>
        </div>
    );
});

const ProductsPage = memo(function ProductsPage({
    products,
    onDelete,
    onEdit,
    onAdd,
    onApprove,
    pagination,
    onPageChange,
    onTabChange,
    activeTab = "all",
    statistic,
    isLoading = false
}: ProductsPageProps) {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [contentKey, setContentKey] = useState<string>(activeTab); // For animation trigger
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Handle tab change animation
    React.useEffect(() => {
        if (activeTab !== contentKey) {
            setIsTransitioning(true);
            const timer = setTimeout(() => {
                setContentKey(activeTab);
                setIsTransitioning(false);
            }, 150); // Half of transition duration
            return () => clearTimeout(timer);
        }
    }, [activeTab, contentKey]);

    // Memoized minimalist button styles for better performance
    const addButtonClassName = useMemo(() =>
        "bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 font-medium transition-colors duration-150 whitespace-nowrap w-full sm:w-auto rounded-md flex items-center justify-center",
        []
    );

    // Memoized Plus icon to avoid re-rendering
    const PlusIcon = useMemo(() => (
        <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
    ), []);

    // Memoized native button for maximum performance
    const AddButton = useMemo(() => (
        <button
            onClick={onAdd}
            className={addButtonClassName}
            type="button"
        >
            {PlusIcon}
            Yeni Ürün Ekle
        </button>
    ), [onAdd, addButtonClassName, PlusIcon]);

    // Memoize expensive product grouping calculation
    const productsGroups = useMemo(() => createProductGroups(products), [products]);

    const {
        approved: approvedProducts,
        awaitingApproval: awaitingApprovalProducts,
        pending: pendingProducts,
        rejected: rejectedProducts,
        error: errorProducts,
        inactive: inactiveProducts
    } = productsGroups;


    // Memoized product list render function with bug fix
    const renderProductList = useCallback((productList: Product[], title: string, description: string, className: string = "") => {
        return isMobile ?
            <ProductMobileCards
                productList={productList}
                title={title}
                description={description}
                className={className}
                onEdit={onEdit}
                onDelete={onDelete}
                onApprove={onApprove}
                getStatusInfo={getStatusInfo}
                getStatusText={getStatusText}
            />
            :
            <ProductDesktopTable
                productList={productList}
                title={title}
                description={description}
                className={className}
                onEdit={onEdit}
                onDelete={onDelete}
                onApprove={onApprove}
                getStatusInfo={getStatusInfo}
                getStatusText={getStatusText}
            />;
    }, [isMobile, onEdit, onDelete, onApprove]);

    // Memoized empty state component
    const renderEmptyState = useCallback(() => {
        return (
            <div className="text-center py-12 px-4">
                <div className="max-w-md mx-auto">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center shadow-lg">
                        <Package className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        Henüz ürün bulunmuyor
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Ürün eklemek için yukarıdaki &quot;Yeni Ürün Ekle&quot; butonunu kullanabilirsiniz.
                    </p>
                </div>
            </div>
        );
    }, []);

    // Memoized Custom Tab Component
    const CustomTab = memo(function CustomTab({ tabKey, label, count, isActive, onClick }: {
        tabKey: string;
        label: string;
        count: number;
        isActive: boolean;
        onClick: () => void;
    }) {
        const colors = useMemo(() => getTabColor(tabKey), [tabKey]);
        
        return (
            <button
                onClick={onClick}
                className={`px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium transition-all duration-200 rounded-lg whitespace-nowrap ${
                    isActive
                        ? `bg-white dark:bg-gray-700 shadow-sm ${colors.activeColor}`
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
            >
                <span className="block sm:inline">{label}</span>
                <span className={`ml-1 sm:ml-2 px-1.5 sm:px-2 py-0.5 text-xs font-semibold rounded-full ${
                    count > 0 && isActive
                        ? colors.count
                        : count > 0
                            ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                    {count}
                </span>
            </button>
        );
    });

    // Memoized tab data - Önce statistic verilerini kullan, yoksa 0 göster
    const tabData = useMemo(() => [
        { key: "all", label: "Tümü", count: statistic?.totalCount ?? 0 },
        { key: "approved", label: "Onaylı", count: statistic?.approvedCount ?? 0 },
        { key: "awaiting", label: isMobile ? "Onay Bek." : "Onay Bekleyen", count: statistic?.awaitingApprovalCount ?? 0 },
        { key: "pending", label: "Beklemede", count: statistic?.pendingCount ?? 0 },
        { key: "rejected", label: isMobile ? "Red" : "Reddedilen", count: statistic?.deniedCount ?? 0 },
        { key: "error", label: "Hatalı", count: statistic?.errorCount ?? 0 },
        { key: "inactive", label: "İnaktif", count: statistic?.inactiveCount ?? 0 }
    ], [statistic, isMobile]);

    
    // Memoized tab change handler with animation
    const handleTabChange = useCallback((tabKey: string) => {
        if (onTabChange && tabKey !== activeTab) {
            onTabChange(tabKey);
        }
    }, [onTabChange, activeTab]);

    // Memoized active tab content
    const getActiveTabContent = useMemo(() => {
        const contentMap = {
            all: () => (
                <div className="space-y-8">
                    {awaitingApprovalProducts.length > 0 && renderProductList(awaitingApprovalProducts, "Onay Bekleyen Ürünler", "Bu ürünler eşleştirme yapılmış ve onayınızı bekliyor.")}
                    {approvedProducts.length > 0 && renderProductList(approvedProducts, "Onaylanmış Ürünler", "Bu ürünler onaylanmış ve aktif durumdadır.")}
                    {pendingProducts.length > 0 && renderProductList(pendingProducts, "Beklemedeki Ürünler", "Bu ürünler işlem sırasında bekliyor.")}
                    {rejectedProducts.length > 0 && renderProductList(rejectedProducts, "Reddedilen Ürünler", "Bu ürünler reddedilmiş durumda.")}
                    {errorProducts.length > 0 && renderProductList(errorProducts, "Hatalı Ürünler", "Bu ürünlerde hata oluştu.")}
                    {inactiveProducts.length > 0 && renderProductList(inactiveProducts, "İnaktif Ürünler", "Bu ürünler şu anda aktif değil.")}
                    {products.length === 0 && renderSmallEmptyMessage("Tümü")}
                </div>
            ),
            approved: () => approvedProducts.length > 0 ?
                renderProductList(approvedProducts, "Onaylanmış Ürünler", "Bu ürünler onaylanmış ve aktif durumdadır.") :
                renderSmallEmptyMessage("Onaylı"),
            awaiting: () => awaitingApprovalProducts.length > 0 ?
                renderProductList(awaitingApprovalProducts, "Onay Bekleyen Ürünler", "Bu ürünler eşleştirme yapılmış ve onayınızı bekliyor.") :
                renderSmallEmptyMessage("Onay Bekleyen"),
            pending: () => pendingProducts.length > 0 ?
                renderProductList(pendingProducts, "Beklemedeki Ürünler", "Bu ürünler işlem sırasında bekliyor.") :
                renderSmallEmptyMessage("Beklemede"),
            rejected: () => rejectedProducts.length > 0 ?
                renderProductList(rejectedProducts, "Reddedilen Ürünler", "Bu ürünler reddedilmiş durumda.") :
                renderSmallEmptyMessage("Reddedilen"),
            error: () => errorProducts.length > 0 ?
                renderProductList(errorProducts, "Hatalı Ürünler", "Bu ürünlerde hata oluştu.") :
                renderSmallEmptyMessage("Hatalı"),
            inactive: () => inactiveProducts.length > 0 ?
                renderProductList(inactiveProducts, "İnaktif Ürünler", "Bu ürünler şu anda aktif değil.") :
                renderSmallEmptyMessage("İnaktif")
        };

        return contentMap[activeTab as keyof typeof contentMap]?.() || contentMap.all();
    }, [activeTab, awaitingApprovalProducts, approvedProducts, pendingProducts, rejectedProducts, errorProducts, inactiveProducts, products.length, renderProductList]);

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 shadow-sm">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        Ürünlerim
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                        Tüm ürünlerinizi tek yerden yönetin ve durumlarını takip edin.
                    </p>
                </div>
                {AddButton}
            </div>

            <Card className="border-0 shadow-sm">
                <CardContent className="p-4 sm:p-6">
                    <div className="space-y-4 sm:space-y-6">
                        {/* Custom Tab List - Her zaman görünür */}
                        <ScrollArea className="w-full">
                            <div className="flex space-x-1 sm:space-x-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl min-w-max">
                                {tabData.map((tab) => (
                                    <CustomTab
                                        key={tab.key}
                                        tabKey={tab.key}
                                        label={tab.label}
                                        count={tab.count}
                                        isActive={activeTab === tab.key}
                                        onClick={() => handleTabChange(tab.key)}
                                    />
                                ))}
                            </div>
                        </ScrollArea>

                        {/* Tab Content with Animation */}
                        <div className="mt-6 sm:mt-8">
                            <div
                                className={`transition-all duration-300 ease-in-out ${
                                    isTransitioning
                                        ? 'opacity-0 translate-y-2'
                                        : 'opacity-100 translate-y-0'
                                }`}
                            >
                                {isLoading ? (
                                    <TabContentLoading />
                                ) : products.length === 0 && contentKey === "all" ? (
                                    renderEmptyState()
                                ) : (
                                    getActiveTabContent
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Pagination */}
                    <Pagination pagination={pagination} onPageChange={onPageChange}/>
                </CardContent>
            </Card>
        </div>
    );
});

export default ProductsPage;
