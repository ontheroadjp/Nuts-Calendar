<template>
    <div>
        <nuts-members-modal name="members-modal">
            <nuts-member-tabs></nuts-member-tabs>
        </nuts-members-modal>

        <section style="margin: 20px;">

            <nuts-members-modal-button 
                emit="open-members-modal" 
                v-show="!isSearching && !isInsertMode"
            >Add New Member</nuts-members-modal-button>

            <nuts-search-box v-show="!isInsertMode"></nuts-search-box>

            <components :is='currentView'></components>

        </section>
    </div>
</template>

<script>
    // core
    import nutsHub from '../NutsHub.js';

    // componennt
    import fcCalendarTableView from './FcCalendarTableView.vue';
    import fcEventListView from './FcEventListView.vue';
    import nutsSearchBox from '../nuts-vue-components/NutsSearchBox.vue';

    import nutsButton from '../nuts-vue-components/NutsButton.vue';
    import nutsModal from '../nuts-vue-components/NutsModal.vue';
    import fcMemberTabs from './FcMemberTabs.vue';

    // mixin
    import eventApi from '../api/EventApi.js';

    export default {

        components: {
            'table-view': fcCalendarTableView,
            'event-list-view': fcEventListView,
            'nuts-search-box': nutsSearchBox,
            'nuts-members-modal-button': nutsButton,
            'nuts-members-modal': nutsModal,
            'nuts-member-tabs': fcMemberTabs,
        },

        mixins: [
            eventApi
        ],

        data() {
            return {
                searchQuery: ''
            }
        },

        computed: {

            currentView: function() {
                return !this.isSearching ? 'table-view' : 'event-list-view';
            },

            currentYear: function() {
                return this.$store.state.currentYear;
            },

            currentMonth: function() {
                return this.$store.state.currentMonth;
            },

            isSearching: function() {
                return this.searchQuery != '';
            },

            isInsertMode: function() {
                return this.$store.state.mainIndex == 1;
            }
        },

        watch: {
            'currentYear': {
                handler: function(new_val, old_val) {
                    this.fetchData(this.currentYear, this.currentMonth)
                },
                deep: true
            },

            'currentMonth': {
                handler: function(new_val, old_val) {
                    this.fetchData(this.currentYear, this.currentMonth)
                },
                deep: true
            },

            'calendar': {
                handler: function(new_val, old_val) {
                    nutsHub.fire(
                        'calendar-updated',
                        {
                            'year': this.currentYear,
                            'month': this.currentMonth,
                            'calendar': this.calendar
                        },
                        'FcCalendar.vue'
                    );
                },
                deep: true
            },

            'members': {
                handler: function(new_val, old_val) {
                    nutsHub.fire(
                        'members-updated',
                        {
                            'year': this.currentYear,
                            'month': this.currentMonth,
                            'members': this.members
                        },
                        'FcCalendar.vue'
                    );
                },
                deep: true
            },

            'events': {
                handler: function(new_val, old_val) {
                    nutsHub.fire(
                        'events-updated',
                        {
                            'year': this.currentYear,
                            'month': this.currentMonth,
                            'members': this.events
                        },
                        'FcCalendar.vue'
                    );

                },
                deep: true
            },

        },

        created() {
            var self = this;

            // api-fetch-data
            nutsHub.listen('api-fetch-data', function(Object) {
                self.$store.commit('setCalendar', Object.response.data.days );
                self.$store.commit('setMembers', Object.response.data.members );

                var modifiedEvents = Object.response.data.events.map(function(item) {
                    item.is_row_hover = false;
                    return item;
                });

                self.events = modifiedEvents;
                self.$store.commit('setEvents', Object.response.data.events );

//                self.events.sort(function (a,b) {
//                    if(a.date < b.date) return -1;
//                    if(a.date > b.date) return 1;
//                });
            }, 'FcCalendar.vue')//,
        },

        ready() {
            this.fetchData(this.currentYear, this.currentMonth);
        },

    }
</script>

<style>
    
</style>
