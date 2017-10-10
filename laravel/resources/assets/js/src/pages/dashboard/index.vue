<template>
<div class="wrapper">
<div id="dashboard" class="container" style="width: 100%;">

    <!-- infomation -->
    <div class="columns is-multiline">
        <div class="column is-4">
            <today-date-card></today-date-card>
        </div>
    </div>

    <!-- tab menu -->
    <menu-tabs :tabs="tabs">
        <user-calendars-pane
            v-if="$route.path === '/dashboard'"
        ></user-calendars-pane>

        <members-pane
            v-else-if="$route.path === '/dashboard/members'"
        ></members-pane>
    </menu-tabs>

</div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import todayDateCard from './today-date-card.vue';
import menuTabs from './menu-tabs.vue';
import userCalendarsPane from './user-calendars/index.vue';
import membersPane from './members/index.vue';

export default {

    components: {
        menuTabs, todayDateCard, userCalendarsPane, membersPane
    },

//    data() {
//        return {
//            tabs: {
//                '/dashboard': { label: 'Calendars', icon: 'fa-calendar'},
//                '/dashboard/members': { label: 'Members/Roles', icon: 'fa-user'},
//                '/dashboard/shareMembers': { label: 'Share Members', icon: 'fa-users'},
//                '/dashboard/applications': { label: 'Applications', icon: 'fa-paw'}
//            }
//        }
//    },

    beforeRouteEnter(to, from, next) {
        const types = ['', 'members'];

        if( typeof to.params.type === 'undefined' ) {
            next();
        } else if( types.indexOf(to.params.type) === -1 ) {
            next({path: '/dashboard'});
        }

        next();
    },

    computed: {
        ...mapState('user', {
            maxCalendars: state => state.data.maxCalendars,
            maxMembers: state => state.data.maxMembers,
            maxSharedMembers: state => state.data.maxSharedMembers
        }),

        ...mapState({
            userCalendars: state => state.userCalendar.data.userCalendars,
            members: state => state.member.data.members
        }),

        count: function() {
            return {
                userCalendars: Object.keys(this.userCalendars).length,
                members: Object.keys(this.members).length,
                myGroups: 1
            }
        },

        tabs: function() {
            return {
                '/dashboard': {
                    label: `Calendars(${this.count.userCalendars}/${this.maxCalendars})`,
                    icon: 'fa-calendar'
                },
                '/dashboard/members': {
                    label: `Members(${this.count.members}/${this.maxMembers})`,
                    icon: 'fa-user'
                },
                '/dashboard/groups': {
                    label: `My Group(${this.count.myGroups}/${this.maxSharedMembers})`,
                    icon: 'fa-users'
                },
                '/dashboard/applications': {
                    label: 'Applications',
                    icon: 'fa-paw'
                }
            }
        }
    }
};
</script>
