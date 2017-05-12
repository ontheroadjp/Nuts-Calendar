<template>
<div id="tool-palette"
    style="background:#f0f0f0; padding:5px; overflow: scroll"
    >
<add-column-modal v-if="isColumnInserting">
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
                    @click="toggleShowColumns(memberId, !member.isShow)"
                    >
                    <i v-show="member.isShow" class="fa fa-user"></i>
                    <i v-show="!member.isShow" class="fa fa-user-times"></i>
                    ({{ memberId }})
                </button>
            </template>
            <span class="icon is-small">
                <button class="button" @click="clickNewColumn()">
                    <i class="fa fa-user"></i>Add
                </button>
            </span>
        </span>

        <span v-show="selected === 'item'" style="margin-left:10px">
            <button :class="['button', { 'is-off': !isEventItemShow }]" 
                    @click="$store.commit('toggleIsEventItemShow', !isEventItemShow)"
                    >
                    <i v-show="isEventItemShow" class="fa fa-bell-o"></i>
                    <i v-show="!isEventItemShow" class="fa fa-bell-slash-o"></i>
                    Event
            </button>

            <button :class="['button', { 'is-off': !isTaskItemShow }]" 
                    @click="$store.commit('toggleIsTaskItemShow', !isTaskItemShow)"
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
import { mapState } from 'vuex';
import searchBox from './table-search-box.vue';
import addColumnModalBase from '../../../components/modal.vue';
import addColumnModalContent from './modal/add-column-content.vue';

export default {
    name: 'calendar-tool-palett',
    components: {
        'search-box': searchBox,
        'add-column-modal': addColumnModalBase,
        'add-column-modal-content': addColumnModalContent,
    },

    data() {
        return {
            selected: 'date',
        }
    },

    computed: {
        ...mapState({
            isToolPaletteOpen: state => state.calendar.behavior.toolPalette.isActive,
            searchQuery: state => state.calendar.behavior.query.search,
            internalQuery: state => state.calendar.behavior.query.internal,
            members: state => state.calendar.data.members,
            isColumnInserting: state => state.calendar.behavior.column.isInserting,
            isEventItemShow: state => state.calendar.behavior.isEventItemShow,
            isTaskItemShow: state => state.calendar.behavior.isTaskItemShow,
            theme: state => state.app.theme,
        }),

        showColumns: function() {
            return this.$store.getters.showMembers;
        },

        theme: function() {
            return this.$store.state.app.theme;
        }
    },

    methods: {
        setInternalQuery(val) {
            this.$store.commit('setInternalQuery', val);
        },

        clickNewColumn() {
            this.$store.commit('toggleColumnInserting', {
                isInserting: !this.isColumnInserting,
                insertingColumnId: null
            });
        },

        toggleShowColumns(id, val) {
            if(this.showColumns.length === 1 && val === false) { 
                return; 
            }
            this.$store.commit('setMemberStatusIsShow', { 'id': id, 'val': val });
        },

        close() {
            this.$store.commit('toggleTableToolPalette', !this.isToolPaletteOpen);
        }
    },
}
</script>

<style lang="scss" scoped>
    .button.is-off {
        background-color: #f0f0f0;
    }
</style>
