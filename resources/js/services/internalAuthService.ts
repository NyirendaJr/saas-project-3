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
}

export const authService = new AuthService();
export default authService;
