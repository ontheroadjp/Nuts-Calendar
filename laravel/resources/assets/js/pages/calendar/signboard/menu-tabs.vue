<template>
<div class="container">
<nav class="tabs is-boxed">
<ul>

    <!-- DASHBOARD -->
    <li :class="{ 'is-active': currentCalendarId === 'dashboard' }">
        <a v-link="{path: '/calendar'}" @click="changeCalendar('dashboard')">
            <span class="icon is-small">
                <i class="fa fa-dashboard"></i>
            </span>
            <span>Dashboard</span>
        </a>
    </li>

    <!-- USER CALENDARS -->
    <li v-for="uCalendar in userCalendars" 
        :class="{'is-active': currentCalendarId == uCalendar.id}"
        v-link="'/calendar/view'" 
        
    >
        <a @click="changeCalendar(uCalendar.id)">
            <span class="icon is-small">
                <i v-if="! isLoadingCalendarApi" class="fa fa-calendar"></i>
                <i v-if="isLoadingCalendarApi && currentCalendarId !== uCalendar.id" class="fa fa-calendar"></i>
                <i v-if="isLoadingCalendarApi && currentCalendarId === uCalendar.id" class="fa fa-refresh fa-spin"></i>
            </span>
                {{ uCalendar.name }}
            <span class="icon is-small">
                <i  v-show="currentCalendarId == uCalendar.id
                            && $route.path == '/calendar/view'" 
                    class="fa fa-chevron-circle-down"
                    @click="clickTabMenu()"
                ></i>
                <i  v-show="currentCalendarId == uCalendar.id 
                            && $route.path != '/calendar/view'"
                    class="fa fa-chevron-circle-down fa-rotate-90"
                ></i>
            </span>
        </a>

        <ul 
            id="tabs-dropdown-menu" 
            v-show="isDropdownOpen && currentCalendarId == uCalendar.id"
        >
            <li>
                <a :style="menuItemStyle" @click="toggleToolPalet()">
                    <span class="icon is-small">
                        <i class="fa fa-wrench"></i>
                    </span>
                    <span v-if="!isToolPaletteOpen">Show Tool Palette</span>
                    <span v-else>Close Tool Palette</span>
                </a>
            </li>
            <li>
                <a  v-link="{path: '/calendar/settings/calendar'}" 
                    :style="menuItemStyle"
                    @click="changeCalendar(uCalendar.id)"
                >
                    <span class="icon is-small">
                        <i class="fa fa-calendar-o"></i>
                    </span>
                    <span>Calendar Settings</span>
                </a>
            </li>
            <li>
                <a  v-link="{path: '/calendar/settings/members'}" 
                    :style="menuItemStyle"
                    @click="changeCalendar(uCalendar.id)"
                >
                    <span class="icon is-small">
                        <i class="fa fa-user"></i>
                    </span>
                    <span>Member Settings</span>
                </a>
            </li>
            <li>
                <a  v-link="{path: '/calendar/settings/items'}" 
                    :style="menuItemStyle"
                    @click="changeCalendar(uCalendar.id)"
                >
                    <span class="icon is-small">
                        <i class="fa fa-id-card-o"></i>
                    </span>
                    <span>Item Settings</span>
                </a>
            </li>
        </ul>

    </li>

    <li :class="">
        <a v-link="{path: '/calendar/settings/' + currentCalendarId}">
            <span class="icon is-small">
                <i class="fa fa-plus"></i>
            </span>
            <span>Create new one</span>
        </a>
    </li>
</ul>


</nav>
</div><!-- // container -->
</template>

<script>
//import calendarService from '../../services/calendar.js';

export default {

//    mixins: [
//        calendarService
//    ],

    props: [
        'isLoadingCalendarApi',
        'isToolPaletteOpen'
    ],

    data() {
        return {
            isDropdownOpen: false,
        }
    },

    computed: {
        theme: function() {
            return this.$store.state.app.theme;
        },

        menuItemStyle: function() {
            return 'color: ' + this.theme.primary.code;
        },

        userCalendars: function() {
            return this.$store.state.calendar.data.userCalendars;
        },

        currentCalendarId: function() {
            return this.$store.state.calendar.currentId;
        },

        calendar: function() {
            return this.userCalendars[this.currentCalendarId];
        },
    },

    methods: {
        changeCalendar: function(id) {
            if( this.currentCalendarId == id ) return;
            u.clog('changeCalendar(' + id + ')');
            this.$store.commit('setCurrentCalendarId', id);
        },

        clickTabMenu: function() {
            u.clog('clickTabMenu()');
            this.toggle();
        },

        toggle: function() {
            u.clog('toggle');
            if (this.isDropdownOpen) {
                return this.hide()
            }
            return this.show()
        },

        show: function() {
            u.clog('show');
            this.isDropdownOpen = true;
            setTimeout(() => document.addEventListener('click', this.hide), 0);
        },

        hide: function() {
            u.clog('hide');
            this.isDropdownOpen = false;
            document.removeEventListener('click', this.hide);
        },

        toggleToolPalet() {
            this.isToolPaletteOpen = !this.isToolPaletteOpen;
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
<style lang="sass">
    @import '../../../../sass/app.scss';

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
            color: $primary-color;
            white-space: nowrap;
        }
    
        & > li > a:hover, & > li > a:focus {
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
    #tabs-dropdown-menu > li > a:hover, #tabs-dropdown-menu > li > a:focus {
        text-decoration: none !important;
        background-color: #f5f5f5 !important;
    }
/*
    .hero.is-koiai .tabs.is-boxed li.is-active a {
        background-color: rgba(25, 96, 183, 0.4) !important;
        border-color: #185eb2 !important;
        color: #ffffff !important;
    }
    .hero.is-nadeshiko .tabs.is-boxed li.is-active a {
        background-color: rgba(239, 110, 154, 0.4) !important;
        border-color: #ee6896 !important;
        color: #ffffff !important;
    }
    .hero.is-mikan .tabs.is-boxed li.is-active a {
        background-color: rgba(255, 193, 18, 0.4) !important;
        border-color: #ffc012 !important;
        color: #ffffff !important;
    }
    .hero.is-sumire .tabs.is-boxed li.is-active a {
        background-color: rgba(182, 136, 255, 0.4) !important;
        border-color: #b688ff !important;
        color: #ffffff !important;
    }
    .hero.is-moegi .tabs.is-boxed li.is-active a {
        background-color: rgba(55, 175, 5, 0.4) !important;
        border-color: rgb(71, 179, 16) !important;
        color: #ffffff !important;
    }
*/
</style>
