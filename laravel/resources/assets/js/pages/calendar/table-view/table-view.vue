<template id="calendar">
<div>
    <black-screen v-if="isBlackScreenShow">
        <div v-show="filteredBody" class="has-text-centered black-screen-loading">
            <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
        </div>
    </black-screen>

    <edit-item-modal v-if="filteredBody && isItemEditing">
        <edit-item-modal-content v-show="isItemEditing"></edit-item-modal-content>
    </edit-item-modal>

    <div :class="['trash', { 'trash-entered': dragItem.enterTrash } ]"
        v-show="dragItem.draggingItem && ! dragItem.isDropped" 
        @dragenter="dragItem.enterTrash = true"
        @dragover="handleDragOver($event)"
        @dragleave="dragItem.enterTrash = false"
        @drop.stop="handleDropInTrash($event)"
        ><span class="icon is-large">
            <i class="fa fa-trash"></i>
        </span>
    </div>

    <div class="panel" :style="isBlackScreenShow ? 'height: 100vh' : ''">
    <table class="table is-bordered">
    <thead v-if="filteredColumns">
        <tr>
            <th :style="style.dayColumnWidth">Date</th>
            <template v-for="(member, memberId) in filteredColumns">
                <th v-show="!showColumns || showColumns.indexOf(memberId) > -1"
                    :style="[{'padding': 0}, columnWidth]"
                    ><header-cell :member="member"></header-cell>
                </th>
            </template>
        </tr>
    </thead>

    <tbody v-if="filteredBody">
        <tr v-for="(day, dayIndex) in filteredBody"
            :class="{
                saturday: getDayIndex(day.date) == 6, 
                sunday: getDayIndex(day.date) == 0
            }"
            >

            <td class="date-styling" :style="style.dayColumnWidth">
                <span style="font-family: Consolas, 'Courier New', Courier, Monaco, monospace;">
                    <!-- // temp :class="[ 'is-pulled-right', { today: isToday(day.date) } ]" -->
                    {{ getDateAndDay(day.date) }}
                </span>
            </td>

            <template v-for="(cellItems, memberId) in day.items">
                <td v-show="!showColumns || showColumns.indexOf(memberId) > -1"
                    :style="[columnWidth, dragItem.enterCell == ((dayIndex +1) + '-' + memberId) ? dragEnter : '']"
                    @click="clickToItemInsert((dayIndex + 1) + '-' + memberId)"
                    @dragenter="handleDragEnter((dayIndex +1) + '-' + memberId)"
                    @dragover="handleDragOver($event)"
                    @drop.stop="handleDrop($event, cellItems)"
                    >

                    <!-- Show cellItems -->
                    <div v-for="(item, cellItemsIndex) in cellItems"
                        style="cursor: move"
                        :style="[dragItem.draggingItem == item ? dragItem.style.dragStart : '']"
                        draggable="true"
                        @dragstart="handleDragStart(
                            (dayIndex +1) + '-' + memberId,
                            cellItems, 
                            item, 
                            cellItemsIndex, 
                            $event
                        )"
                        @dragend="handleDragEnd()"
                        >
                        
                        <template v-if="isEventItemShow && item.type_id === 1">
                            <span class="item is-event" @click.stop="editItem(item)">
                                <strong v-show="item.start_time" style="margin-right: 8px">
                                    {{ item.start_time | timeFormatter }}
                                </strong> {{ item.content }}
                                <span class="icon is-small" 
                                    v-show="(dragItem.isLoading || deleteItem.isLoading) && dragItem.draggingItem == item"
                                    ><i class="fa fa-refresh fa-spin"></i>
                                </span>
                            </span>
                        </template>

                        <template v-if="isTaskItemShow && item.type_id === 2">
                            <span class="item is-task">
                                <input type="checkbox" style="margin-right: 8px" @click.stop=""> 
                                <span @click.stop="editItem(item) && alert('foo')">
                                    {{ item.content }}
                                </span>
                                <span class="icon is-small" 
                                    v-show="(dragItem.isLoading || deleteItem.isLoading) 
                                                        && dragItem.draggingItem === item"
                                    ><i class="fa fa-refresh fa-spin"></i>
                                </span>
                            </span>
                        </template>

                    </div><!-- // v-for -->

                    <!-- show an input field -->
                    <item-insert-field 
                        v-if="insertingCellTo == (dayIndex + 1) + '-' + memberId"
                        :memberId="memberId"
                        :dayIndex="dayIndex"
                        :cellItems="cellItems"
                    ></item-insert-field>
                </td>
            </template>
        </tr>
    </tbody>
    </table>
    </div><!-- // .panel -->

</div><!-- // root -->
</template>

<script>
    import { mapState } from 'vuex';
    import timeFormatter from '../../../filters/time-formatter.js';
    import dateUtilities from '../../../mixins/date-utilities.js';
    import itemService from '../../../services/item.js'; 
    import dndService from '../../../services/table-item-dnd.js';
    import blackScreen from '../../../components/black-screen.vue';
    import editItemModal from '../../../components/modal.vue';
    import editItemModalContent from './modal/edit-item-content.vue';
    import headerCell from './table-header-cell.vue';
    import itemInsertField from './item-insert-field.vue';

    export default {
        name: 'table-view-content',

        components: {
            'black-screen': blackScreen,
            'edit-item-modal': editItemModal,
            'edit-item-modal-content': editItemModalContent,
            'header-cell': headerCell,
            'item-insert-field': itemInsertField,
        },

        mixins: [
            itemService, dndService, dateUtilities, timeFormatter
        ],

        props: {
            filteredColumns:    { type: Object,     required: false }, 
            filteredBody:       { type: Array,      required: false }, 
            isBlackScreenShow:  { type: Boolean,    required: false },
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
            }
        },

        computed: {
            ...mapState({
                isItemEditing: state => state.calendar.behavior.item.isEditing,
                isEventItemShow: state => state.calendar.behavior.isEventItemShow,
                isTaskItemShow: state => state.calendar.behavior.isTaskItemShow,
                insertingCellTo: state => state.calendar.behavior.item.insertingCellTo,
                theme: state => state.app.theme,
            }),

            showColumns: function() {
                return this.$store.getters.showMembers;
            },

            columnWidth: function() {
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
        },

        methods: {
            editItem(item) {
                u.clog('editItem()');
                item.oldValue = item.content;
                const payload = {
                    isEditing: !this.isItemEditing,
                    editingItem: item
                };
                this.$store.commit('toggleItemEditing', payload);
            },

            clickToItemInsert(cell) {
                this.$store.commit('toggleItemInserting', { 
                    isInserting: true, 
                    insertingCellTo: cell 
                });
                //this.addItem.isLoading = false;
                //this.addItem.cellTo = cell;
            },
        },
    }
</script>

<style lang="scss" scoped>
    .black-screen-loading {
        position: absolute;
        top: 5%;
        left: 50%;
        transform: translateX(-50%);
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
    .trash {
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
    }
    .trash-entered {
        background-color: #ff6060 !important;
        border-color: red !important;
        color: #fff;
    }
</style>
