<template id="calendar">
<div>
    <div v-show="isLoadingCalendarApi" class="black-screen">
        <div v-if="filteredBody" 
            class="has-text-centered" 
            style="
                position: absolute;
                top: 5%;
                left: 50%;
                transform: translateX(-50%);
            "><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
        </div>
    </div>

    <div v-if="filteredColumns">
        <delete-column-warning v-show="message.deleteColumnWarning.isActive">
            <delete-column-warning-content
                :is-active.sync="message.deleteColumnWarning.isActive"
                :column-id="message.deleteColumnWarning.columnId"
            ></delete-column-warning-content>
        </delete-column-warning>

        <edit-column-modal v-show="modal.editColumn.isActive">
            <edit-column-modal-content 
                :is-active.sync="modal.editColumn.isActive" 
                :member-id.sync="modal.editColumn.editingColumnId"
            ></edit-column-modal-content>
        </edit-column-modal>
    </div>
        
    <div v-if="filteredBody">
        <edit-item-modal v-show="editItem.isActive">
            <edit-item-modal-content 
                :is-active.sync="editItem.isActive" 
                :item.sync="editItem.editingItem"
            ></edit-item-modal-content>
        </edit-item-modal>
    </div>

<div :class="{'trash-entered': dragItem.enterTrash}"
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

<div class="panel" :style="isLoadingCalendarApi ? 'height: 100vh' : ''">
<table id="{{ id }}" class="table is-bordered">

    <thead v-if="filteredColumns">
        <tr>
            <th :style="style.dayColumnWidth">Date</th>
            <template v-for="(memberId, member) in filteredColumns">
                <th v-show="!showColumns || showColumns.indexOf(memberId) > -1"
                    :style="[{'padding': 0}, columnWidth]"
                >
                    <header-shutter 
                        :text="member.name + '(' + member.id + ')'"
                        :text-style="{ 'padding': '0.5em 0.75em' }"
                        :shutter-style="{ 'padding': '2px' }"
                    >
                        <a class="button" @click.stop="editColumn(member.id)">
                            <span class="icon is-small">
                                <i class="fa fa-pencil"></i>
                            </span>
                        </a>
                    
                        <a class="button" @click="deleteColumn(member.id)">
                            <span class="icon is-small">
                                <i class="fa fa-trash"></i>
                            </span>
                        </a>
                    </header-shutter>
                </th>
            </template>
        </tr>
    </thead>

    <tbody v-if="filteredBody">
        <tr v-for="(dayIndex, day) in filteredBody"
            :class="{
                saturday: getDayIndex(day.date) == 6, 
                sunday: getDayIndex(day.date) == 0
            }"
        >
            <td class="date-styling" :style="style.dayColumnWidth">
                <span style="font-family: Consolas, 'Courier New', Courier, Monaco, monospace;">
                    {{ getDateAndDay(day.date) }}
                </span>
            </td>

<!--
            <td class="date-styling" :style="style.dayColumnWidth">
                <span>{{ getDayString(day.date) }}</span>
                <span style="width: 32px; text-align: center;" 
                    :class="[ 'is-pulled-right', { today: isToday(day.date) } ]"
                >{{ parseInt(day.date.substr(-2)) }}
                </span>
            </td>
