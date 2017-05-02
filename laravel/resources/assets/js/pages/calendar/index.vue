<template>
    <div id="calendar">
    
        <nuts-members-modal name="members-modal">
            <nuts-member-tabs></nuts-member-tabs>
        </nuts-members-modal>
    
        <signboard 
            :is-loading-calendar-api="isLoading.calendarApi"
            :is-tool-palette-open.sync="isToolPaletteOpen"
        ></signboard>
    
        <router-view 
            :is-loading-calendar-api="isLoading.calendarApi"
            :is-tool-palette-open.sync="isToolPaletteOpen"
        ></router-view>
    
    </div>
</template>

<script>
    import signboard from './signboard/index.vue';
    import calendarApi from '../../services/calendar.js';

    import nutsModal from '../../nuts-vue-components/NutsModal.vue';
    import fcMemberTabs from '../../components/FcMemberTabs.vue';

    export default {
        components: {
            'signboard': signboard,
            'nuts-members-modal': nutsModal,
            'nuts-member-tabs': fcMemberTabs,
        },

        mixins: [
            calendarApi,
        ],

        data() {
            return {
                isToolPaletteOpen: false,
            }
        },

        computed: {
            currentCalendarId: function() {
                return this.$store.state.calendar.currentId;
            },

            currentYear: function() {
                return this.$store.state.calendar.currentYear;
            },

            currentMonth: function() {
                return this.$store.state.calendar.currentMonth;
            },

            newColumnKey: function() {
                return this.$store.getters.newColumnKey;
            }
        },

        watch: {
            'currentCalendarId': {
                handler: function(new_val, old_val) {
                    if( old_val === '') return;
                    u.clog('watch: currentCalendarId');
                    this.fetchCalendar(this.currentCalendarId);
                },
                deep: true
            },

            'currentYear': {
                handler: function(new_val, old_val) {
                    u.clog('watch: currentYear');
                    this.fetchCalendar(this.currentCalendarId);
                },
                deep: true
            },

            'currentMonth': {
                handler: function(new_val, old_val) {
                    u.clog('watch: currentMonth');
                    this.fetchCalendar(this.currentCalendarId);
                },
                deep: true
            }
        }
    }
</script>
