<?php

namespace App\Classes;

use App\Models\Permission;
// use Nwidart\Modules\Facades\Module;

class PermsSeed
{
    public static array $mainPermissionsArray = [
        // Brand
        'brands_view' => [
            'name' => 'brands_view',
            'display_name' => 'Brand View',
            'module' => 'inventory',
            'description' => 'View brand information'
        ],
        'brands_create' => [
            'name' => 'brands_create',
            'display_name' => 'Brand Create',
            'module' => 'inventory',
            'description' => 'Create new brands'
        ],
        'brands_edit' => [
            'name' => 'brands_edit',
            'display_name' => 'Brand Edit',
            'module' => 'inventory',
            'description' => 'Edit existing brands'
        ],
        'brands_delete' => [
            'name' => 'brands_delete',
            'display_name' => 'Brand Delete',
            'module' => 'inventory',
            'description' => 'Delete brands'
        ],

        // Category
        'categories_view' => [
            'name' => 'categories_view',
            'display_name' => 'Category View',
            'module' => 'inventory',
            'description' => 'View category information'
        ],
        'categories_create' => [
            'name' => 'categories_create',
            'display_name' => 'Category Create',
            'module' => 'inventory',
            'description' => 'Create new categories'
        ],
        'categories_edit' => [
            'name' => 'categories_edit',
            'display_name' => 'Category Edit',
            'module' => 'inventory',
            'description' => 'Edit existing categories'
        ],
        'categories_delete' => [
            'name' => 'categories_delete',
            'display_name' => 'Category Delete',
            'module' => 'inventory',
            'description' => 'Delete categories'
        ],

        // Product
        'products_view' => [
            'name' => 'products_view',
            'display_name' => 'Product View',
            'module' => 'inventory',
            'description' => 'View product information'
        ],
        'products_create' => [
            'name' => 'products_create',
            'display_name' => 'Product Create',
            'module' => 'inventory',
            'description' => 'Create new products'
        ],
        'products_edit' => [
            'name' => 'products_edit',
            'display_name' => 'Product Edit',
            'module' => 'inventory',
            'description' => 'Edit existing products'
        ],
        'products_delete' => [
            'name' => 'products_delete',
            'display_name' => 'Product Delete',
            'module' => 'inventory',
            'description' => 'Delete products'
        ],

        // Variation
        'variations_view' => [
            'name' => 'variations_view',
            'display_name' => 'Variation View',
            'module' => 'inventory',
            'description' => 'View product variations'
        ],
        'variations_create' => [
            'name' => 'variations_create',
            'display_name' => 'Variation Create',
            'module' => 'inventory',
            'description' => 'Create new variations'
        ],
        'variations_edit' => [
            'name' => 'variations_edit',
            'display_name' => 'Variation Edit',
            'module' => 'inventory',
            'description' => 'Edit existing variations'
        ],
        'variations_delete' => [
            'name' => 'variations_delete',
            'display_name' => 'Variation Delete',
            'module' => 'inventory',
            'description' => 'Delete variations'
        ],

        // Purchase
        'purchases_view' => [
            'name' => 'purchases_view',
            'display_name' => 'Purchase View',
            'module' => 'purchases',
            'description' => 'View purchase information'
        ],
        'purchases_create' => [
            'name' => 'purchases_create',
            'display_name' => 'Purchase Create',
            'module' => 'purchases',
            'description' => 'Create new purchases'
        ],
        'purchases_edit' => [
            'name' => 'purchases_edit',
            'display_name' => 'Purchase Edit',
            'module' => 'purchases',
            'description' => 'Edit existing purchases'
        ],
        'purchases_delete' => [
            'name' => 'purchases_delete',
            'display_name' => 'Purchase Delete',
            'module' => 'purchases',
            'description' => 'Delete purchases'
        ],

        // Purchase Return
        'purchase_returns_view' => [
            'name' => 'purchase_returns_view',
            'display_name' => 'Purchase Return View',
            'module' => 'purchases',
            'description' => 'View purchase returns'
        ],
        'purchase_returns_create' => [
            'name' => 'purchase_returns_create',
            'display_name' => 'Purchase Return Create',
            'module' => 'purchases',
            'description' => 'Create new purchase returns'
        ],
        'purchase_returns_edit' => [
            'name' => 'purchase_returns_edit',
            'display_name' => 'Purchase Return Edit',
            'module' => 'purchases',
            'description' => 'Edit existing purchase returns'
        ],
        'purchase_returns_delete' => [
            'name' => 'purchase_returns_delete',
            'display_name' => 'Purchase Return Delete',
            'module' => 'purchases',
            'description' => 'Delete purchase returns'
        ],

        // Payment Out
        'payment_out_view' => [
            'name' => 'payment_out_view',
            'display_name' => 'Payment Out View',
            'module' => 'finance',
            'description' => 'View outgoing payments'
        ],
        'payment_out_create' => [
            'name' => 'payment_out_create',
            'display_name' => 'Payment Out Create',
            'module' => 'finance',
            'description' => 'Create outgoing payments'
        ],
        'payment_out_edit' => [
            'name' => 'payment_out_edit',
            'display_name' => 'Payment Out Edit',
            'module' => 'finance',
            'description' => 'Edit outgoing payments'
        ],
        'payment_out_delete' => [
            'name' => 'payment_out_delete',
            'display_name' => 'Payment Out Delete',
            'module' => 'finance',
            'description' => 'Delete outgoing payments'
        ],

        // Payment In
        'payment_in_view' => [
            'name' => 'payment_in_view',
            'display_name' => 'Payment In View',
            'module' => 'finance',
            'description' => 'View incoming payments'
        ],
        'payment_in_create' => [
            'name' => 'payment_in_create',
            'display_name' => 'Payment In Create',
            'module' => 'finance',
            'description' => 'Create incoming payments'
        ],
        'payment_in_edit' => [
            'name' => 'payment_in_edit',
            'display_name' => 'Payment In Edit',
            'module' => 'finance',
            'description' => 'Edit incoming payments'
        ],
        'payment_in_delete' => [
            'name' => 'payment_in_delete',
            'display_name' => 'Payment In Delete',
            'module' => 'finance',
            'description' => 'Delete incoming payments'
        ],

        // Sales
        'sales_view' => [
            'name' => 'sales_view',
            'display_name' => 'Sales View',
            'module' => 'sales',
            'description' => 'View sales information'
        ],
        'sales_create' => [
            'name' => 'sales_create',
            'display_name' => 'Sales Create',
            'module' => 'sales',
            'description' => 'Create new sales'
        ],
        'sales_edit' => [
            'name' => 'sales_edit',
            'display_name' => 'Sales Edit',
            'module' => 'sales',
            'description' => 'Edit existing sales'
        ],
        'sales_delete' => [
            'name' => 'sales_delete',
            'display_name' => 'Sales Delete',
            'module' => 'sales',
            'description' => 'Delete sales'
        ],

        // Sales Return
        'sales_returns_view' => [
            'name' => 'sales_returns_view',
            'display_name' => 'Sales Return View',
            'module' => 'sales',
            'description' => 'View sales returns'
        ],
        'sales_returns_create' => [
            'name' => 'sales_returns_create',
            'display_name' => 'Sales Return Create',
            'module' => 'sales',
            'description' => 'Create new sales returns'
        ],
        'sales_returns_edit' => [
            'name' => 'sales_returns_edit',
            'display_name' => 'Sales Return Edit',
            'module' => 'sales',
            'description' => 'Edit existing sales returns'
        ],
        'sales_returns_delete' => [
            'name' => 'sales_returns_delete',
            'display_name' => 'Sales Return Delete',
            'module' => 'sales',
            'description' => 'Delete sales returns'
        ],

        // Order Payments
        'order_payments_view' => [
            'name' => 'order_payments_view',
            'display_name' => 'Order Payments View',
            'module' => 'sales',
            'description' => 'View order payments'
        ],
        'order_payments_create' => [
            'name' => 'order_payments_create',
            'display_name' => 'Order Payments Create',
            'module' => 'sales',
            'description' => 'Create order payments'
        ],

        // Order Items
        'order_items_view' => [
            'name' => 'order_items_view',
            'display_name' => 'Order Items View',
            'module' => 'sales',
            'description' => 'View order items'
        ],

        // Stock Adjustment
        'stock_adjustments_view' => [
            'name' => 'stock_adjustments_view',
            'display_name' => 'Stock Adjustment View',
            'module' => 'inventory',
            'description' => 'View stock adjustments'
        ],
        'stock_adjustments_create' => [
            'name' => 'stock_adjustments_create',
            'display_name' => 'Stock Adjustment Create',
            'module' => 'inventory',
            'description' => 'Create stock adjustments'
        ],
        'stock_adjustments_edit' => [
            'name' => 'stock_adjustments_edit',
            'display_name' => 'Stock Adjustment Edit',
            'module' => 'inventory',
            'description' => 'Edit stock adjustments'
        ],
        'stock_adjustments_delete' => [
            'name' => 'stock_adjustments_delete',
            'display_name' => 'Stock Adjustment Delete',
            'module' => 'inventory',
            'description' => 'Delete stock adjustments'
        ],

        // Stock Transfer
        'stock_transfers_view' => [
            'name' => 'stock_transfers_view',
            'display_name' => 'Stock Transfer View',
            'module' => 'inventory',
            'description' => 'View stock transfers'
        ],
        'stock_transfers_create' => [
            'name' => 'stock_transfers_create',
            'display_name' => 'Stock Transfer Create',
            'module' => 'inventory',
            'description' => 'Create stock transfers'
        ],
        'stock_transfers_edit' => [
            'name' => 'stock_transfers_edit',
            'display_name' => 'Stock Transfer Edit',
            'module' => 'inventory',
            'description' => 'Edit stock transfers'
        ],
        'stock_transfers_delete' => [
            'name' => 'stock_transfers_delete',
            'display_name' => 'Stock Transfer Delete',
            'module' => 'inventory',
            'description' => 'Delete stock transfers'
        ],

        // Quotation
        'quotations_view' => [
            'name' => 'quotations_view',
            'display_name' => 'Quotation View',
            'module' => 'sales',
            'description' => 'View quotations'
        ],
        'quotations_create' => [
            'name' => 'quotations_create',
            'display_name' => 'Quotation Create',
            'module' => 'sales',
            'description' => 'Create new quotations'
        ],
        'quotations_edit' => [
            'name' => 'quotations_edit',
            'display_name' => 'Quotation Edit',
            'module' => 'sales',
            'description' => 'Edit existing quotations'
        ],
        'quotations_delete' => [
            'name' => 'quotations_delete',
            'display_name' => 'Quotation Delete',
            'module' => 'sales',
            'description' => 'Delete quotations'
        ],

        // Expense Category
        'expense_categories_view' => [
            'name' => 'expense_categories_view',
            'display_name' => 'Expense Category View',
            'module' => 'finance',
            'description' => 'View expense categories'
        ],
        'expense_categories_create' => [
            'name' => 'expense_categories_create',
            'display_name' => 'Expense Category Create',
            'module' => 'finance',
            'description' => 'Create expense categories'
        ],
        'expense_categories_edit' => [
            'name' => 'expense_categories_edit',
            'display_name' => 'Expense Category Edit',
            'module' => 'finance',
            'description' => 'Edit expense categories'
        ],
        'expense_categories_delete' => [
            'name' => 'expense_categories_delete',
            'display_name' => 'Expense Category Delete',
            'module' => 'finance',
            'description' => 'Delete expense categories'
        ],

        // Expense
        'expenses_view' => [
            'name' => 'expenses_view',
            'display_name' => 'Expense View',
            'module' => 'finance',
            'description' => 'View expenses'
        ],
        'expenses_create' => [
            'name' => 'expenses_create',
            'display_name' => 'Expense Create',
            'module' => 'finance',
            'description' => 'Create new expenses'
        ],
        'expenses_edit' => [
            'name' => 'expenses_edit',
            'display_name' => 'Expense Edit',
            'module' => 'finance',
            'description' => 'Edit existing expenses'
        ],
        'expenses_delete' => [
            'name' => 'expenses_delete',
            'display_name' => 'Expense Delete',
            'module' => 'finance',
            'description' => 'Delete expenses'
        ],

        // Unit
        'units_view' => [
            'name' => 'units_view',
            'display_name' => 'Unit View',
            'module' => 'inventory',
            'description' => 'View units'
        ],
        'units_create' => [
            'name' => 'units_create',
            'display_name' => 'Unit Create',
            'module' => 'inventory',
            'description' => 'Create new units'
        ],
        'units_edit' => [
            'name' => 'units_edit',
            'display_name' => 'Unit Edit',
            'module' => 'inventory',
            'description' => 'Edit existing units'
        ],
        'units_delete' => [
            'name' => 'units_delete',
            'display_name' => 'Unit Delete',
            'module' => 'inventory',
            'description' => 'Delete units'
        ],

        // Custom Fields
        'custom_fields_view' => [
            'name' => 'custom_fields_view',
            'display_name' => 'Custom Field View',
            'module' => 'settings',
            'description' => 'View custom fields'
        ],
        'custom_fields_create' => [
            'name' => 'custom_fields_create',
            'display_name' => 'Custom Field Create',
            'module' => 'settings',
            'description' => 'Create custom fields'
        ],
        'custom_fields_edit' => [
            'name' => 'custom_fields_edit',
            'display_name' => 'Custom Field Edit',
            'module' => 'settings',
            'description' => 'Edit custom fields'
        ],
        'custom_fields_delete' => [
            'name' => 'custom_fields_delete',
            'display_name' => 'Custom Field Delete',
            'module' => 'settings',
            'description' => 'Delete custom fields'
        ],

        // Payment Mode
        'payment_modes_view' => [
            'name' => 'payment_modes_view',
            'display_name' => 'Payment Mode View',
            'module' => 'settings',
            'description' => 'View payment modes'
        ],
        'payment_modes_create' => [
            'name' => 'payment_modes_create',
            'display_name' => 'Payment Mode Create',
            'module' => 'settings',
            'description' => 'Create payment modes'
        ],
        'payment_modes_edit' => [
            'name' => 'payment_modes_edit',
            'display_name' => 'Payment Mode Edit',
            'module' => 'settings',
            'description' => 'Edit payment modes'
        ],
        'payment_modes_delete' => [
            'name' => 'payment_modes_delete',
            'display_name' => 'Payment Mode Delete',
            'module' => 'settings',
            'description' => 'Delete payment modes'
        ],

        // Currency
        'currencies_view' => [
            'name' => 'currencies_view',
            'display_name' => 'Currency View',
            'module' => 'settings',
            'description' => 'View currencies'
        ],
        'currencies_create' => [
            'name' => 'currencies_create',
            'display_name' => 'Currency Create',
            'module' => 'settings',
            'description' => 'Create new currencies'
        ],
        'currencies_edit' => [
            'name' => 'currencies_edit',
            'display_name' => 'Currency Edit',
            'module' => 'settings',
            'description' => 'Edit existing currencies'
        ],
        'currencies_delete' => [
            'name' => 'currencies_delete',
            'display_name' => 'Currency Delete',
            'module' => 'settings',
            'description' => 'Delete currencies'
        ],

        // Tax
        'taxes_view' => [
            'name' => 'taxes_view',
            'display_name' => 'Tax View',
            'module' => 'settings',
            'description' => 'View taxes'
        ],
        'taxes_create' => [
            'name' => 'taxes_create',
            'display_name' => 'Tax Create',
            'module' => 'settings',
            'description' => 'Create new taxes'
        ],
        'taxes_edit' => [
            'name' => 'taxes_edit',
            'display_name' => 'Tax Edit',
            'module' => 'settings',
            'description' => 'Edit existing taxes'
        ],
        'taxes_delete' => [
            'name' => 'taxes_delete',
            'display_name' => 'Tax Delete',
            'module' => 'settings',
            'description' => 'Delete taxes'
        ],

        // Modules
        'modules_view' => [
            'name' => 'modules_view',
            'display_name' => 'Modules View',
            'module' => 'settings',
            'description' => 'View system modules'
        ],

        // Role
        'roles_view' => [
            'name' => 'roles_view',
            'display_name' => 'Role View',
            'module' => 'settings',
            'description' => 'View roles'
        ],
        'roles_create' => [
            'name' => 'roles_create',
            'display_name' => 'Role Create',
            'module' => 'settings',
            'description' => 'Create new roles'
        ],
        'roles_edit' => [
            'name' => 'roles_edit',
            'display_name' => 'Role Edit',
            'module' => 'settings',
            'description' => 'Edit existing roles'
        ],
        'roles_delete' => [
            'name' => 'roles_delete',
            'display_name' => 'Role Delete',
            'module' => 'settings',
            'description' => 'Delete roles'
        ],

        // Warehouse
        'warehouses_view' => [
            'name' => 'warehouses_view',
            'display_name' => 'Warehouse View',
            'module' => 'inventory',
            'description' => 'View warehouses'
        ],
        'warehouses_create' => [
            'name' => 'warehouses_create',
            'display_name' => 'Warehouse Create',
            'module' => 'inventory',
            'description' => 'Create new warehouses'
        ],
        'warehouses_edit' => [
            'name' => 'warehouses_edit',
            'display_name' => 'Warehouse Edit',
            'module' => 'inventory',
            'description' => 'Edit existing warehouses'
        ],
        'warehouses_delete' => [
            'name' => 'warehouses_delete',
            'display_name' => 'Warehouse Delete',
            'module' => 'inventory',
            'description' => 'Delete warehouses'
        ],

        // Company
        'companies_edit' => [
            'name' => 'companies_edit',
            'display_name' => 'Company Edit',
            'module' => 'settings',
            'description' => 'Edit company information'
        ],

        // Translation
        'translations_view' => [
            'name' => 'translations_view',
            'display_name' => 'Translation View',
            'module' => 'settings',
            'description' => 'View translations'
        ],
        'translations_create' => [
            'name' => 'translations_create',
            'display_name' => 'Translation Create',
            'module' => 'settings',
            'description' => 'Create new translations'
        ],
        'translations_edit' => [
            'name' => 'translations_edit',
            'display_name' => 'Translation Edit',
            'module' => 'settings',
            'description' => 'Edit existing translations'
        ],
        'translations_delete' => [
            'name' => 'translations_delete',
            'display_name' => 'Translation Delete',
            'module' => 'settings',
            'description' => 'Delete translations'
        ],

        // Staff Member
        'users_view' => [
            'name' => 'users_view',
            'display_name' => 'Staff Member View',
            'module' => 'settings',
            'description' => 'View staff members'
        ],
        'users_create' => [
            'name' => 'users_create',
            'display_name' => 'Staff Member Create',
            'module' => 'settings',
            'description' => 'Create new staff members'
        ],
        'users_edit' => [
            'name' => 'users_edit',
            'display_name' => 'Staff Member Edit',
            'module' => 'settings',
            'description' => 'Edit existing staff members'
        ],
        'users_delete' => [
            'name' => 'users_delete',
            'display_name' => 'Staff Member Delete',
            'module' => 'settings',
            'description' => 'Delete staff members'
        ],

        // Customer
        'customers_view' => [
            'name' => 'customers_view',
            'display_name' => 'Customer View',
            'module' => 'customers',
            'description' => 'View customers'
        ],
        'customers_create' => [
            'name' => 'customers_create',
            'display_name' => 'Customer Create',
            'module' => 'customers',
            'description' => 'Create new customers'
        ],
        'customers_edit' => [
            'name' => 'customers_edit',
            'display_name' => 'Customer Edit',
            'module' => 'customers',
            'description' => 'Edit existing customers'
        ],
        'customers_delete' => [
            'name' => 'customers_delete',
            'display_name' => 'Customer Delete',
            'module' => 'customers',
            'description' => 'Delete customers'
        ],

        // Supplier
        'suppliers_view' => [
            'name' => 'suppliers_view',
            'display_name' => 'Supplier View',
            'module' => 'suppliers',
            'description' => 'View suppliers'
        ],
        'suppliers_create' => [
            'name' => 'suppliers_create',
            'display_name' => 'Supplier Create',
            'module' => 'suppliers',
            'description' => 'Create new suppliers'
        ],
        'suppliers_edit' => [
            'name' => 'suppliers_edit',
            'display_name' => 'Supplier Edit',
            'module' => 'suppliers',
            'description' => 'Edit existing suppliers'
        ],
        'suppliers_delete' => [
            'name' => 'suppliers_delete',
            'display_name' => 'Supplier Delete',
            'module' => 'suppliers',
            'description' => 'Delete suppliers'
        ],

        // Storage Settings
        'storage_edit' => [
            'name' => 'storage_edit',
            'display_name' => 'Storage Settings Edit',
            'module' => 'settings',
            'description' => 'Edit storage settings'
        ],

        // Email Settings
        'email_edit' => [
            'name' => 'email_edit',
            'display_name' => 'Email Settings Edit',
            'module' => 'settings',
            'description' => 'Edit email settings'
        ],

        // POS
        'pos_view' => [
            'name' => 'pos_view',
            'display_name' => 'POS View',
            'module' => 'pos',
            'description' => 'Access point of sale system'
        ],

        // Update App
        'update_app' => [
            'name' => 'update_app',
            'display_name' => 'Update App',
            'module' => 'settings',
            'description' => 'Update application'
        ],

        // Cash & Bank
        'cash_bank_view' => [
            'name' => 'cash_bank_view',
            'display_name' => 'Cash & Bank View',
            'module' => 'finance',
            'description' => 'View cash and bank accounts'
        ],

        // Purchase Price
        'purchase_price_view' => [
            'name' => 'purchase_price_view',
            'display_name' => 'Purchase Price View',
            'module' => 'inventory',
            'description' => 'View purchase prices'
        ],
    ];

