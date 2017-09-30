<template>
<div id="tool-palette" class="tool-palette">
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
            <date-pane :disabled="disabled"></date-pane>
        </span>

        <span v-show="selected === 'member'" class="level-item">
            <member-pane :disabled="disabled"></member-pane>
        </span>

        <span v-show="selected === 'item'" class="level-item">
            <item-pane :disabled="disabled"></item-pane>
        </span>
    </span><!-- // .level-left -->

    <span class="level-right">
        <span class="level-item">
            <search-box :disabled="disabled"></search-box>
        </span>
    </span>

</span><!-- // .level -->
</div>
</template>

<script>
import { mapState } from 'vuex';
import datePane from './date-pane.vue';
import memberPane from './member-pane.vue';
import itemPane from './item-pane.vue';
import searchBox from './search-box.vue';

export default {
    name: 'calendar-tool-palett',

    components: { datePane, memberPane, itemPane, searchBox },

    data() {
        return {
            selected: 'date'
        }
    },

    computed: {
        ...mapState('dashboard', {
            disabled: state => state.disabled
        })
    }
}
</script>

<style lang="scss" scoped>
.tool-palette {
    background:#f0f0f0;
    padding:5px;
    overflow: scroll;
} 
</style>
