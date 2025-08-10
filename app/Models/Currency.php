<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Currency extends Model
{
    use HasUuids;

    protected $fillable = [
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
