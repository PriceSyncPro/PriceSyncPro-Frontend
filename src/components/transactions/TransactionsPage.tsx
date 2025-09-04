"use client";
import React, { useState } from "react";
import { Transaction, PaginationMetadata } from "@/utils/types/transactions";
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
import { Input } from "@/components/ui/input";
import { 
    CreditCard, 
    Coins, 
    Gift, 
    Calendar,
    TrendingUp,
    TrendingDown,
    DollarSign,
    Search,
    Filter,
    X
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TransactionsPageProps {
    transactions: Transaction[];
    pagination?: PaginationMetadata | null;
    onPageChange?: (page: number) => void;
    onSearch?: (searchTerm: string) => void;
    onTypeFilter?: (type: number | null) => void;
    onDateFilter?: (startDate: string, endDate: string) => void;
}

export default function TransactionsPage({
    transactions,
    pagination,
    onPageChange,
    onSearch,
    onTypeFilter,
    onDateFilter
}: TransactionsPageProps) {
    const [isMobile, setIsMobile] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState<number | null>(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Arama işlemi
    const handleSearch = (value: string) => {
        setSearchTerm(value);
        if (onSearch) {
            onSearch(value);
        }
    };

    // Tip filtreleme
    const handleTypeFilter = (type: number | null) => {
        setSelectedType(type);
        if (onTypeFilter) {
            onTypeFilter(type);
        }
    };

    // Tarih filtreleme
    const handleDateFilter = () => {
        if (onDateFilter && startDate && endDate) {
            onDateFilter(startDate, endDate);
        }
    };

    // Filtreleri temizle
    const clearFilters = () => {
        setSearchTerm("");
        setSelectedType(null);
        setStartDate("");
        setEndDate("");
        if (onSearch) onSearch("");
        if (onTypeFilter) onTypeFilter(null);
        if (onDateFilter) onDateFilter("", "");
    };

    // İşlem tipini metne dönüştürme
    const getTransactionTypeText = (type: number): string => {
        switch (type) {
            case 0: return 'Para Yatırma';
            case 1: return 'Jeton Kullanımı';
            case 2: return 'Kupon Kullanımı';
            default: return 'Bilinmiyor';
        }
    };

    // İşlem tipi bilgilerini alma
    const getTransactionTypeInfo = (type: number) => {
        switch (type) {
            case 0: // Para Yatırma
                return {
                    icon: <CreditCard className="h-3 w-3 md:h-4 md:w-4" />,
                    className: "bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800 shadow-sm",
                    bgColor: "bg-gradient-to-br from-green-50/80 to-green-100/50 dark:from-green-950/20 dark:to-green-900/10",
                    cardBg: "bg-green-50/30 dark:bg-green-950/10",
                    borderColor: "border-l-green-500 dark:border-l-green-400",
                    iconBg: "bg-green-100 dark:bg-green-900/40",
                    iconColor: "text-green-600 dark:text-green-400",
                    amountColor: "text-green-600 dark:text-green-400",
                    amountIcon: <TrendingUp className="h-4 w-4" />
                };
            case 1: // Jeton Kullanımı (kırmızı)
                return {
                    icon: <Coins className="h-3 w-3 md:h-4 md:w-4" />,
                    className: "bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800 shadow-sm",
                    bgColor: "bg-gradient-to-br from-red-50/80 to-red-100/50 dark:from-red-950/20 dark:to-red-900/10",
                    cardBg: "bg-red-50/30 dark:bg-red-950/10",
                    borderColor: "border-l-red-500 dark:border-l-red-400",
                    iconBg: "bg-red-100 dark:bg-red-900/40",
                    iconColor: "text-red-600 dark:text-red-400",
                    amountColor: "text-red-600 dark:text-red-400",
                    amountIcon: <TrendingDown className="h-4 w-4" />
                };
            case 2: // Kupon Kullanımı
                return {
                    icon: <Gift className="h-3 w-3 md:h-4 md:w-4" />,
                    className: "bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800 shadow-sm",
                    bgColor: "bg-gradient-to-br from-green-50/80 to-green-100/50 dark:from-green-950/20 dark:to-green-900/10",
                    cardBg: "bg-green-50/30 dark:bg-green-950/10",
                    borderColor: "border-l-green-500 dark:border-l-green-400",
                    iconBg: "bg-green-100 dark:bg-green-900/40",
                    iconColor: "text-green-600 dark:text-green-400",
                    amountColor: "text-green-600 dark:text-green-400",
                    amountIcon: <DollarSign className="h-4 w-4" />
                };
            default:
                return {
                    icon: <DollarSign className="h-3 w-3 md:h-4 md:w-4" />,
                    className: "bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/30 dark:to-gray-800/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 shadow-sm",
                    bgColor: "bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-900/20 dark:to-gray-800/10",
                    cardBg: "bg-gray-50/30 dark:bg-gray-900/10",
                    borderColor: "border-l-gray-400 dark:border-l-gray-500",
                    iconBg: "bg-gray-100 dark:bg-gray-800/50",
                    iconColor: "text-gray-600 dark:text-gray-400",
                    amountColor: "text-gray-600 dark:text-gray-400",
                    amountIcon: <DollarSign className="h-4 w-4" />
                };
        }
    };

    // Tutarı formatla
    const formatAmount = (amount: number): string => {
        // Tutarı 100'e böl (kuruş cinsinden geldiği varsayılarak)
        const formattedAmount = (amount / 100).toFixed(2);
        return `₺${formattedAmount}`;
    };

    // Pagination kontrollerini render etme
    const renderPagination = () => {
        if (!pagination || !onPageChange) return null;
        return (
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/30 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="text-center sm:text-left">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">{pagination.totalCount}</span> işlem bulundu
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

    // Mobil kart görünümü
    const renderMobileCard = (transaction: Transaction) => {
        const typeInfo = getTransactionTypeInfo(transaction.type);
        const typeText = getTransactionTypeText(transaction.type);

        return (
            <Card 
                key={transaction.id} 
                className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50 border-l-4 ${typeInfo.borderColor} ${typeInfo.cardBg} backdrop-blur-sm`}
            >
                <CardContent className="p-4 sm:p-5">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                            <div className={`p-2.5 rounded-xl ${typeInfo.iconBg} shadow-sm`}>
                                {typeInfo.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base leading-tight mb-1">
                                    {typeText}
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                    {transaction.description}
                                </p>
                            </div>
                        </div>
                        
                        {/* Amount */}
                        <div className="flex items-center space-x-1">
                            {typeInfo.amountIcon}
                            <span className={`font-bold text-lg ${typeInfo.amountColor}`}>
                                {formatAmount(transaction.amount)}
                            </span>
                        </div>
                    </div>

                    {/* Status and Date */}
                    <div className="flex items-center justify-between">
                        <Badge className={`text-xs font-medium px-2.5 py-1.5 ${typeInfo.className}`}>
                            {typeInfo.icon}
                            <span className="ml-1.5">{typeText}</span>
                        </Badge>
                        
                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(transaction.createAt).toLocaleDateString('tr-TR', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    };

    // Desktop tablo görünümü
    const renderDesktopTable = () => {
        return (
            <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <Table>
                    <TableHeader className="bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/30">
                        <TableRow className="border-b border-gray-200 dark:border-gray-700">
                            <TableHead className="text-gray-900 dark:text-gray-100 font-semibold">İşlem Tipi</TableHead>
                            <TableHead className="text-gray-900 dark:text-gray-100 font-semibold">Açıklama</TableHead>
                            <TableHead className="text-gray-900 dark:text-gray-100 font-semibold">Tutar</TableHead>
                            <TableHead className="text-gray-900 dark:text-gray-100 font-semibold">Tarih</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((transaction) => {
                            const typeInfo = getTransactionTypeInfo(transaction.type);
                            const typeText = getTransactionTypeText(transaction.type);
                            
                            return (
                                <TableRow
                                    key={transaction.id}
                                    className={`border-b border-gray-100 dark:border-gray-800 hover:bg-gradient-to-r hover:from-gray-50/50 hover:to-gray-100/30 dark:hover:from-gray-800/30 dark:hover:to-gray-900/20 transition-all duration-200 ${typeInfo.bgColor}`}
                                >
                                    <TableCell className="font-medium">
                                        <div className="flex items-center space-x-3">
                                            <div className={`p-2 rounded-lg ${typeInfo.iconBg} shadow-sm`}>
                                                {typeInfo.icon}
                                            </div>
                                            <span className="text-gray-900 dark:text-gray-100 font-medium">{typeText}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-gray-700 dark:text-gray-300">{transaction.description}</span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <span className={`font-bold text-lg ${typeInfo.amountColor}`}>
                                                {formatAmount(transaction.amount)}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                            <Calendar className="w-4 h-4" />
                                            <span>{new Date(transaction.createAt).toLocaleDateString('tr-TR', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        );
    };

    // Boş durum mesajı
    const renderEmptyState = () => {
        return (
            <div className="text-center py-12 px-4">
                <div className="max-w-md mx-auto">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center shadow-lg">
                        <DollarSign className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        Henüz işlem bulunmuyor
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        İşlem geçmişiniz burada görünecektir.
                    </p>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 shadow-sm">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        İşlem Geçmişi
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                        Tüm finansal işlemlerinizi buradan takip edebilirsiniz.
                    </p>
                </div>
            </div>

            <Card className="border-0 shadow-sm">
                <CardContent className="p-4 sm:p-6">
                    {/* Search and Filters */}
                    <div className="mb-6 space-y-4">
                        {/* Search Bar */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    placeholder="İşlem açıklamasında ara..."
                                    value={searchTerm}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                {searchTerm && (
                                    <button
                                        onClick={() => handleSearch("")}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                <Filter className="h-4 w-4" />
                                Filtreler
                                {(selectedType !== null || startDate || endDate) && (
                                    <Badge className="ml-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                        {[selectedType !== null, startDate, endDate].filter(Boolean).length}
                                    </Badge>
                                )}
                            </Button>
                        </div>

                        {/* Filters Panel */}
                        {showFilters && (
                            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* Transaction Type Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            İşlem Tipi
                                        </label>
                                        <select
                                            value={selectedType ?? ""}
                                            onChange={(e) => handleTypeFilter(e.target.value ? Number(e.target.value) : null)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        >
                                            <option value="">Tüm İşlemler</option>
                                            <option value="0">Para Yatırma</option>
                                            <option value="1">Jeton Kullanımı</option>
                                            <option value="2">Kupon Kullanımı</option>
                                        </select>
                                    </div>

                                    {/* Start Date Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Başlangıç Tarihi
                                        </label>
                                        <Input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>

                                    {/* End Date Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Bitiş Tarihi
                                        </label>
                                        <Input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>
                                </div>

                                {/* Filter Actions */}
                                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                                    <Button
                                        variant="outline"
                                        onClick={clearFilters}
                                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                                    >
                                        <X className="h-4 w-4" />
                                        Filtreleri Temizle
                                    </Button>
                                    <Button
                                        onClick={handleDateFilter}
                                        disabled={!startDate || !endDate}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Filtreleri Uygula
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Active Filters Display */}
                        {(selectedType !== null || startDate || endDate || searchTerm) && (
                            <div className="flex flex-wrap gap-2">
                                {searchTerm && (
                                    <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-full flex items-center gap-1">
                                        Arama: &quot;{searchTerm}&quot;
                                        <button onClick={() => handleSearch("")} className="ml-1 hover:text-blue-900">
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                )}
                                {selectedType !== null && (
                                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded-full flex items-center gap-1">
                                        Tip: {getTransactionTypeText(selectedType)}
                                        <button onClick={() => handleTypeFilter(null)} className="ml-1 hover:text-green-900">
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                )}
                                {startDate && (
                                    <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 px-3 py-1 rounded-full flex items-center gap-1">
                                        Başlangıç: {new Date(startDate).toLocaleDateString('tr-TR')}
                                        <button onClick={() => setStartDate("")} className="ml-1 hover:text-purple-900">
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                )}
                                {endDate && (
                                    <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 px-3 py-1 rounded-full flex items-center gap-1">
                                        Bitiş: {new Date(endDate).toLocaleDateString('tr-TR')}
                                        <button onClick={() => setEndDate("")} className="ml-1 hover:text-orange-900">
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                )}
                            </div>
                        )}
                    </div>

                    {transactions.length === 0 ? (
                        renderEmptyState()
                    ) : (
                        <div className="space-y-6">
                            {isMobile ? (
                                <div className="space-y-3">
                                    {transactions.map((transaction) => renderMobileCard(transaction))}
                                </div>
                            ) : (
                                renderDesktopTable()
                            )}
                        </div>
                    )}

                    {/* Pagination */}
                    {renderPagination()}
                </CardContent>
            </Card>
        </div>
    );
}
