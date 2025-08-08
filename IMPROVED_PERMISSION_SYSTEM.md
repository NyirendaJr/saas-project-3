# Improved Permission System

## Overview

This document outlines the improvements made to the permission array definition and system, providing better structure, organization, and usability for both backend and frontend.

## Problems with the Old Permission Array

### ❌ Issues

1. **Flat Structure**

    ```php
    // Old approach - just flat arrays
    return [
        'permissions' => ['view_users', 'create_users', 'edit_users'],
        'roles' => ['admin', 'user'],
    ];
    ```

2. **No Context**
    - No information about what permissions are for
    - No grouping or categorization
    - No hierarchy or access levels

3. **Poor Frontend Experience**
    - Frontend has to process raw arrays
    - No easy way to check specific permission types
    - No module-specific permission information

4. **Limited Functionality**
    - No permission matrix for easy checking
    - No role hierarchy
    - No access level determination

## New Improved Permission System

### ✅ Benefits

1. **Structured Data**
    - Organized by modules and categories
    - Clear permission hierarchy
    - Rich metadata for each permission

2. **Frontend Optimization**
    - Permission matrix for easy checking
    - Module-specific access levels
    - Helper functions for common operations

3. **Better Organization**
    - Grouped by module/context
    - Categorized by action type
    - Access level determination

4. **Enhanced Functionality**
    - Role hierarchy system
    - Super admin detection
    - Module access validation

## New Permission Array Structure

### Complete Structure

```php
[
    // Basic user info
    'user' => [
        'id' => 1,
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'roles' => ['admin', 'manager'],
        'highest_role' => 'admin',
        'is_super_admin' => false,
    ],

    // Permissions organized by module
    'modules' => [
        'users' => [
            'permissions' => ['users_view', 'users_create', 'users_edit'],
            'actions' => ['view', 'create', 'edit'],
            'count' => 3,
            'can_view' => true,
            'can_create' => true,
            'can_edit' => true,
            'can_delete' => false,
            'can_manage' => false,
        ],
        'settings' => [
            'permissions' => ['settings_view', 'settings_manage'],
            'actions' => ['view', 'manage'],
            'count' => 2,
            'can_view' => true,
            'can_create' => false,
            'can_edit' => false,
            'can_delete' => false,
            'can_manage' => true,
        ],
    ],

    // Flat permission arrays for backward compatibility
    'permissions' => ['users_view', 'users_create', 'users_edit', 'settings_view', 'settings_manage'],
    'roles' => ['admin', 'manager'],

    // Permission matrix for easy frontend checking
    'matrix' => [
        'users_view', 'users_create', 'users_edit', 'users_*',
        'settings_view', 'settings_manage', 'settings_*',
        '*_view', '*_manage'
    ],

    // Permission counts for UI display
    'counts' => [
        'total_permissions' => 5,
        'total_roles' => 2,
        'modules_with_access' => 2,
    ],

    // Permission categories
    'categories' => [
        'view' => ['users_view', 'settings_view'],
        'create' => ['users_create'],
        'edit' => ['users_edit'],
        'delete' => [],
        'manage' => ['settings_manage'],
        'other' => [],
    ],

    // Module access levels
    'module_access' => [
        'users' => [
            'level' => 'write',
            'permissions' => ['users_view', 'users_create', 'users_edit'],
        ],
        'settings' => [
            'level' => 'admin',
            'permissions' => ['settings_view', 'settings_manage'],
        ],
    ],
]
```

## Key Features

### 1. Module-Based Organization

Permissions are automatically grouped by module based on naming convention:

```php
// Permission naming: {module}_{action}
'users_view'    // Module: users, Action: view
'settings_manage' // Module: settings, Action: manage
```

### 2. Permission Matrix

A flat array of all permissions plus wildcards for easy checking:

```php
'matrix' => [
    'users_view', 'users_create', 'users_edit', 'users_*',  // Module wildcards
    '*_view', '*_manage'  // Action wildcards
]
```

### 3. Access Levels

Each module gets an access level determined by the highest permission:

- **none** (0) - No access
- **read** (1) - Can view
- **write** (2) - Can create/edit
- **admin** (3) - Can manage/delete

### 4. Role Hierarchy

Roles are ranked by importance:

