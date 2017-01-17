<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    protected $fillable = [
        'name', 'color'
    ];

//    protected $appends = [
//        'show_insert_btn',
//    ];

    protected $appends = [
        'is_hover'
    ];

//    public function getShowInsertBtnAttribute() {
//        return false;
//    }

    public function getIsHoverAttribute() {
        return false;
    }

    public static function findOrAbort($id){
        if (!$item = Member::find($id)) {
            $error = [
                'error' => [
                    'code' => 'ERR-NOTFOUND',
                    'http_code' => '404',
                    'message' => 'Requested Member cannot be found in the database.',
                ]
            ];
            return \Response::json($error, 404);
        }
        return $item;
    }

    public function events()
    {
        return $this->hasMany(Event::class,'member_id','id');
    }

    public static function getIds()
    {
        $members = Member::get(['id']);
        for( $n=0; $n < count($members); $n++ ) {
            $ids[] = $members[$n]->id;
        }
        return $ids;
    }
}
