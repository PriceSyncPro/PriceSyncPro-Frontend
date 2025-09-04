import axios from '@/utils/axios';
import { API_ENDPOINTS } from '@/utils/api/endpoints';
import { 
    Marketplace, 
    ApiResponse 
} from '@/utils/types/marketplaces';

export class MarketplacesService {
    static async getAll(): Promise<Marketplace[]> {
        const response = await axios.get<ApiResponse<Marketplace[]>>(
            API_ENDPOINTS.MARKETPLACES.GET_ALL
        );
        
        if (!response.data.isSuccessful) {
            throw new Error(response.data.errorMessages?.join(', ') || 'Failed to get marketplaces');
        }
        
        return response.data.data;
    }
}

export default MarketplacesService;
