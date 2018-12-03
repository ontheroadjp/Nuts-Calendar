<template>
    <span v-for="uCalendar in userCalendars"
        @click="changeCalendar(uCalendar.id)">

        <router-link
            to="/calendar/view"
            tag="button"
            class="button thin"
            :class="{'strip': currentCalendarId != uCalendar.id && !disabled}"
        >
            <span class="icon is-small">
                <i v-if="!calendarIsLoading" class="fa fa-calendar"></i>
                <i v-if="calendarIsLoading && currentCalendarId !== uCalendar.id"
                    class="fa fa-calendar"></i>
                <i v-if="calendarIsLoading && currentCalendarId === uCalendar.id"
                    class="fa fa-refresh fa-spin"></i>
            </span>
            <span>{{ uCalendar.name }}</span>
        </router-link>
    </span>
</template>

<script>
import { mapState } from 'vuex';
import core from '../../../../mixins/core.js';
import searchBox from './search-box.vue';

export default {
    name: 'calendar-tool-palett',

    components: { searchBox },

    mixins: [ core ],

    data() {
        return {
            selected: 'date'
        }
    },

    computed: {
        ...mapState('dashboard', {
            disabled: state => state.disabled
        }),

        ...mapState('userCalendar', {
            userCalendars: state => state.data.userCalendars
        }),

        ...mapState('calendar', {
            currentCalendarId: state => state.currentId,
            calendarIsLoading: state => state.isLoading
        }),

//        pointerEventsStyle: function() {
//            if( this.disabled ) return 'none';
//            return 'auto';
//        },
//
//        linkColorStyle: function() {
//            if( this.disabled ) return "rgba(242, 242, 242, 0.3)";
//            return "";
//        }
    },

    methods: {
        changeCalendar: function(id) {
            if( this.currentCalendarId == id ) return;
            u.clog('changeCalendar(' + id + ')');
            this.$store.commit('calendar/SET_VALUE', {
                key: 'currentId',
                value: id
            });
        },
    }
}
</script>

<style lang="scss" scoped>
.tool-palette {
    background:#f0f0f0;
    padding:5px;
    overflow: scroll;
}

.select select:focus, .select select.is-focused, .select select:active, .select select.is-active {
    border-color: #dbdbdb;
    box-shadow: none;
}

</style>
