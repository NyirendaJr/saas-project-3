<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class ProductVariation extends Model
{

    use HasUuids;

    protected $fillable = [
        'product_id',
        'variation_type_id',
        'name',
        'slug',
        'price',
        'stock',
    ];

    protected $casts = [
        'price' => 'float',
        'stock' => 'integer',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function variationOptions(): BelongsToMany
    {
        return $this->belongsToMany(
            VariationOption::class,
            'product_variation_variation_option',
            'product_variation_id',              
            'variation_option_id'   
        )
        ->using(ProductVariationVariationOption::class)
        ->withPivot('id')
        ->withTimestamps();
    }
}
