<template>
<div class="wrapper">
<!-- <hero title="Dashboard" subtitle="Primary subtitle"></hero> -->
<div class="container">

<div class="columns">

    <div class="column is-4">
        <sidebar :selected="selected"></sidebar>
    </div>

    <div class="column is-8" v-show="selected === 'calendar'">
        <calendar></calendar>
    </div>

    <div class="column is-8" v-show="selected === 'members'">
        <members v-show="selected === 'members'"></members>
    </div>

    <div class="column is-8" v-show="selected === 'items'">
        <items v-show="selected === 'items'"></items>
    </div>

</div><!-- // .columns -->
</div><!-- // .container -->
</div><!-- // .wrapper -->
</template>

<script>
    import sidebar from './sidebar.vue';
    import calendar from './calendar.vue';
    import members from './members.vue';
    import items from './items.vue';

    export default {

        components: {
            'sidebar': sidebar,
            'calendar': calendar,
            'members': members,
            'items': items,
        },

        data() {
            return {
                selected: 'calendar',
            }
        },

        computed: {
            userCalendars: function() {
                return this.$store.state.userCalendar.data.userCalendars;
            },
        },

        watch: {
            '$route' (to, from) {
                this.selected = this.$route.params.type;
            }
        },

        methods: {
            clickUserCalendar: function(uCalendar) {
                this.$store.commit('setCurrentCalendarId', uCalendar.id);
            }
        },

        created() {
            const calId = localStorage.getItem('currentCalendarId');
            if(calId) {
                this.$store.commit('setCurrentCalendarId', calId);
            }
        },

        mounted() {
            this.selected = this.$route.params.type;
        },

    }
</script>

<style lang="scss" scoped>
    /* empty */
</style>
