export interface Coupon {
    code: string;
    type: 'fixed' | 'percentage';
    discount: number;
    description: string;
}

export interface ApiResponse<T> {
    data: T | null;  // Allow null for error cases
    errorMessages: string[] | null;
    isSuccessful: boolean;
    statusCode: number;
}
