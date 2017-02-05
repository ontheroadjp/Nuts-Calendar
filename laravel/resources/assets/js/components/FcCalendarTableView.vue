<template id="calendar">
<div class="panel">
<table :class="[ 'table', 'is-bordered']">

    <thead v-if="displayTableHeader">
        <tr>
            <th :style="dayColumnWidth">Date</th>
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
            </th>
        </tr>
    </thead>

    <tbody v-if="displayTableBody">
        <tr
            v-for="(dayIndex, day) in $store.state.calendar"
            :class="{
                saturday: getDayIndex(day.date) == 6, 
                sunday: getDayIndex(day.date) == 0
            }"
        >
            <td class="date-styling" :style="dayColumnWidth">

                <span>{{ getDayString(day.date) }}</span>

                <span style="width: 32px; text-align: center;" :class="[ 'is-pulled-right', { today: isToday(day.date) } ]">
                    {{ parseInt(day.date.substr(-2)) }}
                </span>

            </td>

            <!-- 
                NOTE: cellItemsRoopIndex = member_id
            -->
            <td
                v-for="(cellItemsRoopIndex, cellItems) in day.events"
                :style="[columnWidth, dragItemEnterCell == ((dayIndex +1) + '-' + cellItemsRoopIndex) ? dragEnter : '']"
                @click="beInserting((dayIndex + 1) + '-' + cellItemsRoopIndex)"
                @dragEnter="handleDragEnter((dayIndex +1) + '-' + cellItemsRoopIndex)"
                @dragOver="handleDragOver($event)"
                @drop="handleDrop($event, cellItems)"
            >

                <!-- ({{ cellItemsRoopIndex }}) -->

                <!-- Show cellItems -->
                <div
                    v-for="(itemIndex, item) in cellItems"
                    class="form-inline"
                    @mouseout="item.is_hover = false"
                >

                    <span
                        v-show="!item.editing"
                        style="cursor: move"
                        :style="[draggingItem == item ? dragStart : '']"
                        draggable="true"
                        @mouseover="item.is_hover = true"
                        @dragStart="handleDragStart(cellItems, item, itemIndex, $event)"
                        @dragEnd="handleDragEnd()"
                    >

                        <!-- show item content -->
                        <span 
                            v-if="item.content" 
                            class="item"
                            @click.stop="beEditing(item)" 
                        >
                            {{ item.content }}
                        </span>

                        <!-- show icons -->
<!--
                        <span v-show="item.is_hover">
                            <button class="fa fa-pencil"></button>
                            <button
                                class="fa fa-trash"
                                @click="$store.dispatch('deleteItem', {
                                    'members': cellItems, 
                                    'event': item, 
                                    'index': itemIndex
                                })"
                            ></button>
                        </span>
-->
                    </span>

                    <!-- editing -->
                    <template v-if="item.editing">
                        <input
                            type="text"
                            class="input"
                            v-model="item.content"
                            v-focus
                            @blur="$store.dispatch('updateItem', {'item': item})"
                            @keyup.enter="$store.dispatch('updateItem', {'item':item})"
                        >
                    </template>

                </div><!-- // Show cellItems -->

                <!-- show an input field -->
                <template v-if="insertingItemCell == (dayIndex + 1) + '-' + cellItemsRoopIndex">
                    <input
                       type="text"
                       class="input"
                       placeholder="New Event here.."
                       v-model="newItemContent"
                       v-focus
                       @blur="letsInsert(
                           dayIndex + 1, 
                           cellItemsRoopIndex, 
                           newItemContent,
                           cellItems
                       )"
                       @keyup.enter="letsInsert(
                           dayIndex + 1, 
                           cellItemsRoopIndex, 
                           newItemContent,
                           cellItems
                       )"
                   >
                </template>

            </td>
        </tr>
    </tbody>

</table>
</div>
</template>

