<template id="calendar">
<div>
    <black-screen v-if="isBlackScreenShow">
        <div v-show="filteredBody" class="has-text-centered black-screen-loading">
            <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
        </div>
    </black-screen>

    <column-modal v-if="filteredBody && isColumnModalActive"></column-modal>
    <item-modal v-if="filteredBody && isItemModalActive"></item-modal>

<!--
    <div :class="['trash', { 'trash-entered': dragItem.enterTrash } ]"
        v-show="dragItem.draggingItem && ! dragItem.isDropped" 
        @dragenter="dragItem.enterTrash = true"
        @dragover="handleDragOver($event)"
        @dragleave="dragItem.enterTrash = false"
        @drop.stop="handleDropInTrash()"
        ><span class="icon is-large">
            <i class="fa fa-trash"></i>
        </span>
    </div>
-->

    <div class="panel" :style="isBlackScreenShow ? 'height: 100vh' : ''">
    <table class="table is-bordered"
        style="width: 100%;"
        :style="isFixed ? style.table : ''"
    >
    <thead v-if="filteredColumns">
        <tr>
            <th style="padding: 0.4rem 1rem"
                :style="[style.dayColumnWidth, textColor]"
            >Date</th>
            <template v-for="(member, memberId) in filteredColumns">
                <th v-show="!showColumns || showColumns.indexOf(memberId) > -1"
                    style="padding: 0.4rem 1rem"
                    :style="[columnWidth, textColor]"
                    >
                    <!-- <header-cell :member="member"></header-cell> -->
                    <!-- <span @click="clickHeader(member)">{{ member.name }}({{ member.id}})</span> -->
                    <span>{{ member.name }}({{ member.id}})</span>
                </th>
            </template>
        </tr>
    </thead>

    <tbody v-if="filteredBody">
        <tr v-for="(day, dayIndex) in filteredBody"
            :class="{ saturday: isSaturday(day.date), sunday: isSunday(day.date) }"
            >

            <td class="date-styling" :style="[style.dayColumnWidth]">
                <span>
                    <!-- // temp :class="[ 'is-pulled-right', { today: isToday(day.date) } ]" -->
                    {{ getDateAndDay(day.date) }}
                </span>
            </td>

            <template v-for="(cellItems, memberId) in day.items">
                <td v-show="!showColumns || showColumns.indexOf(memberId) > -1"
                    :style="[
                        columnWidth, 
                        dragItem.enterCell.cellAddress 
                            == getCellAddress(getRowIndex(day.date), memberId) 
                            ? dragEnterStyle : ''
                    ]"
                    @click="clickCell(dayIndex, memberId)"
                    @dragenter="handleDragEnter(day.date, memberId)"
                    @dragover="handleDragOver($event)"
                    @drop.stop="handleDrop()"
                    >

                    <div v-for="(item, itemIndex) in cellItems"
                        style="cursor: move"
                        :style="[dragItem.draggingItem == item ? dragItem.style.dragStart : '']"
                        draggable="true"
                        @dragstart="handleDragStart(item)"
                        @dragend="handleDragEnd()"
                        >

                        <item 
                            :isEventItem="isEventItem" 
                            :isTaskItem="isTaskItem" 
                            :item="item"
                        ></item>

                    </div><!-- // v-for -->

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

    <mini-cal-bar v-if="filteredBody"></mini-cal-bar>

</div><!-- // root -->
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex';
    import dateUtilities from '../../../mixins/date-utilities.js';
    import blackScreen from '../../../components/black-screen.vue';
    import columnModal from './modal/column-modal.vue';
    import itemModal from './modal/item-modal.vue';
    import item from './item/index.vue';
