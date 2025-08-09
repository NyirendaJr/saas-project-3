/**
 * Inertia.js Navigation Utilities
 *
 * These utilities help with navigation active states using Inertia.js patterns
 */

declare global {
    interface Window {
        route: (name: string, params?: any) => string;
    }
}

/**
 * Check if a navigation item is active using Inertia.js patterns
 *
 * @param item - The navigation item to check
 * @param url - Current URL from usePage()
 * @param component - Current component from usePage()
 * @returns boolean indicating if the item is active
 */
export function isNavItemActive(item: any, url: string, component: string): boolean {
    // For items with sub-items (collapsible), check if any child is active
    if (item.items && item.items.length > 0) {
        return item.items.some((subItem: any) => isItemActive(subItem, url, component));
    }

    // For direct links
    return isItemActive(item, url, component);
}

/**
 * Check if a specific item is active
 */
export function isItemActive(item: any, url: string, component: string): boolean {
    // Exact URL match
    if (url === item.url) {
        return true;
    }

    // Component starts with (e.g., Users/Index matches Users)
    if (component.startsWith(item.title.replace(/\s+/g, ''))) {
        return true;
    }

    // For module routes, also check if the component contains the item title
    if (url.includes('/modules/') && component.toLowerCase().includes(item.title.toLowerCase())) {
        return true;
    }

    // Parent URL matching with segment check
    // This prevents /settings/account from matching both /settings and /settings/account
    if (item.url && url.startsWith(item.url + '/')) {
        const urlSegments = url.split('/').filter(Boolean);
        const itemUrlSegments = item.url.split('/').filter(Boolean);

        // Only match if the item URL has fewer segments (is a parent)
        // and the current URL starts with the item URL
        return itemUrlSegments.length < urlSegments.length && urlSegments.slice(0, itemUrlSegments.length).join('/') === itemUrlSegments.join('/');
    }

    return false;
}

/**
 * Check if a collapsible navigation item should be expanded
 */
export function shouldExpandNavItem(item: any, url: string, component: string): boolean {
    if (!item.items || item.items.length === 0) {
        return false;
    }

    return item.items.some((subItem: any) => isItemActive(subItem, url, component));
}

/**
 * Resolve a route name to a URL using the global route helper
 */
export function resolveRoute(routeName: string, params?: any): string {
    if (typeof window !== 'undefined' && window.route) {
        return window.route(routeName, params);
    }
    return routeName; // Fallback to route name if route helper not available
}
