<template>
<span>
    <button :disabled="disabled" class="button" @click="setInternalQuery({ value: '' })" style="margin-right:8px">All</button>
    <button :disabled="disabled" class="button" @click="setInternalQuery({ value: '0' })" style="background-color:#fff0f0">Sun</button>
    <button :disabled="disabled" class="button" @click="setInternalQuery({ value: '1' })">Mon</button>
    <button :disabled="disabled" class="button" @click="setInternalQuery({ value: '2' })">Tue</button>
    <button :disabled="disabled" class="button" @click="setInternalQuery({ value: '3' })">Wed</button>
    <button :disabled="disabled" class="button" @click="setInternalQuery({ value: '4' })">Thu</button>
    <button :disabled="disabled" class="button" @click="setInternalQuery({ value: '5' })">Fri</button>
    <button :disabled="disabled" class="button" @click="setInternalQuery({ value: '6' })" style="background-color:#f0f0ff; margin-right:15px">Sat</button>
</span>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    computed: {
        ...mapState('dashboard', {
            disabled: state => state.disabled
        }),
    },

    methods: {
        ...mapActions('calendar/tableView/toolPalette', {
            setInternalQuery: 'setInternalQuery'
        }),
    }
} 
</script>
