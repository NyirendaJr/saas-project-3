import axios from 'axios';
import JWTService from './jwtService';

export interface Permission {
    id: number;
    name: string;
    guard_name: string;
    module: string;
    description: string;
    created_at: string;
    updated_at: string;
    roles_count?: number;
    roles?: any[];
}

export interface PaginationData {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: PaginationData;
}

export interface PermissionFilters {
    search?: string;
    guard_name?: string;
    module?: string;
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
    per_page?: number;
    page?: number;
}

class PermissionsApiService {
    private baseUrl = '/api/v1/permissions';
    private jwtService = JWTService.getInstance();

    /**
     * Get paginated permissions with filters
     */
    async getPermissions(filters: PermissionFilters = {}): Promise<PaginatedResponse<Permission>> {
        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                params.append(key, value.toString());
            }
        });

        try {
            const response = await axios.get(`${this.baseUrl}?${params.toString()}`);
            return response.data;
        } catch (error) {
            console.error('API Error:', error);
            // Return empty response with default pagination on error
            return {
                data: [],
                pagination: {
                    current_page: 1,
                    last_page: 1,
                    per_page: filters.per_page || 15,
                    total: 0,
                    from: 0,
                    to: 0,
                },
            };
        }
    }

    /**
     * Get all permissions (without pagination)
     */
    async getAllPermissions(): Promise<Permission[]> {
        const response = await axios.get(`${this.baseUrl}/all`);
        return response.data.data;
    }

    /**
     * Get permission by ID
     */
    async getPermission(id: number): Promise<Permission> {
        const response = await axios.get(`${this.baseUrl}/${id}`);
        return response.data.data;
    }

    /**
     * Create new permission
     */
    async createPermission(data: Partial<Permission>): Promise<Permission> {
        const response = await axios.post(this.baseUrl, data);
        return response.data.data;
    }

    /**
     * Update permission
     */
    async updatePermission(id: number, data: Partial<Permission>): Promise<Permission> {
        const response = await axios.put(`${this.baseUrl}/${id}`, data);
        return response.data.data;
    }

    /**
     * Delete permission
     */
    async deletePermission(id: number): Promise<void> {
        await axios.delete(`${this.baseUrl}/${id}`);
    }

    /**
     * Delete multiple permissions
     */
    async deleteMultiplePermissions(ids: number[]): Promise<{ message: string }> {
        const response = await axios.post(`${this.baseUrl}/destroy-multiple`, { ids });
        return response.data.data;
    }

    /**
     * Get permissions by module
     */
    async getPermissionsByModule(module: string): Promise<Permission[]> {
        const response = await axios.get(`${this.baseUrl}/by-module/${module}`);
        return response.data.data;
    }

    /**
     * Get permissions by guard
     */
    async getPermissionsByGuard(guard: string): Promise<Permission[]> {
        const response = await axios.get(`${this.baseUrl}/by-guard/${guard}`);
        return response.data.data;
    }

    /**
     * Get all available modules
     */
    async getModules(): Promise<string[]> {
        const response = await axios.get(`${this.baseUrl}/modules`);
        return response.data.data;
    }

    /**
     * Get all available guards
     */
    async getGuards(): Promise<string[]> {
        const response = await axios.get(`${this.baseUrl}/guards`);
        return response.data.data;
    }
}

export const permissionsApiService = new PermissionsApiService();
