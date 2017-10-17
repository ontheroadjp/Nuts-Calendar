<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserCalendarMembersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_calendar_members', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
//            $table->integer('user_calendar_id')->unsigned();
//            $table->integer('member_id')->unsigned();
            $table->string('user_calendar_id')->nullable(false);
            $table->string('member_id')->nullable(false);
            $table->timestamps();

            $table->foreign('user_calendar_id')
                ->references('id')
                ->on('user_calendars')
                ->onDelete('cascade');

            $table->foreign('member_id')
                ->references('id')
                ->on('members')
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
        Schema::drop('user_calendar_members');
    }
}