    public static $eStorePermissions = [];

    public static function getPermissionArray($moduleName)
    {
        if ($moduleName == 'Estore') {
            return self::$eStorePermissions;
        } else if ($moduleName != '') {
            $className = "Modules\\{$moduleName}\\Classes\PermsSeed";
            return $className::$mainPermissionsArray;
        }

        return self::$mainPermissionsArray;
    }

    public static function seedPermissions($moduleName = '')
    {
        $permissions = self::getPermissionArray($moduleName);

        foreach ($permissions as $group => $permission) {
            $permissionCount = Permission::where('name', $permission['name'])->count();

            if ($permissionCount == 0) {
                $newPermission = new Permission();
                $newPermission->name = $permission['name'];
                $newPermission->display_name = $permission['display_name'];
                $newPermission->guard_name = 'web';
                $newPermission->module = $permission['module'] ?? 'general';
                $newPermission->description = $permission['description'] ?? '';
                $newPermission->save();
            }
        }
    }

    public static function seedMainPermissions()
    {
        // Main Module
        self::seedPermissions();
        // Seeding modules
        //self::seedAllModulesPermissions();
    }

    public static function syncPermissions($moduleName = '')
    {
        $permissions = self::getPermissionArray($moduleName);
        $syncedCount = 0;
        $updatedCount = 0;

        foreach ($permissions as $group => $permission) {
            $existingPermission = Permission::where('name', $permission['name'])->first();

            if (!$existingPermission) {
                // Create new permission
                $newPermission = new Permission();
                $newPermission->name = $permission['name'];
                $newPermission->display_name = $permission['display_name'];
                $newPermission->guard_name = 'web';
                $newPermission->module = $permission['module'] ?? 'general';
                $newPermission->description = $permission['description'] ?? '';
                $newPermission->save();
                $syncedCount++;
            } else {
                // Update existing permission with module and description
                $updated = false;
                if ($existingPermission->module !== ($permission['module'] ?? 'general')) {
                    $existingPermission->module = $permission['module'] ?? 'general';
                    $updated = true;
                }
                if ($existingPermission->description !== ($permission['description'] ?? '')) {
                    $existingPermission->description = $permission['description'] ?? '';
                    $updated = true;
                }
                if ($updated) {
                    $existingPermission->save();
                    $updatedCount++;
                }
            }
        }

        return [
            'synced' => $syncedCount,
            'updated' => $updatedCount,
            'total' => $syncedCount + $updatedCount
        ];
    }

    // public static function seedAllModulesPermissions()
    // {
    //     $allModules = Module::all();
    //     foreach ($allModules as $allModule) {
    //         self::seedPermissions($allModule);
    //     }
    // }
}
