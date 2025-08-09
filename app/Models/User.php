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
        'current_store_id',
        'store_permissions',
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
            'store_permissions' => 'array',
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
     * Get the current store the user is working in
     */
    public function currentStore(): BelongsTo
    {
        return $this->belongsTo(Store::class, 'current_store_id');
    }

    /**
     * Get all stores the user has access to
     */
    public function stores(): BelongsToMany
    {
        return $this->belongsToMany(Store::class, 'user_stores')
                    ->withPivot(['permissions', 'is_active'])
                    ->withTimestamps();
    }

    /**
     * Get active stores the user has access to
     */
    public function activeStores(): BelongsToMany
    {
        return $this->stores()->wherePivot('is_active', true);
    }

    /**
     * Check if user has access to a specific store
     */
    public function hasAccessToStore(Store $store): bool
    {
        return $this->stores()->where('stores.id', $store->id)->exists();
    }

    /**
     * Switch to a different store
     */
    public function switchToStore(Store $store): bool
    {
        if (!$this->hasAccessToStore($store)) {
            return false;
        }

        $this->update(['current_store_id' => $store->id]);
        return true;
    }

    /**
     * Get user's permissions for current store
     */
    public function getCurrentStorePermissions(): array
    {
        if (!$this->currentStore) {
            return [];
        }

        $userStore = $this->stores()->where('stores.id', $this->currentStore->id)->first();
        return $userStore?->pivot?->permissions ?? [];
    }

    /**
     * Check if user has permission in current store
     */
    public function hasStorePermission(string $permission): bool
    {
        $permissions = $this->getCurrentStorePermissions();
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
