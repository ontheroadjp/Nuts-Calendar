<template>
    <td class="date-styling" :style="[firstColumnWidth]">
        <div>
            <span
                v-show="row.date.slice(-2) != 0"
                v-html="dayColumnLabel(row.date)"
                style="display: flex; justify-content: space-around;"
            ></span>
        </div>

        <div v-for="holiday in row.holidays"
            class="date-label"
            style="background-color: rgb(255, 218, 218); color: #4a4a4a"
        >{{ holiday.holiday_name }}</div>

        <div v-show="lang === 'ja'" class="date-label">
            {{ row.date.slice(-2) != 0 ? rokuyou(row.lunar_month, row.lunar_day) : ''}}
        </div>

        <!-- <div v-show="lang === 'ja'" class="date-label">{{ row.lunar_month_chinese }} {{ row.lunar_day_chinese }}</div> -->
        <!-- <div v-show="lang === 'ja'" class="date-label">{{ row.constellation }}</div> -->
        <!-- <div v-show="lang === 'ja'" class="date-label">{{ row.week_name }}</div> -->
        <!-- <div v-show="lang === 'ja'" class="date-label">{{ row.animal }}</div> -->
    </td>
</template>

<script>
import dateUtilities from '../../../mixins/date-utilities.js';
export default {
    mixins: [ dateUtilities ],

    props: {
        row: {

        },

        today: {

        },

        firstColumnWidth: {
        }
    },

    methods: {
        rokuyou: function( month, day ) {
            const data = [
                '大安', '赤口',	'先勝',	'友引',	'先負',	'仏滅'
            ];
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
    font-size: 0.9rem;
    background-color: rgb(149, 182, 197);
    color: white;
    border-radius: 2px;
    text-align: center;
}
</style>
