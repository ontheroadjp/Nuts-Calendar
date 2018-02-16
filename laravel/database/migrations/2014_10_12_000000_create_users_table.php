<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->string('id', 40)->primary();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->integer('userplan_id')->unsigned()->nullable(false);
            $table->rememberToken();
            $table->timestamps();

            // foringn key
            $table
                ->foreign('userplan_id')
                ->references('id')
                ->on('userplans');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('users');
    }
}
