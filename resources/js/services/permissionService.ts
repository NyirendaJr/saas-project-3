import { router } from '@inertiajs/react';

export interface Permission {
    id: number;
    name: string;
    guard_name: string;
    module: string;
    description: string;
    created_at: string;
    updated_at: string;
    roles_count: number;
}

export interface PermissionFilters {
    search?: string;
    guard_name?: string;
    module?: string;
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
    per_page?: number;
}

export interface PaginationData {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

export interface PermissionsResponse {
    permissions: Permission[];
    pagination: PaginationData;
    filters: PermissionFilters;
}

class PermissionService {
    private baseUrl = '/modules/settings/permissions';

    async getPermissions(filters: PermissionFilters = {}): Promise<PermissionsResponse> {
        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                params.append(key, value.toString());
            }
        });

        const response = await fetch(`${this.baseUrl}?${params.toString()}`);

        if (!response.ok) {
            throw new Error('Failed to fetch permissions');
        }

        return response.json();
    }

    async createPermission(data: Partial<Permission>): Promise<any> {
        const response = await fetch('/permissions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to create permission');
        }

        return response.json();
    }

    async updatePermission(id: number, data: Partial<Permission>): Promise<any> {
        const response = await fetch(`/permissions/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to update permission');
        }

        return response.json();
    }

    async deletePermission(id: number): Promise<any> {
        const response = await fetch(`/permissions/${id}`, {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to delete permission');
        }

        return response.json();
    }

    async deleteMultiplePermissions(ids: number[]): Promise<any> {
        const response = await fetch('/permissions', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            },
            body: JSON.stringify({ ids }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to delete permissions');
        }

        return response.json();
    }

    async getModules(): Promise<string[]> {
        const response = await fetch('/permissions/modules/list');

        if (!response.ok) {
            throw new Error('Failed to fetch modules');
        }

        const data = await response.json();
        return data.data || [];
    }

    async getGuards(): Promise<string[]> {
        const response = await fetch('/permissions/guards/list');

        if (!response.ok) {
            throw new Error('Failed to fetch guards');
        }

        const data = await response.json();
        return data.data || [];
    }

    // Inertia.js navigation method
    navigateToPermissions(filters: PermissionFilters = {}) {
        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                params.append(key, value.toString());
            }
        });

        router.visit(`${this.baseUrl}?${params.toString()}`);
    }
}

export const permissionService = new PermissionService();
