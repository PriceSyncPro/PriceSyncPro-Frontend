import axios from '@/utils/axios';
import { API_ENDPOINTS } from '@/utils/api/endpoints';
import {ApiResponse, SingleApiResponse, createProduct, Pagination, Product, Statistic} from '@/utils/types/Products';


interface ApiResponseData<T> {
    items: T[];
    metadata: {
        pagination?: Pagination;
        statistic?: Statistic;
    };
}

export class ProductService {
    /**
     * Tüm ürünleri getir
     */
    static async getAll(pageNumber: number = 1, pageSize: number = 10, productStatus?: number): Promise<ApiResponse<ApiResponseData<Product>>> {
        try {
            let url = `${API_ENDPOINTS.PRODUCTS.GET_ALL}?PageNumber=${pageNumber}&PageSize=${pageSize}`;
            
            if (productStatus !== undefined) {
                url += `&ProductStatus=${productStatus}`;
            }
            
            const response = await axios.get<ApiResponse<ApiResponseData<Product>>>(url);
            console.log(response)
            return response.data;
        } catch (error: unknown) {
            // Axios hatası durumunda, API yanıt formatına uygun bir hata nesnesi döndür
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { data?: ApiResponse<ApiResponseData<Product>>; status?: number } };
                if (axiosError.response?.data) {
                    return axiosError.response.data;
                }
            }
            
            const errorMessage = error && typeof error === 'object' && 'message' in error 
                ? (error as { message: string }).message 
                : 'Ürünler getirilirken bir hata oluştu';
            
            const statusCode = error && typeof error === 'object' && 'response' in error
                ? (error as { response?: { status?: number } }).response?.status || 500
                : 500;
            
            // API yanıt formatına uygun bir hata nesnesi oluştur
            return {
                data: {
                    items: [],
                    metadata: {}
                },
                errorMessages: [errorMessage],
                isSuccessful: false,
                statusCode
            };
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
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { data?: SingleApiResponse<Product>; status?: number } };
                if (axiosError.response?.data) {
                    return axiosError.response.data;
                }
            }
            
            const errorMessage = error && typeof error === 'object' && 'message' in error 
                ? (error as { message: string }).message 
                : 'Ürün getirilirken bir hata oluştu';
            
            const statusCode = error && typeof error === 'object' && 'response' in error
                ? (error as { response?: { status?: number } }).response?.status || 500
                : 500;
            
            // Boş bir Product nesnesi
            const emptyProduct: Product = {
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
            
            return {
                data: emptyProduct,
                errorMessages: [errorMessage],
                isSuccessful: false,
                statusCode
            };
        }
    }

    /**
     * Yeni ürün oluştur
     */
    static async create(productData: createProduct): Promise<SingleApiResponse<Product>> {
        try {
            const response = await axios.post<SingleApiResponse<Product>>(
                API_ENDPOINTS.PRODUCTS.CREATE,
                productData
            );
            return response.data;
        } catch (error: unknown) {
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { data?: SingleApiResponse<Product>; status?: number } };
                if (axiosError.response?.data) {
                    return axiosError.response.data;
                }
            }
            
            const errorMessage = error && typeof error === 'object' && 'message' in error 
                ? (error as { message: string }).message 
                : 'Ürün oluşturulurken bir hata oluştu';
            
            const statusCode = error && typeof error === 'object' && 'response' in error
                ? (error as { response?: { status?: number } }).response?.status || 500
                : 500;
            
            // Boş bir Product nesnesi
            const emptyProduct: Product = {
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
            
            return {
                data: emptyProduct,
                errorMessages: [errorMessage],
                isSuccessful: false,
                statusCode
            };
        }
    }

    /**
     * Ürün güncelle
     */
    static async update(id: string, product: Partial<Product>): Promise<SingleApiResponse<Product>> {
        try {
            const response = await axios.put<SingleApiResponse<Product>>(
                `${API_ENDPOINTS.PRODUCTS.UPDATE}/${id}`,
                product
            );
            return response.data;
        } catch (error: unknown) {
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { data?: SingleApiResponse<Product>; status?: number } };
                if (axiosError.response?.data) {
                    return axiosError.response.data;
                }
            }
            
            const errorMessage = error && typeof error === 'object' && 'message' in error 
                ? (error as { message: string }).message 
                : 'Ürün güncellenirken bir hata oluştu';
            
            const statusCode = error && typeof error === 'object' && 'response' in error
                ? (error as { response?: { status?: number } }).response?.status || 500
                : 500;

            // Boş bir Product nesnesi
            const emptyProduct: Product = {
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

            return {
                data: emptyProduct,
                errorMessages: [errorMessage],
                isSuccessful: false,
                statusCode
            };
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
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { data?: SingleApiResponse<boolean>; status?: number } };
                if (axiosError.response?.data) {
                    return axiosError.response.data;
                }
            }
            
            const errorMessage = error && typeof error === 'object' && 'message' in error 
                ? (error as { message: string }).message 
                : 'Ürün silinirken bir hata oluştu';
            
            const statusCode = error && typeof error === 'object' && 'response' in error
                ? (error as { response?: { status?: number } }).response?.status || 500
                : 500;
            
            return {
                data: false,
                errorMessages: [errorMessage],
                isSuccessful: false,
                statusCode
            };
        }
    }

    /**
     * Duruma göre ürünleri getir
     */
    static async getByStatus(status: number): Promise<ApiResponse<ApiResponseData<Product>>> {
        try {
            const response = await axios.get<ApiResponse<ApiResponseData<Product>>>(
                `${API_ENDPOINTS.PRODUCTS.GET_ALL}?productStatus=${status}`
            );
            return response.data;
        } catch (error: unknown) {
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { data?: ApiResponse<ApiResponseData<Product>>; status?: number } };
                if (axiosError.response?.data) {
                    return axiosError.response.data;
                }
            }
            
            const errorMessage = error && typeof error === 'object' && 'message' in error 
                ? (error as { message: string }).message 
                : 'Ürünler getirilirken bir hata oluştu';
            
            const statusCode = error && typeof error === 'object' && 'response' in error
                ? (error as { response?: { status?: number } }).response?.status || 500
                : 500;
            
            return {
                data: {
                    items: [],
                    metadata: {}
                },
                errorMessages: [errorMessage],
                isSuccessful: false,
                statusCode
            };
        }
    }
}

export default ProductService;
