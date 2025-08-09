import apiClient from '@/services/axiosConfig';
import axios from 'axios';

/**
 * CSRF Token Management Utilities
 * For Sanctum session-based authentication
 */

/**
 * Initialize CSRF protection for Sanctum
 * This should be called before any authenticated requests
 */
export async function initializeCsrf(): Promise<void> {
    try {
        await axios.get('/sanctum/csrf-cookie');
    } catch (error) {
        console.error('Failed to initialize CSRF protection:', error);
        throw error;
    }
}

/**
 * Get the current CSRF token from cookies
 */
export function getCsrfToken(): string | null {
    const cookies = document.cookie.split(';');
    const xsrfCookie = cookies.find((cookie) => cookie.trim().startsWith('XSRF-TOKEN='));

    if (xsrfCookie) {
        return decodeURIComponent(xsrfCookie.split('=')[1]);
    }

    return null;
}

/**
 * Set CSRF token in headers manually (if needed)
 * Note: Axios should handle this automatically with withCredentials: true
 */
export function setCsrfHeader(headers: Record<string, string>): Record<string, string> {
    const token = getCsrfToken();
    if (token) {
        headers['X-XSRF-TOKEN'] = token;
    }
    return headers;
}

/**
 * Check if CSRF protection is properly initialized
 */
export function isCsrfInitialized(): boolean {
    return getCsrfToken() !== null;
}
