<?php

namespace Nuts\Calendar\Models;

use Illuminate\Database\Eloquent\Model;

class Userplan extends Model
{
    protected $fillable = [
        'name', 'max_calendars', 'max_members', 'max_shared_members'
    ];
}
