<template>
        <td :style="[ columnWidth,
            dragItem.enterCell.cellAddress == getCellAddress(getRowIndex(), memberId)
                ? dragEnterStyle
                : ''
        ]"
        @dblclick="clickCell(getRowIndex(), memberId, cellItems)"
        @dragenter="handleDragEnter(getRowIndex(), memberId, cellItems)"
        @dragover="handleDragOver($event)"
        @drop.stop="handleDrop()"
        >
<!--
        {{ getRowIndex() }}<br>
        <small>{{ memberId }}</small>
-->
        <div v-show="viewMode === 'daily' && getRowIndex().slice(-2) == 0"
            style="font-size: 0.6rem;" >Monthly Items</div>

        <div v-for="(minItem, itemIndex) in cellItems"
            style="cursor: move"
            :style="[dragItem.draggingItem == items[minItem.id] ? dragItem.style.dragStart : '']"
            :draggable="!dragItem.isLoading"
            @dragstart="handleDragStart(cellItems, items[minItem.id])"
            @dragend="handleDragEnd()"
            >

            <item :cellItems="cellItems" :item="items[minItem.id]"></item>

        </div>

        <item-insert-field
            v-if="addItem.enterCell.rowIndex === getRowIndex()
                && addItem.enterCell.memberId === memberId"
        ></item-insert-field>

    </td>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import item from './item/index.vue';
import itemInsertField from './item/insert-field.vue';

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

        ...mapState({
            items: state => state.item.data.items
        }),

//        ...mapState('calendar/tableView/item', {
        ...mapState('item', {
            addItem: state => state.insert,
            dragItem: state => state.dnd
        }),

//        ...mapState('calendar/tableView/item/insert', {
        ...mapState('item/insert', {
            insertIsLoading: state => state.isLoading
        }),

        ...mapGetters({
            showColumns: 'getShowMembers',
            getCellAddress: 'getCellAddress',
        }),

        dragEnterStyle: function() {
            const a = this.dragItem.fromCell.cellAddress;
            const b = this.dragItem.enterCell.cellAddress;
            if(a === b) {
                return { border: '2px dotted gray' }
            } else {
                return { border: '2px solid ' + this.theme.secondary.code }
            }
        }
    },

    methods: {
//        ...mapActions('calendar/tableView/item/insert', {
        ...mapActions('item/insert', {
            insertPrepare: 'prepare',
            insertReset: 'reset'
        }),

//        ...mapActions('calendar/tableView/item/dnd', {
        ...mapActions('item/dnd', {
            dragStart: 'dragStart',
            dragEnter: 'dragEnter',
            dragOver: 'dragOver',
            drop: 'drop',
            dragEnd: 'dragEnd'
        }),

        getRowIndex() {
            const y = ('20' + this.row.gregorian_year).slice(-4);
            const m = ('00' + this.row.gregorian_month).slice(-2);
            if( this.viewMode === 'monthly' ) {
                return y + m + '00';
            } else if( this.viewMode === 'daily' ) {
                const d = ('00' + this.row.gregorian_day).slice(-2);
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
