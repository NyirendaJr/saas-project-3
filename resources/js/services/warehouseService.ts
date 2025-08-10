import apiClient from './axiosConfig';
import { initializeCsrf } from '@/utils/csrf';

export interface Warehouse {
    id: string;
    name: string;
    code: string;
    type: 'warehouse' | 'store' | 'outlet' | 'distribution_center';
    address?: string;
    phone?: string;
    email?: string;
    operating_hours?: Record<string, any>;
    settings?: Record<string, any>;
    is_current?: boolean;
}

export interface WarehousesResponse {
    warehouses: Warehouse[];
    current_warehouse_id?: string | null;
}

export interface CurrentWarehouseResponse {
    warehouse: Warehouse;
}

export interface SwitchWarehouseRequest {
    warehouse_id: string;
}

export interface SwitchWarehouseResponse {
    message: string;
    current_warehouse: Warehouse;
}

class WarehouseApiService {
    private baseUrl = '/warehouses';

    /**
     * Ensure CSRF protection is set up
     */
    private async ensureCsrfToken() {
        try {
            await initializeCsrf();
        } catch (error) {
            console.warn('Could not fetch CSRF token:', error);
        }
    }

    /**
     * Get all warehouses accessible by current user
     */
    async getWarehouses(): Promise<WarehousesResponse> {
        await this.ensureCsrfToken();
        const response = await apiClient.get(this.baseUrl);
        return response.data;
    }

    /**
     * Switch to a different warehouse
     */
    async switchWarehouse(warehouseId: string): Promise<SwitchWarehouseResponse> {
        await this.ensureCsrfToken();
        const response = await apiClient.post(`${this.baseUrl}/switch`, {
            warehouse_id: warehouseId,
        });
        return response.data;
    }

    /**
     * Get current warehouse information
     */
    async getCurrentWarehouse(): Promise<CurrentWarehouseResponse> {
        const response = await apiClient.get(`${this.baseUrl}/current`);
        return response.data;
    }

    /**
     * Get specific warehouse details
     */
    async getWarehouse(warehouseId: string): Promise<CurrentWarehouseResponse> {
        const response = await apiClient.get(`${this.baseUrl}/${warehouseId}`);
        return response.data;
    }
}

export const warehouseApiService = new WarehouseApiService();
