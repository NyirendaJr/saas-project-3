<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Store extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'name',
        'code',
        'type',
        'email',
        'phone',
        'address',
        'latitude',
        'longitude',
        'operating_hours',
        'settings',
        'is_active',
    ];

    protected $casts = [
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'operating_hours' => 'array',
        'settings' => 'array',
        'is_active' => 'boolean',
    ];

    /**
     * Get the company that owns the store
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * Get the users assigned to this store
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_stores')
                    ->withPivot(['permissions', 'is_active'])
                    ->withTimestamps();
    }

    /**
     * Get the active users assigned to this store
     */
    public function activeUsers(): BelongsToMany
    {
        return $this->users()->wherePivot('is_active', true);
    }

    /**
     * Get users who have this as their current store
     */
    public function currentUsers(): HasMany
    {
        return $this->hasMany(User::class, 'current_store_id');
    }

    /**
     * Check if store is a warehouse
     */
    public function isWarehouse(): bool
    {
        return $this->type === 'warehouse';
    }

    /**
     * Check if store is a retail store
     */
    public function isStore(): bool
    {
        return $this->type === 'store';
    }

    /**
     * Get the formatted address
     */
    public function getFormattedAddressAttribute(): string
    {
        return $this->address ?? 'No address provided';
    }

    /**
     * Scope to filter by company
     */
    public function scopeForCompany($query, $companyId)
    {
        return $query->where('company_id', $companyId);
    }

    /**
     * Scope to filter by type
     */
    public function scopeOfType($query, $type)
    {
        return $query->where('type', $type);
    }

    /**
     * Scope to filter active stores
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
