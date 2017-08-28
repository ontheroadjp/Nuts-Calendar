<?php

namespace Nuts\Calendar\Models;

//use Nuts\Calendar\Models\Member;
use Illuminate\Database\Eloquent\Model;

class UserCalendar extends Model
{
    protected $fillable = [
        'user_id', 'name', 'description'
    ];

//    public function members()
//    {
//        return $this->hasMany(Member::class,'user_calendar_id','id');
//    }

    public static function create(array $attributes = [])
    {
        $model = new static($attributes);

        $model->save();

        //$model->createMember($model->id);

        return $model;
    }

//    protected static function createMember($userCalendarId, $name = 'member')
//    {
//        Member::create([
//            'user_calendar_id' => $userCalendarId,
//            'name' => $name
//        ]);
//    }

    public static function findOrAbort($id){
        if (!$item = UserCalendar::find($id)) {
            $error = [
                'error' => [
                    'http_code' => '404',
                    'code' => 'ERR-NOTFOUND',
                    'message' => 'Requested UserCalendar cannot be found in the database.',
                ]
            ];
            return \Response::json($error, 404);
        }
        return $item;
    }
}
