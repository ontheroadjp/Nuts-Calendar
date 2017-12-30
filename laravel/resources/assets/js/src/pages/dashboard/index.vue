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

        <groups-pane
            v-else-if="$route.path === '/dashboard/groups'"
        ></groups-pane>

        <applications-pane
            v-else-if="$route.path === '/dashboard/applications'"
        ></applications-pane>

        <settings-pane
            v-else-if="$route.path === '/dashboard/settings'"
        ></settings-pane>
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
import groupsPane from './groups/index.vue';
import applicationsPane from './applications/index.vue';
import settingsPane from './settings/index.vue';
import core from '../../mixins/core.js';

export default {

    components: {
        menuTabs, todayDateCard, userCalendarsPane, membersPane, groupsPane, applicationsPane, settingsPane
    },

    mixins: [ core ],

    beforeRouteEnter(to, from, next) {
        const types = ['', 'members', 'groups', 'applications', 'settings'];

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
                groups: 0
            }
        },

        tabs: function() {
            return {
                '/dashboard': {
                    label: `${this.t('dashboardMenu.calendars')}(${this.count.userCalendars}/${this.maxCalendars})`,
                    icon: 'fa-calendar'
                },
                '/dashboard/members': {
                    label: `${this.t('dashboardMenu.members')}(${this.count.members}/${this.maxMembers})`,
                    icon: 'fa-user'
                },
                '/dashboard/groups': {
                    label: `${this.t('dashboardMenu.groups')}(${this.count.groups}/${this.maxSharedMembers})`,
                    icon: 'fa-users'
                },
                '/dashboard/applications': {
                    label: this.t('dashboardMenu.applications'),
                    icon: 'fa-paw'
                },
                '/dashboard/settings': {
                    label: this.t('dashboardMenu.settings'),
                    icon: 'fa-wrench'
                }
            }
        }
    }
};
</script>
