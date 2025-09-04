// utils/types/user.ts
export interface User {
    firstName: string;
    expiryDate: Date;
    lastName: string;
    fullName: string;
    balance: number;
    products: unknown[];
    transactions: unknown[];
    usedCoupons: unknown[];
    createAt: string;
    createUserId: string;
    updateAt: string | null;
    updateUserId: string | null;
    isDeleted: boolean;
    deleteAt: string | null;
    deleteUserId: string | null;
    id: string;
    userName: string;
    normalizedUserName: string;
    email: string;
    normalizedEmail: string;
    emailConfirmed: boolean;
    passwordHash: string;
    securityStamp: string;
    concurrencyStamp: string;
    phoneNumber: string | null;
    phoneNumberConfirmed: boolean;
    twoFactorEnabled: boolean;
    lockoutEnd: string | null;
    lockoutEnabled: boolean;
    accessFailedCount: number;
}

export interface ApiResponse<T> {
    data: T;
    errorMessages: string[] | null;
    isSuccessful: boolean;
    statusCode: number;
}

export interface UserUpdateData {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    [key: string]: unknown;
}
