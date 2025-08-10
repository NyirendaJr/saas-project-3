<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class StockAdjustment extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'product_id',
        'warehouse_id',
        'user_id',
        'adjustment_type',
        'quantity',
        'current_stock',
        'new_stock',
        'reason',
        'notes',
        'reference_number',
        'date',
    ];

    protected $casts = [
        'quantity' => 'decimal:2',
        'current_stock' => 'decimal:2',
        'new_stock' => 'decimal:2',
        'date' => 'date',
    ];

    /**
     * Get the product that owns the stock adjustment
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the warehouse that owns the stock adjustment
     */
    public function warehouse(): BelongsTo
    {
        return $this->belongsTo(Warehouse::class);
    }

    /**
     * Get the user who made the adjustment
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope for positive adjustments (stock increases)
     */
    public function scopeIncrease($query)
    {
        return $query->where('adjustment_type', 'increase');
    }

    /**
     * Scope for negative adjustments (stock decreases)
     */
    public function scopeDecrease($query)
    {
        return $query->where('adjustment_type', 'decrease');
    }
}
