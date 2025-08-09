import { initializeCsrf } from '@/utils/csrf';
import apiClient from './axiosConfig';

export interface InternalLoginCredentials {
    email: string;
    password: string;
}

export interface InternalLoginResponse {
    user: {
        id: number;
        name: string;
        email: string;
    };
}

export interface InternalRegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

/**
 * AuthService for Sanctum session-based authentication
 * Uses session-based authentication, no JWT tokens needed
 */
class AuthService {
    /**
     * Initialize CSRF protection for Sanctum
     */
    async initializeCsrf(): Promise<void> {
        await initializeCsrf();
    }

    /**
     * Login user for internal API (session-based)
     */
    async login(credentials: InternalLoginCredentials): Promise<InternalLoginResponse> {
        try {
            // Initialize CSRF protection before login
            await this.initializeCsrf();

            const response = await apiClient.post('/auth/login', credentials);
            const { user } = response.data.data;

            // No token storage needed for session-based auth
            return { user };
        } catch (error) {
            console.error('Internal login failed:', error);
            throw error;
        }
    }

    /**
     * Register user for internal API (session-based)
     */
    async register(data: InternalRegisterData): Promise<InternalLoginResponse> {
        try {
            // Initialize CSRF protection before registration
            await this.initializeCsrf();

            const response = await apiClient.post('/auth/register', data);
            const { user } = response.data.data;

            // No token storage needed for session-based auth
            return { user };
        } catch (error) {
            console.error('Internal registration failed:', error);
            throw error;
        }
    }

    /**
     * Logout user from internal API (session-based)
     */
    async logout(): Promise<void> {
        try {
            await apiClient.post('/auth/logout');
            // Session will be destroyed server-side
        } catch (error) {
            console.error('Internal logout API call failed:', error);
        }
    }

    /**
     * Get current user from internal API
     */
    async getCurrentUser() {
        try {
            const response = await apiClient.get('/user');
            return response.data;
        } catch (error) {
            console.error('Failed to get current user from internal API:', error);
            throw error;
        }
    }

    /**
     * Check if user is authenticated for internal API
     * This checks the session state
     */
    async isAuthenticated(): Promise<boolean> {
        try {
            await this.getCurrentUser();
            return true;
        } catch (error) {
            return false;
        }
    }
}

export const authService = new AuthService();
export default authService;
