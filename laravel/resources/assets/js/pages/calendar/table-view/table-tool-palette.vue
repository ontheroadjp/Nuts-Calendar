<template>
<div>
<add-column-modal v-show="modal.addColumn.isActive">
    <add-column-modal-content 
        :is-active.sync="modal.addColumn.isActive" 
        :member-id.sync="modal.addColumn.addingColumnId"
    ></add-column-modal-content>
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
            <template v-for="(memberId, member) in $store.state.calendar.data.members">
                <button  :class="['button', { 'is-off': !member.isShow }]" 
                    @click="toggleShowColumn(memberId, !member.isShow)"
                    >
                    <i v-show="member.isShow" class="fa fa-user"></i>
                    <i v-show="!member.isShow" class="fa fa-user-times"></i>
                </button>
            </template>
            <span class="icon is-small">
                <button class="button" @click="clickNewColumn()">
                    <i class="fa fa-user"></i>Add
                </button>
            </span>
        </span>

        <span v-show="selected === 'item'" style="margin-left:10px">
            <button :class="['button', { 'is-off': !isEventShow }]" 
                    @click="isEventShow = !isEventShow"
                    >
                    <i v-show="isEventShow" class="fa fa-bell-o"></i>
                    <i v-show="!isEventShow" class="fa fa-bell-slash-o"></i>
                    Event
            </button>

            <button :class="['button', { 'is-off': !isTaskShow }]" 
                    @click="isTaskShow = !isTaskShow"
                    >
                    <i v-show="isTaskShow" class="fa fa-bell-o"></i>
                    <i v-show="!isTaskShow" class="fa fa-bell-slash-o"></i>
                    Task
            </button>
        </span>

    </span><!-- // .level-left -->

    <span class="level-right">
        <span class="level-item" style="margin-right:10px">
            <search-box :search-query.sync="searchQuery"></search-box>
        </span>
            <span class="level-item icon is-small" 
                  style="cursor:pointer"
                  @click="isOpen = !isOpen"
                  ><i class="fa fa-times-circle"></i>
            </span>
    </span>

</span><!-- // .level -->
</div>
</template>

<script>
import searchBox from './table-search-box.vue';
import addColumnModalBase from '../../../components/modal.vue';
import addColumnModalContent from './modal/add-column-content.vue';

export default {
    components: {
        'search-box': searchBox,
        'add-column-modal': addColumnModalBase,
        'add-column-modal-content': addColumnModalContent,
    },

    props: [
        'isOpen', 'internalQuery', 'searchQuery', 'isEventShow', 'isTaskShow'
    ],

    data() {
        return {
            selected: 'day',
            modal: {
                addColumn: {
                    isActive: false,
                }
            }
        }
    },

    methods: {
        setInternalQuery(val) {
            this.internalQuery = '';
            this.internalQuery = val;
        },

        clickNewColumn() {
            this.modal.addColumn.isActive = !this.modal.addColumn.isActive;
        },

        toggleShowColumn(id, value) {
            if(this.$parent.showColumns.length === 1 && value === false) { 
                return; 
            }
            this.$store.commit('setShowMember', { 'id': id, 'value': value });
        }
    },

    computed: {
        theme: function() {
            return this.$store.state.app.theme;
        }
    }
}
</script>

<style lang="sass" scoped>
    .button.is-off {
        background-color: #f0f0f0;
    }
</style>
