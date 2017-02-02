<template id="calendar">
<table
    :class="[ 'table', 'is-bordered', { calendar: this.isInsertMode } ]"
>
    <!-- table header -->
    <thead>
        <tr>
            <th :style="dayColumnWidth">Date</th>
            <th :style="dayColumnWidth"></th>
            <th
                v-for="member in $store.state.members"
                data-toggle="modal"
                data-target="#nuts-modal"
                :style="columnWidth"
                @click="clickTableHeader(member.id)"
                    @mouseover="member.is_hover = true"
                    @mouseout="member.is_hover = false"
            >
                <span>{{ member.name }}</span>
<!--
                <span v-show="member.is_hover" class="icon is-small">
                    <button @click.stop="$store.commit('columnLeftShift', $index)">
                        <i class="fa fa-caret-left"></i>
                    </button>
                </span>
                <span v-show="member.is_hover" class="icon is-small">
                    <button @click.stop="$store.commit('columnRightShift', $index)">
                        <i class="fa fa-caret-right"></i>
                    </button>
                </span>
-->            
            </th>
        </tr>
    </thead>

    <!-- table body -->
    <tbody>
        <tr
            v-for="(dayIndex, day) in $store.state.calendar"
            :class="{
                saturday: getDayIndex(day.date) == 6, 
                sunday: getDayIndex(day.date) == 0
            }"
        >
            <td class="has-text-left date-styling">
                {{ getDayString(day.date) }}
            </td>

            <td>
                <span :class="[
                    'has-text-right', 
                    'date-styling', 
                    { today: isToday(day.date) }
                ]">
                    {{ parseInt(day.date.substr(-2)) }}
                </span>
            </td>

            <td
                v-for="(memberColumnIndex, memberColumn) in day.events"
                @click="this.beInserting(
                    (this.dayIndex + 1) 
                    + '-' 
                    + this.memberColumnIndex
                )"
            >
            <!-- ({{ memberColumnIndex }}) -->

                <div
                    v-for="(eventIndex, event) in memberColumn"
                    class="form-inline"
                    @mouseout="event.is_hover = false"
                >

                    <!-- VIEW MODE -->
                    <span
                        v-show="!event.editing"
                        @mouseover="event.is_hover = true"
                    >

                        <span 
                            v-if="event.content" 
                            @click="beEditing(event)" 
                            class="tag"
                        >
                            {{ event.content }}
                        </span>

                        <span v-show="event.is_hover && !isInsertMode">
                            <button
                                class="fa fa-pencil"
                                @click="$store.dispatch('deleteEvent', {
                                    'members': memberColumn, 
                                    'event': event, 
                                    'index': eventIndex
                                })"
                            ></button>
                            <button
                                class="fa fa-trash"
                                @click="$store.dispatch('deleteEvent', {
                                    'members': memberColumn, 
                                    'event': event, 
                                    'index': eventIndex
                                })"
                            ></button>
                        </span>

                    </span><!-- // VIEW MODE -->

                    <!-- EDIT MODE -->
                    <template v-if="event.editing">
                        <input
                            type="text"
                            class="input"
                            @blur="$store.dispatch('editUpdateEvent', {'event': event})"
                            @keyup.enter="$store.dispatch('editUpdateEvent', {'event':event})"
                            v-model="event.content"
                            v-if="!isInsertMode"
                            v-focus
                        >

                        <span v-else>
                            {{ event.content }}
                        </span>
                    </template>

                </div><!-- // event roop -->

                <!-- INSERT MODE -->
                <template v-if="
                    (this.dayIndex + 1) + '-' + this.memberColumnIndex == this.insertingCellAddress
                ">

                    <div class="form-inline">
                        <input
                            type="text"
                            class="form-control"
                            v-model="newEventContent"
                            placeholder="New Event here.."
                            @blur="letsInsert(
                                this.dayIndex + 1, 
                                this.memberColumnIndex, 
                                this.newEventContent,
                                this.memberColumn
                            )"
                            @keyup.enter="letsInsert(
                                this.dayIndex + 1, 
                                this.memberColumnIndex, 
                                this.newEventContent,
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
    import dateUtilities from '../mixins/DateUtilities.js'

    export default {

        mixins: [
            dateUtilities
        ],

        data() {

            return {
                insertingCellAddress: '',
                newEventContent: '',
                dayColumnWidth: {
                    width: '6%'
                },
            }

        },

        computed: {

            columnWidth: function() {
                var length = Object.keys(this.$store.state.members).length;
                return {
                    width: (100 - parseInt(this.dayColumnWidth.width)) / length + '%'
                }
            },

            isInsertMode: function() {
                return this.$parent.isInsertMode;
            },

        },

        methods: {

            clickTableHeader(index) {
                this.$store.commit('setMembersModalIsActive', true);
                this.$store.commit('setMembersModalSelectedTab', index);
            },

            // Insert: select
            beInserting(cell) {
                if( this.isInsertMode ) {
                    this.insertingCellAddress = cell;
                }
            },

            // Insert: update
            letsInsert: function (day, member_id, content, memberColumn) {

                this.insertingCellAddress = '';

                if( ! this.newEventContent ) return

                var year = this.$parent.currentYear;
                var month = this.$parent.currentMonth;
                var date = year + '-' + month + '-' + ("0" + day).slice(-2);

                //this.insertEvent(date, member_id, content, memberColumn);
                this.$store.dispatch('insertEvent', {
                    'day': day,
                    'member_id': member_id,
                    'content': content,
                    'memberColumn': memberColumn
                });

                this.newEventContent = '';

            },

            // Edit: select
            beEditing(event) {
                if( !this.isInsertMode ) {
                    event.oldValue = event.content;
                    event.editing = true;
                }
            },
        },

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
