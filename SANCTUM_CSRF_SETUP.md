# Sanctum Authentication Setup

## Overview

This document explains how Laravel Sanctum authentication is implemented in our SPA with CSRF (Cross-Site Request Forgery) protection.

## How CSRF Protection Works

### 1. CSRF Token Initialization

Before making any authenticated requests, the SPA must initialize CSRF protection:

```typescript
// Initialize CSRF protection
await authService.initializeCsrf();
// or
await initializeCsrf();
```

This makes a request to `/sanctum/csrf-cookie` which:

- Sets an `XSRF-TOKEN` cookie containing the current CSRF token
- Returns a 204 No Content response

### 2. Automatic Token Handling

Axios automatically handles CSRF tokens when `withCredentials: true` is set:

```typescript
const apiClient = axios.create({
    baseURL: '/api',
    withCredentials: true, // Enables automatic CSRF handling
});
```

Axios will:

- Read the `XSRF-TOKEN` cookie
- URL decode the token
- Set the `X-XSRF-TOKEN` header on subsequent requests

### 3. Manual Token Handling (if needed)

If you need to manually handle CSRF tokens:

```typescript
import { getCsrfToken, setCsrfHeader } from '@/utils/csrf';

// Get the current CSRF token
const token = getCsrfToken();

// Set CSRF header manually
const headers = setCsrfHeader({ 'Content-Type': 'application/json' });
```

## Implementation Details

### Backend Configuration

1. **Sanctum Middleware**: `EnsureFrontendRequestsAreStateful` is registered in `bootstrap/app.php`
2. **CSRF Route**: `/sanctum/csrf-cookie` is automatically available
3. **Session Configuration**: Proper session handling for stateful requests

### Frontend Configuration

1. **Axios Setup**: `withCredentials: true` enables automatic CSRF handling
2. **CSRF Utilities**: Helper functions for manual token management
3. **Auth Service**: Automatic CSRF initialization before login/register

## Usage Examples

### Login Flow

```typescript
// 1. Initialize CSRF protection
await authService.initializeCsrf();

// 2. Login (CSRF token automatically included)
const { user } = await authService.login({
    email: 'user@example.com',
    password: 'password',
});

// 3. Subsequent API calls automatically include CSRF token
const permissions = await permissionsApiService.getPermissions();
```

### Registration Flow

```typescript
// 1. Initialize CSRF protection
await authService.initializeCsrf();

// 2. Register (CSRF token automatically included)
const { user } = await authService.register({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password',
    password_confirmation: 'password',
});
```

### Manual CSRF Check

```typescript
import { isCsrfInitialized } from '@/utils/csrf';

// Check if CSRF is properly initialized
if (!isCsrfInitialized()) {
    await initializeCsrf();
}
```

## Security Benefits

1. **CSRF Protection**: Prevents cross-site request forgery attacks
2. **Automatic Handling**: No manual token management required
3. **Session Security**: Proper session-based authentication
4. **Cookie Security**: Secure cookie handling with proper flags

## Troubleshooting

### Common Issues

1. **CSRF Token Mismatch**: Ensure `withCredentials: true` is set
2. **Cookie Not Set**: Check if `/sanctum/csrf-cookie` endpoint is accessible
3. **Session Issues**: Verify session configuration in Laravel

### Debug Steps

1. Check browser cookies for `XSRF-TOKEN`
2. Verify `X-XSRF-TOKEN` header in network requests
3. Ensure proper domain configuration in Sanctum config

## Best Practices

1. **Always Initialize**: Call CSRF initialization before authentication
2. **Use Utilities**: Use provided CSRF utilities for consistency
3. **Error Handling**: Handle CSRF initialization errors gracefully
4. **Testing**: Test CSRF protection in different scenarios
