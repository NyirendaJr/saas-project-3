import apiClient from './axiosConfig';

export interface Store {
    id: number;
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

export interface StoresResponse {
    stores: Store[];
    current_store_id?: number | null;
}

export interface CurrentStoreResponse {
    store: Store;
}

export interface SwitchStoreRequest {
    store_id: number;
}

export interface SwitchStoreResponse {
    message: string;
    current_store: Store;
}

class StoreApiService {
    private baseUrl = '/stores';

    /**
     * Ensure CSRF protection is set up
     */
    private async ensureCsrfToken() {
        try {
            await apiClient.get('/sanctum/csrf-cookie');
        } catch (error) {
            console.warn('Could not fetch CSRF token:', error);
        }
    }

    /**
     * Get all stores accessible by current user
     */
    async getStores(): Promise<StoresResponse> {
        await this.ensureCsrfToken();
        const response = await apiClient.get(this.baseUrl);
        return response.data;
    }

    /**
     * Switch to a different store
     */
    async switchStore(storeId: number): Promise<SwitchStoreResponse> {
        await this.ensureCsrfToken();
        const response = await apiClient.post(`${this.baseUrl}/switch`, {
            store_id: storeId,
        });
        return response.data;
    }

    /**
     * Get current store information
     */
    async getCurrentStore(): Promise<CurrentStoreResponse> {
        const response = await apiClient.get(`${this.baseUrl}/current`);
        return response.data;
    }

    /**
     * Get specific store details
     */
    async getStore(storeId: number): Promise<CurrentStoreResponse> {
        const response = await apiClient.get(`${this.baseUrl}/${storeId}`);
        return response.data;
    }
}

export const storeApiService = new StoreApiService();
