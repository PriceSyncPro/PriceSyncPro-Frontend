


// API URL'leri için temel URL
export const API_BASE_URL ='api.pricesyncpro.com.tr';

// Auth ile ilgili endpoint'ler
export const AUTH_ENDPOINTS = {
    LOGIN: '/auth/login',
    LOGOUT: '/api/auth/logout',
    REGISTER: '/users/register',
    REFRESH_TOKEN: '/api/auth/refresh-token',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
    VERIFY_EMAIL: '/api/auth/verify-email',
};

export const RULE_ENDPOINTS = {
    GET_ALL:'/rules/getall',
    CREATE: '/rules/create'
};

// Kullanıcı ile ilgili endpoint'ler
export const USER_ENDPOINTS = {
    ME: '/api/user/me',
    GET_USER: '/users/getInformation',
    UPDATE_PROFILE: '/users/updateUser',
    CHANGE_PASSWORD: '/api/user/change-password',
    UPLOAD_AVATAR: '/api/user/avatar',
};

// Dashboard ile ilgili endpoint'ler
export const DASHBOARD_ENDPOINTS = {
    STATS: '/api/dashboard/stats',
    RECENT_ACTIVITY: '/api/dashboard/activity',
    NOTIFICATIONS: '/api/dashboard/notifications',
};

// Diğer modüller için endpoint'ler
export const PRODUCT_ENDPOINTS = {
    GET_ALL: '/products/getall',
    GET_BY_ID: '/odata/products',
    CREATE: '/products/create',
    UPDATE: '/products/update',
    DELETE: '/products/delete'
};

export const USERMARKETPLACES_ENDPOINTS = {
    GET_ALL: '/usermarketplaces/getall',
    CREATE: '/usermarketplaces/create'
};

export const MARKETPLACES_ENDPOINTS = {
    GET_ALL: '/marketplaces/getall'
};


export const COUPON_ENDPOINTS = {
    REEDEM: '/coupons/reedem',
};

export const TRANSACTIONS_ENDPOINTS = {
    GET_ALL: '/transactions/getall',
};

// Tüm endpoint'leri tek bir objede birleştirme
export const API_ENDPOINTS = {
    AUTH: AUTH_ENDPOINTS,
    USER: USER_ENDPOINTS,
    DASHBOARD: DASHBOARD_ENDPOINTS,
    PRODUCTS: PRODUCT_ENDPOINTS,
    USERMARKETPLACES: USERMARKETPLACES_ENDPOINTS,
    MARKETPLACES: MARKETPLACES_ENDPOINTS,
    TRANSACTIONS: TRANSACTIONS_ENDPOINTS
};

export default API_ENDPOINTS;
