<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class VariationOption extends Model
{

    use HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'variation_type_id',
        'value',
        'color_code',
        'image'
    ];

    public function type(): BelongsTo
    {
        return $this->belongsTo(VariationType::class, 'variation_type_id');
    }

    public function productVariations(): BelongsToMany
    {
        return $this->belongsToMany(
            ProductVariation::class,
            'product_variation_variation_option',
            'variation_option_id',
            'product_variation_id'
        )
        ->using(ProductVariationVariationOption::class)
        ->withPivot('id')
        ->withTimestamps();
    }

    public function variationType()
    {
        return $this->belongsTo(VariationType::class);
    }

}
