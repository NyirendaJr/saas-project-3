import apiClient from './axiosConfig';

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

export interface PaginationLinks {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
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

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    links: PaginationLinks;
    meta: PaginationMeta;
}

export interface PermissionFilters {
    // Global search (uses the 'global' filter)
    global?: string;
    // Exact filters
    id?: number;
    name?: string;
    guard_name?: string;
    module?: string;
    description?: string;
    // Sorting (Spatie uses 'sort' parameter)
    sort?: string;
    // Pagination
    per_page?: number;
    page?: number;
    // Includes (for relationships)
    include?: string;
    // Fields (for selecting specific fields)
    fields?: string;
}

class PermissionsApiService {
    private baseUrl = '/permissions';

    /**
     * Get paginated permissions with filters
     */
    async getPermissions(filters: PermissionFilters = {}): Promise<PaginatedResponse<Permission>> {
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
                links: {
                    first: null,
                    last: null,
                    prev: null,
                    next: null,
                },
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
            };
        }
    }

    /**
     * Get all permissions (without pagination)
     */
    async getAllPermissions(): Promise<Permission[]> {
        const response = await apiClient.get(`${this.baseUrl}/all`);
        return response.data.data;
    }

    /**
     * Get permission by ID
     */
    async getPermission(id: number): Promise<Permission> {
        const response = await apiClient.get(`${this.baseUrl}/${id}`);
        return response.data.data;
    }

    /**
     * Create new permission
     */
    async createPermission(data: Partial<Permission>): Promise<Permission> {
        const response = await apiClient.post(this.baseUrl, data);
        return response.data.data;
    }

    /**
     * Update permission
     */
    async updatePermission(id: number, data: Partial<Permission>): Promise<Permission> {
        const response = await apiClient.put(`${this.baseUrl}/${id}`, data);
        return response.data.data;
    }

    /**
     * Delete permission
     */
    async deletePermission(id: number): Promise<void> {
        await apiClient.delete(`${this.baseUrl}/${id}`);
    }

    /**
     * Delete multiple permissions
     */
    async deleteMultiplePermissions(ids: number[]): Promise<{ message: string }> {
        const response = await apiClient.post(`${this.baseUrl}/destroy-multiple`, { ids });
        return response.data.data;
    }

    /**
     * Get permissions by module
     */
    async getPermissionsByModule(module: string): Promise<Permission[]> {
        const response = await apiClient.get(`${this.baseUrl}/by-module/${module}`);
        return response.data.data;
    }

    /**
     * Get permissions by guard
     */
    async getPermissionsByGuard(guard: string): Promise<Permission[]> {
        const response = await apiClient.get(`${this.baseUrl}/by-guard/${guard}`);
        return response.data.data;
    }

    /**
     * Get all available modules
     */
    async getModules(): Promise<string[]> {
        const response = await apiClient.get(`${this.baseUrl}/modules`);
        return response.data.data;
    }

    /**
     * Get all available guards
     */
    async getGuards(): Promise<string[]> {
        const response = await apiClient.get(`${this.baseUrl}/guards`);
        return response.data.data;
    }
}

export const permissionsApiService = new PermissionsApiService();
