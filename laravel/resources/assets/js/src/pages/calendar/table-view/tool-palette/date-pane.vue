<template>
<span>
    <button
        class="button"
        style="margin-right:8px"
        @click="setInternalQuery({ value: '' })"
        :disabled="disabled"
        ><span class="date-label thin">{{ t('calendarToolPalette.all') }}</span>
    </button>

    <button
        class="button"
        style="background-color:#fff0f0"
        @click="setInternalQuery({ value: '0' })"
        :disabled="disabled"
        ><span class="date-label thin">{{ t('calendarToolPalette.sun') }}</span>
    </button>

    <button
        class="button"
        @click="setInternalQuery({ value: '1' })"
        :disabled="disabled"
        ><span class="date-label thin">{{ t('calendarToolPalette.mon') }}</span>
    </button>

    <button
        class="button"
        @click="setInternalQuery({ value: '2' })"
        :disabled="disabled"
        ><span class="date-label thin">{{ t('calendarToolPalette.tue') }}</span>
    </button>

    <button
        class="button"
        @click="setInternalQuery({ value: '3' })"
        :disabled="disabled"
        ><span class="date-label thin">{{ t('calendarToolPalette.wed') }}</span>
    </button>

    <button
        class="button"
        @click="setInternalQuery({ value: '4' })"
        :disabled="disabled"
        ><span class="date-label thin">{{ t('calendarToolPalette.thu') }}</span>
    </button>

    <button
        class="button"
        @click="setInternalQuery({ value: '5' })"
        :disabled="disabled"
        ><span class="date-label thin">{{ t('calendarToolPalette.fri') }}</span>
    </button>

    <button
        class="button"
        style="background-color:#f0f0ff; margin-right:15px"
        @click="setInternalQuery({ value: '6' })"
        :disabled="disabled"
        ><span class="date-label thin">{{ t('calendarToolPalette.sat') }}</span>
    </button>

</span>
</template>

<script>
import { mapActions } from 'vuex';
import core from '../../../../mixins/core.js';

export default {
    mixins: [ core ],

    props: {
        disabled: { type: Boolean, default: false }
    },

    methods: {
        ...mapActions('calendar/tableView/toolPalette', {
            setInternalQuery: 'setInternalQuery'
        })
    }
}
</script>

<style lang="scss" scoped>
.date-label {
    font-size: 0.8em;
}
</style>
