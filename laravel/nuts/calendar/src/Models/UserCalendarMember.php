<?php

namespace Nuts\Calendar\Models;

use Nuts\Calendar\Models\Member;
use Nuts\Calendar\Models\UserCalendar;
use Illuminate\Database\Eloquent\Model;

class UserCalendarMember extends Model
{
    protected $fillable = [
        'id', 'user_id', 'user_calendar_id', 'member_id'
    ];

//    public static function create(array $attributes = [])
//    {
//        $attributes['id'] = 'ucm_'.md5( uniqid(mt_rand(), true);
//        $model = new static($attributes);
//
//        $model->save();
//
//        return $model;
//    }
}
