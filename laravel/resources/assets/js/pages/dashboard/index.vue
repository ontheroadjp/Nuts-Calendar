<template>
<div class="wrapper">

<!--
<div class="container" style="width: 100%;" @click="click($event)">
    <popup-menu
        :x="x" :y="y"
        :isActive.sync="isBoxActive"
        :onClose="popupMenuClose"
    >
        <div style="margin:0; width:100%; height:100%; background-color: orange;">
            <span>This is a popup menu</span>
        </div>
    </popup-menu>
-->

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

</div><!-- // .container -->
</div><!-- // .wrapper -->
</template>

<script>
import VueRouter from 'vue-router';
import { mapState } from 'vuex';
import todayDateCard from './today-date-card.vue';
import menuTabs from './menu-tabs.vue';
import userCalendarPane from './user-calendar/index.vue';
import memberSettingsPane from './member-settings/index.vue';
//import popupMenu from '../../components/popup-menu.vue';

export default {

    components: {
        menuTabs, todayDateCard, userCalendarPane, memberSettingsPane
    },

//    components: {
//        'menu-tabs': menuTabs,
//        'user-calendar-card': userCalendarCard,
//        'member-settings': memberSettingsPane,
//        'today-date-card': todayDateCard,
////        'popup-menu': popupMenu
//    },

    data() {
        return {
            tabs: {
                '/dashboard': { label: 'Calendars', icon: 'fa-calendar'},
                '/dashboard/members': { label: 'Member Settings', icon: 'fa-gear'}
            }

//            x: 0,
//            y: 0,
//            isBoxActive: false
        }
    },

    computed: {
        ...mapState({
            theme: state => state.app.theme
        }),

//        ...mapState('member', {
//            members: state => state.data.members,
//        }),
    },

//    methods: {
////        click(e) {
////            this.isBoxActive = true;
////            this.x = e.pageX;
////            this.y = e.pageY;
////        },
////
////        popupMenuClose() {
////            this.isBoxActive = false;
////        }
//    },

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

<style lang="scss" scoped>
/*
.card-hover {
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
*/
</style>
