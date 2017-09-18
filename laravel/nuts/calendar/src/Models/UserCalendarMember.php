<?php

namespace Nuts\Calendar\Models;

use Nuts\Calendar\Models\Member;
use Nuts\Calendar\Models\UserCalendar;
use Illuminate\Database\Eloquent\Model;

class UserCalendarMember extends Model
{
    protected $fillable = [
        'user_calendar_id', 'member_id'
    ];
}
