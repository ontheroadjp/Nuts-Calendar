<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGroupMembers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('group_members', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('owner_id', 40)->nullable(false);
            $table->string('member_id', 40)->nullable(false);
            $table->string('user_id', 40)->nullable(false);
            $table->boolean('readable')->nullable(false)->default(true);
            $table->boolean('writable')->nullable(false)->default(true);
            $table->boolean('editable')->nullable(false)->default(true);
            $table->boolean('removable')->nullable(false)->default(true);
            $table->timestamps();

            $table->foreign('member_id')
                ->references('id')
                ->on('members')
                ->onDelete('cascade');

            $table->foreign('user_id')
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
        Schema::drop('group_members');
    }
}
