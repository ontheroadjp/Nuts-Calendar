<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRrulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rrules', function (Blueprint $table) {
            $table->increments('id');
            $table->string('rrule_string')->nullable(false);
            $table->string('rrule_text')->nullable(false);
            $table->string('rrule_json')->nullable(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('rrules');
    }
}