-->
            <!-- NOTE: cellItemsLoopIndex = member_id -->
            <!-- NOTE: cellItems = items in a cell -->
            <template v-for="(memberId, cellItems) in day.items">
                <td v-show="!showColumns || showColumns.indexOf(memberId) > -1"
                    :style="[columnWidth, dragItem.enterCell == ((dayIndex +1) + '-' + memberId) ? dragEnter : '']"
                    @click="clickToItemInsert((dayIndex + 1) + '-' + memberId)"
                    @dragEnter="handleDragEnter((dayIndex +1) + '-' + memberId)"
                    @dragOver="handleDragOver($event)"
                    @drop="handleDrop($event, cellItems)"
                >

                    <!-- Show cellItems -->
                    <div v-for="(cellItemsIndex, item) in cellItems"
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
                            <template v-if="isEventShow && item.type_id === 1">
                                <span class="item is-event" @click.stop="editItem(item)">
                                    <strong v-show="item.start_time" style="margin-right: 8px">
                                        {{ item.start_time | timeFormatter }}
                                    </strong> {{ item.content }}
                                    <span class="icon is-small" 
                                        v-show="(dragItem.isLoading || deleteItem.isLoading) && dragItem.draggingItem == item"
                                    >
                                        <i class="fa fa-refresh fa-spin"></i>
                                    </span>
                                </span>
                            </template>

                            <template v-if="isTaskShow && item.type_id === 2">
                                <span class="item is-task">
                                    <input type="checkbox" style="margin-right: 8px" @click.stop=""> 
                                    <span @click.stop="editItem(item)">
                                        {{ item.content }}
                                    </span>
                                    <span class="icon is-small" 
                                        v-show="(dragItem.isLoading || deleteItem.isLoading) && dragItem.draggingItem == item"
                                    >
                                        <i class="fa fa-refresh fa-spin"></i>
                                    </span>
                                </span>
                            </template>

                        </span>
                    </div><!-- // v-for -->

                    <!-- show an input field -->
                    <template v-if="addItem.cellTo == (dayIndex + 1) + '-' + memberId">
                        <input type="text"
                               class="input"
                               placeholder="Content here.."
                               v-model="addItem.newItemContent"
                               v-focus
                               style=" border: none;
                                       box-shadow: none;
                                       border-radius: 0px;
                                       background-color: transparent;
                               "
                        />
                        <a  class="button is-small"
                            v-show="!addItem.isLoading"
                            @click.stop="insertEvent(memberId, dayIndex + 1, cellItems)"
                            @blur="insertEvent(memberId, dayIndex + 1, cellItems)"
                            >Event
                        </a>
    
                        <a  class="button is-small"
                            v-show="!addItem.isLoading"
                            @click.stop="insertTask(memberId, dayIndex + 1, cellItems)"
                            @blur="insertTask(memberId, dayIndex + 1, cellItems)"
                            >Task
                        </a>
    
                        <a  class="button is-small" 
                            v-show="addItem.isLoading"
                            ><span class="icon is-small">
                                <i class="fa fa-refresh fa-spin"></i>
                             </span>
                        </a>
    
                        <a  class="button is-small" 
                            v-show="!addItem.isLoading"
                            @click.stop="resetAddItemFields()" 
                            >cancel
                        </a>
                    </template>
                </td>
            </template>
        </tr>
    </tbody>

</table>
</div><!-- // .panel -->
</div>
</template>