<script>

    // directives
    import focus from '../directives/NutsFocus.js';

    // mixins
    import dateUtilities from '../mixins/DateUtilities.js'

    export default {

        directives: {
            focus
        },

        mixins: [
            dateUtilities
        ],

        props: [
            'name', 'header', 'body'
        ],

        data() {

            return {
                insertingItemCell: '',
                newItemContent: '',
                dayColumnWidth: {
                    'width': '10%',
                    'min-width': '120px'
                },
                dragStart: {
                    opacity: '0.4'
                },
                dragEnter: {
                    border: '3px solid red'
                },

                draggingItem: '',
                draggingItemIndex: '',
                draggingItemFrom: '',
                dragItemEnterCell: '',

            }

        },

        computed: {
            displayTableHeader: function() {
                if(this.header == null) return true

                if(this.header == "false") return false
                return true;
            },

            displayTableBody: function() {
                if(this.body == null) return true

                if(this.body == "false") return false
                return true;
            },

            columnWidth: function() {
                var length = Object.keys(this.$store.state.members).length;
                return {
                    width: (100 - parseInt(this.dayColumnWidth.width)) / length + '%'
                }
            },

        },

        methods: {

            handleDragStart(cellItems, item, itemIndex, e) {
                this.draggingItemFrom = cellItems;
                this.draggingItem = item;
                this.draggingItemIndex = itemIndex;
                item.is_hover = false;
            },

            handleDragEnter(cell) {
                this.dragItemEnterCell = cell;
            },

            handleDragOver(e) {
                if (e.preventDefault) {
                    e.preventDefault();
                }

                e.dataTransfer.dropEffect = 'move'

                return false;
            },

            handleDrop(e, cellItems) {
                if (e.stopPropagation) {
                    e.stopPropagation();
                }

                this.$store.dispatch('moveItem', {
                    'draggingItemFrom': this.draggingItemFrom,
                    'memberEvents': cellItems,
                    'item': this.draggingItem,
                    'itemIndex': this.draggingItemIndex,
                    'day': this.dragItemEnterCell.split('-')[0],
                    'memberId': this.dragItemEnterCell.split('-')[1],
                });

                this.initDraggingProperties();

                return false;
            },

            handleDragEnd() {
                this.initDraggingProperties();
            },

            initDraggingProperties() {
                this.draggingItem = '';
                this.draggingItemIndex = '';
                this.draggingItemFrom = '';
                this.dragItemEnterCell = '';
            },

            clickTableHeader(index) {
                this.$store.commit('setMembersModalIsActive', true);
                this.$store.commit('setMembersModalSelectedTab', index);
            },

            // Insert: select
            beInserting(cell) {
                this.insertingItemCell = cell;
            },

            // Insert: update
            letsInsert: function (day, memberId, content, cellItems) {

                this.insertingItemCell = '';

                if( ! this.newItemContent ) return

                var year = this.$parent.currentYear;
                var month = this.$parent.currentMonth;
                var date = year + '-' + month + '-' + ("0" + day).slice(-2);

                this.$store.dispatch('insertItem', {
                    'day': day,
                    'memberId': memberId,
                    'content': content,
                    'cellItems': cellItems
                });

                this.newItemContent = '';

            },

            // Edit: select
            beEditing(item) {
                item.oldValue = item.content;
                item.editing = true;
            },

            deleteItem(cellItems, item, itemIndex) {
                this.$store.dispatch('deleteItem', {
                    'cellItems': cellItems, 
                    'item': item, 
                    'itemIndex': itemIndex
                })
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

    .date-styling {
        font-size: 1.6em;
        font-weight: bold;
    }
    .today {
        background: red;
        color: #fff;
        border-radius: 20px;
    }
    .saturday {
        background: rgba(240, 240, 255, 1);
    }
    .sunday {
        background: rgba(255, 240, 240, 1);
    }

    .item {
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        background-color: rgb(0, 209, 178);
        border-radius: 5px;
        color: #023a31;
        display: -webkit-inline-box;
        display: -ms-inline-flexbox;
        display: inline-flex;
        font-size: 12px;
        height: 24px;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        line-height: 16px;
        padding-left: 10px;
        padding-right: 10px;
        vertical-align: top;
        white-space: nowrap;
        margin-bottom: 5px;
    }

</style>
