// utils/types/marketplaces.ts
export interface Marketplace {
    id: string;
    name: string;
    createAt: string;
    isActive: boolean;
    isDeleted: boolean;
    deleteAt: string | null;
}

export interface MarketplaceCreateData {
    name: string;
    isActive?: boolean;
}

export interface ApiResponse<T> {
    data: T;
    errorMessages: string[] | null;
    isSuccessful: boolean;
    statusCode: number;
}
