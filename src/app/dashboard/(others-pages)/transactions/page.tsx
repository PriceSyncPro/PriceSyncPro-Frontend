"use client";
import React, { useState, useEffect } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import TransactionsPage from "@/components/transactions/TransactionsPage";
import { Transaction, PaginationMetadata } from "@/utils/types/transactions";
import { TransactionsService } from "@/utils/api/services";
import { toast } from "sonner";

export default function Transactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState<PaginationMetadata | null>(null);
    // İçeriğin fade-in animasyonu için state
    const [animateClass, setAnimateClass] = useState("opacity-0 translate-y-4");
    
    // Filter states
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState<number | null>(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const fetchTransactions = React.useCallback(async (
        pageNumber: number = 1,
        search?: string,
        type?: number | null,
        start?: string,
        end?: string
    ) => {
        setLoading(true);
        try {
            const response = await TransactionsService.getAll(
                pageNumber, 
                10, 
                search || searchTerm, 
                type !== undefined ? type : selectedType, 
                start || startDate, 
                end || endDate
            );
            setTransactions(response.items);
            setPagination(response.metadata.pagination);
            setError(null);
        } catch (err) {
            console.error("İşlemler yüklenirken hata:", err);
            setError("İşlemler yüklenirken bir hata oluştu");
            toast.error("İşlemler yüklenirken bir hata oluştu");
        } finally {
            setLoading(false);
        }
    }, [searchTerm, selectedType, startDate, endDate]);

    const handlePageChange = (newPage: number) => {
        fetchTransactions(newPage);
    };

    const handleSearch = (search: string) => {
        setSearchTerm(search);
        fetchTransactions(1, search, selectedType, startDate, endDate);
    };

    const handleTypeFilter = (type: number | null) => {
        setSelectedType(type);
        fetchTransactions(1, searchTerm, type, startDate, endDate);
    };

    const handleDateFilter = (start: string, end: string) => {
        setStartDate(start);
        setEndDate(end);
        fetchTransactions(1, searchTerm, selectedType, start, end);
    };

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    // Sayfa yüklendiğinde fade-in animasyonu için class bilgisini güncelle
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimateClass("opacity-100 translate-y-0 transition-all duration-700");
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    // Yüklenme ekranı
    if (loading) {
        return (
            <ComponentCard title="İşlem Geçmişi">
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

    // Hata ekranı
    if (error) {
        return (
            <ComponentCard title="İşlem Geçmişi">
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
                    <button
                        onClick={() => fetchTransactions()}
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
                </div>
            </ComponentCard>
        );
    }

    return (
        <div className={animateClass}>
            <TransactionsPage
                transactions={transactions}
                pagination={pagination}
                onPageChange={handlePageChange}
                onSearch={handleSearch}
                onTypeFilter={handleTypeFilter}
                onDateFilter={handleDateFilter}
            />
        </div>
    );
}
