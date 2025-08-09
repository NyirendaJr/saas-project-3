<?php

namespace App\Services\Contracts;

interface PermissionHelperServiceInterface
{
    /**
     * Get comprehensive user permissions data
     */
    public function getUserPermissionsData($user): array;

    /**
     * Group permissions by module/context
     */
    public function groupPermissionsByModule($permissions): array;

    /**
     * Create a flat permission matrix for easy checking
     */
    public function createPermissionMatrix($permissions): array;

    /**
     * Categorize permissions by type
     */
    public function categorizePermissions($permissions): array;

    /**
     * Get module access levels
     */
    public function getModuleAccessLevels($permissions): array;

    /**
     * Get user's highest role for UI display
     */
    public function getHighestRole(array $roles): ?string;

    /**
     * Check if user is super admin
     */
    public function isSuperAdmin($user): bool;

    /**
     * Check if user has permission for a specific action
     */
    public function checkPermission(string $permission): void;

    /**
     * Check if user has any of the given permissions
     */
    public function checkAnyPermission(array $permissions): void;

    /**
     * Check if user has all of the given permissions
     */
    public function checkAllPermissions(array $permissions): void;

    /**
     * Get permissions for a specific module
     */
    public function getModulePermissions(string $module): array;

    /**
     * Check if user can access a specific module
     */
    public function canAccessModule(string $module): bool;
}
