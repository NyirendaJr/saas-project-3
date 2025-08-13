<?php

namespace App\Models;

use App\Models\Brand;
use App\Models\Category;
use App\Models\ProductVariation;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Enums\ProductType;
use App\Traits\BelongsToWarehouse;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{

    use HasUuids;
    use BelongsToWarehouse;
    
    protected $fillable = [
        'name',
        'barcode_symbology',
        'item_code',
        'part_number',
        'sku',
        'image',
        'description',
        'category_id',
        'brand_id',
        'unit_id',
        'user_id',
        'warehouse_id',
        'tax_id',
        'current_stock',
        'mrp',
        'purchase_price',
        'sales_price',
        'purchase_tax_type',
        'sales_tax_type',
        'stock_quantitiy_alert',
        'opening_stock',
        'opening_stock_date',
        'wholesale_price',
        'wholesale_quantity',
        'status',
        'product_type',
        'stock_quantity_alert'
    ];

    protected $casts = [
        'product_type' => ProductType::class,
    ];

    protected $hidden = [

    ];

    public function productVariations(): HasMany
    {
        return $this->hasMany(ProductVariation::class);
    }

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }



    public function unit(): BelongsTo
    {
        return $this->belongsTo(Unit::class);
    }

    // public function variationOptions()
    // {
    //     return $this->belongsToMany(VariationOption::class, 'product_variation_variation_option');
    // }
}
