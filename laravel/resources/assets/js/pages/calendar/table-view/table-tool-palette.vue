<template>
<div id="tool-palette"
    style="background:#f0f0f0; padding:5px; overflow: scroll"
    >
<add-column-modal v-if="addColumn.isActive">
    <add-column-modal-content></add-column-modal-content>
</add-column-modal>

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
            <button class="button" @click="setInternalQuery('')" style="margin-right:8px">All</button>
            <button class="button" @click="setInternalQuery('0')" style="background-color:#fff0f0">Sun</button>
            <button class="button" @click="setInternalQuery('1')">Mon</button>
            <button class="button" @click="setInternalQuery('2')">Tue</button>
            <button class="button" @click="setInternalQuery('3')">Wed</button>
            <button class="button" @click="setInternalQuery('4')">Thu</button>
            <button class="button" @click="setInternalQuery('5')">Fri</button>
            <button class="button" @click="setInternalQuery('6')" style="background-color:#f0f0ff; margin-right:15px">Sat</button>
        </span>

        <span v-show="selected === 'member'" style="margin-left:10px">
            <template v-for="(member, memberId) in members">
                <button  :class="['button', {'is-off': !member.isShow}]" 
                    @click="toggleShowHideColumnButton(memberId, !member.isShow)"
                    >
                    <i v-show="member.isShow" class="fa fa-user"></i>
                    <i v-show="!member.isShow" class="fa fa-user-times"></i>
                    ({{ memberId }})
                </button>
            </template>
            <button class="button" @click="newColumnButton()">
                <i class="fa fa-user"></i>Add
            </button>
        </span>

        <span v-show="selected === 'item'" style="margin-left:10px">
            <button :class="[ 'button', { 'is-off': !isEventItemShow } ]" 
                    @click="toggleShowHideEventItemButton()"
                    >
                    <i v-show="isEventItemShow" class="fa fa-bell-o"></i>
                    <i v-show="!isEventItemShow" class="fa fa-bell-slash-o"></i>
                    Event
            </button>
            <button :class="['button', { 'is-off': !isTaskItemShow }]" 
                    @click="toggleShowHideTaskItemButton()"
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
import calendarService from '../../../services/calendar.js';
//import insertColumnService from '../../../services/column/insert.vue';
import addColumnModalBase from '../../../components/modal.vue';
import addColumnModalContent from './modal/add-column-modal-content.vue';

export default {
    name: 'calendar-tool-palett',
    components: {
        'search-box': searchBox,
        'add-column-modal': addColumnModalBase,
        'add-column-modal-content': addColumnModalContent,
    },

    mixins: [
//        calendarService, insertColumnService
        calendarService
    ],

    data() {
        return {
            selected: 'date',
        }
    },

    computed: {
        ...mapState({
            toolPalette: state => state.calendar.behavior.toolPalette,
            members: state => state.calendar.data.members,
            isEventItemShow: state => state.calendar.behavior.isEventItemShow,
            isTaskItemShow: state => state.calendar.behavior.isTaskItemShow,
            theme: state => state.app.theme,
        }),

        ...mapState('action/column', {
            addColumn: state => state.insert,
        }),

        showColumns: function() {
            return this.$store.getters.showMembers;
        },
    },

    methods: {
        ...mapActions({
            'prepareInsert': 'action/column/insert/prepare',
        }),

        setInternalQuery(val) {
            this.$store.commit('setInternalQuery', val);
        },

        toggleShowHideColumnButton(id, value) {
            if(this.showColumns.length === 1 && val === false) return; 
            this.toggleShowHideColumn(id, value);
        },

        toggleShowHideEventItemButton() {
            this.toggleShowHideEventItem(!this.isEventItemShow);
        },

        toggleShowHideTaskItemButton() {
            this.toggleShowHideTaskItem(!this.isTaskItemShow);
        },

        newColumnButton() {
            this.prepareInsert();
        },

        close() {
            this.$store.commit('toggleTableToolPalette', !this.toolPalette.isActive);
        }
    },
}
</script>

<style lang="scss" scoped>
    .button.is-off {
        background-color: #f0f0f0;
    }
</style>
