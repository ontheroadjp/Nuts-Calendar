<?php

namespace Nuts\Calendar\Models;

use Illuminate\Database\Eloquent\Model;

class Rrule extends Model
{
    protected $table = 'rrules';

    protected $fillable = [
        'rrule_string'
    ];

    public function item()
    {
        return $this->belongsTo(Item::class, 'id', 'rrule_id');
    }
}
