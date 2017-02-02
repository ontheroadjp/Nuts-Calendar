<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserCalendar extends Model
{
    protected $fillable = [
        'user_id', 'name'
    ];

    public function members()
    {
        return $this->hasMany(Member::class,'user_calendar_id','id');
    }

    public static function create(array $attributes = [])
    {
        $model = new static($attributes);

        $model->save();

        $model->createMember($model->id);

        return $model;
    }

    protected static function createMember($userCalendarId, $name = 'member', $color = 'primary')
    {
        Member::create([
        'user_calendar_id' => $userCalendarId,
            'name' => $name,
            'color' => $color
        ]);
    }

}
