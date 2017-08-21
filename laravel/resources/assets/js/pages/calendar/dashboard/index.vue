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

    <div v-show="currentId === 0">

        <div style="margin-bottom: 20px;">
            <a 
                :class="['button', theme.primary.class]"
                @click="clickNewCalendarButton()"
            >New Calendar</a>
        </div>

        <!-- user calendars -->
        <div class="columns is-multiline">
        <template v-for="value in members">
        <div class="column is-6">
        
            <router-link
                to="/calendar/view"
                class="title is-4" 
                @click.native="clickUserCalendar(value.id)"
            >
                <div 
                    :class="['card', 'is-clickable', theme.primary.class]"
                    @dragenter="handleDragEnter()"
                >
                <div class="card-content">
                <div class="media">
        
                    <div class="media-left">
                        <span class="icon">
                            <i class="fa fa-user-o"></i>
                        </span>
                    </div>
        
                    <div class="media-content">
                        <p style="margin-bottom: 10px;">{{ value.name }}</p>
                        <p class="subtitle is-6">
                            {{ value.description }}
                        </p>

                        <div>Today</div>
                        <div class="columns">
                            <div class="column is-6">
                                <p class="today-schedule">
                                    Schedule:<br>
                                    10:00 MTG w/yamada
                                </p>
                            </div>
                            <div class="column is-6">
                                <p class="today-ToDo">
                                    ToDo:<br>
                                    10:00 MTG w/yamada
                                </p>
                            </div>
                        </div>

                        <div>within 7days</div>
                        <div class="columns">
                            <div class="column is-6">
                                <p class="today-schedule">
                                    Schedule:<br>
                                    12件
                                </p>
                            </div>
                            <div class="column is-6">
                                <p class="today-ToDo">
                                    ToDo:<br>
                                    20件
                                </p>
                            </div>
                        </div>

                        <div 
                            class="icon"
                            style="
                                position: absolute;
                                top: 20px;
                                right: 20px;
                            "
                        ><i class="fa fa-gear"></i></div>
                    </div>
        
                </div><!-- // .media -->
                </div><!-- // .card-content -->
                </div><!-- // .card -->
            </router-link>
        
        </div><!-- // .column is-xx -->
        </template>
        </div><!-- // .columns -->
        <!-- // user calendars -->

    </div>

    <calendar-settings v-show="currentId === 1"></calendar-settings>
    <application-settings v-show="currentId === 2"></application-settings>
    <account-settings v-show="currentId === 3"></account-settings>

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
            userCalendars: state => state.calendar.data.userCalendars,
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
div.card {
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
