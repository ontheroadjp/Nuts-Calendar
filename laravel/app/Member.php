<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    protected $fillable = [
        'user_calendar_id', 'name', 'color'
    ];

    protected $appends = [
        'is_hover'
    ];

    public function getIsHoverAttribute() {
        return false;
    }

    public function events()
    {
        return $this->hasMany(Event::class,'member_id','id');
    }

    public static function findOrAbort($id){
        if (!$item = Member::find($id)) {
            $error = [
                'error' => [
                    'http_code' => '404',
                    'code' => 'ERR-NOTFOUND',
                    'message' => 'Requested Member cannot be found in the database.',
                ]
            ];
            return \Response::json($error, 404);
        }
        return $item;
    }

}
