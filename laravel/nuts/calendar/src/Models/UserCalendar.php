<?php
namespace Nuts\Calendar\Models;

use Illuminate\Database\Eloquent\Model;

class UserCalendar extends Model
{
    public $incrementing = false;

    protected $fillable = [
        'id', 'user_id', 'name', 'description'
    ];

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
