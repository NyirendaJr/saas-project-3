import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Format a date string to a readable format
 * @param dateString - ISO date string or Date object
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(dateString: string | Date, options: Intl.DateTimeFormatOptions = {}): string {
    if (!dateString) return '-';

    try {
        const date = typeof dateString === 'string' ? new Date(dateString) : dateString;

        // Default options if none provided
        const defaultOptions: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            ...options,
        };

        return new Intl.DateTimeFormat('en-US', defaultOptions).format(date);
    } catch (error) {
        console.error('Error formatting date:', error);
        return '-';
    }
}

/**
 * Format a date string to a relative time (e.g., "2 hours ago")
 * @param dateString - ISO date string or Date object
 * @returns Relative time string
 */
export function formatRelativeTime(dateString: string | Date): string {
    if (!dateString) return '-';

    try {
        const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) {
            return 'Just now';
        }

        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) {
            return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
        }

        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) {
            return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
        }

        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) {
            return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
        }

        const diffInWeeks = Math.floor(diffInDays / 7);
        if (diffInWeeks < 4) {
            return `${diffInWeeks} week${diffInWeeks !== 1 ? 's' : ''} ago`;
        }

        const diffInMonths = Math.floor(diffInDays / 30);
        if (diffInMonths < 12) {
            return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
        }

        const diffInYears = Math.floor(diffInDays / 365);
        return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`;
    } catch (error) {
        console.error('Error formatting relative time:', error);
        return '-';
    }
}
