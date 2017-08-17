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
        @click.stop="clickEvent()"
        @blur="clickEvent()"
        >Event
    </a>

    <a  class="button is-small"
        v-show="!addItem.isLoading"
        @click.stop="clickTask()"
        @blur="clickTask()"
        >Task
    </a>

    <a  class="button is-small" 
        v-show="addItem.isLoading"
        ><span class="icon is-small">
            <i class="fa fa-refresh fa-spin"></i>
        </span>
    </a>

    <a  v-show="!addItem.isLoading"
        @click.stop="clickCancel()" 
        style="border: none; background: none;"
        ><i 
            class="fa fa-times-circle"
            style="
                color: black;
                padding-top: 5px;
                padding-left: 5px;
            "
        ></i>
    </a>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { focus } from '../../../directives/focus.js';

export default {
    name: 'add-item-field',

    directives: { focus },

    computed: {
        ...mapState('action/calendar/tableView/item', {
            addItem: state => state.insert
        }),

        newItemContent: {
            get() {
                return this.addItem.newItem.content;
            },

            set(value) {
                this.setContent( { value } );
            }
        }
    },

    methods: {
        ...mapActions('action/calendar/tableView/item/insert', {
            setContent: 'setContent',
            insertEvent: 'insertEvent',
            insertTask: 'insertTask',
            reset: 'reset'
        }),

        clickEvent() {
            this.insertEvent();
        },

        clickTask() {
            this.insertTask();
        },

        clickCancel() {
            this.reset();
        }
    }
}
</script>

<style lang="scss" scoped>
    .item-input-field {
        border: none;
        box-shadow: none;
        border-radius: 0;
        background-color: transparent;
    }
</style>
