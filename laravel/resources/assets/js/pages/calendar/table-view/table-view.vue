<template id="calendar">
<div>
<edit-column-modal :is-active="modal.editColumn.isActive">
    <edit-column-modal-content 
        :is-active.sync="modal.editColumn.isActive" 
        :member-id.sync="modal.editColumn.editingColumnId"
    ></edit-column-modal-content>
</edit-column-modal>

<edit-item-modal :is-active="modal.editItem.isActive">
    <edit-item-modal-content 
        :is-active.sync="modal.editItem.isActive" 
        :item.sync="modal.editItem.editingItem"
    ></edit-item-modal-content>
</edit-item-modal>

<div  :class="{'trash-entered': dragItem.enterTrash}"
    style="
        position: fixed;
        top: 60px;
        right: 60px;
        width: 150px;
        height: 150px;
        padding: 50px;
        border: 2px dotted #bdbdbd;
        border-radius: 4px;
        z-index: 999999;
        background: rgba(240, 240, 240, 0.8);
    " 
    v-show="dragItem.draggingItem && ! dragItem.isDropped" 
    @dragEnter="dragItem.enterTrash = true"
    @dragOver="handleDragOver($event)"
    @dragLeave="dragItem.enterTrash = false"
    @drop="handleDropInTrash($event)"
>
    <span class="icon is-large">
        <i class="fa fa-trash"></i>
    </span>
</div>

<div class="panel">
<table id="{{ id }}" class="table is-bordered">

    <thead v-if="display === '' || display === 'header'">
        <tr>
            <th :style="style.dayColumnWidth">Date</th>
<!--
            <th v-for="member in $store.state.calendar.data.members"
                :style="columnWidth"
                @click="clickTableHeader(member.id)"
                @mouseover="member.is_hover = true"
                @mouseout="member.is_hover = false"
            ><span>{{ member.name }}</span>
            </th>
-->
            <th v-for="member in $store.state.calendar.data.members"
                :style="columnWidth"
                @click="openEditColumnModal(member.id)"
                @mouseover="member.is_hover = true"
                @mouseout="member.is_hover = false"
            ><span>{{ member.name }}</span>
            </th>
        </tr>
    </thead>

    <tbody v-if="display === '' || display === 'body'">
        <tr v-for="(dayIndex, day) in filteredCalendar"
            :class="{
                saturday: getDayIndex(day.date) == 6, 
                sunday: getDayIndex(day.date) == 0
            }"
        >
            <td class="date-styling" :style="style.dayColumnWidth">
                <span>{{ getDayString(day.date) }}</span>
                <span style="width: 32px; text-align: center;" 
                    :class="[ 'is-pulled-right', { today: isToday(day.date) } ]"
                >{{ parseInt(day.date.substr(-2)) }}
                </span>
            </td>

            <!-- NOTE: cellItemsLoopIndex = member_id -->
            <!-- NOTE: cellItems = items in a cell -->
            <td v-for="(memberId, cellItems) in day.events"
                :style="[columnWidth, dragItem.enterCell == ((dayIndex +1) + '-' + memberId) ? dragEnter : '']"
                @click="clickToItemInsert((dayIndex + 1) + '-' + memberId)"
                @dragEnter="handleDragEnter((dayIndex +1) + '-' + memberId)"
                @dragOver="handleDragOver($event)"
                @drop="handleDrop($event, cellItems)"
            >

                <!-- Show cellItems -->
                <div v-for="(cellItemsIndex, item) in cellItems"
                    class="form-inline"
                    @mouseout="item.is_hover = false"
                >
                    <span v-show="!item.editing"
                        style="cursor: move"
                        :style="[dragItem.draggingItem == item ? dragItem.style.dragStart : '']"
                        draggable="true"
                        @mouseover="item.is_hover = true"
                        @dragStart="handleDragStart(cellItems, item, cellItemsIndex, $event)"
                        @dragEnd="handleDragEnd()"
                    >
                        <!-- show item content -->
                        <span v-if="item.content" 
                            class="item"
                            @click.stop="openEditItemModal(item)" 
                        >{{ item.content }}
                            <span class="icon is-small" 
                                v-show="(dragItem.isUpdating || deleteItem.isDeleting) && dragItem.draggingItem == item"
                            >
                                <i class="fa fa-refresh fa-spin"></i>
                            </span>
                        </span>
                    </span>
                </div><!-- // Show cellItems -->

                <!-- show an input field -->
                <template v-if="addItem.cellTo == (dayIndex + 1) + '-' + memberId">
                    <input type="text"
                           class="input"
                           placeholder="New Event here.."
                           v-model="addItem.newItemContent"
                           v-focus
                           style=" border: none;
                                   box-shadow: none;
                                   border-bottom: 2px dotted red;
                                   border-radius: 0px;
                           "
                    >
                    <a  class="button is-small"
                        v-show="!addItem.isInserting"
                        @click.stop="insertItem(memberId, dayIndex + 1, cellItems)"
                        @blur="insertItem(memberId, dayIndex + 1, cellItems)"
                        >add
                    </a>

                    <a  class="button is-small" 
                        v-show="addItem.isInserting"
                    ><span class="icon is-small">
                        <i class="fa fa-refresh fa-spin"></i>
                     </span>
                    </a>

                    <a class="button is-small" @click.stop="addItem.cellTo = ''">
                        cancel
                    </a>
                </template>
            </td>
        </tr>
    </tbody>

