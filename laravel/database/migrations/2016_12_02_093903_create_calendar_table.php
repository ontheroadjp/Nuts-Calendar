<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCalendarTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */

    public function up()
    {
        Schema::create('calendar', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->date('date')->primarykey();         // yyyy-mm-dd
            $table->integer('lunar_year');              // 农历年
            $table->integer('lunar_month');             // 农历月
            $table->integer('lunar_day');               // 农历日
            $table->string('lunar_month_chinese');      // (汉字)农历月
            $table->string('lunar_day_chinese');        // (汉字)农历日
            $table->string('ganzhi_year');              // (干支)年
            $table->string('ganzhi_month');             // (干支)月
            $table->string('ganzhi_day');               // (干支)日
            $table->string('animal');                   // 生肖
            $table->string('term')->nullable(true);     // 节气
            $table->boolean('is_leap');                 // 是否为闰月
            $table->integer('gregorian_year');          // 公历年
            $table->integer('gregorian_month');         // 公历月
            $table->integer('gregorian_day');           // 公历日
            $table->integer('week_no');                 // (数字)星期几
            $table->string('week_name');                // (汉字)星期几
            $table->string('constellation');            // 星座
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
        Schema::drop('calendar');
    }
}
