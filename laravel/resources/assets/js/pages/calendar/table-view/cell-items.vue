<template>
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

        sortCellItems() {
            this.$store.commit('calendar/tableView/sortCellItems', this.cellItems);
        },

        setItemIndex() {
            this.$store.commit('calendar/tableView/setIndexForItem', this.cellItems);
        },

        checkTime() {
            this.$store.commit('calendar/tableView/checkTime', this.cellItems);
        },

        clickCell(dayIndex, memberId) {
            this.insertPrepare( { dayIndex, memberId } );
        },

        handleDragStart(draggingItem) {
            this.insertReset();
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
            this.sortCellItems();
            this.setItemIndex();
//            this.checkTime();
        },

        handleDragEnd() {
            this.dragEnd();
        }
    },

    mounted() {
        this.sortCellItems();
        this.setItemIndex();
 //       this.checkTime();
    }
} 
</script>
