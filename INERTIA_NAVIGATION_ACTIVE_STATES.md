# Inertia.js Navigation Active States

This document explains how the sidebar navigation active states work with Inertia.js routing using the `usePage()` hook.

## Overview

The navigation system now properly handles active states for Inertia.js applications, supporting:

- **Direct URL matching**: Exact URL matches using `url` from `usePage()`
- **Partial URL matching**: `/users/1` matches `/users` using `url.startsWith()`
- **Component matching**: Component name matching using `component` from `usePage()`
- **Collapsible items**: Automatic expansion when child items are active
- **Inertia.js patterns**: Follows official Inertia.js documentation patterns

## Implementation

### Inertia.js Integration

The system uses the `usePage()` hook to get current URL and component information:

```typescript
import { usePage } from '@inertiajs/react';

const { url, component } = usePage();

// URL exact match
const isActive = url === '/users';

// URL starts with
const isActive = url.startsWith('/users');

// Component exact match
const isActive = component === 'Users/Index';

// Component starts with
const isActive = component.startsWith('Users');
```

### Key Functions

#### Active State Logic

The navigation components use Inertia.js patterns for active state detection with improved URL segment matching:

```typescript
// Helper function to check if an item is active
function isItemActive(item: any, url: string, component: string): boolean {
    // Exact URL match
    if (url === item.url) {
        return true;
    }

    // Component starts with (e.g., Users/Index matches Users)
    if (component.startsWith(item.title.replace(/\s+/g, ''))) {
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

// For direct links
const isActive = isItemActive(item, url, component);

// For collapsible items
const hasActiveChild = item.items.some((subItem) => isItemActive(subItem, url, component));
```

## Navigation Components

### NavGroup Component

The main navigation group component uses `usePage()` to get current URL and component:

```typescript
export function NavGroup({ title, items }: NavGroup) {
    const { url, component } = usePage();

    return (
        <SidebarGroup>
            <SidebarGroupLabel>{title}</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    if (!item.items) {
                        return <SidebarMenuLink item={item} url={url} component={component} />;
                    }

                    return <SidebarMenuCollapsible item={item} url={url} component={component} />;
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
```

### SidebarMenuLink Component

Handles active states for direct links using Inertia.js patterns:

```typescript
const SidebarMenuLink = ({ item, url, component }: { item: NavLink; url: string; component: string }) => {
    // Check if this item is active using Inertia.js patterns
    const isActive =
        url === item.url || // Exact URL match
        (item.url && url.startsWith(item.url + '/')) || // URL starts with
        component.startsWith(item.title.replace(/\s+/g, '')); // Component starts with

    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={item.title}
            >
                <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
};
```

### SidebarMenuCollapsible Component

Handles active states for collapsible items using Inertia.js patterns:

```typescript
const SidebarMenuCollapsible = ({ item, url, component }: { item: NavCollapsible; url: string; component: string }) => {
    // Check if any child item is active
    const hasActiveChild = item.items.some(subItem => {
        return url === subItem.url ||
               (subItem.url && url.startsWith(subItem.url + '/')) ||
               component.startsWith(subItem.title.replace(/\s+/g, ''));
    });

    return (
        <Collapsible
            asChild
            defaultOpen={hasActiveChild}
            className="group/collapsible"
        >
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                    asChild
                                    isActive={
                                        url === subItem.url ||
                                        (subItem.url && url.startsWith(subItem.url + '/')) ||
                                        component.startsWith(subItem.title.replace(/\s+/g, ''))
                                    }
                                >
                                    <Link href={subItem.url}>
                                        {subItem.icon && <subItem.icon />}
                                        <span>{subItem.title}</span>
                                    </Link>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    );
};
```

## URL Matching Logic

### Direct URL Matching

```typescript
// Exact match
url === '/users'; // true

// URL starts with (child routes) - with segment check
url.startsWith('/users/') && urlSegments.length > itemUrlSegments.length; // true for /users/1, /users/create, etc.

// Component starts with
component.startsWith('Users'); // true for Users/Index, Users/Create, etc.
```

### URL Segment Matching

The system uses URL segment analysis to prevent multiple items from being active:

```typescript
// Example: When on /settings/account
// /settings (2 segments) should NOT be active
// /settings/account (3 segments) should be active

const urlSegments = url.split('/').filter(Boolean); // ['settings', 'account']
const itemUrlSegments = item.url.split('/').filter(Boolean); // ['settings'] or ['settings', 'account']

// Only match if item has fewer segments (is a parent)
return itemUrlSegments.length < urlSegments.length && urlSegments.slice(0, itemUrlSegments.length).join('/') === itemUrlSegments.join('/');
```

### Module Route Handling

For module routes like `/modules/settings/permissions`, the system includes additional logic:

```typescript
// For module routes, also check if the component contains the item title
if (url.includes('/modules/') && component.toLowerCase().includes(item.title.toLowerCase())) {
    return true;
}

// Example: When on /modules/settings/permissions
// Component: "Modules/Settings/Permissions/Index"
// Item title: "Permissions"
// This will match because "Permissions" is contained in the component name
```

### Inertia.js Patterns

The system follows official Inertia.js documentation patterns:

```typescript
// URL exact match
<Link href="/users" className={url === '/users' ? 'active' : ''}>Users</Link>

// URL starts with
<Link href="/users" className={url.startsWith('/users') ? 'active' : ''}>Users</Link>

// Component exact match
<Link href="/users" className={component === 'Users/Index' ? 'active' : ''}>Users</Link>

// Component starts with
<Link href="/users" className={component.startsWith('Users') ? 'active' : ''}>Users</Link>
```

### Collapsible Item Logic

