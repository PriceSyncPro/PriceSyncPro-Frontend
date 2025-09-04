import axios from '@/utils/axios';
import { API_ENDPOINTS } from '@/utils/api/endpoints';
import { 
    UserMarketplace, 
    UserMarketplaceCreateData, 
    ApiResponse 
} from '@/utils/types/userMarketplaces';

export class UserMarketplacesService {
    static async getAll(): Promise<UserMarketplace[]> {
        const response = await axios.get<ApiResponse<UserMarketplace[]>>(
            API_ENDPOINTS.USERMARKETPLACES.GET_ALL
        );
        
        if (!response.data.isSuccessful) {
            throw new Error(response.data.errorMessages?.join(', ') || 'Failed to get user marketplaces');
        }
        
        return response.data.data;
    }

    static async create(data: UserMarketplaceCreateData): Promise<void> {
        const response = await axios.post<ApiResponse<null>>(
            API_ENDPOINTS.USERMARKETPLACES.CREATE,
            data
        );
        
        if (!response.data.isSuccessful) {
            throw new Error(response.data.errorMessages?.join(', ') || 'Failed to create user marketplace');
        }
    }
}

export default UserMarketplacesService;
