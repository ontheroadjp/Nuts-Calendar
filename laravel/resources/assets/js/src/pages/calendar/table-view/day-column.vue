<template>
    <td class="date-styling" :style="dayColumnWidth">
        <div style="margin-bottom: 5px;">
<!--
            <span :style="[ day.is_today ? today : '' ]">
-->
                {{ getDateAndDay(day.date) }}
<!--
            </span>
-->
        </div>

        <div v-for="holiday in day.holidays"
            class="date-label"
            style="background-color: red;"
        >{{ holiday.holiday_name }}</div>

        <div v-show="lang === 'ja'" class="date-label">
            {{ rokuyou(day.lunar_month, day.lunar_day) }}
        </div>

        <!-- <div v-show="lang === 'ja'" class="date-label">{{ day.lunar_month_chinese }} {{ day.lunar_day_chinese }}</div> -->
        <!-- <div v-show="lang === 'ja'" class="date-label">{{ day.constellation }}</div> -->
        <!-- <div v-show="lang === 'ja'" class="date-label">{{ day.week_name }}</div> -->
        <!-- <div v-show="lang === 'ja'" class="date-label">{{ day.animal }}</div> -->
    </td>
</template>

<script>
import dateUtilities from '../../../mixins/date-utilities.js';
export default {
    mixins: [ dateUtilities ],

    props: {
        day: {

        },

        today: {

        },

        dayColumnWidth: {
        }
    },

    methods: {
        rokuyou: function( month, day ) {
            const data = [
                '大安', '赤口',	'先勝',	'友引',	'先負',	'仏滅'
            ];
//            return data[Math.round((month + day) % 6)];
//            return data[Math.ceil((month + day) % 6)];
            return data[Math.floor((month + day) % 6)];
        }
    }
};
</script>

<style lang="scss" scoped>
.date-styling {
    font-size: 1em;
    background-color: rgba(240, 240, 240, 0.85);
}
.date-label {
    margin-bottom: 2px;
    font-size: 0.8rem;
    background-color: rgb(149, 182, 197);
    color: white;
    border-radius: 2px;
    text-align: center;
}
</style>
