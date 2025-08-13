<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;


class Warehouse extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'name',
        'address',
        'email',
        'phone',
        'region_id',
        'district_id',
        'ward_id'
    ];

    public function getRouteKeyName()
    {
        return 'id';
    }

    public function members(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function brands(): HasMany
    {
        return $this->hasMany(Brand::class);
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    public function categories(): HasMany
    {
        return $this->hasMany(Category::class);
    }

    public function variationTypes(): HasMany
    {
        return $this->hasMany(VariationType::class);
    }

    public function units(): HasMany
    {
        return $this->hasMany(Unit::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
