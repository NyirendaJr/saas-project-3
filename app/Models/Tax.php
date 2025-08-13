<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tax extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'name'
    ];

    protected $casts = [
    ];

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }

    // public function products()
    // {
    //     return $this->belongsToMany(Product::class, 'product_tax');
    // }
}
