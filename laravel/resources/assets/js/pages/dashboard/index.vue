<template>
<div class="wrapper">
<div class="container" style="width: 100%; height: 100vh">

    <!-- infomation -->
    <div class="columns is-multiline">
        <div class="column is-4">
            <today-date-card></today-date-card>
        </div>
    </div>
    
    <menu-tabs :tabs="tabs">
        <div v-if="$route.path === '/dashboard'">
            <div class="columns is-multiline">
                <template v-for="uCal in userCalendars">
                    <div class="column is-6">
                        <user-calendar-card :userCalendar="uCal"></user-calendar-card>
                    </div>
                </template>
                <div class="column is-6">
                    <div class="new-user-calendar-card" 
                        style="height: 150px; cursor: pointer"
                        @click="clickNewCalendar()">

                        <div class="card-content">Create New Calendar</div>
                    </div>
                </div>
            </div>
        </div><!-- // v-if -->
    
        <member-settings v-else-if="$route.path === '/dashboard/members'"></member-settings>
    </menu-tabs>

</div><!-- // .container -->
</div><!-- // .wrapper -->
</template>

<script>
import VueRouter from 'vue-router';
import { mapState } from 'vuex';
import userCalendarCard from './user-calendar-card.vue';
import menuTabs from './menu-tabs.vue';
import memberSettings from './member-settings/index.vue';
import todayDateCard from './today-date-card.vue';

export default {

    components: {
        'menu-tabs': menuTabs,
        'user-calendar-card': userCalendarCard,
        'member-settings': memberSettings,
        'today-date-card': todayDateCard
    },

    data() {
        return {
            tabs: {
                '/dashboard': { label: 'Calendars', icon: 'fa-calendar'},
                '/dashboard/members': { label: 'Member Settings', icon: 'fa-gear'}
            }
        }
    },

    computed: {
        ...mapState({
            theme: state => state.app.theme
        }),

        ...mapState('userCalendar', {
            userCalendars: state => state.data.userCalendars,
        }),

        ...mapState('member', {
            members: state => state.data.members,
        })
    },

    methods: {
        clickNewCalendar: function() {
            u.clog('New Calendar Button');
        }
    },

    beforeRouteEnter(to, from, next) {
        const types = ['', 'members'];

        if( typeof to.params.type === 'undefined' ) {
            next();
        } else if( Object.keys(to.params.type).length !== 0 ) {
            next({path: '/dashboard'});
        }

        next();
    }
}
</script>

<style lang="scss" scoped>
.new-user-calendar-card {
    background-color: #f9f9f9;
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
    color: #4a4a4a;
    max-width: 100%;
    position: relative;
    border: 4px dotted rgba(10, 10, 10, 0.24);
}

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
