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
            <slot></slot>
        </span>

        <span class="icon is-small"
            v-show="(dnd.isLoading && dnd.draggingItem === item)
                    || (update.isLoading && update.editingItem === item)
                    || (remove.isLoading && remove.removingItem === item)
                    || isLoading"
            ><i class="fa fa-refresh fa-spin"></i>
        </span>

    </span>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {

    props: {
        cellItems: { type: Array, required: true },
        item: { type: Object, required: true },
        isLoading: { type: Boolean, default: false }
    },

    computed: {
//        ...mapState('calendar/tableView/item', {
        ...mapState('item', {
            dnd: state => state.dnd,
            update: state => state.update,
            remove: state => state.remove
        }),

        ...mapState('calendar/tableView', {
            toolPalette: state => state.toolPalette
        })
    },

    methods: {
//        ...mapActions('calendar/tableView/item', {
        ...mapActions('item', {
            updatePrepare: 'update/prepare',
            toggleTaskDone: 'update/toggleTaskDone'
        }),

        clickDone() {
            this.updatePrepare({
                cellItems: this.cellItems, editingItem: this.item
            });

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
