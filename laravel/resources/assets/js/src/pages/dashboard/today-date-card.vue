<template>
<div :style="[dayPanel]">
    <div>
        <span class="thin" :style="{
            'font-size': '6rem',
            'color': this.theme.secondary.code
        }">{{ getDay(date) }}</span>
        <span style="font-size: 2rem">th</span>
    </div>

    <div class="middle">
        <span :style="[date]">{{ getDate(date) }}</span>
    </div>

    <div :style="[bottom]">
        <span class="thin" :style="{
            'font-size': '2.5rem',
            'color': this.theme.secondary.code
        }">{{ getMonth(date) }}</span>

        <span class="thin" style="font-size: 4rem;">{{ getYear(date) }}</span>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import dateUtilities from '../../mixins/date-utilities.js';

export default {
    mixins: [ dateUtilities ],

    computed: {
        ...mapState({
            lang: state => state.app.lang,
            theme: state => state.app.theme
        }),

        date: function() {
            return this.now();
        },

        dayPanel: function() {
            return {
                'padding': '0 40px',
                'height': '180px',
                'position': 'relative',
                'font-weight': 400
            };
        },

        bottom: function() {
            return {
                'position': 'absolute',
                'top': '110px',
                'right': '60px'
            };
        }
    }
};
</script>
