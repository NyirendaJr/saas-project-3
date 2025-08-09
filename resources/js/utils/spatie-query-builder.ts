/**
 * Utility functions for working with Spatie Query Builder parameters
 */

export interface SpatieFilters {
    // Global search
    global?: string;
    // Exact filters
    [key: string]: any;
}

export interface SpatieSort {
    field: string;
    direction: 'asc' | 'desc';
}

/**
 * Convert a sort object to Spatie Query Builder format
 * @param field - The field to sort by
 * @param direction - The sort direction
 * @returns Spatie format sort string (e.g., "name" or "-name" for desc)
 */
export function toSpatieSort(field: string, direction: 'asc' | 'desc'): string {
    return direction === 'desc' ? `-${field}` : field;
}

/**
 * Convert Spatie sort string back to sort object
 * @param sortString - Spatie format sort string
 * @returns Sort object with field and direction
 */
export function fromSpatieSort(sortString: string): SpatieSort {
    const isDesc = sortString.startsWith('-');
    const field = isDesc ? sortString.slice(1) : sortString;
    return {
        field,
        direction: isDesc ? 'desc' : 'asc',
    };
}

/**
 * Build query parameters for Spatie Query Builder
 * @param filters - Filter object
 * @param sort - Sort object
 * @param page - Page number
 * @param perPage - Items per page
 * @returns URLSearchParams object
 */
export function buildSpatieParams(filters: SpatieFilters = {}, sort?: SpatieSort, page?: number, perPage?: number): URLSearchParams {
    const params = new URLSearchParams();

    // Add filters
    Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            params.append(key, value.toString());
        }
    });

    // Add sorting
    if (sort) {
        params.append('sort', toSpatieSort(sort.field, sort.direction));
    }

    // Add pagination
    if (page !== undefined) {
        params.append('page', page.toString());
    }

    if (perPage !== undefined) {
        params.append('per_page', perPage.toString());
    }

    return params;
}

/**
 * Build query parameters for Spatie Query Builder (alias for buildSpatieParams)
 * @param filters - Filter object with page, per_page, global, sort, etc.
 * @returns URLSearchParams string
 */
export function buildSpatieQueryParams(filters: any = {}): string {
    const params = new URLSearchParams();

    // Add all filter properties
    Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            params.append(key, value.toString());
        }
    });

    return params.toString();
}

/**
 * Parse Spatie Query Builder response
 * @param response - API response
 * @returns Parsed response with pagination info
 */
export function parseSpatieResponse(response: any) {
    return {
        data: response.data || [],
        pagination: response.meta || {
            current_page: 1,
            last_page: 1,
            per_page: 10,
            total: 0,
            from: 0,
            to: 0,
            path: '',
            links: [],
        },
        links: response.links || {
            first: null,
            last: null,
            prev: null,
            next: null,
        },
    };
}

/**
 * Common Spatie Query Builder parameter names
 */
export const SPATIE_PARAMS = {
    GLOBAL_SEARCH: 'global',
    SORT: 'sort',
    PAGE: 'page',
    PER_PAGE: 'per_page',
    INCLUDE: 'include',
    FIELDS: 'fields',
    FILTER: 'filter',
} as const;

/**
 * Example usage:
 *
 * ```typescript
 * // Build parameters for API call
 * const params = buildSpatieParams(
 *     { global: 'search term', guard_name: 'web' },
 *     { field: 'name', direction: 'asc' },
 *     1,
 *     15
 * );
 *
 * // Make API call
 * const response = await fetch(`/api/v1/permissions?${params.toString()}`);
 * const data = parseSpatieResponse(await response.json());
 * ```
 */
