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
        align-items: center;
        border-radius: 3px;
        display: -webkit-inline-box;
        display: -ms-inline-flexbox;
        display: inline-flex;
        font-size: 12px;
        justify-content: center;
        padding-left: 10px;
        padding-right: 10px;
        vertical-align: top;
        margin-bottom: 5px;
        line-height: 2em;

        &.is-event {
            /* background-color: rgba(0, 209, 178, 0.3); */
            /* border: 1px solid rgb(0, 209, 178); */
            color: #023a31;
        }

        &.is-task {
            background-color: rgb(240, 240, 240);
            /* border: 1px solid #dbdbdb; */
            color: #363636;
        }
    }
</style>
