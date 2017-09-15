<template>
<span>
    <button :class="[ 'button', { off: !isEventItemShow } ]" 
            @click="clickEventItemButton()"
            :disabled="disabled">
        <i v-show="isEventItemShow" class="fa fa-bell-o"></i>
        <i v-show="!isEventItemShow" class="fa fa-bell-slash-o"></i>
        <span class="thin">Event</span>
    </button>

    <button :class="['button', { off: !isTaskItemShow }]" 
            :disabled="disabled"
            @click="clickTaskItemButton()">
        <i v-show="isTaskItemShow" class="fa fa-bell-o"></i>
        <i v-show="!isTaskItemShow" class="fa fa-bell-slash-o"></i>
        <span class="thin">Task</span>
    </button>
</span>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    props: {
        disabled: { type: Boolean, default: false }
    },

    computed: {
        ...mapState('calendar/tableView/toolPalette', {
            isEventItemShow: state => state.isEventItemShow,
            isTaskItemShow: state => state.isTaskItemShow
        })
    },

    methods: {
        ...mapActions('calendar/tableView/toolPalette', {
            toggleShowHideEventItem: 'toggleShowHideEventItem',
            toggleShowHideTaskItem: 'toggleShowHideTaskItem',
        }),

        clickEventItemButton() {
            this.toggleShowHideEventItem({ value: !this.isEventItemShow });
        },

        clickTaskItemButton() {
            this.toggleShowHideTaskItem({ value: !this.isTaskItemShow });
        }
    }
} 
</script>

<style lang="scss" scoped>
.button.off {
    background-color: #f0f0f0;
}
</style>
