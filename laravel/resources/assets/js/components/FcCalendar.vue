<template>
    <section style="margin: 20px;">

        <nuts-search-box></nuts-search-box>

        <nuts-members-modal-button emit="open-members-modal" v-show="!isSearching">
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
    import eventApi from '../mixins/eventApi.js';

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

            // api-fetch-calendar
            this.$root.$on('api-fetch-calendar', function(response) {
                self.calendar = response.data.days;
                self.members = response.data.members;
            }),

            // api-fetch-events
            this.$root.$on('api-fetch-events', function(response) {
                var storiesReady = response.data.map(function(item) {
                    item.is_row_hover = false;
                    return item;
                });
                self.events = storiesReady;
                self.events.sort(function (a,b) {
                    if(a.date < b.date) return -1;
                    if(a.date > b.date) return 1;
                })
            });

//            // api-insert-event
//            this.$root.$on('api-insert-event', function(response, dayIndex, id) {
//                console.log('Inserted!');
//                self.calendar[dayIndex].events[id].push(response.data);
//                self.$emit('nuts-alert', 'Inserted!','is-success');
//                console.log('Inserted!');
//            });

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
