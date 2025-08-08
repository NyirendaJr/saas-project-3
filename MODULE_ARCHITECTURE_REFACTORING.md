# Module Architecture Refactoring

## Overview

This document outlines the refactoring of the module system from a monolithic `ModuleController` to a proper module-specific controller architecture that follows Laravel best practices and the Single Responsibility Principle.

## Problems with the Old ModuleController

### ❌ Anti-Patterns

1. **Single Responsibility Principle Violation**
    - One controller handling multiple modules
    - Switch statements for different sub-pages
    - Mixed concerns (permissions, data fetching, rendering)

2. **Poor Scalability**
    - Adding new modules requires modifying the central controller
    - Hard to maintain as the application grows
    - Difficult to test individual module functionality

3. **Inconsistent Permission Handling**
    - Not using Spatie Laravel Permission properly
    - Hardcoded permission checks
    - No granular permission control

4. **Tight Coupling**
    - Direct service calls in controller
    - Hard to mock and test
    - Difficult to extend or modify

## New Architecture

### ✅ Benefits

1. **Single Responsibility Principle**
    - Each module has its own controller
    - Clear separation of concerns
    - Easy to understand and maintain

2. **Proper Permission Handling**
    - Uses Spatie Laravel Permission
    - Granular permission checks per action
    - Consistent permission validation

3. **Scalability**
    - Easy to add new modules
    - No need to modify existing code
    - Independent module development

4. **Testability**
    - Each controller can be tested independently
    - Easy to mock dependencies
    - Clear input/output expectations

## Structure

### Base Module Controller

```php
app/Http/Controllers/Base/ModuleController.php
```

Provides common functionality for all module controllers:

- User permission retrieval
- Permission checking
- Abstract methods for module configuration

### Module-Specific Controllers

Each module has its own controller in a dedicated namespace:

```
app/Http/Controllers/Settings/SettingsController.php
app/Http/Controllers/Sales/SalesController.php
app/Http/Controllers/Tasks/TasksController.php
// etc.
```

### Route Organization

```php
// Settings module routes
Route::prefix('modules/settings')->name('modules.settings.')->group(function () {
    Route::get('/', [SettingsController::class, 'index'])->name('index');
    Route::get('/permissions', [SettingsController::class, 'permissions'])->name('permissions');
    Route::get('/roles', [SettingsController::class, 'roles'])->name('roles');
});

// Sales module routes
Route::prefix('modules/sales')->name('modules.sales.')->group(function () {
    Route::get('/', [SalesController::class, 'index'])->name('index');
    Route::get('/orders', [SalesController::class, 'orders'])->name('orders');
    Route::get('/customers', [SalesController::class, 'customers'])->name('customers');
});
```

## Implementation Example

### Settings Module Controller

```php
<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Modules\Base\ModuleController;
use App\Services\Contracts\PermissionServiceInterface;
use App\Services\Contracts\RoleServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class SettingsController extends ModuleController
{
    /**
     * Show permissions page
     */
    public function permissions(Request $request): Response
    {
        $user = Auth::user();

        // Check specific permission for permissions management
        $this->checkPermission('view_permissions');

        $permissionService = app(PermissionServiceInterface::class);
        $permissions = $permissionService->getFilteredPermissions($request);

        return Inertia::render('modules/settings/permissions/index', [
            'module' => $this->getModuleData(),
            'userPermissions' => $this->getUserPermissions($user),
            'permissions' => $permissions->items(),
            'pagination' => $this->formatPagination($permissions),
            'filters' => $request->only(['search', 'guard_name', 'module', 'sort_by', 'sort_order', 'per_page']),
        ]);
    }

    // Abstract methods implementation...
}
```

## Migration Guide

### 1. Create Module Controller

1. Create a new controller in the appropriate namespace
2. Extend `Modules\Base\ModuleController`
3. Implement required abstract methods
4. Add module-specific methods

### 2. Update Routes

1. Add route group for the module
2. Define specific routes for each sub-page
3. Use proper route naming convention

### 3. Update Frontend

1. Update navigation links to use new routes
2. Update any hardcoded route references
3. Test all module functionality

### 4. Remove Old Code

1. Remove module-specific code from `ModuleController`
2. Keep fallback routes for backward compatibility
3. Eventually remove the old `ModuleController` when all modules are migrated

## Best Practices

### 1. Permission Handling

```php
// Always check permissions at the method level
$this->checkPermission('view_permissions');

// Use specific permissions for each action
$this->checkPermission('create_permissions');
$this->checkPermission('edit_permissions');
$this->checkPermission('delete_permissions');
```

### 2. Service Injection

```php
// Use dependency injection for services
public function __construct(
    private PermissionServiceInterface $permissionService
) {}

// Or use service container when needed
$permissionService = app(PermissionServiceInterface::class);
```

### 3. Error Handling

```php
try {
    $data = $this->service->getData();
    return Inertia::render('view', compact('data'));
} catch (\Exception $e) {
    // Handle errors gracefully
    return Inertia::render('view', [
        'data' => [],
        'error' => $e->getMessage()
    ]);
}
```

### 4. Consistent Response Format

```php
// Always return consistent data structure
return Inertia::render('view', [
    'module' => $this->getModuleData(),
    'userPermissions' => $this->getUserPermissions($user),
    'data' => $data,
    'pagination' => $this->formatPagination($data),
    'filters' => $filters,
]);
```

## Future Enhancements

1. **Module Service Layer**
    - Create service classes for each module
    - Move business logic out of controllers
    - Improve testability

2. **Module Middleware**
    - Create module-specific middleware
    - Handle common module functionality
    - Improve code reusability

3. **Module Configuration**
    - Create configuration files for each module
    - Define permissions, routes, and settings
    - Make modules more configurable

4. **Module Testing**
    - Create comprehensive test suites for each module
    - Test permission handling
    - Test all module functionality

## Conclusion

This refactoring provides a solid foundation for a scalable, maintainable, and testable module system. Each module is now independent, follows Laravel best practices, and properly handles permissions using Spatie Laravel Permission.
