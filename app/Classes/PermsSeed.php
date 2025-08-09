<?php

namespace App\Classes;

use App\Models\Permission;
// use Nwidart\Modules\Facades\Module;

class PermsSeed
{
    public static array $mainPermissionsArray = [
        // Brand
        'brand_view' => ['name' => 'brand_view', 'display_name' => 'Brand View', 'module' => 'inventory', 'description' => 'View brand information'],
        'brand_create' => ['name' => 'brand_create', 'display_name' => 'Brand Create', 'module' => 'inventory', 'description' => 'Create new brands'],
        'brand_edit' => ['name' => 'brand_edit', 'display_name' => 'Brand Edit', 'module' => 'inventory', 'description' => 'Edit existing brands'],
        'brand_delete' => ['name' => 'brand_delete', 'display_name' => 'Brand Delete', 'module' => 'inventory', 'description' => 'Delete brands'],

        // Category
        'category_view' => [
            'name' => 'category_view',
            'display_name' => 'Category View',
            'module' => 'inventory',
            'description' => 'View category information'
        ],
        'category_create' => [
            'name' => 'category_create',
            'display_name' => 'Category Create',
            'module' => 'inventory',
            'description' => 'Create new categories'
        ],
        'category_edit' => [
            'name' => 'category_edit',
            'display_name' => 'Category Edit',
            'module' => 'inventory',
            'description' => 'Edit existing categories'
        ],
        'category_delete' => [
            'name' => 'category_delete',
            'display_name' => 'Category Delete',
            'module' => 'inventory',
            'description' => 'Delete categories'
        ],

        // Product
        'product_view' => [
            'name' => 'product_view',
            'display_name' => 'Product View',
            'module' => 'inventory',
            'description' => 'View product information'
        ],
        'product_create' => [
            'name' => 'product_create',
            'display_name' => 'Product Create',
            'module' => 'inventory',
            'description' => 'Create new products'
        ],
        'product_edit' => [
            'name' => 'product_edit',
            'display_name' => 'Product Edit',
            'module' => 'inventory',
            'description' => 'Edit existing products'
        ],
        'product_delete' => [
            'name' => 'product_delete',
            'display_name' => 'Product Delete',
            'module' => 'inventory',
            'description' => 'Delete products'
        ],

        // Variation
        'variation_view' => [
            'name' => 'variation_view',
            'display_name' => 'Variation View',
            'module' => 'inventory',
            'description' => 'View product variations'
        ],
        'variation_create' => [
            'name' => 'variation_create',
            'display_name' => 'Variation Create',
            'module' => 'inventory',
            'description' => 'Create new variations'
        ],
        'variation_edit' => [
            'name' => 'variation_edit',
            'display_name' => 'Variation Edit',
            'module' => 'inventory',
            'description' => 'Edit existing variations'
        ],
        'variation_delete' => [
            'name' => 'variation_delete',
            'display_name' => 'Variation Delete',
            'module' => 'inventory',
            'description' => 'Delete variations'
        ],

        // Purchase
        'purchase_view' => [
            'name' => 'purchase_view',
            'display_name' => 'Purchase View',
            'module' => 'inventory',
            'description' => 'View purchase information'
        ],
        'purchase_create' => [
            'name' => 'purchase_create',
            'display_name' => 'Purchase Create',
            'module' => 'inventory',
            'description' => 'Create new purchases'
        ],
        'purchase_edit' => [
            'name' => 'purchase_edit',
            'display_name' => 'Purchase Edit',
            'module' => 'inventory',
            'description' => 'Edit existing purchases'
        ],
        'purchase_delete' => [
            'name' => 'purchase_delete',
            'display_name' => 'Purchase Delete',
            'module' => 'inventory',
            'description' => 'Delete purchases'
        ],

        // Purchase Return
        'purchase_return_view' => [
            'name' => 'purchase_return_view',
            'display_name' => 'Purchase Return View',
            'module' => 'inventory',
            'description' => 'View purchase returns'
        ],
        'purchase_return_create' => [
            'name' => 'purchase_return_create',
            'display_name' => 'Purchase Return Create',
            'module' => 'inventory',
            'description' => 'Create new purchase returns'
        ],
        'purchase_return_edit' => [
            'name' => 'purchase_return_edit',
            'display_name' => 'Purchase Return Edit',
            'module' => 'inventory',
            'description' => 'Edit existing purchase returns'
        ],
        'purchase_return_delete' => [
            'name' => 'purchase_return_delete',
            'display_name' => 'Purchase Return Delete',
            'module' => 'inventory',
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
        'sale_view' => [
            'name' => 'sale_view',
            'display_name' => 'Sales View',
            'module' => 'inventory',
            'description' => 'View sales information'
        ],
        'sale_create' => [
            'name' => 'sale_create',
            'display_name' => 'Sales Create',
            'module' => 'inventory',
            'description' => 'Create new sales'
        ],
        'sale_edit' => [
            'name' => 'sale_edit',
            'display_name' => 'Sales Edit',
            'module' => 'inventory',
            'description' => 'Edit existing sales'
        ],
        'sale_delete' => [
            'name' => 'sale_delete',
            'display_name' => 'Sales Delete',
            'module' => 'inventory',
            'description' => 'Delete sales'
        ],

        // Sales Return
        'sale_return_view' => [
            'name' => 'sale_return_view',
            'display_name' => 'Sales Return View',
            'module' => 'inventory',
            'description' => 'View sales returns'
        ],
        'sale_return_create' => [
            'name' => 'sale_return_create',
            'display_name' => 'Sales Return Create',
            'module' => 'inventory',
            'description' => 'Create new sales returns'
        ],
        'sale_return_edit' => [
            'name' => 'sale_return_edit',
            'display_name' => 'Sales Return Edit',
            'module' => 'inventory',
            'description' => 'Edit existing sales returns'
        ],
        'sale_return_delete' => [
            'name' => 'sale_return_delete',
            'display_name' => 'Sales Return Delete',
            'module' => 'inventory',
            'description' => 'Delete sales returns'
        ],

        // Order Payments
        'order_payment_view' => [
            'name' => 'order_payment_view',
            'display_name' => 'Order Payments View',
            'module' => 'inventory',
            'description' => 'View order payments'
        ],
        'order_payment_create' => [
            'name' => 'order_payment_create',
            'display_name' => 'Order Payments Create',
            'module' => 'inventory',
            'description' => 'Create order payments'
        ],

        // Order Items
        'order_item_view' => [
            'name' => 'order_item_view',
            'display_name' => 'Order Items View',
            'module' => 'inventory',
            'description' => 'View order items'
        ],

        // Stock Adjustment
        'stock_adjustment_view' => [
            'name' => 'stock_adjustment_view',
            'display_name' => 'Stock Adjustment View',
            'module' => 'inventory',
            'description' => 'View stock adjustments'
        ],
        'stock_adjustment_create' => [
            'name' => 'stock_adjustment_create',
            'display_name' => 'Stock Adjustment Create',
            'module' => 'inventory',
            'description' => 'Create stock adjustments'
        ],
        'stock_adjustment_edit' => [
            'name' => 'stock_adjustment_edit',
            'display_name' => 'Stock Adjustment Edit',
            'module' => 'inventory',
            'description' => 'Edit stock adjustments'
        ],
        'stock_adjustment_delete' => [
            'name' => 'stock_adjustment_delete',
            'display_name' => 'Stock Adjustment Delete',
            'module' => 'inventory',
            'description' => 'Delete stock adjustments'
        ],

        // Stock Transfer
        'stock_transfer_view' => [
            'name' => 'stock_transfer_view',
            'display_name' => 'Stock Transfer View',
            'module' => 'inventory',
            'description' => 'View stock transfers'
        ],
        'stock_transfer_create' => [
            'name' => 'stock_transfer_create',
            'display_name' => 'Stock Transfer Create',
            'module' => 'inventory',
            'description' => 'Create stock transfers'
        ],
        'stock_transfer_edit' => [
            'name' => 'stock_transfer_edit',
            'display_name' => 'Stock Transfer Edit',
            'module' => 'inventory',
            'description' => 'Edit stock transfers'
        ],
        'stock_transfer_delete' => [
            'name' => 'stock_transfer_delete',
            'display_name' => 'Stock Transfer Delete',
            'module' => 'inventory',
            'description' => 'Delete stock transfers'
        ],

        // Quotation
        'quotation_view' => [
            'name' => 'quotation_view',
            'display_name' => 'Quotation View',
            'module' => 'inventory',
            'description' => 'View quotations'
        ],
        'quotation_create' => [
            'name' => 'quotation_create',
            'display_name' => 'Quotation Create',
            'module' => 'inventory',
            'description' => 'Create new quotations'
        ],
        'quotation_edit' => [
            'name' => 'quotation_edit',
            'display_name' => 'Quotation Edit',
            'module' => 'inventory',
            'description' => 'Edit existing quotations'
        ],
        'quotation_delete' => [
            'name' => 'quotation_delete',
            'display_name' => 'Quotation Delete',
            'module' => 'inventory',
            'description' => 'Delete quotations'
        ],

        // Expense Category
        'expense_category_view' => [
            'name' => 'expense_category_view',
            'display_name' => 'Expense Category View',
            'module' => 'finance',
            'description' => 'View expense categories'
        ],
        'expense_category_create' => [
            'name' => 'expense_category_create',
            'display_name' => 'Expense Category Create',
            'module' => 'finance',
            'description' => 'Create expense categories'
        ],
        'expense_category_edit' => [
            'name' => 'expense_category_edit',
            'display_name' => 'Expense Category Edit',
            'module' => 'finance',
            'description' => 'Edit expense categories'
        ],
        'expense_category_delete' => [
            'name' => 'expense_category_delete',
            'display_name' => 'Expense Category Delete',
            'module' => 'finance',
            'description' => 'Delete expense categories'
        ],

        // Expense
        'expense_view' => [
            'name' => 'expense_view',
            'display_name' => 'Expense View',
            'module' => 'finance',
            'description' => 'View expenses'
        ],
        'expense_create' => [
            'name' => 'expense_create',
            'display_name' => 'Expense Create',
            'module' => 'finance',
            'description' => 'Create new expenses'
        ],
        'expense_edit' => [
            'name' => 'expense_edit',
            'display_name' => 'Expense Edit',
            'module' => 'finance',
            'description' => 'Edit existing expenses'
        ],
        'expense_delete' => [
            'name' => 'expense_delete',
            'display_name' => 'Expense Delete',
            'module' => 'finance',
            'description' => 'Delete expenses'
        ],

        // Unit
        'unit_view' => [
            'name' => 'unit_view',
            'display_name' => 'Unit View',
            'module' => 'inventory',
            'description' => 'View units'
        ],
        'unit_create' => [
            'name' => 'unit_create',
            'display_name' => 'Unit Create',
            'module' => 'inventory',
            'description' => 'Create new units'
        ],
        'unit_edit' => [
            'name' => 'unit_edit',
            'display_name' => 'Unit Edit',
            'module' => 'inventory',
            'description' => 'Edit existing units'
        ],
        'unit_delete' => [
            'name' => 'unit_delete',
            'display_name' => 'Unit Delete',
            'module' => 'inventory',
            'description' => 'Delete units'
        ],

        // Custom Fields
        'custom_field_view' => [
            'name' => 'custom_field_view',
            'display_name' => 'Custom Field View',
            'module' => 'settings',
            'description' => 'View custom fields'
        ],
        'custom_field_create' => [
            'name' => 'custom_field_create',
            'display_name' => 'Custom Field Create',
            'module' => 'settings',
            'description' => 'Create custom fields'
        ],
        'custom_field_edit' => [
            'name' => 'custom_field_edit',
            'display_name' => 'Custom Field Edit',
            'module' => 'settings',
            'description' => 'Edit custom fields'
        ],
        'custom_field_delete' => [
            'name' => 'custom_field_delete',
            'display_name' => 'Custom Field Delete',
            'module' => 'settings',
            'description' => 'Delete custom fields'
        ],

        // Payment Mode
        'payment_mode_view' => [
            'name' => 'payment_mode_view',
            'display_name' => 'Payment Mode View',
            'module' => 'settings',
            'description' => 'View payment modes'
        ],
        'payment_mode_create' => [
            'name' => 'payment_mode_create',
            'display_name' => 'Payment Mode Create',
            'module' => 'settings',
            'description' => 'Create payment modes'
        ],
        'payment_mode_edit' => [
            'name' => 'payment_mode_edit',
            'display_name' => 'Payment Mode Edit',
            'module' => 'settings',
            'description' => 'Edit payment modes'
        ],
        'payment_mode_delete' => [
            'name' => 'payment_mode_delete',
            'display_name' => 'Payment Mode Delete',
            'module' => 'settings',
            'description' => 'Delete payment modes'
        ],

        // Currency
        'currency_view' => [
            'name' => 'currency_view',
            'display_name' => 'Currency View',
            'module' => 'settings',
            'description' => 'View currencies'
        ],
        'currency_create' => [
            'name' => 'currency_create',
            'display_name' => 'Currency Create',
            'module' => 'settings',
            'description' => 'Create new currencies'
        ],
        'currency_edit' => [
            'name' => 'currency_edit',
            'display_name' => 'Currency Edit',
            'module' => 'settings',
            'description' => 'Edit existing currencies'
        ],
        'currency_delete' => [
            'name' => 'currency_delete',
            'display_name' => 'Currency Delete',
            'module' => 'settings',
            'description' => 'Delete currencies'
        ],

        // Tax
        'tax_view' => [
            'name' => 'tax_view',
            'display_name' => 'Tax View',
            'module' => 'settings',
            'description' => 'View taxes'
        ],
        'tax_create' => [
            'name' => 'tax_create',
            'display_name' => 'Tax Create',
            'module' => 'settings',
            'description' => 'Create new taxes'
        ],
        'tax_edit' => [
            'name' => 'tax_edit',
            'display_name' => 'Tax Edit',
            'module' => 'settings',
            'description' => 'Edit existing taxes'
        ],
        'tax_delete' => [
            'name' => 'tax_delete',
            'display_name' => 'Tax Delete',
            'module' => 'settings',
            'description' => 'Delete taxes'
        ],

        // Modules
        'module_view' => [
            'name' => 'module_view',
            'display_name' => 'Modules View',
            'module' => 'settings',
            'description' => 'View system modules'
        ],

        // Role
        'role_view' => [
            'name' => 'role_view',
            'display_name' => 'Role View',
            'module' => 'settings',
            'description' => 'View roles'
        ],
        'role_create' => [
            'name' => 'role_create',
            'display_name' => 'Role Create',
            'module' => 'settings',
            'description' => 'Create new roles'
        ],
        'role_edit' => [
            'name' => 'role_edit',
            'display_name' => 'Role Edit',
            'module' => 'settings',
            'description' => 'Edit existing roles'
        ],
        'role_delete' => [
            'name' => 'role_delete',
            'display_name' => 'Role Delete',
            'module' => 'settings',
            'description' => 'Delete roles'
        ],

        // Warehouse
        'warehouse_view' => [
            'name' => 'warehouse_view',
            'display_name' => 'Warehouse View',
            'module' => 'inventory',
            'description' => 'View warehouses'
        ],
        'warehouse_create' => [
            'name' => 'warehouse_create',
            'display_name' => 'Warehouse Create',
            'module' => 'inventory',
            'description' => 'Create new warehouses'
        ],
        'warehouse_edit' => [
            'name' => 'warehouse_edit',
            'display_name' => 'Warehouse Edit',
            'module' => 'inventory',
            'description' => 'Edit existing warehouses'
        ],
        'warehouse_delete' => [
            'name' => 'warehouse_delete',
            'display_name' => 'Warehouse Delete',
            'module' => 'inventory',
            'description' => 'Delete warehouses'
        ],

        // Company
        'company_edit' => [
            'name' => 'company_edit',
            'display_name' => 'Company Edit',
            'module' => 'settings',
            'description' => 'Edit company information'
        ],

        // Translation
        'translation_view' => [
            'name' => 'translation_view',
            'display_name' => 'Translation View',
            'module' => 'settings',
            'description' => 'View translations'
        ],
        'translation_create' => [
            'name' => 'translation_create',
            'display_name' => 'Translation Create',
            'module' => 'settings',
            'description' => 'Create new translations'
        ],
        'translation_edit' => [
            'name' => 'translation_edit',
            'display_name' => 'Translation Edit',
            'module' => 'settings',
            'description' => 'Edit existing translations'
        ],
        'translation_delete' => [
            'name' => 'translation_delete',
            'display_name' => 'Translation Delete',
            'module' => 'settings',
            'description' => 'Delete translations'
        ],

        // Staff Member
        'user_view' => [
            'name' => 'user_view',
            'display_name' => 'Staff Member View',
            'module' => 'settings',
            'description' => 'View staff members'
        ],
        'user_create' => [
            'name' => 'user_create',
            'display_name' => 'Staff Member Create',
            'module' => 'settings',
            'description' => 'Create new staff members'
        ],
        'user_edit' => [
            'name' => 'user_edit',
            'display_name' => 'Staff Member Edit',
            'module' => 'settings',
            'description' => 'Edit existing staff members'
        ],
        'user_delete' => [
            'name' => 'user_delete',
            'display_name' => 'Staff Member Delete',
            'module' => 'settings',
            'description' => 'Delete staff members'
        ],

        // Customer
        'customer_view' => [
            'name' => 'customer_view',
            'display_name' => 'Customer View',
            'module' => 'inventory',
            'description' => 'View customers'
        ],
        'customer_create' => [
            'name' => 'customer_create',
            'display_name' => 'Customer Create',
            'module' => 'inventory',
            'description' => 'Create new customers'
        ],
        'customer_edit' => [
            'name' => 'customer_edit',
            'display_name' => 'Customer Edit',
            'module' => 'inventory',
            'description' => 'Edit existing customers'
        ],
        'customer_delete' => [
            'name' => 'customer_delete',
            'display_name' => 'Customer Delete',
            'module' => 'inventory',
            'description' => 'Delete customers'
        ],

        // Supplier
        'supplier_view' => [
            'name' => 'supplier_view',
            'display_name' => 'Supplier View',
            'module' => 'inventory',
            'description' => 'View suppliers'
        ],
        'supplier_create' => [
            'name' => 'supplier_create',
            'display_name' => 'Supplier Create',
            'module' => 'inventory',
            'description' => 'Create new suppliers'
        ],
        'supplier_edit' => [
            'name' => 'supplier_edit',
            'display_name' => 'Supplier Edit',
            'module' => 'inventory',
            'description' => 'Edit existing suppliers'
        ],
        'supplier_delete' => [
            'name' => 'supplier_delete',
            'display_name' => 'Supplier Delete',
            'module' => 'inventory',
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

        // Permission model permissions
        'permission_view' => [
            'name' => 'permission_view',
            'display_name' => 'Permission View',
            'module' => 'settings',
            'description' => 'View permissions'
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
