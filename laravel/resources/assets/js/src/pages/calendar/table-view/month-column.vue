<template>
    <td class="date-styling" :style="dayColumnWidth" style="padding: 0">
        <div style="margin-bottom: 5px;">
            <template v-if="day.gregorian_month == 1">
                <div :style="style.yearLabel" >{{ day.gregorian_year }}年</div>
            </template>

            <div style="padding: 5px" >
                    <router-link
                        to="/calendar/view"
                        class="thin-200"
                        style="font-size: 1.2rem;"
                        @click.native="clickMonth(day.gregorian_year, day.gregorian_month)"
                    >{{ day.gregorian_month }}月
                    </router-link>
            </div>

        </div>
    </td>
</template>

<script>
import { mapState, mapActions } from 'vuex';
//import dateUtilities from '../../../mixins/date-utilities.js';
export default {
    //mixins: [ dateUtilities ],

    props: {
        day: { type: Object, required: true},
        today: { },
        dayColumnWidth: { type: Object, required: true }
    },

    computed: {
        ...mapState({
            theme: state => state.app.theme,
        }),

        ...mapState('calendar', {
            currentUserCalendarId: state => state.currentId
        }),

        style: function() {
            return {
                yearLabel: {
                    'padding': '3px',
                    'background-color': this.theme.primary.code,
                    'color': '#fff'
                },
                thisMonth: {
                    'border': '1px solid ' + this.theme.primary.code,
                    'background-color': this.theme.secondary.code,
                    'border-radius': '5px',
                    'color': 'white',
                    'padding': '5px'
                }
            };
        }
    },

    methods: {
        ...mapActions('calendar', {
            fetchCalendar: 'fetchCalendar'
        }),

        clickMonth: function(year, month) {
            u.clog('changeCalendar(' + this.currentUserCalendarId + ')');
            this.$store.commit('calendar/SET_VALUE', {
                key: 'viewMode',
                value: 'dayly'
            });

            this.$store.commit('calendar/SET_VALUE', {
                key: 'currentYear',
                value: year
            });

            this.$store.commit('calendar/SET_VALUE', {
                key: 'currentMonth',
                value: ('00' + month).slice(-2)
            });

            this.fetchCalendar(this.currentUserCalendarId);
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
