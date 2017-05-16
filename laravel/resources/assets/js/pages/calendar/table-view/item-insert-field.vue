<template>
<div id="item-input-field">
    <input type="text"
           class="input item-input-field"
           placeholder="Content here.."
           v-model="newItemContent"
           v-focus
    />
    <a  class="button is-small"
        v-show="!addItem.isLoading"
        @click.stop="eventButton()"
        @blur="eventButton()"
        >Event
    </a>

    <a  class="button is-small"
        v-show="!addItem.isLoading"
        @click.stop="taskButton()"
        @blur="taskButton()"
        >Task
    </a>

    <a  class="button is-small" 
        v-show="addItem.isLoading"
        ><span class="icon is-small">
            <i class="fa fa-refresh fa-spin"></i>
         </span>
    </a>

    <a  class="button is-small" 
        v-show="!addItem.isLoading"
        @click.stop="cancelButton()" 
        >cancel
    </a>
</div>
</template>

<script>
import { mapState } from 'vuex';
import insertItemService from '../../../services/item/insertItem.vue';

export default {
    name: 'add-item-field',

    directives: {
        focus: {
            inserted: function(el) {
                el.focus();
            }
        }
    },

    mixins: [ insertItemService ],

    computed: {
        ...mapState({
            addItem: state => state.calendar.behavior.item.addItem,
        }),

        newItemContent: {
            get() {
                return this.addItem.newItem.content;
            },

            set(value) {
                this.setNewItemContent(value);
            }
        }
    },

    methods: {
        eventButton() {
            this.insertEvent();
        },

        taskButton() {
            this.insertTask();
        },

        cancelButton() {
            this.finishInsertItem();
        }
    },

//    beforeDestroy() {
//        u.clog('insert-item-field is going to be destroyed.');
//        this.finishInsertItem();
//    }
}
</script>

<style lang="scss" scoped>
    .item-input-field {
        border: none;
        box-shadow: none;
        border-radius: 0px;
        background-color: transparent;
    }
</style>
