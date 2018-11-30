<template>
    <span class="item is-task">
        <span class="icon is-small"
            v-show="item.memo"
            style="margin-right: 5px"
            ><i class="fa fa-file-text-o"></i>
        </span>

        <input id="item.id"
            type="checkbox"
            style="margin-right: 8px; margin-top: 3px"
            @click.stop="clickDone()"
            :checked="item.is_done">

        <span :class="{'task-done': item.is_done}">
            <span :style="searchHighlightStyle">{{ item.content }}</span>
        </span>

        <span class="icon is-small"
            v-show="((dragItem.isLoading || deleteItem.isLoading )
                        && dragItem.draggingItem === item)
                    || (updateItem.isLoading && updateItem.editingItem === item)"
            ><i class="fa fa-refresh fa-spin"></i>
        </span>

    </span>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {

    props: [ 'cellItems', 'item', 'isLoading' ],

    computed: {
        ...mapState('calendar/tableView/item', {
            dragItem: state => state.dnd,
            updateItem: state => state.update,
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
            updatePrepare: 'update/prepare',
            toggleTaskDone: 'update/toggleTaskDone'
        }),

        clickDone() {
            this.updatePrepare( { cellItems: this.cellItems, editingItem: this.item } );
            this.toggleTaskDone({ item: this.item });
        }
    }
}
</script>

<style lang="scss" scoped>
.is-task {
    margin-bottom: 2px;
    padding: 5px;
    background-color: rgb(240, 240, 240);
}

.task-done {
    text-decoration: line-through;
}
</style>
