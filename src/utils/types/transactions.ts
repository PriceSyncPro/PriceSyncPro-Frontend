// utils/types/transactions.ts
export interface Transaction {
    id: string;
    type: number;
    description: string;
    amount: number;
    createAt: string;
    isActive: boolean;
    isDeleted: boolean;
    deleteAt: string | null;
}

export interface PaginationMetadata {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    hasPrevious: boolean;
    hasNext: boolean;
}

export interface TransactionListData {
    items: Transaction[];
    metadata: {
        pagination: PaginationMetadata;
    };
}

export interface ApiResponse<T> {
    data: T;
    errorMessages: string[] | null;
    isSuccessful: boolean;
    statusCode: number;
}
