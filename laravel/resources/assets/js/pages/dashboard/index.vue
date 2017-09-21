<template>
<div class="wrapper">
<div class="container" style="width: 100%;">

    <!-- infomation -->
    <div class="columns is-multiline">
        <div class="column is-4">
            <today-date-card></today-date-card>
        </div>
    </div>

    <!-- tab menu -->
    <menu-tabs :tabs="tabs">
        <user-calendar-pane
            v-if="$route.path === '/dashboard'"
        ></user-calendar-pane>

        <member-settings
            v-else-if="$route.path === '/dashboard/members'"
        ></member-settings>
    </menu-tabs>

</div>
</div>
</template>

<script>
import VueRouter from 'vue-router';
import { mapState } from 'vuex';
import todayDateCard from './today-date-card.vue';
import menuTabs from './menu-tabs.vue';
import userCalendarPane from './user-calendar/index.vue';
import memberSettingsPane from './member-settings/index.vue';

export default {

    components: {
        menuTabs, todayDateCard, userCalendarPane, memberSettingsPane
    },

    data() {
        return {
            tabs: {
                '/dashboard': { label: 'Calendars', icon: 'fa-calendar'},
                '/dashboard/members': { label: 'Member Settings', icon: 'fa-gear'}
            }
        }
    },

    beforeRouteEnter(to, from, next) {
        const types = ['', 'members'];

        if( typeof to.params.type === 'undefined' ) {
            next();
        } else if( types.indexOf(to.params.type) === -1 ) {
            next({path: '/dashboard'});
        }

        next();
    }
};
</script>
