// utils/types/userMarketplaces.ts
export interface UserMarketplace {
    id: string;
    name: string;
    marketPlaceName: string;
    createdAt: string;
    isActive: boolean;
    isDeleted: boolean;
    deleteAt: string | null;
}

export interface UserMarketplaceCreateData {
    marketPlaceId: string;
    name: string;
}

export interface ApiResponse<T> {
    data: T;
    errorMessages: string[] | null;
    isSuccessful: boolean;
    statusCode: number;
}
