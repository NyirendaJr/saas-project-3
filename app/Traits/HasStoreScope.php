<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

trait HasStoreScope
{
    /**
     * Boot the trait
     */
    protected static function bootHasStoreScope(): void
    {
        static::addGlobalScope(new StoreScope);
    }

    /**
     * Get the store ID for scoping
     */
    public function getStoreScopeId(): ?int
    {
        return config('app.current_store_id');
    }
}

class StoreScope implements Scope
{
    /**
     * Apply the scope to a given Eloquent query builder.
     */
    public function apply(Builder $builder, Model $model): void
    {
        if ($storeId = config('app.current_store_id')) {
            $builder->where($model->getTable() . '.store_id', $storeId);
        }
    }
}
