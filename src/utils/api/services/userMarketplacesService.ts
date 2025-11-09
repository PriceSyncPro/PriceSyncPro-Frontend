import axios from '@/utils/axios';
import { API_ENDPOINTS } from '@/utils/api/endpoints';
import { 
    UserMarketplace, 
    UserMarketplaceCreateData, 
    ApiResponse 
} from '@/utils/types/userMarketplaces';

export class UserMarketplacesService {
    static async getAll(): Promise<UserMarketplace[]> {
        try {
            const response = await axios.get<ApiResponse<UserMarketplace[]>>(
                API_ENDPOINTS.USERMARKETPLACES.GET_ALL
            );
            
            if (!response.data.isSuccessful) {
                // Return empty array instead of throwing error when no data
                return [];
            }
            
            return response.data.data || [];
        } catch (error) {
            // Return empty array instead of throwing error
            return [];
        }
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

    static async delete(id: string): Promise<void> {
        const response = await axios.delete<ApiResponse<null>>(
            `${API_ENDPOINTS.USERMARKETPLACES.DELETE}/${id}`
        );
        
        if (!response.data.isSuccessful) {
            throw new Error(response.data.errorMessages?.join(', ') || 'Failed to delete user marketplace');
        }
    }
}

export default UserMarketplacesService;
