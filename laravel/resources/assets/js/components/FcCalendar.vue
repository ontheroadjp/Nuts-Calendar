<template>
    <section style="margin: 20px;">

        <nuts-search-box v-show="!isInsertMode"></nuts-search-box>

        <nuts-members-modal-button emit="open-members-modal" v-show="!isSearching && !isInsertMode">
            Add Member
        </nuts-members-modal-button>

        <components :is='currentView'></components>

    </section>
</template>

<script>
    // componennt
    import fcCalendarTableView from './FcCalendarTableView.vue';
    import fcEventListView from './FcEventListView.vue';
    import nutsSearchBox from '../nuts-vue-components/NutsSearchBox.vue';
    import nutsButton from '../nuts-vue-components/NutsButton.vue';

    // mixin
    import eventApi from '../mixins/EventApi.js';

    export default {
        components: {
            'table-view': fcCalendarTableView,
            'event-list-view': fcEventListView,
            'nuts-search-box': nutsSearchBox,
            'nuts-members-modal-button': nutsButton,
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
                //insertingCell: '',
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
                    this.$emit('calendar_fetched', this.currentYear, this.currentMonth)
                },
                deep: true
            },

            'members': {
                handler: function(new_val, old_val) {
                    console.log('fire: members_fetched');
                    this.$emit('members_fetched', this.currentYear, this.currentMonth)
                },
                deep: true
            },

            'events': {
                handler: function(new_val, old_val) {
                    console.log('fire: events_fetched');
                    this.$emit('events_fetched', this.currentYear, this.currentMonth)

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

            // nuts-select-main-menu
            this.$root.$on('nuts-select-main-menu', function(index) {
                self.searchQuery = '';
                index == 0 ? self.isInsertMode = false : self.isInsertMode = true;
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
