<template id="calendar">
<table
    class="table"
    :class="{ calendar: this.isInsertMode }"
>

    <!-- table header -->
    <thead>
        <tr>
            <th :style="date_column_width">Date</th>
            <th :style="date_column_width"></th>
            <th
                v-for="member in $parent.members"
                data-toggle="modal"
                data-target="#nuts-modal"
                :style="column_width"
                @click="clickTableHeader($index + 1)"
            >{{ member.name }}</th>
        </tr>
    </thead>

    <!-- table body -->
    <tbody>
        <tr
            v-for="(day_index, day) in $parent.calendar"
            :class="{saturday: getDayIndex(day.date) == 6, sunday: getDayIndex(day.date) == 0}"
        >
            <td class="has-text-left date-styling">{{ getDayString(day.date) }}</td>

            <td>
                <span :class="[has-text-right, dateStyling, { today: isToday(day.date) }]">
                    {{ day.date.substr(-2) }}
                </span>
            </td>

            <td
                class="day-{{ day_index + 1 }}-{{ memberColumnIndex }}"
                v-for="(memberColumnIndex, memberColumn) in day.events"
                @click="this.beInserting('day-' + (this.day_index + 1) + '-' + this.memberColumnIndex)"
            >

                <div
                    v-for="(event_index, event) in memberColumn"
                    class="form-inline"
                    @mouseout="event.is_hover = false"
                >

                    <!-- VIEW MODE -->
                    <span
                        v-show="!event.editing"
                        @mouseover="event.is_hover = true"
                    >

                    <!-- <span v-if="event.content" class="label label-primary" @click="beEditing(event)"> -->
                    <span v-if="event.content" @click="beEditing(event)">
                            {{ event.content }}
                        </span>

                        <span v-show="event.is_hover && !isInsertMode">
                            <button
                                class="fa fa-trash"
                                @click="deleteEvent(memberColumn, event, event_index)"
                            ></button>
                        </span>

                    </span><!-- // VIEW MODE -->

                    <!-- EDIT MODE -->
                    <span v-show="event.editing">

                        <span v-show="isInsertMode">
                            {{ event.content }}
                        </span>

                        <template v-if="!isInsertMode && event.editing" >
                            <input
                                type="text"
                                class="form-control"
                                @blur="editUpdateEvent(event)"
                                @keyup.enter="editUpdateEvent(event)"
                                v-model="event.content"
                                v-focus
                            >
                        </template>

                    </span><!-- // EDIT MODE -->

                </div><!-- // event roop -->

                <!-- INSERT MODE -->
                <template v-if="'day-' + (this.day_index + 1) + '-' + this.memberColumnIndex == this.inserting_cell">
                    <div class="form-inline">
                        <input
                            type="text"
                            class="form-control"
                            v-model="new_event_content"
                            placeholder="New Event here.."
                            @blur="letsInsert(
                                this.day_index + 1, 
                                this.memberColumnIndex, 
                                this.new_event_content,
                                this.memberColumn
                            )"
                            @keyup.enter="letsInsert(
                                this.day_index + 1, 
                                this.memberColumnIndex, 
                                this.new_event_content,
                                this.memberColumn
                            )"
                            v-focus
                        >
                    </div>
                </template><!-- // INSERT MODE -->

            </td>
        </tr>
    </tbody>
</table>
</template>

<script>
    import dateMixin from '../mixins/date.js'
    import eventApi from '../mixins/EventApi.js'

    export default {

        mixins: [
            eventApi, dateMixin
        ],

        data() {
            return {
                isInsertMode: false,
                inserting_cell: '',
                new_event_content: '',
                date_column_width: {
                    width: '6%'
                },
                dateStyling: 'date-styling',
                hasTextRight: 'has-text-right',
                todayStyling: 'today',
            }
        },

        computed: {
            column_width: function() {
                var length = Object.keys(this.$parent.members).length;
                return {
                    width: (100 - parseInt(this.date_column_width.width)) / length + '%'
                }
            },
        },

        methods: {
            // Insert: select
            beInserting(cell) {
                if( this.isInsertMode ) {
                    this.inserting_cell = cell;
                }
            },

            // Insert: update
            letsInsert: function (day, member_id, content, memberColumn) {

                if( this.new_event_content ) {
                    var year = this.$parent.currentYear;
                    var month = this.$parent.currentMonth;
                    var date = year + '-' + month + '-' + ("0" + day).slice(-2);

                    this.insertEvent(date, member_id, content, memberColumn);

                    this.$nextTick(function() {
                        this.new_event_content = '';
                    });
                }

                this.inserting_cell = '';
            },

            // Edit: select
            beEditing(event) {
                if( !this.isInsertMode ) {
                    event.oldValue = event.content;
                    event.editing = true;
                }
            },

            clickTableHeader(index) {
                this.$parent.$emit('open-members-modal', index);
            }
        },

        created() {
            const self = this;
            this.$root.$on('nuts-select-main-menu', function(index) {
                index == 0 ? self.isInsertMode = false : self.isInsertMode = true;
            });
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