For items with sub-items, the active state is determined by:

1. **Direct match**: If the item itself has a URL that matches
2. **Child match**: If any child item's URL matches the current URL
3. **Expansion**: The collapsible expands if any child is active

```typescript
// Example: Settings collapsible
{
    title: 'Settings',
    items: [
        { title: 'Profile', url: '/settings' },
        { title: 'Account', url: '/settings/account' },
    ]
}

// When on '/settings/account', the Settings item:
// - isActive: false (no direct URL)
// - shouldExpand: true (child is active)
```

## Usage Examples

### Basic Navigation Item

```typescript
const navItem = {
    title: 'Dashboard',
    url: route('dashboard'),
    icon: IconLayoutDashboard,
};

// Active when on dashboard page
const isActive = isNavItemActive(navItem, '/dashboard');
```

### Collapsible Navigation Item

```typescript
const collapsibleItem = {
    title: 'Settings',
    icon: IconSettings,
    items: [
        { title: 'Profile', url: '/settings' },
        { title: 'Account', url: '/settings/account' },
        { title: 'Appearance', url: '/settings/appearance' },
    ],
};

// When on '/settings/account':
const isActive = isNavItemActive(collapsibleItem, '/settings/account'); // false
const shouldExpand = shouldExpandNavItem(collapsibleItem, '/settings/account'); // true
```

### Sidebar Data Structure

```typescript
const sidebarData = {
    navGroups: [
        {
            title: 'General',
            items: [
                {
                    title: 'Dashboard',
                    url: route('dashboard'),
                    icon: IconLayoutDashboard,
                },
                {
                    title: 'Users',
                    url: route('users.index'),
                    icon: IconUsers,
                },
                {
                    title: 'Settings',
                    icon: IconSettings,
                    items: [
                        { title: 'Profile', url: '/settings' },
                        { title: 'Account', url: '/settings/account' },
                    ],
                },
            ],
        },
    ],
};
```

## Benefits

1. **Inertia.js Integration**: Uses official Inertia.js patterns with `usePage()` hook
2. **URL Matching**: Supports exact and partial URL matches using `url.startsWith()`
3. **Component Matching**: Supports component name matching using `component.startsWith()`
4. **Collapsible Support**: Automatic expansion of parent items when children are active
5. **Type Safety**: Full TypeScript support with proper interfaces
6. **Performance**: Efficient URL and component comparison logic
7. **Official Patterns**: Follows Inertia.js documentation recommendations

## Migration from Old System

### Before (Old Active State Logic)

```typescript
function checkIsActive(href: string, item: NavItem, mainNav = false) {
    return (
        href === item.url ||
        href.split('?')[0] === item.url ||
        !!item?.items?.filter((i) => i.url === href).length ||
        (mainNav && href.split('/')[1] !== '' && href.split('/')[1] === item?.url?.split('/')[1])
    );
}
```

### After (Inertia.js Patterns with URL Segment Matching)

```typescript
import { usePage } from '@inertiajs/react';

const { url, component } = usePage();

// Helper function with URL segment analysis
function isItemActive(item: any, url: string, component: string): boolean {
    if (url === item.url) return true;
    if (component.startsWith(item.title.replace(/\s+/g, ''))) return true;

    // For module routes, also check if the component contains the item title
    if (url.includes('/modules/') && component.toLowerCase().includes(item.title.toLowerCase())) {
        return true;
    }

    if (item.url && url.startsWith(item.url + '/')) {
        const urlSegments = url.split('/').filter(Boolean);
        const itemUrlSegments = item.url.split('/').filter(Boolean);
        return itemUrlSegments.length < urlSegments.length && urlSegments.slice(0, itemUrlSegments.length).join('/') === itemUrlSegments.join('/');
    }

    return false;
}

// For direct links
const isActive = isItemActive(item, url, component);

// For collapsible items
const hasActiveChild = item.items.some((subItem) => isItemActive(subItem, url, component));
```

The new system follows official Inertia.js documentation patterns with improved URL segment matching to prevent multiple items from being active simultaneously.

## Module Sidebar Integration

The system also properly handles module routes through the `ModuleSidebar` component:

### Module Sidebar Component

The `ModuleSidebar` component uses the same active state logic as the main navigation:

```typescript
// In ModuleSidebar component
const SidebarMenuLink = ({ item }: { item: any }) => {
    const { url, component } = usePage();
    const isActive = isItemActive(item, url, component);

    return (
        <SidebarMenuButton asChild isActive={isActive}>
            <Link href={item.url}>{item.title}</Link>
        </SidebarMenuButton>
    );
};
```

### Shared Active State Logic

Both `NavGroup` and `ModuleSidebar` components now use the same `isItemActive` function from `@/utils/route-helper`, ensuring consistent behavior across all navigation components.

## Pagination Layout Fix

The system also includes a fix for pagination layout issues where multiple pagination components were being rendered simultaneously.

### Issue

The `ApiDataTableWithPagination` component was rendering two pagination components:

1. `LaravelPagination` inside `ApiDataTable`
2. `ApiPagination` inside `ApiDataTableWithPagination`

This caused duplicate "Showing X to Y of Z results" messages.

### Solution

Updated `ApiDataTableWithPagination` to disable pagination in the inner `ApiDataTable` component:

```typescript
<ApiDataTable
    // ... other props
    showPagination={false} // Disable inner pagination
    onPaginationChange={(newPagination) => {
        if (newPagination && typeof newPagination === 'object') {
            setPagination(newPagination);
        }
    }}
/>
<ApiPagination pagination={pagination} onPageChange={handlePageChange} />
```

This ensures only one pagination component is rendered, providing a clean and consistent pagination layout.
