<template>
<td @click="clickMonth(row.gregorian_year, row.gregorian_month)"
    class="month-column date-styling"
    :style="firstColumnWidth"
>
        <div style="margin-bottom: 5px;">
            <div style="padding: 5px" >
                <router-link
                    to="/calendar/view"
                    class="thin-200"
                    @click.native="clickMonth(row.gregorian_year, row.gregorian_month)"
                    ><span style="font-size: 2.5rem;">{{ row.gregorian_month }}</span>
                    <span style="font-size: 1rem">月</span>
                </router-link>
            </div>
        </div>

</td>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
    props: {
        row: { type: Object, required: true},
        today: { },
        firstColumnWidth: { type: Object, required: true }
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
                value: 'daily'
            });

            this.$store.commit('calendar/SET_VALUE', {
                key: 'currentYear',
                value: year
            });

            this.$store.commit('calendar/SET_VALUE', {
                key: 'currentMonth',
                value: month
            });

            this.fetchCalendar();
        }
    }
};
</script>

<style lang="scss" scoped>
.month-column {
    &:hover {
        background-color: #fff;
        cursor: pointer;
    }
}
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
