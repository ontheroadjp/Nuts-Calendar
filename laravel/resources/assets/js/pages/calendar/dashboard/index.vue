<template>
<div class="wrapper">
<div class="container" style="width: 100%; height: 100vh">

<!-- infomation -->
<div class="columns is-multiline">
    <div class="column is-4">
        <date-card></date-card>
    </div>
</div>

<menu-tabs></menu-tabs>
<calendar-content v-show="this.currentId === 1"></calendar-content>

</div><!-- // .container -->
</div><!-- // .wrapper -->
</template>

<script>
import { mapState } from 'vuex';
import menuTabs from './menu-tabs.vue';
import calendarContent from './calendar/index.vue';
import dateCard from './date-card.vue';

export default {

    components: {
        'menu-tabs': menuTabs,
        'calendar-content': calendarContent,
        'date-card': dateCard
    },

    computed: {
        ...mapState({
            currentId: state => state.dashboard.currentId,
//            userCalendars: state => state.calendar.data.userCalendars,
//            members: state => state.dashboard.data.members,
//            theme: state => state.app.theme
        })
    },
}
</script>

<style lang="scss" scoped>
    /* empty */
</style>
