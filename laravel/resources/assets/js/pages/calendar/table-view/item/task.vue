<template>
    <span class="item is-task" @click.stop="clickItem($event)">
        <span :class="{'task-done': item.is_done}">
            <input id="item.id" type="checkbox" style="margin-right: 8px" @click.stop="clickDone()" :checked="item.is_done"> 
            <span>
                {{ item.content }}
            </span>
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

    props: [ 'item' ],

    computed: {
        ...mapState('calendar/tableView/item', {
            dragItem: state => state.dnd,
            deleteItem: state => state.remove
        })
    },

    methods: {
        ...mapActions('calendar/tableView/item', {
            prepareUpdateItem: 'update/prepare',
            prepareRemoveItem: 'remove/prepare',
            toggleTaskDone: 'update/toggleTaskDone'
        }),

        clickItem(e) {
            u.clog('clickItem()');
            this.prepareUpdateItem( { event: e, editingItem: this.item } );
            this.prepareRemoveItem( { event: e, deletingItem: this.item } );
        },

        clickDone() {
            this.prepareUpdateItem( { editingItem: this.item } );
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
