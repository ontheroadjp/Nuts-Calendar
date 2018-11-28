<template>
<!--
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
-->
        <td :style="[ columnWidth,
            dragItem.enterCell.cellAddress == getCellAddress(getRowIndex(row), memberId)
                ? dragEnterStyle
                : ''
        ]"
        @click="clickCell(getRowIndex(row), memberId, cellItems)"
        @dragenter="handleDragEnter(getRowIndex(row), memberId, cellItems)"
        @dragover="handleDragOver($event)"
        @drop.stop="handleDrop()"
        >
<!--
        {{ getRowIndex(row) }}<br>
        <small>{{ memberId }}</small>
-->
        <div v-show="viewMode === 'dayly' && getRowIndex(row).slice(-2) == 0"
            style="font-size: 0.6rem;" >Monthly Items</div>

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
            v-if="addItem.enterCell.rowIndex === getRowIndex(row)
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

        ...mapState('calendar/tableView/item/insert', {
            insertIsLoading: state => state.isLoading
        }),

        ...mapState('calendar/tableView/item/dnd', {
            fromCellItems: state => state.fromCell.cellItems
        }),

        ...mapGetters({
            showColumns: 'getShowMembers',
            getCellAddress: 'getCellAddress',
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

        getRowIndex(row) {
            const y = ('0000' + row.gregorian_year).slice(-4);
            const m = ('00' + row.gregorian_month).slice(-2);
            if( this.viewMode === 'monthly' ) {
                return y + m + '00';
            } else if( this.viewMode === 'dayly' ) {
                const d = ('00' + row.gregorian_day).slice(-2);
                return y + m + d;
            }
        },

        clickCell(rowIndex, memberId, cellItems) {
            if(!this.insertIsLoading) {
                this.insertPrepare( { rowIndex, memberId, cellItems } );
            }
        },

        handleDragStart(cellItems, draggingItem) {
            this.insertReset();
            this.dragStart({ cellItems, draggingItem });
        },

        handleDragEnter(rowIndex, memberId, cellItems) {
            this.dragEnter({ rowIndex, memberId, cellItems });
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
