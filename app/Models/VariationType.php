<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\HasMany;

class VariationType extends Model
{

    use HasUuids;
    
    protected $fillable = [
        'name'
    ];

    public function options(): HasMany
    {
        return $this->hasMany(VariationOption::class);
    }

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }
}
