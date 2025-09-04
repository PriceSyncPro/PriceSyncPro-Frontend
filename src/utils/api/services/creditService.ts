import axios from '@/utils/axios';
import {COUPON_ENDPOINTS} from '@/utils/api/endpoints';
import {ApiResponse,Coupon} from "@/utils/types/Coupon";

export class CreditService {

    /**
     * kupon bozdur
     */
    static async reedem(couponCode: string): Promise<ApiResponse<Coupon>> {
        try {
            const response = await axios.post<ApiResponse<Coupon>>(
                COUPON_ENDPOINTS.REEDEM,
                { code: couponCode }
            );
            return response.data;
        } catch (error: unknown) {
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { data?: ApiResponse<Coupon>; status?: number } };
                if (axiosError.response?.data) {
                    return axiosError.response.data;
                }
            }
            
            const errorMessage = error && typeof error === 'object' && 'message' in error 
                ? (error as { message: string }).message 
                : 'Kupon bozdurulurken hata oldu.';
            
            const statusCode = error && typeof error === 'object' && 'response' in error
                ? (error as { response?: { status?: number } }).response?.status || 500
                : 500;
                
            return {
                data: null,
                errorMessages: [errorMessage],
                isSuccessful: false,
                statusCode
            };
        }
    }
}

export default CreditService;
