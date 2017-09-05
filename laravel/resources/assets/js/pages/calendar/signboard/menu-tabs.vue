<template>
<div class="container">
<nav class="tabs is-boxed">
<ul>

    <!-- DASHBOARD -->
    <li :class="{ 'is-active': currentCalendarId === 'dashboard' }"
        @click="changeCalendar('dashboard')"
    >
        <router-link to="/dashboard" @click="changeCalendar('dashboard')">
            <span class="icon is-small">
                <i class="fa fa-dashboard"></i>
            </span>
            <span>{{ t('calendarMenu.dashboard') }}</span>
        </router-link>
    </li>

    <!-- USER CALENDARS -->
    <li v-for="uCalendar in userCalendars" 
        :class="{'is-active': currentCalendarId == uCalendar.id}"
        @click="changeCalendar(uCalendar.id)"
    >
        <router-link to="/calendar/view">
            <span class="icon is-small">
                <i v-if="!calendarIsLoading" class="fa fa-calendar"></i>
                <i v-if="calendarIsLoading && currentCalendarId !== uCalendar.id" class="fa fa-calendar"></i>
                <i v-if="calendarIsLoading && currentCalendarId === uCalendar.id" class="fa fa-refresh fa-spin"></i>
            </span>
                {{ uCalendar.name }}
            <span class="icon is-small" v-show="currentCalendarId == uCalendar.id && ! calendarIsLoading">
                <i class="fa fa-navicon" @click="toggleToolPalet()"></i>
            </span>
        </router-link>
    </li>
<!--
    <li :class="">
        <router-link to="'/calendar/settings/' + currentCalendarId}">
            <span class="icon is-small">
                <i class="fa fa-plus"></i>
            </span>
            <span>{{ t('calendarMenu.createNewOne') }}</span>
        </router-link>
    </li>
-->
</ul>
</nav>
</div><!-- // container -->
</template>

<script>
import { mapState, mapActions } from 'vuex';
import core from '../../../mixins/core.js';

export default {
    props: [ 'calendarIsLoading', ],

    mixins: [ core ],

    computed: {
        ...mapState({
            userCalendars: state => state.userCalendar.data.userCalendars,
            currentCalendarId: state => state.calendar.currentId,
            theme: state => state.app.theme,
        }),

        ...mapState('calendar/tableView/toolPalette', {
            isToolPaletteOpen: state => state.toolPalette.isActive,
        }),

        menuItemStyle: function() {
            return 'color: ' + this.theme.primary.code;
        },

        calendar: function() {
            return this.userCalendars[this.currentCalendarId];
        },
    },

    methods: {
        ...mapActions('calendar/tableView/toolPalette', {
            toggleTableToolPalette: 'toggleTableToolPalette'
        }),

        changeCalendar: function(id) {
            if( this.currentCalendarId == id ) return;
            u.clog('changeCalendar(' + id + ')');
            this.$store.commit('setCurrentCalendarId', id);
        },

        clickTabMenu: function() {
            u.clog('clickTabMenu()');
            this.toggle();
        },

        toggleToolPalet() {
            this.toggleTableToolPalette({ value: !this.isToolPaletteOpen }); 
        },
    },

    created() {
        const calId = localStorage.getItem('currentCalendarId');
        if(calId) {
            this.$store.commit('setCurrentCalendarId', calId);
        }
    },

}
</script>
<style lang="scss" scoped>
/** A fork of https://github.com/twbs/bootstrap.  */

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

.hero.is-nadeshiko .tabs.is-boxed li.is-active a,
.hero.is-mikan .tabs.is-boxed li.is-active a,
.hero.is-moegi .tabs.is-boxed li.is-active a {
    background-color: #fff !important;
    border-color: #fff !important;
}

#tabs-dropdown-menu > li > a:hover,
#tabs-dropdown-menu > li > a:focus {
    text-decoration: none !important;
    background-color: #f5f5f5 !important;
}
</style>
