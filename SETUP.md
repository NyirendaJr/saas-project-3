# Initial Project Setup Guide

This guide will help you set up the initial project with permissions, roles, and a superadmin user.

## Prerequisites

- Laravel application installed and configured
- Database migrations run
- Spatie Laravel Permission package installed

## Setup Options

### Option 1: Using Artisan Command (Recommended)

Run the custom Artisan command for easy setup:

```bash
# Basic setup with default credentials
php artisan project:setup

# Custom setup with specific credentials
php artisan project:setup --email=admin@yourcompany.com --password=securepassword123 --name="Your Name"

# Force update existing superadmin
php artisan project:setup --force
```

### Option 2: Using Database Seeder

Run the database seeder:

```bash
php artisan db:seed --class=InitialProjectSeeder
```

### Option 3: Using Full Database Seeder

Run all seeders including the initial setup:

```bash
php artisan db:seed
```

## What Gets Created

### 1. Permissions

- All permissions from `PermsSeed` class are synced
- Permissions are organized by modules:
    - **inventory**: brands, categories, products, variations, stock adjustments, etc.
    - **sales**: sales, sales returns, order payments, quotations, etc.
    - **purchases**: purchases, purchase returns
    - **finance**: payment in/out, expenses, cash & bank
    - **customers**: customer management
    - **suppliers**: supplier management
    - **settings**: system configuration, users, roles, etc.
    - **pos**: point of sale access

### 2. Superadmin Role

- Role name: `superadmin`
- Guard: `web`
- Description: "Super Administrator with full system access"
- **All permissions are automatically assigned to this role**

### 3. Superadmin User

- **Default credentials:**
    - Email: `superadmin@example.com`
    - Password: `superadmin123`
    - Name: `Super Administrator`
- Email is pre-verified
- Assigned the `superadmin` role

## Command Options

The `project:setup` command supports the following options:

| Option       | Description                           | Default                  |
| ------------ | ------------------------------------- | ------------------------ |
| `--email`    | Superadmin email address              | `superadmin@example.com` |
| `--password` | Superadmin password                   | `superadmin123`          |
| `--name`     | Superadmin display name               | `Super Administrator`    |
| `--force`    | Force setup even if superadmin exists | `false`                  |

## Examples

```bash
# Basic setup
php artisan project:setup

# Custom credentials
php artisan project:setup --email=admin@company.com --password=MySecurePass123 --name="John Doe"

# Update existing superadmin
php artisan project:setup --force

# Custom setup with force update
php artisan project:setup --email=admin@company.com --password=newpassword --force
```

## Security Notes

⚠️ **Important Security Considerations:**

1. **Change Default Password**: Always change the default password after first login
2. **Use Strong Passwords**: Use complex passwords in production
3. **Secure Email**: Use a secure email address for the superadmin account
4. **Environment Variables**: Consider using environment variables for sensitive data

## Post-Setup Steps

After running the setup:

1. **Login**: Use the provided credentials to log in
2. **Change Password**: Immediately change the superadmin password
3. **Verify Permissions**: Check that all permissions are properly assigned
4. **Test Access**: Verify access to all modules and features
5. **Create Additional Users**: Create additional users with appropriate roles

## Troubleshooting

### Common Issues

1. **"Superadmin user already exists"**
    - Use `--force` flag to update existing user
    - Or use different email with `--email` option

2. **"Superadmin role not found"**
    - Ensure migrations are run: `php artisan migrate`
    - Check if Spatie Laravel Permission is properly installed

3. **"Permission denied"**
    - Ensure the user running the command has database access
    - Check database connection settings

### Verification Commands

```bash
# Check if superadmin user exists
php artisan tinker --execute="echo 'Superadmin users: ' . App\Models\User::whereHas('roles', function(\$q) { \$q->where('name', 'superadmin'); })->count();"

# Check total permissions
php artisan tinker --execute="echo 'Total permissions: ' . App\Models\Permission::count();"

# Check modules
php artisan tinker --execute="echo 'Modules: ' . App\Models\Permission::distinct()->pluck('module')->implode(', ');"
```

## Module Structure

The setup creates permissions organized into these modules:

- **inventory**: Product and stock management
- **sales**: Sales and order management
- **purchases**: Purchase and supplier management
- **finance**: Financial operations and reporting
- **customers**: Customer relationship management
- **suppliers**: Supplier management
- **settings**: System configuration and administration
- **pos**: Point of sale operations

Each module contains relevant CRUD permissions (view, create, edit, delete) and module-specific permissions.

## Support

If you encounter any issues during setup:

1. Check the Laravel logs: `storage/logs/laravel.log`
2. Verify database connection and migrations
3. Ensure all required packages are installed
4. Check file permissions for storage and cache directories
