<template>
<div id="tool-palette"
    style="background:#f0f0f0; padding:5px; overflow: scroll">

<span class="level" style="white-space: nowrap">
    <span class="level-left">
        <span class="level-item select">
            <select v-model="selected" :disabled="disabled">
                <option value="date" selected>Date</option>
                <option value="member">Member</option>
                <option value="item">Item</option>
            </select>
        </span>

        <span v-show="selected === 'date'" class="level-item">
            <date-buttons></date-buttons>
        </span>

        <span v-show="selected === 'member'" class="level-item">
            <template v-for="(member, memberId) in members">
                <button  :class="['button', { off: !member.isShow}]" 
                          @click="clickColumnButton(memberId, !member.isShow)"
                          :disabled="disabled">
                    <i v-if="member.isShow" class="fa fa-user"></i>
                    <i v-else class="fa fa-user-times"></i>
                    ({{ memberId }})
                </button>
            </template>
        </span>

        <span v-show="selected === 'item'" class="level-item">
            <button :class="[ 'button', { off: !isEventItemShow } ]" 
                    @click="clickEventItemButton()"
                    :disabled="disabled">
                <i v-if="isEventItemShow" class="fa fa-bell-o"></i>
                <i v-else class="fa fa-bell-slash-o"></i>
                Event
            </button>

            <button :class="['button', { off: !isTaskItemShow }]" 
                    :disabled="disabled"
                    @click="clickTaskItemButton()">
                <i v-if="isTaskItemShow" class="fa fa-bell-o"></i>
                <i v-else class="fa fa-bell-slash-o"></i>
                Task
            </button>
        </span>

    </span><!-- // .level-left -->

    <span class="level-right">
        <span class="level-item">
            <search-box></search-box>
        </span>
        <!--
        <span class="level-item">
            <span class="icon is-small" 
                  style="cursor:pointer; margin: 0 10px"
                  @click="close()"
                  ><i class="fa fa-times-circle"></i>
            </span>
        </span>
        -->
    </span>

</span><!-- // .level -->
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import dateButtons from './date-buttons.vue';
import searchBox from './search-box.vue';

export default {
    name: 'calendar-tool-palett',

    components: { dateButtons, searchBox },

    data() {
        return {
            selected: 'date'
        }
    },

    computed: {
        ...mapState({
            members: state => state.member.data.members,
            theme: state => state.app.theme
        }),

        ...mapState('dashboard', {
            disabled: state => state.disabled
        }),

        ...mapState('calendar/tableView/toolPalette', {
            isEventItemShow: state => state.isEventItemShow,
            isTaskItemShow: state => state.isTaskItemShow
        }),

        showColumns: function() {
            return this.$store.getters.getShowMembers;
        }
    },

    methods: {
        ...mapActions('calendar/tableView/toolPalette', {
            toggleShowHideColumn: 'toggleShowHideColumn',
            toggleShowHideEventItem: 'toggleShowHideEventItem',
            toggleShowHideTaskItem: 'toggleShowHideTaskItem',
        }),

        clickColumnButton(id, value) {
            if(this.showColumns.length === 1 && value === false) return; 
            this.toggleShowHideColumn({ id, value });
        },

        clickEventItemButton() {
            this.toggleShowHideEventItem({ value: !this.isEventItemShow });
        },

        clickTaskItemButton() {
            this.toggleShowHideTaskItem({ value: !this.isTaskItemShow });
        },

        close() {
            this.toggleTableToolPalette({ value: false });
        }
    }
}
</script>

<style lang="scss" scoped>
.button.off {
    background-color: #f0f0f0;
}
</style>
