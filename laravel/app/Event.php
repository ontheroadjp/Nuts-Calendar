<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'member_id', 'content', 'date'
    ];

    protected $appends = [
        'editing', 'is_hover'
    ];

    public function getEditingAttribute()
    {
        return false;
    }

    public function getIsHoverAttribute()
    {
        return false;
    }

    public function member()
    {
        return $this->belongsTo(Member::class,'member_id');
    }

    public static function findOrAbort($id){
        if (!$item = Event::find($id)) {
            $error = [
                'error' => [
                    'code' => 'ERR-NOTFOUND',
                    'http_code' => '404',
                    'message' => 'Requested schedule cannot be found in the database.',
                ]
            ];
            return \Response::json($error, 404);
        }
        return $item;
    }
}
