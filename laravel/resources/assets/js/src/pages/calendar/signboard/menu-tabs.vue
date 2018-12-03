<template>

<nav class="tabs is-boxed" style="margin-left: 20px" >
<ul class="thin">

<!--
    <span><img
        src="/images/nuts-logo-white.png"
        style="width: 90px; margin-right: 2rem;" alt="Nuts logo"
    ></span>
-->

    <!-- DASHBOARD -->
    <li :class="{ 'is-active': currentCalendarId === 'dashboard' }"
        @click="changeCalendar('dashboard')">

        <router-link to="/dashboard"
            style="font-size: 0.9rem;"
            :style="{ 'color': linkColorStyle, 'pointer-events': pointerEventsStyle }"
        >
            <span class="icon is-small">
                <i class="fa fa-dashboard"></i>
            </span>
            <span>{{ t('calendarMenu.dashboard') }}</span>
        </router-link>
    </li>

    <!-- CALENDAR -->
    <li :class="{ 'is-active': currentCalendarId !== 'dashboard' && !disabled }"
        >

        <router-link to="/calendar/view"
            style="font-size: 0.9rem;"
            :style="{ 'color': linkColorStyle, 'pointer-events': pointerEventsStyle }"
        >
            <span @click="clickCalendarTab()">
                <span class="icon is-small">
                    <i v-show="!calendarIsLoading" class="fa fa-calendar"></i>
                    <i v-show="calendarIsLoading" class="fa fa-refresh fa-spin"></i>
                </span>
                <span @click="clickCalendarTab()">{{ t('calendarMenu.calendar') }}</span>
            </span>
            <span v-show="!calendarIsLoading"
                class="icon is-small">
                <i class="fa fa-navicon" @click="toggleToolPalet()"></i>
            </span>
        </router-link>
    </li>

    <!-- USER CALENDARS -->
<!--
    <li v-for="uCalendar in userCalendars"
        :class="{'is-active': currentCalendarId == uCalendar.id && !disabled}"
        @click="changeCalendar(uCalendar.id)">
        <router-link to="/calendar/view"
            :style="{ 'color': linkColorStyle, 'pointer-events': pointerEventsStyle }"
        >
            <span class="icon is-small">
                <i v-if="!calendarIsLoading" class="fa fa-calendar"></i>
                <i v-if="calendarIsLoading && currentCalendarId !== uCalendar.id"
                    class="fa fa-calendar"></i>
                <i v-if="calendarIsLoading && currentCalendarId === uCalendar.id"
                    class="fa fa-refresh fa-spin"></i>
            </span>
                {{ uCalendar.name }}
            <span v-show="currentCalendarId == uCalendar.id && ! calendarIsLoading"
                class="icon is-small">
                <i class="fa fa-navicon" @click="toggleToolPalet()"></i>
            </span>
        </router-link>
    </li>
-->

</ul>
</nav>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import core from '../../../mixins/core.js';

export default {
    props: [ 'calendarIsLoading' ],

    mixins: [ core ],

    computed: {
//        ...mapState({
//            theme: state => state.app.theme,
//        }),

        ...mapState('dashboard', {
            disabled: state => state.disabled
        }),

        ...mapState('userCalendar', {
            userCalendars: state => state.data.userCalendars
        }),

        ...mapState('calendar', {
            currentCalendarId: state => state.currentId
        }),

        ...mapState('calendar/tableView/toolPalette', {
            isToolPaletteOpen: state => state.toolPalette.isActive
        }),

//        menuItemStyle: function() {
//            return 'color: ' + this.theme.primary.code;
//        },

//        calendar: function() {
//            return this.userCalendars[this.currentCalendarId];
//        },

        linkColorStyle: function() {
            if( this.disabled ) return "rgba(242, 242, 242, 0.3)";
            return "";
        },

        pointerEventsStyle: function() {
            if( this.disabled ) return 'none';
            return 'auto';
        }
    },

    methods: {
        ...mapActions('calendar/tableView/toolPalette', {
            toggleTableToolPalette: 'toggleTableToolPalette'
        }),

        clickCalendarTab: function() {
            this.changeCalendar(Object.keys(this.userCalendars)[0]);
        },

        changeCalendar: function(id) {
            if( this.currentCalendarId == id ) return;
            u.clog('changeCalendar(' + id + ')');
            this.$store.commit('calendar/SET_VALUE', {
                key: 'currentId',
                value: id
            });
        },

//        clickTabMenu: function() {
//            u.clog('clickTabMenu()');
//            this.toggle();
//        },

        toggleToolPalet() {
            this.toggleTableToolPalette({ value: !this.isToolPaletteOpen });
        }
    },

    created() {
        const id = localStorage.getItem('currentCalendarId');
        if(id) {
//            this.$store.commit('setCurrentCalendarId', id);
            this.$store.commit('calendar/SET_VALUE', {
                key: 'currentId',
                value: id
            });
        }
    }

}
</script>
<style lang="scss" scoped>
/** A fork of https://github.com/twbs/bootstrap.  */

/*
#tabs-dropdown-menu {
    display: block;
    position: absolute;
    top: 100%;
    z-index: 1000;
    float: left;
    min-width: 160px;
    padding: 5px 0;
    margin: 2px 0 0;
    list-style: none;
    font-size: 14px;
    text-align: left;
    background-color: #fff;
    border: 1px solid #ccc;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    background-clip: padding-box;

    & > li > a {
        display: block;
        padding: 3px 20px;
        clear: both;
        font-weight: normal;
        line-height: 1.428571429;
        color: white;
        white-space: nowrap;
    }

    & > li > a:hover,
    & > li > a:focus {
        text-decoration: none;
        color: #262626;
        background-color: #f5f5f5;
    }
}
*/

.hero.is-nadeshiko .tabs.is-boxed li.is-active a,
.hero.is-mikan .tabs.is-boxed li.is-active a,
.hero.is-moegi .tabs.is-boxed li.is-active a {
    background-color: #fff !important;
    border-color: #fff !important;
}

/*
#tabs-dropdown-menu > li > a:hover,
#tabs-dropdown-menu > li > a:focus {
    text-decoration: none !important;
    background-color: #f5f5f5 !important;
}
*/
</style>
