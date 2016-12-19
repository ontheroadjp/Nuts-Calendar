<template>
    <div>
        <nuts-members-modal name="members-modal" :is_close_btn="false">
            <nuts-member-tabs></nuts-member-tabs>
        </nuts-members-modal>

        <section style="margin: 20px;">

            <nuts-search-box v-show="!isInsertMode"></nuts-search-box>

            <nuts-members-modal-button emit="open-members-modal" v-show="!isSearching && !isInsertMode">
                Add New Member
            </nuts-members-modal-button>

            <components :is='currentView'></components>

        </section>
    </div>
</template>

<script>
    // componennt
    import fcCalendarTableView from './FcCalendarTableView.vue';
    import fcEventListView from './FcEventListView.vue';
    import nutsSearchBox from '../nuts-vue-components/NutsSearchBox.vue';

    import nutsButton from '../nuts-vue-components/NutsButton.vue';
    import nutsModal from '../nuts-vue-components/NutsModal.vue';
    import fcMemberTabs from './FcMemberTabs.vue';

    // mixin
    import eventApi from '../mixins/EventApi.js';

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
            var now = new Date();
            return {
                currentYear: now.getFullYear(),
                currentMonth: now.getMonth() + 1,
                calendar: [],
                members: [],
                events: [],
                isInsertMode: false,
                searchQuery: ''
            }
        },

        computed: {
            currentView: function() {
                return !this.isSearching ? 'table-view' : 'event-list-view';
            },

            isSearching: function() {
                return this.searchQuery != '';
            },
        },

        watch: {
            'calendar': {
                handler: function(new_val, old_val) {
                    console.log('fire: calendar_fetched');
                    this.$root.$emit('calendar_fetched', this.currentYear, this.currentMonth, this.calendar)
                },
                deep: true
            },

            'members': {
                handler: function(new_val, old_val) {
                    console.log('fire: members_fetched');
                    this.$root.$emit('members_fetched', this.currentYear, this.currentMonth, this.members)
                },
                deep: true
            },

            'events': {
                handler: function(new_val, old_val) {
                    console.log('fire: events_fetched');
                    this.$root.$emit('events_fetched', this.currentYear, this.currentMonth, this.events)

                },
                deep: true
            },

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
        },

        created() {
            const self = this;

            // main-menu-calendar
            this.$root.$on('main-menu-calendar', function() {
                self.searchQuery = '';
                self.isInsertMode = false;
            });

            // main-menu-add-event
            this.$root.$on('main-menu-add-event', function() {
                self.searchQuery = '';
                self.isInsertMode = true;
            });

            // api-fetch-data
            this.$root.$on('api-fetch-data', function(response) {
                self.calendar = response.data.days;
                self.members = response.data.members;

                var modifiedEvents = response.data.events.map(function(item) {
                    item.is_row_hover = false;
                    return item;
                });
                self.events = modifiedEvents;

                self.events.sort(function (a,b) {
                    if(a.date < b.date) return -1;
                    if(a.date > b.date) return 1;
                });
            }),

            // ym-change
            this.$root.$on('ym-change', function(year, month) {
                console.log('listen@Calendar - ym-change (' + year + ', ' + month + ')');
                self.currentYear = year;
                self.currentMonth = month;
            });

        },

        ready() {
            this.fetchData(this.currentYear, this.currentMonth);
        },


    }
</script>

<style>
    
</style>
