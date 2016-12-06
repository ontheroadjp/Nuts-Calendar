<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    protected $fillable = [
        'name', 'color'
    ];

    protected $apends = [
        'show_insert_btn'
    ];

    public function getShowInsertBtnAttribute() {
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

    //public function events($target = null)
    //{
    //    if( $target ) {
    //        return $this->hasMany(Event::class,'member_id','id');
    //    } else {
    //        return $this->hasMany(Event::class,'member_id','id')
    //            ->where('events.date', 'LIKE', "%$target%")
    //    }
    //}

    public static function getIds()
    {
        $members = Member::get(['id']);
        for( $n=0; $n < count($members); $n++ ) {
            $ids[] = $members[$n]->id;
        }
        return $ids;
    }
}
