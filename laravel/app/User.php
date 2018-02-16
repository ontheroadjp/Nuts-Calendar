<?php

namespace App;

use Nuts\Calendar\Models\Userplan;
use Nuts\Calendar\Models\UserCalendar;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'userplan_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    protected function userplan()
    {
//        return $this->belongsTo('Nuts\Calendar\Models\Userplan');
        return $this->belongsTo(Userplan::class);
    }

    protected function userCalendars()
    {
        return $this->hasMany(UserCalendar::class,'user_id','id');
    }

    public static function create(array $attributes = [])
    {
        $model = new static($attributes);

        $model->save();

//        $model->createUserCalendar($model->id, 'First Calendar');

        return $model;
    }

//    public static function createUserCalendar($user_id, $name = 'Calendar')
//    {
//        return UserCalendar::create([
//            'user_id' => $user_id,
//            'name' => $name,
//        ]);
//    }
}
