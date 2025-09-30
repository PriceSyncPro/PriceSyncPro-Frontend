import React from 'react';
import { Product, ProductStatus } from "@/utils/types/Products";
import { 
    PRODUCT_STATUS_CONFIG, 
    DEFAULT_STATUS_CONFIG, 
    TAB_COLORS, 
    EMPTY_STATE_MESSAGES 
} from "@/utils/constants/productConstants";

// Product Groups Type
export type ProductGroups = {
    approved: Product[];
    awaitingApproval: Product[];
    pending: Product[];
    error: Product[];
    rejected: Product[];
    inactive: Product[];
};

// Status text helper
export const getStatusText = (statusCode: ProductStatus): string => {
    return PRODUCT_STATUS_CONFIG[statusCode]?.text || DEFAULT_STATUS_CONFIG.text;
};

// Status info helper
export const getStatusInfo = (statusCode: ProductStatus) => {
    const config = PRODUCT_STATUS_CONFIG[statusCode] || DEFAULT_STATUS_CONFIG;
    const IconComponent = config.icon;
    
    return {
        ...config,
        icon: React.createElement(IconComponent, { className: "h-3 w-3 md:h-4 md:w-4" })
    };
};

// Tab color helper
export const getTabColor = (tabKey: string | ProductStatus) => {
    // Handle 'all' tab specifically
    if (tabKey === 'all') {
        return TAB_COLORS.all;
    }
    
    // If it's a ProductStatus enum value, use it directly
    if (typeof tabKey === 'number' && tabKey in TAB_COLORS) {
        return TAB_COLORS[tabKey as ProductStatus];
    }
    
    // If it's a string (tab key), map it to ProductStatus
    const statusFromTab = getProductStatusFromTab(tabKey as string);
    if (statusFromTab !== undefined && statusFromTab in TAB_COLORS) {
        return TAB_COLORS[statusFromTab];
    }
    
    // Fallback to 'all' tab colors
    return TAB_COLORS.all;
};

// Product grouping helper
export const createProductGroups = (products: Product[]): ProductGroups => {
    return products.reduce((acc, product) => {
        switch (product.productStatus) {
            case ProductStatus.APPROVED:
                acc.approved.push(product);
                break;
            case ProductStatus.AWAITING_APPROVAL:
                acc.awaitingApproval.push(product);
                break;
            case ProductStatus.PENDING:
                acc.pending.push(product);
                break;
            case ProductStatus.ERROR:
                acc.error.push(product);
                break;
            case ProductStatus.REJECTED:
                acc.rejected.push(product);
                break;
            case ProductStatus.INACTIVE:
                acc.inactive.push(product);
                break;
            default:
                acc.inactive.push(product);
        }
        return acc;
    }, {
        approved: [],
        awaitingApproval: [],
        pending: [],
        error: [],
        rejected: [],
        inactive: []
    } as ProductGroups);
};

// Empty state message helper - returns config for component to render
export const getEmptyStateConfig = (status: ProductStatus | string) => {
    // If it's a ProductStatus enum value, use it directly
    if (typeof status === 'number' && status in EMPTY_STATE_MESSAGES) {
        return EMPTY_STATE_MESSAGES[status as ProductStatus];
    }
    
    // If it's a string (tab key), map it to ProductStatus
    const statusFromTab = getProductStatusFromTab(status as string);
    if (statusFromTab !== undefined && statusFromTab in EMPTY_STATE_MESSAGES) {
        return EMPTY_STATE_MESSAGES[statusFromTab];
    }
    
    // Fallback to default
    return EMPTY_STATE_MESSAGES.default;
};

// Product status mapping for API
export const getProductStatusFromTab = (tabKey: string): ProductStatus | undefined => {
    const statusMap: Record<string, ProductStatus> = {
        'approved': ProductStatus.APPROVED,
        'awaiting': ProductStatus.AWAITING_APPROVAL,
        'pending': ProductStatus.PENDING,
        'rejected': ProductStatus.REJECTED,
        'error': ProductStatus.ERROR,
        'inactive': ProductStatus.INACTIVE
    };
    
    return statusMap[tabKey];
};

// Product validation helpers
export const isProductEditable = (product: Product): boolean => {
    return product.productStatus !== ProductStatus.APPROVED && !product.isDeleted;
};

export const isProductApprovable = (product: Product): boolean => {
    return product.productStatus === ProductStatus.AWAITING_APPROVAL && product.isActive;
};

export const canShowRemoteName = (product: Product): boolean => {
    return (product.productStatus === ProductStatus.AWAITING_APPROVAL || 
            product.productStatus === ProductStatus.APPROVED) && 
           !!product.remoteName;
};

// Product filtering helpers
export const filterProductsByStatus = (products: Product[], status: ProductStatus): Product[] => {
    return products.filter(product => product.productStatus === status);
};

export const filterActiveProducts = (products: Product[]): Product[] => {
    return products.filter(product => product.isActive && !product.isDeleted);
};

export const searchProducts = (products: Product[], query: string): Product[] => {
    if (!query.trim()) return products;
    
    const searchTerm = query.toLowerCase();
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.remoteName?.toLowerCase().includes(searchTerm) ||
        product.remoteUrl?.toLowerCase().includes(searchTerm)
    );
};