<template>
    <span>
        <event-item
            v-if="isEventItem && item.type_id === 1"
            :cellItems="cellItems"
            :item="item"
        ></event-item>

        <task-item
            v-if="isTaskItem && item.type_id === 2"
            :cellItems="cellItems"
            :item="item"
        ></task-item>
    </span>
</template>

<script>
import eventItem from './event.vue';
import taskItem from './task.vue';

export default {
    components: {
        eventItem, taskItem
    },

    props: [
        'cellItems', 'isEventItem', 'isTaskItem', 'item'
    ]
}
</script>

<style lang="scss" scoped>
    .item {
        display: inline-flex;
        padding-left: 10px;
        padding-right: 10px;
        border-radius: 3px;
/*        font-size: 12px; */
        font-size: 0.75rem;
        vertical-align: top;
        width: 100%;
    }
</style>
