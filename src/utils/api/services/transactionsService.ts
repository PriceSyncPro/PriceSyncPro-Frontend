import axios from '@/utils/axios';
import { API_ENDPOINTS } from '@/utils/api/endpoints';
import { 
    TransactionListData, 
    ApiResponse 
} from '@/utils/types/transactions';

export class TransactionsService {
    static async getAll(
        page: number = 1, 
        pageSize: number = 10,
        searchTerm?: string,
        type?: number | null,
        startDate?: string,
        endDate?: string
    ): Promise<TransactionListData> {
        const params = new URLSearchParams({
            page: page.toString(),
            pageSize: pageSize.toString()
        });
        
        if (searchTerm) {
            params.append('search', searchTerm);
        }
        
        if (type !== null && type !== undefined) {
            params.append('type', type.toString());
        }
        
        if (startDate) {
            params.append('startDate', startDate);
        }
        
        if (endDate) {
            params.append('endDate', endDate);
        }
        
        const response = await axios.get<ApiResponse<TransactionListData>>(
            `${API_ENDPOINTS.TRANSACTIONS.GET_ALL}?${params}`
        );
        
        if (!response.data.isSuccessful) {
            throw new Error(response.data.errorMessages?.join(', ') || 'Failed to get transactions');
        }
        
        return response.data.data;
    }
}

export default TransactionsService;
