
// Product interface tanımı
export interface Product {
    name: string;
    remoteName: string | null;
    remoteUrl: string | null;
    productStatus: number;
    id: string;
    isActive: boolean;
    createAt: string;
    createUserName: string;
    updateAt: string | null;
    updateUserName: string | null;
    isDeleted: boolean;
    deleteAt: string | null;
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

export interface createProduct{
    products: {
        name: string;
    }[];
}

export interface ProductResponse {
    "@odata.context": string;
    value: Product[];
}

export interface ApiResponse<T> {
    data: {
        items: T[]; // T[] olarak tanımlandı, yani bir dizi T
        metadata: {
            pagination?: Pagination;
            statistic?: Statistic;
        };
    };
    errorMessages: string[] | null;
    isSuccessful: boolean;
    statusCode: number;
}

export interface SingleApiResponse<T> {
    data: T;
    errorMessages: string[] | null;
    isSuccessful: boolean;
    statusCode: number;
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