</table>
</div><!-- // .panel -->
</div>
</template>

<script>
    import focus from '../../../directives/form-focus.js';
    import dateUtilities from '../../../mixins/date-utilities.js';
    import itemApi from '../../../services/item.js'; 
    import editColumnModalBase from '../../../components/modal.vue';
    import editColumnModalContent from './modal/editColumnContent.vue';
    import editItemModalBase from '../../../components/modal.vue';
    import editItemModalContent from './modal/editItemContent.vue';

    export default {
        components: {
            'edit-column-modal': editColumnModalBase,
            'edit-item-modal': editItemModalBase,
            'edit-column-modal-content': editColumnModalContent,
            'edit-item-modal-content': editItemModalContent,
        },

        directives: {
            focus
        },

        mixins: [
            itemApi, dateUtilities
        ],

        props: [
//            'id', 'display', 'fixed', 'filteredCalendar'
            'id', 'display', 'filteredCalendar'
        ],

        data() {
            return {
                style: {
                    dayColumnWidth: {
                        'width': '10%',
                        'min-width': '100px',
                        'max-width': '100px'
                    },
                },

                modal: {
                    editItem: {
                        isActive: false,
                        editingItem: null,
                    },
                    editColumn: {
                        isActive: false,
                        editingColumnId: '',
                    },
                },

                dragItem: {
                    isUpdating: false,
                    draggingItem: '',
                    enterCell: '',
                    enterTrash: false,
                    cellItemsFrom: '',
                    cellItemsIndex: '',
                    isDropped: false,
                    style: {
                        dragStart: {
                            opacity: '0.4'
                        }
                    }
                },
            }
        },

        computed: {
            columnWidth: function() {
                var length = Object.keys(this.$store.state.calendar.data.members).length;
                return {
                    width: (100 - parseInt(this.style.dayColumnWidth.width)) / length + '%',
                    minWidth: '120px',
                }
            },

            dragEnter: function() {
                return { 
                    border: '2px solid ' + this.theme.secondary.code,
                }
            },

            theme: function() {
                return this.$store.state.app.theme;
            }
        },

        methods: {
            handleDragStart(cellItems, item, cellItemsIndex, e) {
                this.dragItem.cellItemsFrom = cellItems;
                this.dragItem.draggingItem = item;
                this.dragItem.cellItemsIndex = cellItemsIndex;
                item.is_hover = false;
            },

            handleDragEnter(cell) {
                this.dragItem.enterCell = cell;
            },

            handleDragOver(e) {
                if (e.preventDefault) {
                    e.preventDefault();
                }

                e.dataTransfer.dropEffect = 'move'

                return false;
            },

            handleDrop(e, cellItems) {
                u.clog('handleDrop()');
                this.dragItem.isUpdating = true;
                this.dragItem.isDropped = true;
                if (e.stopPropagation) {
                    e.stopPropagation();
                }

                this.moveItem({
                    'cellItemsFrom': this.dragItem.cellItemsFrom,
                    'cellItemsTo': cellItems,
                    'item': this.dragItem.draggingItem,
                    'cellItemsIndex': this.dragItem.cellItemsIndex,
                    'day': this.dragItem.enterCell.split('-')[0],
                    'member_id': this.dragItem.enterCell.split('-')[1],
                });
            },

            handleDropInTrash(e) {
                u.clog('handleDropInTrash()');
                this.deleteItem.isDeleting = true;
                this.dragItem.isDropped = true;
                if (e.stopPropagation) {
                    e.stopPropagation();
                }

                this.removeItem(
                    this.dragItem.cellItemsFrom, 
                    this.dragItem.draggingItem, 
                    this.dragItem.cellItemsIndex
                );
            },

            handleDragEnd() {
                this.initDraggingProperties();
            },

            initDraggingProperties() {
                this.dragItem.draggingItem = '';
                this.dragItem.cellItemsIndex = '';
                this.dragItem.cellItemsFrom = '';
                this.dragItem.enterCell = '';
                this.dragItem.isDropped = false;
            },

            // ------------------------------------------------------------------------

            clickTableHeader(index) {
                this.$store.commit('setMembersModalIsActive', true);
                this.$store.commit('setMembersModalSelectedTab', index);
            },

            // Insert
            clickToItemInsert(cell) {
                //this.addItem.isInserting = false;
                this.addItem.cellTo = cell;
            },

            // modal( column )
            openEditColumnModal(memberId) {
                u.clog('openEditColumnModal()');
                //column.oldValue = column.content;
                this.modal.editColumn.isActive = true;
                this.modal.editColumn.editingColumnId = memberId;
            },

            // modal( item )
            openEditItemModal(item) {
                u.clog('openEditItemModal()');
                item.oldValue = item.content;
                this.modal.editItem.isActive = true;
                this.modal.editItem.editingItem = item;
            },
        },
    }
