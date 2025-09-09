export interface Pagination {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    hasPrevious: boolean;
    hasNext: boolean;
}