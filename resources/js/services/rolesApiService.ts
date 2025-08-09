import apiClient from './axiosConfig';
import { Permission } from './permissionsApiService';

export interface Role {
    id: number;
    name: string;
    guard_name: string;
    description?: string;
    permissions_count?: number;
    permissions?: Permission[];
    created_at: string;
    updated_at: string;
}

export interface RoleFilters {
    page?: number;
    per_page?: number;
    global?: string;
    guard_name?: string;
    name?: string;
    sort?: string;
}

export interface PaginationMeta {
    current_page: number;
    from: number;
    last_page: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: PaginationMeta;
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
}

class RolesApiService {
    private baseUrl = '/roles';

    async getRoles(filters: RoleFilters = {}): Promise<PaginatedResponse<Role>> {
        const params = new URLSearchParams();

        // Handle Spatie Query Builder parameters
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                // For filters, we need to prefix with 'filter[field_name]'
                if (key !== 'sort' && key !== 'page' && key !== 'per_page' && key !== 'include' && key !== 'fields') {
                    params.append(`filter[${key}]`, value.toString());
                } else {
                    params.append(key, value.toString());
                }
            }
        });

        try {
            const response = await apiClient.get(`${this.baseUrl}?${params.toString()}`);
            return response.data;
        } catch (error) {
            console.error('API Error:', error);
            // Return empty response with default pagination on error
            return {
                data: [],
                meta: {
                    current_page: 1,
                    last_page: 1,
                    per_page: filters.per_page || 10,
                    total: 0,
                    from: 0,
                    to: 0,
                    path: this.baseUrl,
                    links: [],
                },
                links: {
                    first: '',
                    last: '',
                    prev: null,
                    next: null,
                },
            };
        }
    }

    async getRole(id: number): Promise<Role> {
        const response = await apiClient.get(`${this.baseUrl}/${id}`);
        return response.data.data;
    }

    async createRole(data: Partial<Role>): Promise<Role> {
        const response = await apiClient.post(this.baseUrl, data);
        return response.data.data;
    }

    async updateRole(id: number, data: Partial<Role>): Promise<Role> {
        const response = await apiClient.put(`${this.baseUrl}/${id}`, data);
        return response.data.data;
    }

    async deleteRole(id: number): Promise<void> {
        await apiClient.delete(`${this.baseUrl}/${id}`);
    }
}

export const rolesApiService = new RolesApiService();
