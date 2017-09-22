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
import VueRouter from 'vue-router';
import { mapState } from 'vuex';
import todayDateCard from './today-date-card.vue';
import menuTabs from './menu-tabs.vue';
import userCalendarsPane from './user-calendars/index.vue';
import membersPane from './members/index.vue';

export default {

    components: {
        menuTabs, todayDateCard, userCalendarsPane, membersPane
    },

    data() {
        return {
            tabs: {
                '/dashboard': { label: 'Calendars', icon: 'fa-calendar'},
                '/dashboard/members': { label: 'Members', icon: 'fa-gear'}
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
