<template>
    <!--
    <td :style="[ columnWidth,
            dragItem.enterCell.cellAddress == getCellAddress(getRowIndex(row.date), memberId)
                ? dragEnterStyle
                : ''
        ]"
        @click="clickCell(rowIndex, memberId, cellItems)"
        @dragenter="handleDragEnter(row.date, memberId, cellItems)"
        @dragover="handleDragOver($event)"
        @drop.stop="handleDrop()"
        >
    -->
    <td :style="[ columnWidth,
            dragItem.enterCell.cellAddress == getCellAddress(getRowIndex(row), memberId)
                ? dragEnterStyle
                : ''
        ]"
        @click="clickCell(getRowIndex(row), memberId, cellItems)"
        @dragenter="handleDragEnter(row.date, memberId, cellItems)"
        @dragover="handleDragOver($event)"
        @drop.stop="handleDrop()"
        >
        <div v-for="(item, itemIndex) in cellItems"
            style="cursor: move"
            :style="[dragItem.draggingItem == item ? dragItem.style.dragStart : '']"
            :draggable="!dragItem.isLoading"
            @dragstart="handleDragStart(cellItems, item)"
            @dragend="handleDragEnd()"
            >

            <item
                :cellItems="cellItems"
                :isEventItem="isEventItem"
                :isTaskItem="isTaskItem"
                :item="item"
            ></item>

        </div>

        <item-insert-field
            v-if="addItem.enterCell.dayIndex === getRowIndex(row)
                && addItem.enterCell.memberId === memberId"
        ></item-insert-field>

    </td>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import item from './item/index.vue';
import itemInsertField from './item-insert-field.vue';

export default {
    components: { item, itemInsertField },

    props: {
        row:         { type: Object, required: true },
//        rowIndex:    { type: Number, required: true },
        cellItems:   { type: Array, required: true },
        memberId:    { type: [String], required: true },
        columnWidth: { type: Object, required: true }
    },

    computed: {
        ...mapState({
            theme: state => state.app.theme
        }),

        ...mapState('calendar', {
            viewMode: state => state.viewMode
        }),

        ...mapState('calendar/tableView/toolPalette', {
            isEventItem: state => state.isEventItemShow,
            isTaskItem: state => state.isTaskItemShow
        }),

        ...mapState('calendar/tableView/item', {
            addItem: state => state.insert,
            dragItem: state => state.dnd
        }),

        ...mapState('calendar/tableView/item/dnd', {
            fromCellItems: state => state.fromCell.cellItems
        }),

        ...mapGetters({
            showColumns: 'getShowMembers',
            getCellAddress: 'getCellAddress',
//            getRowIndex: 'getRowIndex'
        }),

        dragEnterStyle: function() {
            return {
                border: '2px solid ' + this.theme.secondary.code
            }
        }
    },

    methods: {
        ...mapActions('calendar/tableView/item/insert', {
            insertPrepare: 'prepare',
            insertReset: 'reset'
        }),

        ...mapActions('calendar/tableView/item/dnd', {
            dragStart: 'dragStart',
            dragEnter: 'dragEnter',
            dragOver: 'dragOver',
            drop: 'drop',
            dragEnd: 'dragEnd'
        }),

//        decidedRowIndex(row) {
//            if('date' in row) {
//                return this.getRowIndex(row.date);
//            }
//            return row.row_index;
//        },

        getRowIndex(row) {
            if( this.viewMode === 'monthly' ) {
                return row.gregorian_yyyymm;
            } else if( this.viewMode === 'dayly' ) {
                return row.gregorian_yyyymmdd;
            }
        },

        clickCell(dayIndex, memberId, cellItems) {
            this.insertPrepare( { dayIndex, memberId, cellItems } );
        },

        handleDragStart(cellItems, draggingItem) {
            this.insertReset();
            this.dragStart({ cellItems, draggingItem });
        },

        handleDragEnter(dayString, memberId, cellItems) {
            this.dragEnter({ dayString, memberId, cellItems });
        },

        handleDragOver(e) {
            this.dragOver({ e });
        },

        handleDrop() {
            this.drop();
        },

        handleDragEnd() {
            this.dragEnd();
        }
    }
};
</script>
