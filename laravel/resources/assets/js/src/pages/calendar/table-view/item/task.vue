<template>
    <span class="item is-task"
        @click.stop="clickItem($event)">

        <span :class="{'task-done': item.is_done}">
            <input id="item.id"
                type="checkbox"
                style="margin-right: 8px"
                @click.stop="clickDone()"
                :checked="item.is_done">

            <span :style="searchHighlightStyle">{{ item.content }}</span>

            <span class="icon is-small"
                v-show="(dragItem.isLoading || deleteItem.isLoading)
                            && dragItem.draggingItem === item"
                ><i class="fa fa-refresh fa-spin"></i>
            </span>
        </span>
    </span>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {

    props: [ 'cellItems', 'item' ],

    computed: {
        ...mapState('calendar/tableView/item', {
            dragItem: state => state.dnd,
            deleteItem: state => state.remove
        }),

        ...mapState('calendar/tableView/toolPalette', {
            searchQuery: state => (state.query.search).toLowerCase()
        }),

        searchHighlightStyle: function() {
            if( this.searchQuery != ''
                    && this.item.content.toLowerCase().indexOf(this.searchQuery) != -1) {
                return { backgroundColor: '#FFEB3B' }
            }
            return {}
        }
    },

    methods: {
        ...mapActions('calendar/tableView/item', {
            insertReset: 'insert/reset',
            updatePrepare: 'update/prepare',
            updatePrepareModal: 'update/prepareModal',
            removePrepare: 'remove/prepare',
            toggleTaskDone: 'update/toggleTaskDone'
        }),

        clickItem(e) {
            u.clog('clickItem()');
            this.updatePrepare( { cellItems: this.cellItems, editingItem: this.item } );
            this.removePrepare( { cellItems: this.cellItems, deletingItem: this.item } );
            this.updatePrepareModal( { event: e } );
            this.insertReset();
            this.$store.commit('dashboard/SET_VALUE', {
                key: 'disabled', value: true
            });
        },

        clickDone() {
            this.updatePrepare( { cellItems: this.cellItems, editingItem: this.item } );
            this.toggleTaskDone({ item: this.item });
        }
    }
}
</script>

<style lang="scss" scoped>
.task-done {
    text-decoration: line-through;
}
</style>
