<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{

    /**
     * fillable
     *
     * @var mixed
     * @access protected
     */
    protected $fillable = [
        'member_id', 'content', 'date'
    ];

    /**
     * appends
     *
     * @var mixed
     * @access protected
     */
    protected $appends = [
        'editing', 'is_hover'
    ];

    /**
     * getEditingAttribute
     *
     * @access public
     * @return void
     */
    public function getEditingAttribute()
    {
        return false;
    }

    /**
     * getIsHoverAttribute
     *
     * @access public
     * @return void
     */
    public function getIsHoverAttribute()
    {
        return false;
    }

    /**
     * member
     *
     * @access public
     * @return void
     */
    public function member()
    {
        return $this->belongsTo(Member::class,'member_id');
    }

    /**
     * findOrAbort
     *
     * @param mixed $id
     * @static
     * @access public
     * @return void
     */
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
