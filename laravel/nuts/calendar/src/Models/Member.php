<?php
namespace Nuts\Calendar\Models;

use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    public $incrementing = false;

    protected $fillable = [
        'user_id', 'name', 'description', 'order'
    ];

    protected $appends = [
        'is_hover'
    ];

    public function getIsHoverAttribute() {
        return false;
    }

    public function items()
    {
        return $this->hasMany(Item::class, 'member_id', 'id')->orderBy('order', 'asc');
    }

    public function userCalendarMembers()
    {
        return $this->hasMany(UserCalendarMember::class, 'user_calendar_id', 'id');
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
