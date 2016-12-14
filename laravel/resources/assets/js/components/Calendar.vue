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
            <th :style="first_column_width">Date</th>
            <th
                v-for="member in $parent.members"
                data-toggle="modal"
                data-target="#nuts-modal"
                :style="column_width"
                @click="clickHeader($index + 1)"
            >{{ member.name }}</th>
        </tr>
    </thead>

    <!-- table body -->
    <tbody>
        <tr
            class="day-{{ day_index + 1 }}"
            v-for="(day_index, day) in $parent.calendar"
        >
            <td>{{ day.date }}</td>
            <td
                class="day-{{ day_index + 1 }}-{{ member_index }}"
                v-for="(member_index, members) in day.events"
                @click="this.beInserting('day-' + (this.day_index + 1) + '-' + this.member_index)"
            >

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

                        <span @click="beEditing(event)">
                            {{ event.content }}
                        </span>

                        <span v-show="event.is_hover && !is_insert_mode">
                            <button
                                class=" glyphicon glyphicon-trash"
                                @click="$root.deleteEvent(members, event, event_index)"
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
                                @blur="$root.editUpdateEvent(event)"
                                @keyup.enter="$root.editUpdateEvent(event)"
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
                            v-model="new_event_content"
                            placeholder="New Event here.."
                            @blur="insertEvent(
                                this.year, 
                                this.month, 
                                this.day_index, 
                                this.member_index, 
                                this.new_event_content
                            )"
                            @keyup.enter="insertEvent(
                                this.year, 
                                this.month, 
                                this.day_index, 
                                this.member_index, 
                                this.new_event_content
                            )"
                            v-focus
                        >
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
    var now = new Date();
    export default {

        data() {
            return {
                year: now.getFullYear(),
                month: now.getMonth() + 1,
                is_insert_mode: false,
                inserting_cell: '',
                new_event_content: '',
                first_column_width: {
                    width: '5%'
                }
            }
        },

        computed: {
            column_width: function() {
                var length = Object.keys(this.$parent.members).length;
                return {
                    width: (100 - parseInt(this.first_column_width.width)) / length + '%'
                }
            },
        },

        methods: {

            // Insert: select
            beInserting(cell) {
                if( this.is_insert_mode ) {
                    this.inserting_cell = cell;
                }
            },

            // Insert: select
            insertEvent: function (year, month, day_index, id, content) {


                if( this.new_event_content ) {
                    this.$root.insertEvent(year, month, day_index, id, content);
                    this.new_event_content = '';
                }

                this.inserting_cell = '';
            },

            // Edit: select
            beEditing(event) {
                if( !this.is_insert_mode ) {
                    event.oldValue = event.content;
                    event.editing = true;
                }
            },

            clickHeader(index) {
                this.$root.$emit('member_tab_selected', index);
                this.$root.$emit('open-members-modal', index);
            }
        },

        watch: {
            'year': {
                handler: function(new_val, old_val) {
                    this.$parent.fetchData(this.year, this.month)
                },
                deep: true
            },

            'month': {
                handler: function(new_val, old_val) {
                    this.$parent.fetchData(this.year, this.month)
                },
                deep: true
            }
        },

        created() {
            const self = this;

            this.$root.$on('ym-change', function(year, month) {
                console.log('$on@Calendar - ym-change (' + year + ', ' + month + ')');
                self.year = year;
                self.month = month;
            });

            this.$root.$on('nuts-change-table-mode', function(is_on) {
                console.log('$on@Calendar - nuts-change-table-mode (' + is_on + ')');
                self.is_insert_mode = is_on;
            });
        },

        ready() {
            this.$parent.fetchData(this.year, this.month);
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

