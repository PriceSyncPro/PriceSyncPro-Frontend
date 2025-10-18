
// Product Status Enum
export enum ProductStatus {
    INACTIVE = 0,
    REJECTED = 1,
    ERROR = 2,
    PENDING = 3,
    AWAITING_APPROVAL = 4,
    APPROVED = 5
}

// Base Entity interface
export interface BaseEntity {
    id: string;
    isActive: boolean;
    createAt: string;
    createUserName: string;
    updateAt: string | null;
    updateUserName: string | null;
    isDeleted: boolean;
    deleteAt: string | null;
}

// Product interface tanımı
export interface Product extends BaseEntity {
    name: string;
    remoteName: string | null;
    remoteUrl: string | null;
    productStatus: ProductStatus;
}

export interface Pagination {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    hasPrevious: boolean;
    hasNext: boolean;
}

export interface Statistic {
    totalCount: number;
    inactiveCount: number;
    deniedCount: number;
    errorCount: number;
    pendingCount: number;
    awaitingApprovalCount: number;
    approvedCount: number;
}

// Create Product Request
export interface CreateProductRequest {
    products: string[];
}

// Update Product Request
export type UpdateProductRequest = Partial<Omit<Product, 'id' | 'createAt' | 'createUserName'>>;

// Product Filter Options
export interface ProductFilterOptions {
    status?: ProductStatus;
    isActive?: boolean;
    searchQuery?: string;
    dateFrom?: string;
    dateTo?: string;
}

// Product Sort Options
export interface ProductSortOptions {
    field: keyof Product;
    direction: 'asc' | 'desc';
}

export interface ProductResponse {
    "@odata.context": string;
    value: Product[];
}

// Base API Response
interface BaseApiResponse {
    errorMessages: string[] | null;
    isSuccessful: boolean;
    statusCode: number;
}

// List API Response
export interface ApiResponse<T> extends BaseApiResponse {
    data: {
        items: T[];
        metadata: {
            pagination?: Pagination;
            statistic?: Statistic;
        };
    };
}

// Single Item API Response
export interface SingleApiResponse<T> extends BaseApiResponse {
    data: T;
}

export interface BaseStatusInfo {
  borderColor: string;
  cardBg: string;
  iconBg: string;
  iconColor: string;
  className: string;
  icon: React.ReactNode;
}

export interface DesktopStatusInfo extends BaseStatusInfo {
  bgColor: string;
}