//    import headerCell from './table-header-cell.vue';
    import itemInsertField from './item-insert-field.vue';
    import miniCalBar from './footer-bar/mini-cal-bar.vue';
    import chroma from 'chroma-js';

    export default {
        name: 'table-view-content',

        components: {
            'black-screen': blackScreen,
            'column-modal': columnModal,
            'item-modal': itemModal,
            'item': item,
            'item-insert-field': itemInsertField,
//            'header-cell': headerCell,
            'mini-cal-bar': miniCalBar
        },

        mixins: [ dateUtilities ],

        props: {
            filteredColumns:    { type: Object,     required: false }, 
            filteredBody:       { type: Array,      required: false }, 
            isBlackScreenShow:  { type: Boolean,    required: false },
            isFixed:            { type: Boolean,    required: false }
        },

        data() {
            return {
                selectedMiniCalPopper: ''
            }
        },

        computed: {
            ...mapState({
                currentYear: state => state.calendar.currentYear,
                currentMonth: state => state.calendar.currentMonth,
                lang: state => state.app.lang,
                theme: state => state.app.theme
            }),

            ...mapState('calendar/tableView/toolPalette', {
                isEventItem: state => state.isEventItemShow,
                isTaskItem: state => state.isTaskItemShow
            }),

            ...mapState('member', {
                editColumn: state => state.update,
                deleteColumn: state => state.remove
            }),

            ...mapState('calendar/tableView/item', {
                addItem: state => state.insert,
                editItem: state => state.update,
                deleteItem: state => state.remove,
                dragItem: state => state.dnd
            }),

            ...mapGetters({
                showColumns: 'getShowMembers',
                getCellAddress: 'getCellAddress',
                getRowIndex: 'getRowIndex'
            }),

            ...mapGetters('member', {
                isColumnModalActive: 'isModalActive'
            }),

            ...mapGetters('calendar/tableView/item', {
                isItemModalActive: 'isModalActive'
            }),

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
                    minWidth: '206px'
                }
            },

            textColor: function(){
                if(!this.isFixed) return;

                return {
                    color: 'white'
                }
            },

            dragEnterStyle: function() {
                return { 
                    border: '2px solid ' + this.theme.secondary.code
                }
            },

            style: function() {
                return {
                    table: {
                        'background-color': chroma(this.theme.primary.code).alpha(0.7).css('hsl'),
                        'width': '100%'
                    },
                    dayColumnWidth: {
                        'width': '8%',
                        'min-width': '110px',
                        'max-width': '110px'
                    }
                }
            }
        },

        methods: {
            ...mapActions('member', {
                prepareUpdateColumn: 'update/prepare',
                prepareRemoveColumn: 'remove/prepare'
            }),

            ...mapActions('calendar/tableView/item', {
                prepareInsertItem: 'insert/prepare',
                dragStart: 'dnd/dragStart',
                dragEnter: 'dnd/dragEnter',
                dragOver: 'dnd/dragOver',
                drop: 'dnd/drop',
//                dropInTrash: 'dnd/dropInTrash',
                dragEnd: 'dnd/dragEnd'
            }),

//            clickHeader(member) {
//                u.clog('clickHeader()');
//                this.prepareUpdateColumn( { editingMember: member } );
////                this.prepareRemoveColumn( { deletingMemmber: member } );
//            },

            clickCell(dayIndex, memberId) {
                u.clog('clickCell()');
                this.prepareInsertItem( { dayIndex, memberId } );
            },

            handleDragStart(draggingItem) {
                this.dragStart({ draggingItem });
            },
    
            handleDragEnter(dayString, memberId) {
                this.dragEnter({ dayString, memberId });
            },

            handleDragOver(e) {
                this.dragOver({ e });
            },
    
            handleDrop() {
                this.drop();
            },
    
//            handleDropInTrash() {
//                this.dropInTrash();
//            },
    
            handleDragEnd() {
                this.dragEnd();
            }
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
            &:hover td:hover {
                opacity: 1;
                background-color: rgba(145, 235, 250, 0.5);
            }

            & tr:hover td {
                color: #666;
                background-color: rgba(145, 235, 250, 0.1);
            }
        }
    }

    .date-styling {
        font-size: 1em;
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
</style>
