export interface PaginationData {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

export interface PaginationLinks {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
}

export interface PaginationMeta {
    current_page: number;
    from: number;
    last_page: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    links: PaginationLinks;
    meta: PaginationMeta;
}

// Generic base filters interface that can be extended
export interface BaseFilters {
    // Global search (uses the 'global' filter)
    global?: string;
    // Sorting (Spatie uses 'sort' parameter)
    sort?: string;
    // Pagination
    per_page?: number;
    page?: number;
    // Includes (for relationships)
    include?: string;
    // Fields (for selecting specific fields)
    fields?: string;
}

// Generic API service interface
export interface GenericApiService<T, TFilters extends BaseFilters = BaseFilters> {
    getItems(filters?: TFilters): Promise<PaginatedResponse<T>>;
    getAllItems?(): Promise<T[]>;
    getItem?(id: number | string): Promise<T>;
    createItem?(data: Partial<T>): Promise<T>;
    updateItem?(id: number | string, data: Partial<T>): Promise<T>;
    deleteItem?(id: number | string): Promise<void>;
    deleteMultipleItems?(ids: (number | string)[]): Promise<{ message: string }>;
}
