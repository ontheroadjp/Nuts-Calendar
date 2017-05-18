<template>
<div :style="[dayPanel]">
    <div :style="[upper]">
        <span :style="[day]">{{ getDay(date) }}</span>
        <span style="font-size: 48px">th</span>
    </div>
    <div class="middle">
        <span :style="[date]">{{ getDate(date) }}</span>
    </div>
    <div :style="[bottom]">
        <span :style="[month]">{{ getMonth(date) }}</span>
        <span :style="[year]">{{ getYear(date) }}</span>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import dateUtilities from '../../../mixins/date-utilities.js';

export default {
    mixins: [ dateUtilities ],

    data() {
        return {
            date: '2017-5-15'
        }
    },

    computed: {
        ...mapState({
            lang: state => state.app.lang,
            theme: state => state.app.theme,
        }),

        dayPanel: function() {
            return {
                'padding': '0 40px',
                'height': '180px',
                'position': 'relative',
                'font-weight': 500
            }
        },
        upper: function() {
            return {
            }
        },
        bottom: function() {
            return {
                'position': 'absolute',
                'top': '110px',
                'right': '60px'
            }
        },
        year: function() {
            return {
                'font-size': '24px'
            }
        },
        month: function() {
            return {
                'font-size': '36px',
                'color': this.theme.secondary.code
            }
        },
        day: function() {
            return {
                'font-size': '96px',
                'color': this.theme.secondary.code
            }
        }
    }
}
</script>
