<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class StockHistory extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'product_id',
        'warehouse_id',
        'user_id',
        'action_type',
        'quantity_before',
        'quantity_changed',
        'quantity_after',
        'reference_type',
        'reference_id',
        'notes',
        'created_at',
    ];

    protected $casts = [
        'quantity_before' => 'decimal:2',
        'quantity_changed' => 'decimal:2',
        'quantity_after' => 'decimal:2',
    ];

    /**
     * Get the product that owns the stock history
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the warehouse that owns the stock history
     */
    public function warehouse(): BelongsTo
    {
        return $this->belongsTo(Warehouse::class);
    }

    /**
     * Get the user who made the change
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the related reference model (polymorphic)
     */
    public function reference()
    {
        return $this->morphTo();
    }

    /**
     * Scope for stock increases
     */
    public function scopeIncrease($query)
    {
        return $query->where('quantity_changed', '>', 0);
    }

    /**
     * Scope for stock decreases
     */
    public function scopeDecrease($query)
    {
        return $query->where('quantity_changed', '<', 0);
    }
}
