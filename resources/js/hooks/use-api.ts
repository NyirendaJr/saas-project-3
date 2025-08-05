import { useEffect, useState } from 'react';

interface ApiState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

interface UseApiOptions {
    immediate?: boolean;
    onSuccess?: (data: any) => void;
    onError?: (error: string) => void;
}

export function useApi<T>(url: string, options: UseApiOptions = {}) {
    const { immediate = true, onSuccess, onError } = options;
    const [state, setState] = useState<ApiState<T>>({
        data: null,
        loading: false,
        error: null,
    });

    const fetchData = async () => {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setState({ data, loading: false, error: null });
            onSuccess?.(data);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An error occurred';
            setState({ data: null, loading: false, error: errorMessage });
            onError?.(errorMessage);
        }
    };

    const refetch = () => {
        fetchData();
    };

    useEffect(() => {
        if (immediate) {
            fetchData();
        }
    }, [url, immediate]);

    return {
        ...state,
        refetch,
    };
}
