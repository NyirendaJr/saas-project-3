<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Eloquent;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Notifications\DatabaseNotificationCollection;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements JWTSubject
{
    /** @use HasFactory<UserFactory> */
    use HasFactory;
    use HasApiTokens;
    use Notifiable;
    use HasRoles;
    use HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'company_id',
        'current_warehouse_id',
        'warehouse_permissions',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'warehouse_permissions' => 'array',
        ];
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     */
    public function getJWTIdentifier(): mixed
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array<string, mixed>
     */
    public function getJWTCustomClaims(): array
    {
        return [];
    }

    /**
     * Get the company that the user belongs to
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * Get the current warehouse the user is working in
     */
    public function currentWarehouse(): BelongsTo
    {
        return $this->belongsTo(Warehouse::class, 'current_warehouse_id');
    }

    /**
     * Get all warehouses the user has access to
     */
    public function warehouses(): BelongsToMany
    {
        return $this->belongsToMany(Warehouse::class, 'user_warehouses')
                    ->using(UserWarehouse::class)
                    ->withPivot(['permissions', 'is_active'])
                    ->withTimestamps();
    }

    /**
     * Get active warehouses the user has access to
     */
    public function activeWarehouses(): BelongsToMany
    {
        return $this->warehouses()->wherePivot('is_active', true);
    }

    /**
     * Check if user has access to a specific warehouse
     */
    public function hasAccessToWarehouse(Warehouse $warehouse): bool
    {
        return $this->warehouses()->where('warehouses.id', $warehouse->id)->exists();
    }

    /**
     * Switch to a different warehouse
     */
    public function switchToWarehouse(Warehouse $warehouse): bool
    {
        if (!$this->hasAccessToWarehouse($warehouse)) {
            return false;
        }

        $this->update(['current_warehouse_id' => $warehouse->id]);
        return true;
    }

    /**
     * Get user's permissions for current warehouse
     */
    public function getCurrentWarehousePermissions(): array
    {
        if (!$this->currentWarehouse) {
            return [];
        }

        $userWarehouse = $this->warehouses()->where('warehouses.id', $this->currentWarehouse->id)->first();
        return $userWarehouse?->pivot?->permissions ?? [];
    }

    /**
     * Check if user has permission in current warehouse
     */
    public function hasWarehousePermission(string $permission): bool
    {
        $permissions = $this->getCurrentWarehousePermissions();
        return in_array($permission, $permissions);
    }

    /**
     * Scope to filter users by company
     */
    public function scopeForCompany($query, $companyId)
    {
        return $query->where('company_id', $companyId);
    }
}
