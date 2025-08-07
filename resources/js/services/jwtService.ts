import axios from 'axios';

interface JWTResponse {
    token: string;
    token_type: string;
    expires_in: number;
}

class JWTService {
    private static instance: JWTService;
    private token: string | null = null;
    private tokenExpiry: number | null = null;

    private constructor() {
        this.loadTokenFromStorage();
    }

    public static getInstance(): JWTService {
        if (!JWTService.instance) {
            JWTService.instance = new JWTService();
        }
        return JWTService.instance;
    }

    /**
     * Get JWT token from server or return cached valid token
     */
    async getToken(): Promise<string> {
        // Check if we have a valid token
        if (this.isTokenValid()) {
            return this.token!;
        }

        try {
            const response = await axios.get<JWTResponse>('/jwt/token');
            this.setToken(response.data.token, response.data.expires_in);
            return response.data.token;
        } catch (error) {
            console.error('Failed to get JWT token:', error);
            throw new Error('Authentication required');
        }
    }

    /**
     * Refresh JWT token
     */
    async refreshToken(): Promise<string> {
        try {
            const response = await axios.post<JWTResponse>('/jwt/refresh');
            this.setToken(response.data.token, response.data.expires_in);
            return response.data.token;
        } catch (error) {
            console.error('Failed to refresh JWT token:', error);
            this.clearToken();
            throw new Error('Token refresh failed');
        }
    }

    /**
     * Set token and expiry in memory and localStorage
     */
    private setToken(token: string, expiresIn: number): void {
        this.token = token;
        this.tokenExpiry = Date.now() + expiresIn * 1000;

        // Store in localStorage for persistence
        localStorage.setItem('jwt_token', token);
        localStorage.setItem('jwt_expiry', this.tokenExpiry.toString());
    }

    /**
     * Load token from localStorage on initialization
     */
    private loadTokenFromStorage(): void {
        const token = localStorage.getItem('jwt_token');
        const expiry = localStorage.getItem('jwt_expiry');

        if (token && expiry) {
            this.token = token;
            this.tokenExpiry = parseInt(expiry);
        }
    }

    /**
     * Check if current token is valid (with 5 minute buffer)
     */
    private isTokenValid(): boolean {
        if (!this.token || !this.tokenExpiry) {
            return false;
        }

        // Check if token is expired (with 5 minute buffer)
        return Date.now() < this.tokenExpiry - 5 * 60 * 1000;
    }

    /**
     * Get current token without validation
     */
    getCurrentToken(): string | null {
        return this.token;
    }

    /**
     * Clear token from memory and localStorage
     */
    clearToken(): void {
        this.token = null;
        this.tokenExpiry = null;
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('jwt_expiry');
    }

    /**
     * Get authorization header for API requests
     */
    getAuthHeader(): string | null {
        if (this.isTokenValid()) {
            return `Bearer ${this.token}`;
        }
        return null;
    }

    /**
     * Setup axios interceptors for automatic token handling
     */
    setupAxiosInterceptor(): void {
        // Request interceptor to add token
        axios.interceptors.request.use(
            async (config) => {
                // Skip token for auth endpoints
                if (config.url?.includes('/jwt/') || config.url?.includes('/login')) {
                    return config;
                }

                try {
                    const token = await this.getToken();
                    config.headers.Authorization = `Bearer ${token}`;
                } catch (error) {
                    // If token fetch fails, redirect to login
                    window.location.href = '/login';
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            },
        );

        // Response interceptor to handle token refresh
        axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        const token = await this.refreshToken();
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return axios(originalRequest);
                    } catch (refreshError) {
                        // If refresh fails, clear token and redirect to login
                        this.clearToken();
                        window.location.href = '/login';
                        return Promise.reject(refreshError);
                    }
                }

                return Promise.reject(error);
            },
        );
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return this.isTokenValid();
    }

    /**
     * Logout user and clear token
     */
    async logout(): Promise<void> {
        try {
            // Call logout endpoint
            await axios.post('/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear token regardless of logout success
            this.clearToken();
        }
    }
}

export default JWTService;
