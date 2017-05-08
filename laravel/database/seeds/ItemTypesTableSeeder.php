<?php

use Illuminate\Database\Seeder;

class ItemTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Nuts\Calendar\Models\ItemType::create([
            'name' => 'event'
        ]);

        Nuts\Calendar\Models\ItemType::create([
            'name' => 'task'
        ]);
    }
}
