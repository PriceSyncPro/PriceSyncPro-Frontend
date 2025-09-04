"use client";
import React, { useState } from "react";
import { Product, Statistic } from "@/utils/types/Product";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
    Edit, 
    Trash2, 
    Plus, 
    Package, 
    CheckCircle, 
    Clock, 
    AlertCircle, 
    XCircle, 
    Link2, 
    ThumbsUp,
    MoreVertical,
    Calendar,
    Zap,
    AlertTriangle,
    Ban
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Pagination {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    hasPrevious: boolean;
    hasNext: boolean;
}

interface ProductsPageProps {
    products: Product[];
    onDelete: (id: string) => void;
    onEdit: (product: Product) => void;
    onAdd: () => void;
    onApprove?: (product: Product) => void;
    pagination?: Pagination | null;
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
    const [isMobile, setIsMobile] = useState(false);

    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Durum değerini metne dönüştürme
    const getStatusText = (statusCode: number): string => {
        switch (statusCode) {
            case 0: return 'İnaktif';
            case 1: return 'Reddedildi';
            case 2: return 'Hata';
            case 3: return 'Beklemede';
            case 4: return 'Onay Bekliyor';
            case 5: return 'Onaylandı';
            default: return 'Bilinmiyor';
        }
    };

    // Gelişmiş durum renklendirmeleri
    const getStatusInfo = (statusCode: number) => {
        const statusText = getStatusText(statusCode);
        switch (statusText) {
            case 'Onaylandı':
                return {
                    variant: "default",
                    icon: <CheckCircle className="h-3 w-3 md:h-4 md:w-4" />,
                    className: "bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/30 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800 shadow-sm",
                    bgColor: "bg-gradient-to-br from-emerald-50/80 to-emerald-100/50 dark:from-emerald-950/20 dark:to-emerald-900/10",
                    cardBg: "bg-emerald-50/30 dark:bg-emerald-950/10",
                    borderColor: "border-l-emerald-500 dark:border-l-emerald-400",
                    iconBg: "bg-emerald-100 dark:bg-emerald-900/40",
                    iconColor: "text-emerald-600 dark:text-emerald-400"
                };
            case 'Beklemede':
                return {
                    variant: "secondary",
                    icon: <Clock className="h-3 w-3 md:h-4 md:w-4" />,
                    className: "bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/30 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-800 shadow-sm",
                    bgColor: "bg-gradient-to-br from-amber-50/80 to-amber-100/50 dark:from-amber-950/20 dark:to-amber-900/10",
                    cardBg: "bg-amber-50/30 dark:bg-amber-950/10",
                    borderColor: "border-l-amber-500 dark:border-l-amber-400",
                    iconBg: "bg-amber-100 dark:bg-amber-900/40",
                    iconColor: "text-amber-600 dark:text-amber-400"
                };
            case 'Onay Bekliyor':
                return {
                    variant: "outline",
                    icon: <Calendar className="h-3 w-3 md:h-4 md:w-4" />,
                    className: "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800 shadow-sm",
                    bgColor: "bg-gradient-to-br from-blue-50/80 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/10",
                    cardBg: "bg-blue-50/30 dark:bg-blue-950/10",
                    borderColor: "border-l-blue-500 dark:border-l-blue-400",
                    iconBg: "bg-blue-100 dark:bg-blue-900/40",
                    iconColor: "text-blue-600 dark:text-blue-400"
                };
            case 'Reddedildi':
                return {
                    variant: "destructive",
                    icon: <XCircle className="h-3 w-3 md:h-4 md:w-4" />,
                    className: "bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800 shadow-sm",
                    bgColor: "bg-gradient-to-br from-red-50/80 to-red-100/50 dark:from-red-950/20 dark:to-red-900/10",
                    cardBg: "bg-red-50/30 dark:bg-red-950/10",
                    borderColor: "border-l-red-500 dark:border-l-red-400",
                    iconBg: "bg-red-100 dark:bg-red-900/40",
                    iconColor: "text-red-600 dark:text-red-400"
                };
            case 'Hata':
                return {
                    variant: "destructive",
                    icon: <AlertTriangle className="h-3 w-3 md:h-4 md:w-4" />,
                    className: "bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30 text-orange-800 dark:text-orange-200 border-orange-200 dark:border-orange-800 shadow-sm",
                    bgColor: "bg-gradient-to-br from-orange-50/80 to-orange-100/50 dark:from-orange-950/20 dark:to-orange-900/10",
                    cardBg: "bg-orange-50/30 dark:bg-orange-950/10",
                    borderColor: "border-l-orange-500 dark:border-l-orange-400",
                    iconBg: "bg-orange-100 dark:bg-orange-900/40",
                    iconColor: "text-orange-600 dark:text-orange-400"
                };
            case 'İnaktif':
                return {
                    variant: "outline",
                    icon: <Ban className="h-3 w-3 md:h-4 md:w-4" />,
                    className: "bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/30 dark:to-gray-800/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 shadow-sm",
                    bgColor: "bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-900/20 dark:to-gray-800/10",
                    cardBg: "bg-gray-50/30 dark:bg-gray-900/10",
                    borderColor: "border-l-gray-400 dark:border-l-gray-500",
                    iconBg: "bg-gray-100 dark:bg-gray-800/50",
                    iconColor: "text-gray-600 dark:text-gray-400"
                };
            default:
                return {
                    variant: "outline",
                    icon: <AlertCircle className="h-3 w-3 md:h-4 md:w-4" />,
                    className: "bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/30 dark:to-gray-800/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 shadow-sm",
                    bgColor: "bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-900/20 dark:to-gray-800/10",
                    cardBg: "bg-gray-50/30 dark:bg-gray-900/10",
                    borderColor: "border-l-gray-400 dark:border-l-gray-500",
                    iconBg: "bg-gray-100 dark:bg-gray-800/50",
                    iconColor: "text-gray-600 dark:text-gray-400"
                };
        }
    };

