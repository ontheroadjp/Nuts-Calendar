<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserplansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('userplans', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 20)->nullable(false);
            $table->integer('max_calendars')->nullable(false);
            $table->integer('max_members')->nullable(false);
            $table->integer('max_shared_members')->nullable(false);
            $table->integer('initial_fee')->nullable(false);
            $table->integer('monthly_fee')->nullable(false);
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
        Schema::drop('userplans');
    }
}
