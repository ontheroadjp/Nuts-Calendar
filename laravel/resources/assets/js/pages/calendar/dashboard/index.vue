<template>
<div class="wrapper">
<div class="container" style="width: 100%; height: 100vh">

<!-- infomation -->
<div class="columns is-multiline">
    <div class="column is-4">
        <date-card></date-card>
    </div>
</div>

<menu-tabs :tabs="tabs"></menu-tabs>
<calendar-settings v-show="this.currentId === 1"></calendar-settings>
<application-settings v-show="this.currentId === 2"></application-settings>
<account-settings v-show="this.currentId === 3"></account-settings>

</div><!-- // .container -->
</div><!-- // .wrapper -->
</template>

<script>
import { mapState } from 'vuex';
import menuTabs from './menu-tabs.vue';
import calendarSettings from './calendar-settings/index.vue';
import applicationSettings from './application-settings/index.vue';
import accountSettings from './account-settings/index.vue';
import dateCard from './date-card.vue';

export default {

    components: {
        'menu-tabs': menuTabs,
        'calendar-settings': calendarSettings,
        'application-settings': applicationSettings,
        'account-settings': accountSettings,
        'date-card': dateCard
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
            currentId: state => state.dashboard.currentId,
        })
    },
}
</script>

<style lang="scss" scoped>
    /* empty */
</style>
