// components
import calendar from './components/Calendar.vue';
import nutsSidebar from './components/NutsSidebar.vue';
import nutsYmSelector from './components/NutsYmSelector.vue';
import nutsButton from './components/NutsButton.vue';
import nutsToggleButton from './components/NutsToggleButton.vue';
import nutsYmField from './components/NutsYmField.vue';
import nutsAlert from './components/NutsAlert.vue';
import nutsModal from './components/NutsModal.vue';
import fcMemberTabs from './components/FcMemberTabs.vue';



// directives
//import nutsFocus from './directives/NutsFocus.vue';

// Event Bus
//var nutsBus = new Vue();

Vue.directive('focus', {
    update: function () {
        console.log('v-focus update!');
        var object = this.el;
        Vue.nextTick(function() {
            object.focus();
        });
    }
});

var vm = new Vue({
    el: '.container',
    components: {
        'calendar': calendar,
        'nuts-sidebar': nutsSidebar,
        'nuts-sidebar-toggle-button': nutsToggleButton,
        'nuts-ym-selector': nutsYmSelector,
        'nuts-table-mode-toggle-button': nutsToggleButton,
        'nuts-ym-field': nutsYmField,
        'nuts-alert': nutsAlert,
        'nuts-members-modal': nutsModal,
        'nuts-members-modal-button': nutsButton,
        'nuts-member-tabs': fcMemberTabs,
    },

    data: {
        calendar: [],
        members: []
    },

    watch: {
        'calendar': {
            handler: function(new_val, old_val) {
                console.log('fire: calendar_fetched');
                this.$emit('calendar_fetched', this.year, this.month)
            },
            deep: true
        },

        'members': {
            handler: function(new_val, old_val) {
                console.log('fire: members_fetched');
                this.$emit('members_fetched', this.year, this.month)
            },
            deep: true
        }
    },

    methods: {

        // Fetch
        fetchData: function (year, month) {
            this.$http({
                url: '/api/calendar/' + year + '/' + month,
                method: 'GET'
            }).then( function(response) {
                //var calendarReady = response.data.days.map(function(item) {
                //    item.editing = false;
                //    return item;
                //})
                //this.calendar = calendarReady;
                this.calendar = response.data.days;
                this.members = response.data.members;
            }, function(response) {

            });
        },

        // -----------------------------------------------------------------------
        // Insert: Update
        insertEvent: function (year, month, day_index, id, content) {

            var day = day_index + 1

            var new_item = {
                'content': content,
                'member_id': id,
                'date': year + '-' + month + '-' + ("0" + day).slice(-2)
            };

            var url = '/api/event';
            Vue.http.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content');
            this.$http({
                url: url,
                method: 'POST',
                body: new_item
            }).then(
                function(response) {
                    this.calendar[day_index].events[id].push(response.data);
                    this.$emit('nuts-alert', 'Inserted!','is-success');
                    console.log('Inserted!');
                }, function(response) {
                    alert('error');
                }
            )
        },

        // Edit: update
        editUpdateEvent: function(event) {
            event.editing = false;
            if(event.content == event.oldValue) {
                event.oldValue = '';
                return
            }

            event.oldValue = '';

            var url = '/api/event/' + event.id;
            Vue.http.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content');
            this.$http({
                url: url,
                method: 'PATCH',
                body: event
            }).then(
                function(response) {
                    console.log('updated!');
                    this.$emit('nuts-alert', 'Updateed!','is-success');
                }, function(response) {
                    alert('error');
                }
            )
        },

        // Delete
        deleteEvent: function(members, event, index) {
            var url = '/api/event/' + event.id;
            Vue.http.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content')
            this.$http({
                url: url,
                method: 'DELETE',
            }).then(
                function(response) {
                    console.log('success: delete event (id:event.id)');
                    members.splice(index, 1);
                    this.$emit('nuts-alert', 'Deletes!','is-success');
                }, function(response) {
                    alert('error');
                }
            )
        },

        // -----------------------------------------------------------------------
        // Insert: Update
        insertMember: function (day, id, content) {

            if( this.new_event_content ) {
                this.calendar[day].events[id].push({
                    'content': this.new_event_content,
                    'editing': false,
                    'is_hover': false
                });

                this.new_event_content = '';
                this.$emit('nuts-alert', 'New Event Added!','is-success');
            }

                this.inserting_cell = '';
        },

        // Delete
        deleteMember: function(members, event, index) {
            var url = '/api/member/' + member.id;
            Vue.http.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content')
            this.$http({
                url: url,
                method: 'DELETE',
            }).then(
                function(response) {
                    console.log('success: delete event (id:event.id)');
                    members.splice(index, 1);
                    this.$emit('nuts-alert', 'Deletes!','is-success');
                }, function(response) {
                    alert('error');
                }
            )
        },
    },
});
