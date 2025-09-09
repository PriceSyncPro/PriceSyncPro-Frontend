"use client";
import React, { useState } from "react";
import { Product, Statistic } from "@/utils/types/Products";
import { Pagination as PaginationType } from "@/utils/types/Pagination";
import { Button } from "@/components/ui/button";
import { 
    Plus, 
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
}

export default function ProductsPage({
    products,
    onDelete,
    onEdit,
    onAdd,
    onApprove,
    pagination,
    onPageChange,
    onTabChange,
    activeTab = "all",
    statistic
}: ProductsPageProps) {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    
    const productsGroups = createProductGroups(products)

    const approvedProducts = productsGroups.approved;
    const awaitingApprovalProducts = productsGroups.awaitingApproval;
    const pendingProducts = productsGroups.pending;
    const rejectedProducts = productsGroups.rejected;
    const errorProducts = productsGroups.error;
    const inactiveProducts = productsGroups.inactive;


    // Ürün listesi render fonksiyonu
    const renderProductList = (productList: Product[], title: string, description: string, className: string = "") => {
        return isMobile ? 
            <ProductMobileCards
                productList={approvedProducts}
                title="Onaylı Ürünler"
                description="Sistem tarafından onaylanmış ürünler"
                className={className} // optional
                onEdit={onEdit}
                onDelete={onDelete}
                onApprove={onApprove} // optional
                getStatusInfo={getStatusInfo}
                getStatusText={getStatusText}
            />
 :
            <ProductDesktopTable
                productList={approvedProducts}
                title="Onaylı Ürünler"
                description="Sistem tarafından onaylanmış ürünler"
                className={className} // optional
                onEdit={onEdit}
                onDelete={onDelete}
                onApprove={onApprove} // optional
                getStatusInfo={getStatusInfo}
                getStatusText={getStatusText}
            />;
    };

    // Modern boş durum mesajı
    const renderEmptyState = () => {
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
    };

    // Gelişmiş Custom Tab Component
    const CustomTab = ({ tabKey, label, count, isActive, onClick }: {
        tabKey: string;
        label: string;
        count: number;
        isActive: boolean;
        onClick: () => void;
    }) => {
        const colors = getTabColor(tabKey);
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
    };

    // Tab data - API'den gelen statistic verilerini kullan
    const tabData = [
        { key: "all", label: "Tümü", count: statistic?.totalCount || products.length },
        { key: "approved", label: "Onaylı", count: statistic?.approvedCount || approvedProducts.length },
        { key: "awaiting", label: isMobile ? "Onay Bek." : "Onay Bekleyen", count: statistic?.awaitingApprovalCount || awaitingApprovalProducts.length },
        { key: "pending", label: "Beklemede", count: statistic?.pendingCount || pendingProducts.length },
        { key: "rejected", label: isMobile ? "Red" : "Reddedilen", count: statistic?.deniedCount || rejectedProducts.length },
        { key: "error", label: "Hatalı", count: statistic?.errorCount || errorProducts.length },
        { key: "inactive", label: "İnaktif", count: statistic?.inactiveCount || inactiveProducts.length }
    ];

    
    // Get active tab content
    const getActiveTabContent = () => {
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
    };

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
                <Button
                    onClick={onAdd}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 sm:px-6 py-2.5 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 whitespace-nowrap w-full sm:w-auto"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Yeni Ürün Ekle
                </Button>
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
                                        onClick={() => {
                                            if (onTabChange) {
                                                onTabChange(tab.key);
                                            }
                                        }}
                                    />
                                ))}
                            </div>
                        </ScrollArea>

                        {/* Tab Content */}
                        <div className="mt-6 sm:mt-8">
                            {products.length === 0 && activeTab === "all" ? (
                                renderEmptyState()
                            ) : (
                                getActiveTabContent()
                            )}
                        </div>
                    </div>

                    {/* Pagination */}
                    <Pagination pagination={pagination} onPageChange={onPageChange}/>
                </CardContent>
            </Card>
        </div>
    );
}
