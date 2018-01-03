<template>
<span>
    <button :class="[ 'button', { off: !isEventItemShow } ]"
            @click="clickEventItemButton()"
            :disabled="disabled">
        <span class="icon">
            <i v-show="isEventItemShow" class="fa fa-bell-o"></i>
            <i v-show="!isEventItemShow" class="fa fa-bell-slash-o"></i>
        </span>
        <span class="thin button-label">{{ t('calendarToolPalette.event') }}</span>
    </button>

    <button :class="['button', { off: !isTaskItemShow }]"
            :disabled="disabled"
            @click="clickTaskItemButton()">
        <span class="icon">
            <i v-show="isTaskItemShow" class="fa fa-bell-o"></i>
            <i v-show="!isTaskItemShow" class="fa fa-bell-slash-o"></i>
        </span>
        <span class="thin button-label">{{ t('calendarToolPalette.task') }}</span>
    </button>

    <button :class="['button', { off: !isEndTimeShow }]"
        :disabled="disabled"
        @click="clickEndTimeButton()">
        <span class="icon">
            <i v-show="isEndTimeShow" class="fa fa-toggle-on"></i>
            <i v-show="!isEndTimeShow" class="fa fa-toggle-off"></i>
        </span>
        <span class="thin button-label">{{ t('calendarToolPalette.endTime') }}</span>
    </button>
</span>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import core from '../../../../mixins/core.js';

export default {
    mixins: [ core ],

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
};
</script>

<style lang="scss" scoped>
.button-label {
    font-size: 0.8em;
}

.button.off {
    background-color: #f0f0f0;
}
</style>
