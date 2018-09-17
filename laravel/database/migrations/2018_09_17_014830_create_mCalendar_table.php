<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMCalendarTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('m_calendar', function (Blueprint $table) {
            $table->engine = 'InnoDB';
//            $table->primary(['gregorian_year', 'gregorian_month']);
//            $table->integer('lunar_year',4);        // 农历年
//            $table->integer('lunar_month',2);       // 农历月
//            $table->string('lunar_month_chinese',2);            // (汉字)农历月
//            $table->string('ganzhi_year',2);                    // (干支)年
//            $table->string('ganzhi_month',2);                   // (干支)月
//            $table->string('animal',1);                         // 生肖: 十二宮
//            $table->integer('gregorian_year',4);    // 公历年
//            $table->integer('gregorian_month',2);   // 公历月
            $table->string('date',8);
            $table->integer('lunar_year');          // 农历年
            $table->integer('lunar_month');         // 农历月
            $table->string('lunar_month_chinese', 2);  // (汉字)农历月
            $table->string('ganzhi_year', 2);          // (干支)年
            $table->string('ganzhi_month', 2);         // (干支)月
            $table->string('animal', 1);               // 生肖: 十二宮
            $table->integer('gregorian_year');      // 公历年
            $table->integer('gregorian_month');     // 公历月
            $table->primary(['gregorian_year', 'gregorian_month']);
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
        Schema::drop('m_calendar');
    }
}