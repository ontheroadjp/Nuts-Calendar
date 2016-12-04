<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Calendar extends Model
{
    protected $table = 'calendar';

    protected $fillable = [
        'date'
    ];

    public static function range($year, $month)
    {
        $value = "$year-$month";
        $result = Calendar::with('events')
            ->where('date', 'LIKE', "%$value%")
            ->get();

        $all_members = Member::all()->keyBy('id');

        $modified_result = [
            'members' => $all_members,
            'days' => []
        ];

        for( $n=0; $n < count($result); $n++ ) {
            $group_by = $result[$n]['events']
                ->groupBy('member_id');

            $zero_event_member_ids = collect($all_members->keys())
                ->diff($group_by->keys())
                ->flatten();

            for( $i=0; $i < count($zero_event_member_ids); $i++ ) {
                $group_by->put($zero_event_member_ids[$i], '');
            }

            $day_collection = collect($result[$n])
                ->forget('events')
                ->put('events', $group_by);

            array_push($modified_result['days'], $day_collection);
        }

        return $modified_result;
    }

    public function events()
    {
        return $this->hasMany(Event::class,'date','date');
    }
}
