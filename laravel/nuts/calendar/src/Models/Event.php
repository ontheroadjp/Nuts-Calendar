<?php

namespace Nuts\Calendar\Models;

//use Nuts\Calendar\Models\Member;
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
        'member_id', 'content', 'date', 'start_time', 'end_time'
    ];

    /**
     * appends
     *
     * @var mixed
     * @access protected
     */
    protected $appends = [
        'editing', 'is_hover',
    ];

    public function getEditingAttribute()
    {
        return false;
    }

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
     * fetch
     *
     * @param mixed $id
     * @param mixed $members
     * @param mixed $year
     * @param mixed $month
     * @access public
     * @return void
     */
    public function fetchSpecificMonth($year, $month)
    {
        return Event::with('member')
            ->where('date', 'LIKE', "%$year-$month%")
            ->orderBy('date', 'ASC')
            ->get();
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
