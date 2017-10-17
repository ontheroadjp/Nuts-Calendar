<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserCalendarsTable extends Migration
{
    public $incrementing = false;

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_calendars', function (Blueprint $table) {
            $table->string('id')->primary()->unique();
            $table->string('user_id')->nullable(false);
            $table->string('name')->nullable(false);
            $table->string('description');
            $table->timestamps();

            $table
                ->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('user_calendars');
    }
}
