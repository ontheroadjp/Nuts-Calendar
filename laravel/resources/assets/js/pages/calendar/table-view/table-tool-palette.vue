<template>
<div>
    <add-column-modal :is-active="modal.addColumn.isActive">
        <add-column-modal-content 
            :is-active.sync="modal.addColumn.isActive" 
            :member-id.sync="modal.addColumn.addingColumnId"
        ></add-column-modal-content>
    </add-column-modal>
    
    <div class="level">
    
        <div class="level-left" style="margin-left:10px">
            <span class="level-item">
                <button class="button" @click="setInternalQuery('')" style="margin-right:15px">All</button>
                <button class="button" @click="setInternalQuery('0')" style="background-color:#fff0f0">Sun</button>
                <button class="button" @click="setInternalQuery('1')">Mon</button>
                <button class="button" @click="setInternalQuery('2')">Tue</button>
                <button class="button" @click="setInternalQuery('3')">Wed</button>
                <button class="button" @click="setInternalQuery('4')">Thu</button>
                <button class="button" @click="setInternalQuery('5')">Fri</button>
                <button class="button" @click="setInternalQuery('6')" style="background-color:#f0f0ff; margin-right:15px">Sat</button>
                <span class="column-buttons">
                    <template v-for="(memberId, member) in $store.state.calendar.data.members">
                        <a  :class="['button', !member.isShow ? 'column-hide' : '']" 
                            @click="toggleShowColumn(memberId, !member.isShow)"
                            ><i class="fa fa-user"></i>
                        </a>
                    </template>
                    <span class="icon is-small">
                        <a class="button" @click="clickNewColumn()">
                            <i class="fa fa-user"></i>Add
                        </a>
                    </span>
                </span>
            </span>
        </div><!-- // .level-left -->
    
        <div class="level-right" style="margin-right:10px">
            <span class="level-item">
                <search-box :search-query.sync="searchQuery"></search-box>
            </span>
            <span class="level-item">
                <span 
                    class="icon is-small" 
                    style="cursor:pointer"
                    @click="isOpen = !isOpen"
                >
                    <i class="fa fa-times-circle"></i>
                </span>
            </span>
        </div><!-- // .level-right -->
    
    </div><!-- // .level -->
</div>
</template>

<script>
import searchBox from './table-search-box.vue';
import addColumnModalBase from '../../../components/modal.vue';
import addColumnModalContent from './modal/addColumnContent.vue';

export default {
    components: {
        'search-box': searchBox,
        'add-column-modal': addColumnModalBase,
        'add-column-modal-content': addColumnModalContent,
    },

    props: [
        'isOpen', 'internalQuery', 'searchQuery'
    ],

    data() {
        return {
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
<style>
.button.column-hide {
    background-color: #f0f0f0;
}
</style>
