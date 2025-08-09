import { buildSpatieQueryParams } from '@/utils/spatie-query-builder';
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
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
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
        const params = buildSpatieQueryParams(filters);
        const response = await apiClient.get(`${this.baseUrl}?${params}`);
        return response.data;
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
