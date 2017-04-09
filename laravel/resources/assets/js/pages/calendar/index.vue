<template>
    <div id="calendar">
    
        <nuts-members-modal name="members-modal">
            <nuts-member-tabs></nuts-member-tabs>
        </nuts-members-modal>
    
        <hero 
            :is-loading-calendar-api="isLoading.calendarApi"
            :is-tool-palette-open.sync="isToolPaletteOpen"
        ></hero>
    
        <router-view 
            :is-loading-calendar-api="isLoading.calendarApi"
            :is-tool-palette-open.sync="isToolPaletteOpen"
        ></router-view>
    
    </div>
</template>

<script>

    // componennt
    import hero from './signboard/hero.vue';
    import calendarApi from '../../services/calendar.js';

    import nutsModal from '../../nuts-vue-components/NutsModal.vue';
    import fcMemberTabs from '../../components/FcMemberTabs.vue';

    export default {
        components: {
            'hero': hero,
            'nuts-members-modal': nutsModal,
            'nuts-member-tabs': fcMemberTabs,
        },

        mixins: [
            calendarApi,
        ],

        data() {
            return {
                isToolPaletteOpen: false,
                searchQuery: '',
                dropInTrash: false,
            }
        },

        computed: {
//            tableViewBody: function() {
//                const components = this.$children.filter(function(item, index){
//                    if(item.name == 'tableViewBody') 
//                        return true
//                });
//                return components[0];
//            },

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
            },
        },

    }
</script>

<style>
.trash {
    background: whitesmoke;
    position: absolute;
    right: 0;
    left: 0;
    height: 70px;
    top: 232px;
    text-align: center;
    border-radius: 10px;
    border: 4px dotted;
}
</style>
