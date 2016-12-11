<template id="calendar">
<div class="row">
<div class="col-md-12">
<div class="panel panel-default">

    <!-- table -->
    <table
        class="table table-striped"
        :class="{ calendar: this.is_insert_mode }"
    >

    <!-- table header -->
    <thead>
        <tr>
            <th>Date</th>
            <th
                v-for="member in members"
                data-toggle="modal"
                data-target="#nuts-modal"
            >{{ member.name }}</th>
        </tr>
    </thead>

    <!-- table body -->
    <tbody>
        <tr
            class="day-{{ day_index + 1 }}"
            v-for="(day_index, day) in calendar"
        >
            <td>{{ day.date }}</td>
            <td
                class="day-{{ day_index + 1 }}-{{ member_index }}"
                v-for="(member_index, members) in day.events"
                @click="doInsert('day-' + (this.day_index + 1) + '-' + this.member_index)"
            >

                <template v-if="'day-{{ day_index + 1 }}-{{ member_index }}' == this.inserting_cell">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="New Event here.."
                        v-focus
                    >
                    <button class="glyphicon glyphicon-remove"></button>
                    <button class="glyphicon glyphicon-floppy-disk"></button>
                </template>

                <div
                    v-for="(event_index, event) in members"
                    class="form-inline"
                    @mouseout="event.is_hover = false"
                >

                    <!-- VIEW MODE -->
                    <span
                        v-show="!event.editing"
                        @mouseover="event.is_hover = true"
                    >

                        <span @click="doEdit(event)">
                            {{ event.content }}
                        </span>

                        <span v-show="event.is_hover && !is_insert_mode">
                            <button
                                class=" glyphicon glyphicon-trash"
                                @click="deleteEvent(members, event, event_index)"
                            ></button>
                        </span>

                    </span><!-- // VIEW MODE -->

                    <!-- EDIT MODE -->
                    <span v-show="event.editing">

                        <span v-show="is_insert_mode">
                            {{ event.content }}
                        </span>

                        <template v-if="!is_insert_mode && event.editing" >
                            <input
                                type="text"
                                class="form-control"
                                @blur="this.editUpdate(event)"
                                v-model="event.content"
                                v-focus
                            >
                        </template>

                    </span><!-- // EDIT MODE -->

                </div><!-- // event roop -->

                <!-- INSERT MODE -->
                <template v-if="'day-' + (this.day_index + 1) + '-' + this.member_index == this.inserting_cell">
                    <div class="form-inline">
                        <input
                            type="text"
                            class="form-control"
                            placeholder="New Event here.."
                            v-focus
                        >
                        <button class="glyphicon glyphicon-floppy-disk"></button>
                    </div>
                </template><!-- // INSERT MODE -->

            </td>
        </tr>
    </tbody>
    </table>

</div><!-- // .panel -->
</div><!-- // col-md-12 -->
</div><!-- // .row -->
</template>

<script>
    //var Vue = require('vue');
    //Vue.use(VueResource); 
    var now = new Date();
    export default {

        data() {
            return {
                calendar: [],
                members: [],
                //shared: root_data,
                year: now.getFullYear(),
                month: now.getMonth() + 1,
                is_insert_mode: false,
                inserting_cell: '',
            }
        },

        methods: {

            // Fetch
            fetchCalendar() {
                this.$http({
                    url: '/api/calendar/' + this.year + '/' + this.month,
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

            // Insert: click
            doInsert(cell) {
                if( this.is_insert_mode ) {
                    this.inserting_cell = cell;
                }
            },

            // Edit: select
            doEdit(event) {
                if( !this.is_insert_mode ) {
                    event.editing = true;
                }
            },

            // Edit: update
            editUpdate(event) {
                var url = '/api/event/' + event.id;
                Vue.http.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content');
                this.$http({
                    url: url,
                    method: 'PATCH',
                    body: event
                }).then(
                    function(response) {
                        console.log('updated!');
                        event.editing = false;
                        $("button").prop('disabled', false);
                    }, function(response) {
                        alert('error');
                    }
                )
            },

            // Edit: cancel
            editCancel() {
                this.is_hover = false;
                this.editing = false;
            },

            // Delete
            deleteEvent(members, event, index) {
                var url = '/api/event/' + event.id;
                Vue.http.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content')
                this.$http({
                    url: url,
                    method: 'DELETE',
                }).then(
                    function(response) {
                        console.log('success: delete event (id:event.id)');
                        members.splice(index, 1);
                    }, function(response) {
                        alert('error');
                    }
                )
            },

        },

        watch: {
            'year': {
                handler: function(new_val, old_val) {
                    this.fetchCalendar()
                },
                deep: true
            },

            'month': {
                handler: function(new_val, old_val) {
                    this.fetchCalendar()
                },
                deep: true
            }
        },

        created() {
            const self = this;

            nutsBus.$on('ym-change', function(year, month) {
                console.log('nuts-ym-field: ' + year + ':' + month);
                self.year = year;
                self.month = month;
            });

            nutsBus.$on('nuts-change-table-mode', function(is_on) {
                console.log(is_on);
                self.is_insert_mode = is_on;
            });
        },

        ready() {
            this.fetchCalendar();
        }
    }
</script>

<style>
    table.calendar tbody td {
        color: #ccc;
    }
    table.calendar tbody tr:hover th {
        background: #eee;
    }
    table.calendar:hover tbody tr:hover td {
        color: #666;
        background: rgba(145, 235, 250, 0.1);
    }
    table.calendar:hover tbody:hover td:hover {
        opacity: 1;
        background: rgba(145, 235, 250, 0.5);
    }
</style>

