<template>
<span>
    <button 
        class="button" 
        style="margin-right:8px"
        @click="setInternalQuery({ value: '' })"
        :disabled="disabled" 
        ><span class="date-label thin">All</span>
    </button>

    <button 
        class="button" 
        style="background-color:#fff0f0"
        @click="setInternalQuery({ value: '0' })"
        :disabled="disabled" 
        ><span class="date-label thin">Sun</span>
    </button>

    <button 
        class="button" 
        @click="setInternalQuery({ value: '1' })"
        :disabled="disabled" 
        ><span class="date-label thin">Mon</span>
    </button>

    <button 
        class="button" 
        @click="setInternalQuery({ value: '2' })"
        :disabled="disabled" 
        ><span class="date-label thin">Tue</span>
    </button>

    <button 
        class="button" 
        @click="setInternalQuery({ value: '3' })"
        :disabled="disabled" 
        ><span class="date-label thin">Wed</span>
    </button>

    <button 
        class="button" 
        @click="setInternalQuery({ value: '4' })"
        :disabled="disabled" 
        ><span class="date-label thin">Thu</span>
    </button>

    <button 
        class="button" 
        @click="setInternalQuery({ value: '5' })"
        :disabled="disabled" 
        ><span class="date-label thin">Fri</span>
    </button>

    <button 
        class="button" 
        style="background-color:#f0f0ff; margin-right:15px"
        @click="setInternalQuery({ value: '6' })"
        :disabled="disabled" 
        ><span class="date-label thin">Sat</span>
    </button>

</span>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    props: {
        disabled: { type: Boolean, default: false }
    },

    methods: {
        ...mapActions('calendar/tableView/toolPalette', {
            setInternalQuery: 'setInternalQuery'
        }),
    }
} 
</script>

<style lang="scss" scoped>
.date-label {
    font-size: 0.8em;
}
</style>
