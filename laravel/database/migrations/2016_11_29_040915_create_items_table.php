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
            $table->integer('row_index')->unsigned();
            $table->string('member_id');
            $table->integer('type_id')->unsigned();
            $table->string('content')->nullable(false);
            $table->date('date')->nullable(true);
            $table->boolean('is_monthly_event')->default(false)->nullable(false);
            $table->boolean('is_all_day')->default(false)->nullable(false);
            $table->time('start_time')->nullable(true);
            $table->time('end_time')->nullable(true);
            $table->string('memo')->nullable(true);
            $table->boolean('is_done')->default(false)->nullable(false);
            $table->timestamps();

            // foringn key
            $table
                ->foreign('member_id')
                ->references('id')
                ->on('members')
                ->onDelete('cascade');

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
