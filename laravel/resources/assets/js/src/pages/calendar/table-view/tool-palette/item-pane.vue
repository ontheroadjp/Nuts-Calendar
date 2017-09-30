<template>
<span>
    <button :class="[ 'button', { off: !isEventItemShow } ]" 
            @click="clickEventItemButton()"
            :disabled="disabled">
        <i v-show="isEventItemShow" class="fa fa-bell-o"></i>
        <i v-show="!isEventItemShow" class="fa fa-bell-slash-o"></i>
        <span class="thin button-label">Event</span>
    </button>

    <button :class="['button', { off: !isTaskItemShow }]" 
            :disabled="disabled"
            @click="clickTaskItemButton()">
        <i v-show="isTaskItemShow" class="fa fa-bell-o"></i>
        <i v-show="!isTaskItemShow" class="fa fa-bell-slash-o"></i>
        <span class="thin button-label">Task</span>
    </button>

    <button :class="['button', { off: !isEndTimeShow }]"
        :disabled="disabled"
        @click="clickEndTimeButton()">
        <i v-show="isEndTimeShow" class="fa fa-toggle-on"></i>
        <i v-show="!isEndTimeShow" class="fa fa-toggle-off"></i>
        <span class="thin button-label">End time</span>
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
            isTaskItemShow: state => state.isTaskItemShow,
            isEndTimeShow: state => state.isEndTimeShow
        })
    },

    methods: {
        ...mapActions('calendar/tableView/toolPalette', {
            toggleShowHideEventItem: 'toggleShowHideEventItem',
            toggleShowHideTaskItem: 'toggleShowHideTaskItem',
            toggleShowHideEndTime: 'toggleShowHideEndTime'
        }),

        clickEventItemButton() {
            this.toggleShowHideEventItem({ value: !this.isEventItemShow });
        },

        clickTaskItemButton() {
            this.toggleShowHideTaskItem({ value: !this.isTaskItemShow });
        },

        clickEndTimeButton() {
            this.toggleShowHideEndTime({ value: !this.isEndTimeShow });
        }
    }
} 
</script>

<style lang="scss" scoped>
.button-label {
    font-size: 0.8em;
}

.button.off {
    background-color: #f0f0f0;
}
</style>