    // Tab renklendirmeleri
    const getTabColor = (tabKey: string) => {
        switch (tabKey) {
            case 'all':
                return {
                    activeColor: 'text-indigo-600 dark:text-indigo-400',
                    count: 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300'
                };
            case 'approved':
                return {
                    activeColor: 'text-emerald-600 dark:text-emerald-400',
                    count: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300'
                };
            case 'awaiting':
                return {
                    activeColor: 'text-blue-600 dark:text-blue-400',
                    count: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                };
            case 'pending':
                return {
                    activeColor: 'text-amber-600 dark:text-amber-400',
                    count: 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300'
                };
            case 'rejected':
                return {
                    activeColor: 'text-red-600 dark:text-red-400',
                    count: 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300'
                };
            case 'error':
                return {
                    activeColor: 'text-orange-600 dark:text-orange-400',
                    count: 'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300'
                };
            case 'inactive':
                return {
                    activeColor: 'text-gray-600 dark:text-gray-400',
                    count: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                };
            default:
                return {
                    activeColor: 'text-indigo-600 dark:text-indigo-400',
                    count: 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300'
                };
        }
    };

    // Ürünleri durumlarına göre grupla
    const approvedProducts = products.filter(p => p.productStatus === 5);
    const awaitingApprovalProducts = products.filter(p => p.productStatus === 4);
    const pendingProducts = products.filter(p => p.productStatus === 3);
    const rejectedProducts = products.filter(p => p.productStatus === 1);
    const errorProducts = products.filter(p => p.productStatus === 2);
    const inactiveProducts = products.filter(p => p.productStatus === 0);

    // Pagination kontrollerini render etme
    const renderPagination = () => {
        if (!pagination || !onPageChange) return null;
        return (
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/30 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="text-center sm:text-left">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">{pagination.totalCount}</span> ürün bulundu
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                        Sayfa {pagination.currentPage} / {pagination.totalPages}
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={!pagination.hasPrevious}
                        className="h-9 px-4 disabled:opacity-50 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => onPageChange(pagination.currentPage - 1)}
                    >
                        ← Önceki
                    </Button>
                    <div className="flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-medium shadow-sm">
                        {pagination.currentPage}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={!pagination.hasNext}
                        className="h-9 px-4 disabled:opacity-50 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => onPageChange(pagination.currentPage + 1)}
                    >
                        Sonraki →
                    </Button>
                </div>
            </div>
        );
    };

