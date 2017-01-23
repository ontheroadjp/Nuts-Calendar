<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserCalendar extends Model
{
    public function members()
    {
        return $this->hasMany(Members::class,'member_id','id');
    }
}
