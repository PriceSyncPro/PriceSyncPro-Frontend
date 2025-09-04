
import axios from '@/utils/axios';
import { API_ENDPOINTS } from '@/utils/api/endpoints';
import { User, UserUpdateData, ApiResponse } from '@/utils/types/user';

export class UserService {
    static async getProfile(): Promise<User> {
        const response = await axios.get<ApiResponse<User>>(API_ENDPOINTS.USER.GET_USER);
        
        if (!response.data.isSuccessful) {
            throw new Error(response.data.errorMessages?.join(', ') || 'Failed to get user profile');
        }
        console.log(response.data.data)
        
        return response.data.data;
    }

    static async updateProfile(data: UserUpdateData): Promise<User> {
        const response = await axios.patch<ApiResponse<User>>(
            API_ENDPOINTS.USER.UPDATE_PROFILE,
            data
        );
        
        if (!response.data.isSuccessful) {
            throw new Error(response.data.errorMessages?.join(', ') || 'Failed to update profile');
        }
        
        return response.data.data;
    }

    static async changePassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
        const response = await axios.post<ApiResponse<{ message: string }>>(API_ENDPOINTS.USER.CHANGE_PASSWORD, {
            currentPassword,
            newPassword
        });
        
        if (!response.data.isSuccessful) {
            throw new Error(response.data.errorMessages?.join(', ') || 'Failed to change password');
        }
        
        return response.data.data;
    }

    static async uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
        const formData = new FormData();
        formData.append('avatar', file);

        const response = await axios.post<ApiResponse<{ avatarUrl: string }>>(
            API_ENDPOINTS.USER.UPLOAD_AVATAR,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        
        if (!response.data.isSuccessful) {
            throw new Error(response.data.errorMessages?.join(', ') || 'Failed to upload avatar');
        }
        
        return response.data.data;
    }
}

export default UserService;
