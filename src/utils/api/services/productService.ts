import axios from '@/utils/axios';
import { API_ENDPOINTS } from '@/utils/api/endpoints';
import {ApiResponse, SingleApiResponse, CreateProductRequest, UpdateProductRequest, Pagination, Product, Statistic} from '@/utils/types/Products';

interface ApiResponseData<T> {
    items: T[];
    metadata: {
        pagination?: Pagination;
        statistic?: Statistic;
    };
}

// Sabit değerler
const EMPTY_PRODUCT: Product = {
    id: "",
    name: "",
    remoteName: null,
    remoteUrl: null,
    productStatus: 0,
    isActive: false,
    createAt: "",
    createUserName: "",
    updateAt: null,
    updateUserName: null,
    isDeleted: false,
    deleteAt: null
};

const EMPTY_PRODUCTS_RESPONSE: ApiResponseData<Product> = {
    items: [],
    metadata: {}
};

// Hata yönetimi utility fonksiyonu
const handleApiError = <T>(error: unknown, defaultData: T, defaultMessage: string): ApiResponse<T> | SingleApiResponse<T> => {
    // Axios hatası kontrolü
    if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: ApiResponse<T> | SingleApiResponse<T>; status?: number } };
        if (axiosError.response?.data) {
            return axiosError.response.data;
        }
    }
    
    const errorMessage = error && typeof error === 'object' && 'message' in error 
        ? (error as { message: string }).message 
        : defaultMessage;
    
    const statusCode = error && typeof error === 'object' && 'response' in error
        ? (error as { response?: { status?: number } }).response?.status || 500
        : 500;
    
    return {
        data: defaultData,
        errorMessages: [errorMessage],
        isSuccessful: false,
        statusCode
    } as ApiResponse<T> | SingleApiResponse<T>;
};

export class ProductService {
    /**
     * Tüm ürünleri getir
     */
    static async getAll(
        pageNumber: number = 1, 
        pageSize: number = 10, 
        productStatus?: number
    ): Promise<ApiResponse<ApiResponseData<Product>>> {
        try {
            const params = new URLSearchParams({
                PageNumber: pageNumber.toString(),
                PageSize: pageSize.toString()
            });
            
            if (productStatus !== undefined) {
                params.append('ProductStatus', productStatus.toString());
            }
            
            const url = `${API_ENDPOINTS.PRODUCTS.GET_ALL}?${params.toString()}`;
            const response = await axios.get<ApiResponse<ApiResponseData<Product>>>(url);
            
            return response.data;
        } catch (error: unknown) {
            return handleApiError(
                error, 
                EMPTY_PRODUCTS_RESPONSE, 
                'Ürünler getirilirken bir hata oluştu'
            ) as ApiResponse<ApiResponseData<Product>>;
        }
    }

    /**
     * ID'ye göre ürün getir
     */
    static async getById(id: string): Promise<SingleApiResponse<Product>> {
        try {
            const response = await axios.get<SingleApiResponse<Product>>(
                `${API_ENDPOINTS.PRODUCTS.GET_BY_ID}/${id}`
            );
            return response.data;
        } catch (error: unknown) {
            return handleApiError(
                error, 
                EMPTY_PRODUCT, 
                'Ürün getirilirken bir hata oluştu'
            ) as SingleApiResponse<Product>;
        }
    }

    /**
     * Yeni ürün oluştur
     */
    static async create(productData: CreateProductRequest): Promise<SingleApiResponse<Product>> {
        try {
            const response = await axios.post<SingleApiResponse<Product>>(
                API_ENDPOINTS.PRODUCTS.CREATE,
                productData
            );
            return response.data;
        } catch (error: unknown) {
            return handleApiError(
                error, 
                EMPTY_PRODUCT, 
                'Ürün oluşturulurken bir hata oluştu'
            ) as SingleApiResponse<Product>;
        }
    }

    /**
     * Ürün güncelle
     */
    static async update(id: string, product: UpdateProductRequest): Promise<SingleApiResponse<Product>> {
        try {
            const response = await axios.put<SingleApiResponse<Product>>(
                `${API_ENDPOINTS.PRODUCTS.UPDATE}/${id}`,
                product
            );
            return response.data;
        } catch (error: unknown) {
            return handleApiError(
                error, 
                EMPTY_PRODUCT, 
                'Ürün güncellenirken bir hata oluştu'
            ) as SingleApiResponse<Product>;
        }
    }

    /**
     * Ürün sil
     */
    static async delete(id: string): Promise<SingleApiResponse<boolean>> {
        try {
            const response = await axios.delete<SingleApiResponse<boolean>>(
                `${API_ENDPOINTS.PRODUCTS.DELETE}/${id}`
            );
            return response.data;
        } catch (error: unknown) {
            return handleApiError(
                error, 
                false, 
                'Ürün silinirken bir hata oluştu'
            ) as SingleApiResponse<boolean>;
        }
    }

    /**
     * Duruma göre ürünleri getir
     */
    static async getByStatus(status: number): Promise<ApiResponse<ApiResponseData<Product>>> {
        return this.getAll(1, 10, status);
    }

    /**
     * Toplu ürün işlemleri
     */
    static async bulkUpdate(
        productIds: string[], 
        updates: UpdateProductRequest
    ): Promise<SingleApiResponse<boolean>> {
        try {
            const response = await axios.put<SingleApiResponse<boolean>>(
                `${API_ENDPOINTS.PRODUCTS.UPDATE}/bulk`,
                { productIds, updates }
            );
            return response.data;
        } catch (error: unknown) {
            return handleApiError(
                error, 
                false, 
                'Toplu güncelleme sırasında bir hata oluştu'
            ) as SingleApiResponse<boolean>;
        }
    }

    /**
     * Ürün arama
     */
    static async search(
        query: string, 
        pageNumber: number = 1, 
        pageSize: number = 10
    ): Promise<ApiResponse<ApiResponseData<Product>>> {
        try {
            const params = new URLSearchParams({
                q: query,
                PageNumber: pageNumber.toString(),
                PageSize: pageSize.toString()
            });
            
            const response = await axios.get<ApiResponse<ApiResponseData<Product>>>(
                `${API_ENDPOINTS.PRODUCTS.GET_ALL}/search?${params.toString()}`
            );
            return response.data;
        } catch (error: unknown) {
            return handleApiError(
                error, 
                EMPTY_PRODUCTS_RESPONSE, 
                'Ürün arama sırasında bir hata oluştu'
            ) as ApiResponse<ApiResponseData<Product>>;
        }
    }
}

export default ProductService;
