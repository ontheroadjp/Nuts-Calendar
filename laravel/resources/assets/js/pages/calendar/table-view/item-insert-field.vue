<template>
<div id="item-input-field">
    <input type="text"
           class="input item-input-field"
           placeholder="Content here.."
           v-model="addItem.newItemContent"
           v-focus
    />
    <a  class="button is-small"
        v-show="!addItem.isLoading"
        @click.stop="insertEvent(memberId, dayIndex + 1, cellItems)"
        @blur="insertEvent(memberId, dayIndex + 1, cellItems)"
        >Event
    </a>

    <a  class="button is-small"
        v-show="!addItem.isLoading"
        @click.stop="insertTask(memberId, dayIndex + 1, cellItems)"
        @blur="insertTask(memberId, dayIndex + 1, cellItems)"
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
        @click.stop="resetAddItemFields()" 
        >cancel
    </a>
</div>
</template>

<script>
import itemService from '../../../services/item.js';

export default {
    name: 'item-input-field',

    directives: {
        focus: {
            inserted: function(el) {
                el.focus();
            }
        }
    },

    mixins: [
        itemService
    ],

    props: [
        'memberId', 'dayIndex', 'cellItems'
    ]
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
