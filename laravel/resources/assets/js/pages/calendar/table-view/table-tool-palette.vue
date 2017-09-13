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
            <button :disabled="disabled" class="button" @click="setInternalQuery({ value: '' })" style="margin-right:8px">All</button>
            <button :disabled="disabled" class="button" @click="setInternalQuery({ value: '0' })" style="background-color:#fff0f0">Sun</button>
            <button :disabled="disabled" class="button" @click="setInternalQuery({ value: '1' })">Mon</button>
            <button :disabled="disabled" class="button" @click="setInternalQuery({ value: '2' })">Tue</button>
            <button :disabled="disabled" class="button" @click="setInternalQuery({ value: '3' })">Wed</button>
            <button :disabled="disabled" class="button" @click="setInternalQuery({ value: '4' })">Thu</button>
            <button :disabled="disabled" class="button" @click="setInternalQuery({ value: '5' })">Fri</button>
            <button :disabled="disabled" class="button" @click="setInternalQuery({ value: '6' })" style="background-color:#f0f0ff; margin-right:15px">Sat</button>
        </span>

        <span v-show="selected === 'member'" class="level-item">
            <template v-for="(member, memberId) in members">
                <button  :class="['button', {'is-off': !member.isShow}]" 
                    :disabled="disabled"
                    @click="clickColumnButton(memberId, !member.isShow)"
                    >
                    <i v-show="member.isShow" class="fa fa-user"></i>
                    <i v-show="!member.isShow" class="fa fa-user-times"></i>
                    ({{ memberId }})
                </button>
            </template>
        </span>

        <span v-show="selected === 'item'" class="level-item">
            <button :class="[ 'button', { 'is-off': !isEventItemShow } ]" 
                    :disabled="disabled"
                    @click="clickEventItemButton()">
                <i v-show="isEventItemShow" class="fa fa-bell-o"></i>
                <i v-show="!isEventItemShow" class="fa fa-bell-slash-o"></i>
                Event
            </button>

            <button :class="['button', { 'is-off': !isTaskItemShow }]" 
                    :disabled="disabled"
                    @click="clickTaskItemButton()">
                <i v-show="isTaskItemShow" class="fa fa-bell-o"></i>
                <i v-show="!isTaskItemShow" class="fa fa-bell-slash-o"></i>
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
import searchBox from './table-search-box.vue';

export default {
    name: 'calendar-tool-palett',
    components: {
        'search-box': searchBox,
    },

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
            setInternalQuery: 'setInternalQuery'
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
.button.is-off {
    background-color: #f0f0f0;
}
</style>
