<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\Concerns\HasUuids;


class ProductVariationVariationOption extends Pivot
{
    use HasUuids;
    
    protected $fillable = [
        'product_variation_id',
        'variation_option_id',
    ];
}