<script>
    import focus from '../../../directives/form-focus.js';
    import timeFormatter from '../../../filters/time-formatter.js';
    import dateUtilities from '../../../mixins/date-utilities.js';
    import headerShutter from '../../../components/shutter.vue';
    import itemService from '../../../services/item.js'; 
    import dndService from '../../../services/table-item-dnd.js';
    import editColumnModal from '../../../components/modal.vue';
    import editColumnModalContent from './modal/edit-column-content.vue';
    import editItemModal from '../../../components/modal.vue';
    import editItemModalContent from './modal/edit-item-content.vue';
    import deleteColumnWarning from '../../../components/message.vue';
    import deleteColumnWarningContent from './message/delete-column-warning.vue';

    export default {
        components: {
            'edit-column-modal': editColumnModal,
            'edit-item-modal': editItemModal,
            'edit-column-modal-content': editColumnModalContent,
            'edit-item-modal-content': editItemModalContent,
            'delete-column-warning': deleteColumnWarning,
            'delete-column-warning-content': deleteColumnWarningContent,
            'header-shutter': headerShutter,
        },

        directives: {
            focus
        },

        mixins: [
            itemService, dndService, dateUtilities, timeFormatter
        ],

        props: {
            id: {
                type: String,
                required: false,
                twoWay: false
            }, 
            filteredColumns: {
                type: Object,
                required: false,
                twoWay: false
            }, 
            filteredBody: {
                type: Array,
                required: false,
                twoWay: false
            }, 
            showColumns: {
                type: Array,
                required: false,
                twoWay: false
            }, 
            isEventShow: {
                type: Boolean,
                required: false,
                twoWay: false
            }, 
            isTaskShow: {
                type: Boolean,
                required: false,
                twoWay: false
            },
            isLoadingCalendarApi: {
                type: Boolean,
                required: false,
                twoWay: false
            }
        },

        data() {
            return {
                style: {
                    dayColumnWidth: {
                        'width': '8%',
                        'min-width': '90px',
                        'max-width': '90px'
                    },
                },

                modal: {
                    editColumn: {
                        isActive: false,
                        editingColumnId: '',
                    },
                },

                message: {
                    deleteColumnWarning: {
                        isActive: false,
                        columnId: '',
                    }
                },
            }
        },

        computed: {
            columnWidth: function() {
                //const length = this.showColumns.length;
                let length = 0;
                if(this.showColumns) {
                    length = this.showColumns.length;
                } else if(this.filteredColumns) {
                    length = Object.keys(this.filteredColumns).length;
                } else {
                    length = Object.keys(this.filteredBody[0].items).length;
                }

                return {
                    width: (100 - parseInt(this.style.dayColumnWidth.width)) / length + '%',
                    minWidth: '170px',
                }
            },

            theme: function() {
                return this.$store.state.app.theme;
            }
        },

        methods: {
            editItem(item) {
                u.clog('editItem()');
                item.oldValue = item.content;
                this.editItem.isActive = true;
                this.editItem.editingItem = item;
            },

            // ------------------------------------------------------------------------

            // Insert item
            clickToItemInsert(cell) {
                //this.addItem.isLoading = false;
                this.addItem.cellTo = cell;
            },

            // edit column (open modal)
            editColumn(memberId) {
                u.clog('editColumn()');
                //column.oldValue = column.content;
                this.modal.editColumn.isActive = true;
                this.modal.editColumn.editingColumnId = memberId;
            },

            // delete column (open warning message)
            deleteColumn(memberId) {
                u.clog('deleteColumn()');
                this.message.deleteColumnWarning.isActive = true;
                this.message.deleteColumnWarning.columnId = memberId;
            },

        },
    }
</script>

<style lang="sass" scoped>
    .black-screen {
        background: rgba(217, 217, 217, 0.75);
        position: absolute;
        min-height: 100%;
        min-width: 100%;
        z-index: 999;
    }

    table.calendar {
        & tbody {
            & td {
                color: #ccc;
            }
            & tr:hover th {
                background-color: #eee;
            }
        }
        &:hover tbody {
            & tr:hover td {
                color: #666;
                background-color: rgba(145, 235, 250, 0.1);
            }
            &:hover td:hover {
                opacity: 1;
                background-color: rgba(145, 235, 250, 0.5);
            }
        }
    }
/*
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
*/
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
        border-radius: 3px;
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
        &.is-event {
            background-color: rgba(0, 209, 178, 0.3);
            border: 1px solid rgb(0, 209, 178);
            color: #023a31;
        }
        &.is-task {
            background-color: rgb(240, 240, 240);
            border: 1px solid #dbdbdb;
            color: #363636;
        }
    }
    .trash-entered {
        background-color: #ff6060 !important;
        border-color: red !important;
        color: #fff;
    }
    .column-fade-transition {
        transition: all .4s ease;
        z-index: 99999;
    }
    .column-fade-enter .column-fade-leave {
        opacity: 0;
    }
</style>
