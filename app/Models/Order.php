<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Builder;
use App\Enums\OrderType;

class Order extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'customer_id',
        'warehouse_id',
        'status',
        'total_amount',
        'paid_amount',
        'due_amount',
        'payment_method',
        'order_date',
        'shipping_address',
    ];

    protected $casts = [
        'order_date' => 'datetime',
        'order_type' => OrderType::class,
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function scopeSales(Builder $query): Builder
    {
        return $query->where('order_type', OrderType::Sales->value);
    }

    public function scopePurchases(Builder $query): Builder
    {
        return $query->where('order_type', OrderType::Purchases->value);
    }
}