</script>

<style lang="sass">
    table.calendar tbody td {
        color: #ccc;
    }
    table.calendar tbody tr:hover th {
        background-color: #eee;
    }
    table.calendar:hover tbody tr:hover td {
        color: #666;
        background-color: rgba(145, 235, 250, 0.1);
    }
    table.calendar:hover tbody:hover td:hover {
        opacity: 1;
        background-color: rgba(145, 235, 250, 0.5);
    }

    .date-styling {
        font-size: 1.0em;
        font-weight: bold;
    }
    .today {
        background-color: red;
        color: #fff;
        border-radius: 20px;
    }
    .saturday {
        background-color: rgba(240, 240, 255, 1);
    }
    .sunday {
        background-color: rgba(255, 240, 240, 1);
    }
    .item {
        align-items: center;
        background-color: rgba(0, 209, 178, 0.3);
        border: 1px solid rgb(0, 209, 178);
        border-radius: 3px;
        color: #023a31;
        display: -webkit-inline-box;
        display: -ms-inline-flexbox;
        display: inline-flex;
        font-size: 12px;
        justify-content: center;
        padding-left: 10px;
        padding-right: 10px;
        vertical-align: top;
        margin-bottom: 5px;
        line-height: 2em;
    }
    .trash-entered {
        background-color: #ff6060 !important;
        border-color: red !important;
        color: #fff;
    }
</style>
