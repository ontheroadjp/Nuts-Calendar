<?php

namespace Nuts\Calendar\Models;

use Illuminate\Database\Eloquent\Model;

class Holiday extends Model
{
    protected $fillable = [ 'region', 'year', 'date', 'holiday_name' ];
}