```php
$roleHierarchy = [
    'super_admin' => 100,
    'admin' => 90,
    'manager' => 80,
    'supervisor' => 70,
    'user' => 50,
    'guest' => 10,
];
```

### 5. Module-Specific Flags

Each module includes boolean flags for common actions:

```php
'users' => [
    'can_view' => true,
    'can_create' => true,
    'can_edit' => true,
    'can_delete' => false,
    'can_manage' => false,
]
```

## Usage Examples

### Backend Usage

```php
// In controller
public function index()
{
    $user = Auth::user();
    $permissions = $this->permissionHelper->getUserPermissionsData($user);

    return Inertia::render('view', [
        'userPermissions' => $permissions,
    ]);
}

// Check specific permissions
$this->permissionHelper->checkPermission('users_view');
$this->permissionHelper->checkAnyPermission(['users_view', 'users_manage']);
$this->permissionHelper->checkAllPermissions(['users_view', 'users_create']);

// Check module access
if ($this->permissionHelper->canAccessModule('users')) {
    // User can access users module
}
```

### Frontend Usage

```typescript
// Easy permission checking
const hasPermission = userPermissions.matrix.includes('users_view');
const hasModuleAccess = userPermissions.modules.users?.can_view;

// Check specific module permissions
const canCreateUsers = userPermissions.modules.users?.can_create;
const canManageSettings = userPermissions.modules.settings?.can_manage;

// Get user's highest role
const userRole = userPermissions.user.highest_role;

// Check if super admin
const isSuperAdmin = userPermissions.user.is_super_admin;

// Get module access level
const usersAccessLevel = userPermissions.module_access.users.level; // 'write'
```

## Implementation

### 1. PermissionHelperService

The main service that handles all permission logic:

```php
class PermissionHelperService implements PermissionHelperServiceInterface
{
    public function getUserPermissionsData($user): array
    {
        // Implementation details...
    }

    public function groupPermissionsByModule($permissions): array
    {
        // Groups permissions by module...
    }

    public function createPermissionMatrix($permissions): array
    {
        // Creates permission matrix with wildcards...
    }

    // ... other methods
}
```

### 2. Service Registration

Register the service in `ServiceClassProvider`:

```php
$this->app->bind(PermissionHelperServiceInterface::class, PermissionHelperService::class);
```

### 3. Controller Usage

Use in controllers via dependency injection:

```php
class SettingsController extends ModuleController
{
    public function __construct(
        private PermissionHelperServiceInterface $permissionHelper
    ) {}

    public function index()
    {
        $user = Auth::user();
        $permissions = $this->permissionHelper->getUserPermissionsData($user);

        return Inertia::render('view', [
            'userPermissions' => $permissions,
        ]);
    }
}
```

## Benefits

### 1. **Better Organization**

- Permissions grouped by module
- Clear categorization by action type
- Hierarchical access levels

### 2. **Frontend Optimization**

- Permission matrix for fast checking
- Module-specific boolean flags
- Rich metadata for UI decisions

### 3. **Enhanced Security**

- Granular permission checking
- Role hierarchy system
- Super admin detection

### 4. **Improved Maintainability**

- Centralized permission logic
- Consistent permission structure
- Easy to extend and modify

### 5. **Better User Experience**

- Clear access level indicators
- Module-specific permission flags
- Rich user context information

## Migration Guide

### 1. Update Controllers

Replace old permission calls:

```php
// Old
$permissions = $this->getUserPermissions($user);

// New
$permissions = $this->permissionHelper->getUserPermissionsData($user);
```

### 2. Update Frontend

Update permission checking logic:

```typescript
// Old
const hasPermission = userPermissions.permissions.includes('users_view');

// New
const hasPermission = userPermissions.matrix.includes('users_view');
const canViewUsers = userPermissions.modules.users?.can_view;
```

### 3. Update Permission Checks

Use new helper methods:

```php
// Old
if (!$user->can('users_view')) {
    abort(403, 'Access denied');
}

// New
$this->permissionHelper->checkPermission('users_view');
```

## Conclusion

The improved permission system provides a much more structured, organized, and user-friendly approach to permission management. It offers better performance, clearer organization, and enhanced functionality while maintaining backward compatibility with existing code.
