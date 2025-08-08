import axios from 'axios';

// Create axios instance for internal API (Sanctum)
const apiClient = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    withCredentials: true, // Important for Sanctum session authentication and CSRF
});

// Internal API (Sanctum) doesn't need token interceptors since it uses session authentication
// CSRF protection is handled automatically by Axios when withCredentials: true is set

export default apiClient;
