<template>
<div class="wrapper">
<div class="container" style="width: 100%; height: 100vh">

    <!-- infomation -->
    <div class="columns is-multiline">
        <div class="column is-4">
            <today-date-card></today-date-card>
        </div>
    </div>
    
    <menu-tabs :tabs="tabs"></menu-tabs>

    <div v-show="currentId === 0">

        <div style="margin-bottom: 20px;">
            <a :class="['button', theme.primary.class]"
                @click="clickNewCalendarButton()"
            >New Calendar</a>
        </div>

        <!-- user calendars -->
        <div class="columns is-multiline">
            <template v-for="uCal in userCalendars">
                <div class="column is-6">
                    <user-calendar-card :userCalendar="uCal"></user-calendar-card>
                </div>
            </template>
        </div>

        <!-- members -->
        <div class="columns is-multiline">
            <template v-for="member in members">
                <div class="column is-6">
                    <member-card :member="member"></member-card> 
                </div>
            </template>
        </div>
    </div>

    <calendar-settings v-show="currentId === 1"></calendar-settings>
    <application-settings v-show="currentId === 2"></application-settings>
    <account-settings v-show="currentId === 3"></account-settings>

</div><!-- // .container -->
</div><!-- // .wrapper -->
</template>

<script>
import { mapState } from 'vuex';
import userCalendarCard from './user-calendar-card.vue';
import memberCard from './member-card.vue';
import menuTabs from './menu-tabs.vue';
import calendarSettings from './calendar-settings/index.vue';
import applicationSettings from './application-settings/index.vue';
import accountSettings from './account-settings/index.vue';
import todayDateCard from './today-date-card.vue';

export default {

    components: {
//        'modal': modal,
        'menu-tabs': menuTabs,
        'user-calendar-card': userCalendarCard,
        'member-card': memberCard,
        'calendar-settings': calendarSettings,
        'application-settings': applicationSettings,
        'account-settings': accountSettings,
        'today-date-card': todayDateCard
    },

    data() {
        return {
            tabs: [
                { label: 'Dashboard', icon: 'fa-calendar' },
                { label: 'Calendar Settings', icon: 'fa-gear' },
                { label: 'Application Settings', icon: 'fa-gear' },
                { label: 'Account Settings', icon: 'fa-gear' }
            ]
        }
    },

    computed: {
        ...mapState({
            userCalendars: state => state.calendar.data.userCalendars,
            currentId: state => state.dashboard.currentId,
            members: state => state.dashboard.data.members,
            theme: state => state.app.theme
        })
    },

    methods: {
        clickNewCalendarButton: function() {
            u.clog('New Calendar Button');
        },

        clickUserCalendar: function(id) {
            u.clog('changeCalendar(' + id + ')');
            this.$store.commit('setCurrentCalendarId', id);
        }
    }
}
</script>

<style lang="scss" scoped>
.card-fover {
    &.is-koiai.is-clickable:hover {
        border: 1px solid rgba(25, 96, 182, 0.5);
    }

    &.is-nadeshiko.is-clickable:hover {
        border: 1px solid rgba(239, 113, 156, 0.4);
    }

    &.is-mikan.is-clickable:hover {
        border: 1px solid rgba(240, 131, 0, 0.4);
    }

    &.is-sumire.is-clickable:hover {
        border: 1px solid rgba(112, 88, 163, 0.5);
    }

    &.is-moegi.is-clickable:hover {
        border: 1px solid rgba(170, 207, 83, 0.5);
    }
}
</style>
