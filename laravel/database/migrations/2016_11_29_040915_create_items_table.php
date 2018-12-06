<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('id');
            $table->string('user_id', 40)->nullable(false);
            $table->string('member_id')->nullable(false);
            $table->integer('row_index')->unsigned()->nullable(false);
            $table->integer('type_id')->unsigned()->nullable(false);
            $table->date('date')->nullable(false);
            $table->date('prev_date')->nullable(true);
            $table->date('next_date')->nullable(true);
            $table->integer('rrule_id')->unsigned()->nullable(false);
//            $table->string('rrule_string')->default('');
//            $table->string('rrule_text')->default('');
//            $table->string('rrule_json')->default('');
            $table->string('content')->nullable(false);
            $table->boolean('is_monthly_event')->default(false)->nullable(false);
            $table->boolean('is_all_day')->default(false)->nullable(false);
            $table->time('start_time')->nullable(false);
            $table->time('end_time')->nullable(false);
            $table->string('memo')->nullable(true);
            $table->boolean('is_done')->default(false)->nullable(false);
            $table->timestamps();

            // foringn key
            $table
                ->foreign('member_id')
                ->references('id')
                ->on('members')
                ->onDelete('cascade');

//            $table
//                ->foreign('rrule_id')
//                ->references('id')
//                ->on('rrules')
//                ->onDelete('cascade');

            $table
                ->foreign('type_id')
                ->references('id')
                ->on('item_types')
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
        Schema::drop('items');
    }
}
