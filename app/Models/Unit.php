<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Unit extends Model
{
    use HasUuids;

    protected $fillable = [
        'name',
        'short_name',
        'base_unit',
        'parent_id',
        'operator',
        'operator_value',
        'is_deletable'
    ];

    protected $casts = [

    ];

    protected $hidden = [

    ];

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }
}
