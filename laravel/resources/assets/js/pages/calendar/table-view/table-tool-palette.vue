<template>
<div id="tool-palette"
    style="background:#f0f0f0; padding:5px; overflow: scroll"
    >
<add-column-modal v-if="addColumn.isActive">
    <add-column-modal-content></add-column-modal-content>
</add-column-modal>

    <div class="container columns" style="margin: 0 auto">
        <div class="column is-4">
            <mini-cal value="2017-04"></mini-cal>
        </div>

        <div class="column is-4">
            <mini-cal value="2017-05"></mini-cal>
        </div>

        <div class="column is-4">
            <mini-cal value="2017-06"></mini-cal>
        </div>
    </div>

<span class="level" style="white-space: nowrap">
    <span class="level-left">
        <span class="select">
            <select v-model="selected">
                <option value="date" selected>Date</option>
                <option value="member">Member</option>
                <option value="item">Item</option>
            </select>
        </span>

        <span v-show="selected === 'date'" style="margin-left:10px">
            <button class="button" @click="setInternalQuery({ value: '' })" style="margin-right:8px">All</button>
            <button class="button" @click="setInternalQuery({ value: '0' })" style="background-color:#fff0f0">Sun</button>
            <button class="button" @click="setInternalQuery({ value: '1' })">Mon</button>
            <button class="button" @click="setInternalQuery({ value: '2' })">Tue</button>
            <button class="button" @click="setInternalQuery({ value: '3' })">Wed</button>
            <button class="button" @click="setInternalQuery({ value: '4' })">Thu</button>
            <button class="button" @click="setInternalQuery({ value: '5' })">Fri</button>
            <button class="button" @click="setInternalQuery({ value: '6' })" style="background-color:#f0f0ff; margin-right:15px">Sat</button>
        </span>

        <span v-show="selected === 'member'" style="margin-left:10px">
            <template v-for="(member, memberId) in members">
                <button  :class="['button', {'is-off': !member.isShow}]" 
                    @click="clickColumnButton(memberId, !member.isShow)"
                    >
                    <i v-show="member.isShow" class="fa fa-user"></i>
                    <i v-show="!member.isShow" class="fa fa-user-times"></i>
                    ({{ memberId }})
                </button>
            </template>
            <button class="button" @click="clickNewColumnButton()">
                <i class="fa fa-user"></i>Add
            </button>
        </span>

        <span v-show="selected === 'item'" style="margin-left:10px">
            <button :class="[ 'button', { 'is-off': !isEventItemShow } ]" 
                    @click="clickEventItemButton()"
                    >
                    <i v-show="isEventItemShow" class="fa fa-bell-o"></i>
                    <i v-show="!isEventItemShow" class="fa fa-bell-slash-o"></i>
                    Event
            </button>
            <button :class="['button', { 'is-off': !isTaskItemShow }]" 
                    @click="clickTaskItemButton()"
                    >
                    <i v-show="isTaskItemShow" class="fa fa-bell-o"></i>
                    <i v-show="!isTaskItemShow" class="fa fa-bell-slash-o"></i>
                    Task
            </button>
        </span>

    </span><!-- // .level-left -->

    <span class="level-right">
        <span class="level-item" style="margin-right:10px">
            <search-box></search-box>
        </span>
        <span class="level-item icon is-small" 
              style="cursor:pointer; margin: 0 10px"
              @click="close()"
              ><i class="fa fa-times-circle"></i>
        </span>
    </span>

</span><!-- // .level -->
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import searchBox from './table-search-box.vue';
import addColumnModalBase from '../../../components/modal.vue';
import addColumnModalContent from './modal/add-column-modal-content.vue';
import miniCal from '../../../components/mini-cal.vue';

export default {
    name: 'calendar-tool-palett',
    components: {
        'search-box': searchBox,
        'add-column-modal': addColumnModalBase,
        'add-column-modal-content': addColumnModalContent,
        'mini-cal': miniCal
    },

    data() {
        return {
            selected: 'date'
        }
    },

    computed: {
        ...mapState({
            members: state => state.calendar.data.members,
            theme: state => state.app.theme
        }),

        ...mapState('action/calendar', {
            toolPalette: state => state.view.toolPalette,
            isEventItemShow: state => state.view.isEventItemShow,
            isTaskItemShow: state => state.view.isTaskItemShow
        }),

        ...mapState('action/column', {
            addColumn: state => state.insert
        }),

        showColumns: function() {
            return this.$store.getters.getShowMembers;
        }
    },

    methods: {
        ...mapActions('action/column', {
            prepareInsert: 'insert/prepare'
        }),

        ...mapActions('action/calendar', {
            toggleShowHideColumn: 'view/toggleShowHideColumn',
            toggleShowHideEventItem: 'view/toggleShowHideEventItem',
            toggleShowHideTaskItem: 'view/toggleShowHideTaskItem',
            setInternalQuery: 'view/setInternalQuery'
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

        clickNewColumnButton() {
            this.prepareInsert();
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