    // Gelişmiş mobil kart görünümü
    const renderMobileCard = (product: Product, title: string) => {
        const statusInfo = getStatusInfo(product.productStatus);
        const statusText = getStatusText(product.productStatus);
        const isAwaitingApproval = product.productStatus === 4;
        const isApproved = product.productStatus === 5;
        const showRemoteName = (isAwaitingApproval || isApproved) && product.remoteName;

        return (
            <Card 
                key={product.id} 
                className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50 border-l-4 ${statusInfo.borderColor} ${statusInfo.cardBg} backdrop-blur-sm`}
            >
                <CardContent className="p-4 sm:p-5">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                            <div className={`p-2.5 rounded-xl ${statusInfo.iconBg} shadow-sm`}>
                                <Package className={`h-5 w-5 ${statusInfo.iconColor}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base leading-tight mb-1">
                                    {product.name}
                                </h3>
                                {showRemoteName && (
                                    <div className="flex flex-col space-y-1 mt-1">
                                        {product.remoteUrl ? (
                                            <a 
                                                href={product.remoteUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className={`flex items-center space-x-1.5 hover:opacity-80 transition-opacity cursor-pointer`}
                                                title={`${product.remoteName} - Ürün sayfasına git`}
                                            >
                                                <Link2 className={`h-3.5 w-3.5 ${isApproved ? 'text-emerald-500' : 'text-blue-500'}`} />
                                                <span className={`text-xs font-medium truncate ${isApproved ? 'text-emerald-600 dark:text-emerald-400' : 'text-blue-600 dark:text-blue-400'}`}>
                                                    {product.remoteName}
                                                </span>
                                            </a>
                                        ) : (
                                            <div className="flex items-center space-x-1.5">
                                                <Link2 className={`h-3.5 w-3.5 ${isApproved ? 'text-emerald-500' : 'text-blue-500'}`} />
                                                <span className={`text-xs font-medium truncate ${isApproved ? 'text-emerald-600 dark:text-emerald-400' : 'text-blue-600 dark:text-blue-400'}`}>
                                                    {product.remoteName}
                                                </span>
                                            </div>
                                        )}
                                        {product.remoteUrl ? (
                                            <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                {product.remoteUrl}
                                            </span>
                                        ) : (
                                            <div className="flex items-center space-x-1">
                                                <AlertTriangle className="h-3 w-3 text-amber-500" />
                                                <span className="text-xs text-amber-600 dark:text-amber-400">
                                                    URL bulunamadı
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {/* Actions Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40 shadow-lg">
                                <DropdownMenuItem onClick={() => onEdit(product)} className="text-sm">
                                    <Edit className="h-4 w-4 mr-2" />
                                    Düzenle
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onDelete(product.id)} className="text-sm text-red-600 dark:text-red-400">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Sil
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Status Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        <Badge className={`text-xs font-medium px-2.5 py-1.5 ${statusInfo.className}`}>
                            {statusInfo.icon}
                            <span className="ml-1.5">{statusText}</span>
                        </Badge>
                        <Badge 
                            className={`text-xs font-medium px-2.5 py-1.5 ${
                                product.isActive 
                                    ? 'bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/30 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800 shadow-sm' 
                                    : 'bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/30 dark:to-gray-800/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 shadow-sm'
                            }`}
                        >
                            {product.isActive ? (
                                <>
                                    <Zap className="h-3 w-3" />
                                    <span className="ml-1.5">Aktif</span>
                                </>
                            ) : (
                                <>
                                    <Ban className="h-3 w-3" />
                                    <span className="ml-1.5">Pasif</span>
                                </>
                            )}
                        </Badge>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2">
                        {title === "Onay Bekleyen Ürünler" && isAwaitingApproval && onApprove && (
                            <Button
                                size="sm"
                                onClick={() => onApprove(product)}
                                className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-xs font-medium h-9 shadow-sm"
                            >
                                <ThumbsUp className="h-3.5 w-3.5 mr-1.5" />
                                Onayla
                            </Button>
                        )}
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onEdit(product)}
                                className="flex-1 text-xs font-medium h-9 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                <Edit className="h-3.5 w-3.5 mr-1.5" />
                                Düzenle
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onDelete(product.id)}
                                className="flex-1 text-xs font-medium h-9 border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            >
                                <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                                Sil
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    };

    // Desktop tablo görünümü
    const renderDesktopTable = (productList: Product[], title: string, description: string, className: string = "") => {
        if (productList.length === 0) return null;
        return (
            <div className={`mb-8 ${className}`}>
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
                </div>
                <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <Table>
                        <TableHeader className="bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/30">
                            <TableRow className="border-b border-gray-200 dark:border-gray-700">
                                <TableHead className="text-gray-900 dark:text-gray-100 font-semibold">Ürün Adı</TableHead>
                                <TableHead className="text-gray-900 dark:text-gray-100 font-semibold">Eşleştirilen Ürün</TableHead>
                                <TableHead className="text-gray-900 dark:text-gray-100 font-semibold">Durum</TableHead>
                                <TableHead className="text-gray-900 dark:text-gray-100 font-semibold">Aktiflik</TableHead>
                                {title === "Onay Bekleyen Ürünler" && (
                                    <TableHead className="text-gray-900 dark:text-gray-100 font-semibold">Onay</TableHead>
                                )}
                                <TableHead className="text-right text-gray-900 dark:text-gray-100 font-semibold">İşlemler</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {productList.map((product) => {
                                const statusInfo = getStatusInfo(product.productStatus);
                                const statusText = getStatusText(product.productStatus);
                                const isAwaitingApproval = product.productStatus === 4;
                                const isApproved = product.productStatus === 5;
                                const showRemoteName = (isAwaitingApproval || isApproved) && product.remoteName;
                                
                                return (
                                    <TableRow
                                        key={product.id}
                                        className={`border-b border-gray-100 dark:border-gray-800 hover:bg-gradient-to-r hover:from-gray-50/50 hover:to-gray-100/30 dark:hover:from-gray-800/30 dark:hover:to-gray-900/20 transition-all duration-200 ${statusInfo.bgColor}`}
                                    >
                                        <TableCell className="font-medium">
                                            <div className="flex items-center space-x-3">
                                                <div className={`p-2 rounded-lg ${statusInfo.iconBg} shadow-sm`}>
                                                    <Package className={`h-5 w-5 ${statusInfo.iconColor}`} />
                                                </div>
                                                <span className="text-gray-900 dark:text-gray-100 font-medium">{product.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {showRemoteName ? (
                                                <div className="flex flex-col space-y-1">
                                                    {product.remoteUrl ? (
                                                        <a 
                                                            href={product.remoteUrl} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className={`flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer`}
                                                            title={`${product.remoteName} - Ürün sayfasına git`}
                                                        >
                                                            <Link2 className={`h-4 w-4 ${isApproved ? 'text-emerald-500' : 'text-blue-500'}`} />
                                                            <span className={`font-medium ${isApproved ? 'text-emerald-600 dark:text-emerald-400' : 'text-blue-600 dark:text-blue-400'}`}>
                                                                {product.remoteName}
                                                            </span>
                                                        </a>
                                                    ) : (
                                                        <div className="flex items-center space-x-2">
                                                            <Link2 className={`h-4 w-4 ${isApproved ? 'text-emerald-500' : 'text-blue-500'}`} />
                                                            <span className={`font-medium ${isApproved ? 'text-emerald-600 dark:text-emerald-400' : 'text-blue-600 dark:text-blue-400'}`}>
                                                                {product.remoteName}
                                                            </span>
                                                        </div>
                                                    )}
                                                    {product.remoteUrl ? (
                                                        <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-xs">
                                                            {product.remoteUrl}
                                                        </span>
                                                    ) : (
                                                        <div className="flex items-center space-x-1">
                                                            <AlertTriangle className="h-3 w-3 text-amber-500" />
                                                            <span className="text-xs text-amber-600 dark:text-amber-400">
                                                                URL bulunamadı
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 dark:text-gray-500">—</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={`font-medium ${statusInfo.className}`}>
                                                {statusInfo.icon}
                                                <span className="ml-1.5">{statusText}</span>
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge 
                                                className={`font-medium ${
                                                    product.isActive 
                                                        ? 'bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/30 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800 shadow-sm' 
                                                        : 'bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/30 dark:to-gray-800/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 shadow-sm'
                                                }`}
                                            >
                                                {product.isActive ? <Zap className="h-4 w-4" /> : <Ban className="h-4 w-4" />}
                                                <span className="ml-1.5">{product.isActive ? 'Aktif' : 'Pasif'}</span>
                                            </Badge>
                                        </TableCell>
                                        {title === "Onay Bekleyen Ürünler" && (
                                            <TableCell>
                                                {isAwaitingApproval && onApprove ? (
                                                    <Button
                                                        size="sm"
                                                        onClick={() => onApprove(product)}
                                                        className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-sm"
                                                    >
                                                        <ThumbsUp className="h-4 w-4 mr-1.5" />
                                                        Onayla
                                                    </Button>
                                                ) : (
                                                    <span className="text-gray-400 dark:text-gray-500">—</span>
                                                )}
                                            </TableCell>
                                        )}
                                        <TableCell className="text-right">
                                            <div className="flex justify-end space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => onEdit(product)}
                                                    className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                                                >
                                                    <Edit className="h-4 w-4 mr-1.5" />
                                                    Düzenle
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => onDelete(product.id)}
                                                    className="border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                >
                                                    <Trash2 className="h-4 w-4 mr-1.5" />
                                                    Sil
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>
        );
    };

    // Mobil kart listesi
    const renderMobileCards = (productList: Product[], title: string, description: string, className: string = "") => {
        if (productList.length === 0) return null;
        return (
            <div className={`mb-8 ${className}`}>
                <div className="mb-4 px-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">{title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
                </div>
                <div className="space-y-3">
                    {productList.map((product) => renderMobileCard(product, title))}
                </div>
            </div>
        );
    };

    // Ürün listesi render fonksiyonu
    const renderProductList = (productList: Product[], title: string, description: string, className: string = "") => {
        return isMobile ? 
            renderMobileCards(productList, title, description, className) :
            renderDesktopTable(productList, title, description, className);
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

    // Küçük boş durum mesajı
    const renderSmallEmptyMessage = (categoryName: string) => {
        const getCategoryInfo = (category: string) => {
            switch (category) {
                case 'Onaylı':
                    return {
                        icon: <CheckCircle className="h-8 w-8" />,
                        bgColor: 'bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/20',
                        iconColor: 'text-emerald-600 dark:text-emerald-400',
                        title: 'Onaylı ürün bulunmuyor',
                        description: 'Henüz onaylanmış ürününüz yok. Ürünleriniz onaylandığında burada görünecek.'
                    };
                case 'Onay Bekleyen':
                    return {
                        icon: <Calendar className="h-8 w-8" />,
                        bgColor: 'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/20',
                        iconColor: 'text-blue-600 dark:text-blue-400',
                        title: 'Onay bekleyen ürün yok',
                        description: 'Şu anda onayınızı bekleyen ürün bulunmuyor.'
                    };
                case 'Beklemede':
                    return {
                        icon: <Clock className="h-8 w-8" />,
                        bgColor: 'bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/20',
                        iconColor: 'text-amber-600 dark:text-amber-400',
                        title: 'Beklemedeki ürün yok',
                        description: 'Şu anda işlem bekleyen ürününüz bulunmuyor.'
                    };
                case 'Reddedilen':
                    return {
                        icon: <XCircle className="h-8 w-8" />,
                        bgColor: 'bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/20',
                        iconColor: 'text-red-600 dark:text-red-400',
                        title: 'Reddedilen ürün yok',
                        description: 'Reddedilmiş ürününüz bulunmuyor.'
                    };
                case 'Hatalı':
                    return {
                        icon: <AlertTriangle className="h-8 w-8" />,
                        bgColor: 'bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/20',
                        iconColor: 'text-orange-600 dark:text-orange-400',
                        title: 'Hatalı ürün yok',
                        description: 'Hata durumunda olan ürününüz bulunmuyor.'
                    };
                case 'İnaktif':
                    return {
                        icon: <Ban className="h-8 w-8" />,
                        bgColor: 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800/30 dark:to-gray-700/20',
                        iconColor: 'text-gray-600 dark:text-gray-400',
                        title: 'İnaktif ürün yok',
                        description: 'Pasif durumda olan ürününüz bulunmuyor.'
                    };
                default:
                    return {
                        icon: <Package className="h-8 w-8" />,
                        bgColor: 'bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/20',
                        iconColor: 'text-indigo-600 dark:text-indigo-400',
                        title: 'Bu kategoride ürün yok',
                        description: 'Seçilen kategoride henüz ürün bulunmuyor.'
                    };
            }
        };

        const categoryInfo = getCategoryInfo(categoryName);

        return (
            <div className="text-center py-12 px-4">
                <div className="max-w-sm mx-auto">
                    <div className={`w-16 h-16 mx-auto mb-4 ${categoryInfo.bgColor} rounded-2xl flex items-center justify-center shadow-sm`}>
                        <div className={categoryInfo.iconColor}>
                            {categoryInfo.icon}
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        {categoryInfo.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {categoryInfo.description}
                    </p>
                </div>
            </div>
        );
    };

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
                    {renderPagination()}
                </CardContent>
            </Card>
        </div>
    );
}
