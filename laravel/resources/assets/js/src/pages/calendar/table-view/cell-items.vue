<template>
    <td v-show="!showColumns || showColumns.indexOf(memberId) > -1"
        :style="[ columnWidth,
            dragItem.enterCell.cellAddress
                == getCellAddress(getRowIndex(day.date), memberId)
                ? dragEnterStyle : ''
        ]"
        @click="clickCell(dayIndex, memberId, cellItems)"
        @dragenter="handleDragEnter(day.date, memberId, cellItems)"
        @dragover="handleDragOver($event)"
        @drop.stop="handleDrop()"
        >

        {{ memberId }}

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
            v-if="addItem.enterCell.dayIndex === dayIndex
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
        day:         { type: Object, required: true },
        dayIndex:    { type: Number, required: true },
        cellItems:   { type: Array, required: true },
        memberId:    { type: [Number, String], required: true },
        columnWidth: { type: Object, required: true }
    },

    computed: {
        ...mapState({
            theme: state => state.app.theme
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
            getRowIndex: 'getRowIndex'
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
