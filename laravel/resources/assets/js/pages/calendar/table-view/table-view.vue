<template id="calendar">
<div>
    <black-screen v-if="isBlackScreenShow">
        <div v-show="filteredBody" class="has-text-centered black-screen-loading">
            <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
        </div>
    </black-screen>

    <item-modal v-if="filteredBody && isItemModalActive">
        <item-modal-content v-show="isItemModalActive"></item-modal-content>
    </item-modal>

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
                    :style="[columnWidth, dragItem.enterCell.cellAddress == ((dayIndex +1) + '-' + memberId) ? dragEnter : '']"
                    @click="prepareAddItem(dayIndex, memberId, cellItems)"
                    @dragenter="handleDragEnter(
                        (dayIndex +1) + '-' + memberId,
                        dayIndex,
                        memberId
                    )"
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
                            dayIndex,
                            memberId,
                            cellItems, 
                            cellItemsIndex, 
                            item, 
                            $event
                        )"
                        @dragend="handleDragEnd()"
                        >
                        
                        <template v-if="isEventItemShow && item.type_id === 1">
                            <span class="item is-event" @click.stop="prepareClickItem(cellItems, item)">
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
                                <span @click.stop="prepareClickItem(cellItems, item) && alert('foo')">
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
                        v-if="addItem.enterCell.dayIndex === dayIndex 
                                && addItem.enterCell.memberId === memberId"
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
    import { mapState, mapGetters } from 'vuex';
    import timeFormatter from '../../../filters/time-formatter.js';
    import dateUtilities from '../../../mixins/date-utilities.js';
    import itemDndService from '../../../services/item/item-dnd.vue'; 
    import blackScreen from '../../../components/black-screen.vue';
    import itemModal from '../../../components/modal.vue';
    import itemModalContent from './modal/item-modal-content.vue';
    import headerCell from './table-header-cell.vue';
    import itemInsertField from './item-insert-field.vue';

    export default {
        name: 'table-view-content',

        components: {
            'black-screen': blackScreen,
            'item-modal': itemModal,
            'item-modal-content': itemModalContent,
            'header-cell': headerCell,
            'item-insert-field': itemInsertField,
        },

        mixins: [ itemDndService, dateUtilities, timeFormatter ],

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
                isEventItemShow: state => state.calendar.behavior.isEventItemShow,
                isTaskItemShow: state => state.calendar.behavior.isTaskItemShow,
                addItem: state => state.calendar.behavior.item.addItem,
                editItem: state => state.calendar.behavior.item.editItem,
                deleteItem: state => state.calendar.behavior.item.deleteItem,
                dragItem: state => state.calendar.behavior.item.dragItem,
                theme: state => state.app.theme,
            }),

            ...mapGetters({
                isItemModalActive: 'isItemModalActive',
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
            prepareAddItem(dayIndex, memberId, cellItems) {
                u.clog('prepareAddItem()');
                this.$store.commit('prepareAddItem', { dayIndex, memberId, cellItems }); 
            },

            prepareClickItem(cellItems, item) {
                u.clog('prepareClickItem()');
                item.oldValue = item.content;
                this.$store.commit('prepareEditItem', { editingItem: item });
                this.$store.commit('prepareRemoveItem', { cellItems: cellItems, deletingItem: item });
            },

            handleDragStart(cellAddress, dayIndex, memberId, cellItems, cellItemsIndex, draggingItem, e) {
                this.$store.commit('dragStart', { 
                    fromCellAddress: cellAddress, 
                    fromDayIndex: dayIndex, 
                    fromMemberId: memberId, 
                    fromCellItems: cellItems, 
                    fromCellItemsIndex: cellItemsIndex, 
                    draggingItem : draggingItem
                });
            },
    
            handleDragEnter(cellAddress, dayIndex, memberId) {
                this.$store.commit('dragEnter', { 
                    toCellAddress: cellAddress, 
                    toDayIndex: dayIndex, 
                    toMemberId: memberId
               });
            },
    
            handleDragOver(e) {
                if (e.preventDefault) {
                    e.preventDefault();
                }
    
                e.dataTransfer.dropEffect = 'move'
    
                return false;
            },
    
            handleDrop(e, cellItems) {
                const from = this.dragItem.fromCell.cellAddress;
                const to = this.dragItem.enterCell.cellAddress;
                if( from === to ) {
                    this.$store.commit('finishDragItem');
                    return;
                }
    
                this.$store.commit('dragDrop', { toCellItems: cellItems });
                this.moveItem();
            },
    
            handleDropInTrash(e) {
    //            this.deleteItem.isLoading = true;
    //            this.dragItem.isInTrash = true;
    //
    //            this.removeItem(
    //                this.dragItem.fromCell.cellItems, 
    //                this.dragItem.fromCell.cellItemsIndex,
    //                this.dragItem.draggingItem, 
    //            );
            },
    
            handleDragEnd() {
                if( !this.dragItem.isLoading ) {
                    this.$store.commit('dragEnd');
                }
            },
        }
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
