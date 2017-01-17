<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            if(Schema::hasTable('events')) {
                Schema::drop('events');
            }
            $table->engine = 'InnoDB';

            $table->increments('id');
            $table->integer('member_id')->unsigned();
            $table->string('content');
            $table->date('date');
            $table->timestamps();

            $table
                ->foreign('member_id')
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
        Schema::drop('events');
    }
}
