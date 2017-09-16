<template>
<div class="time-range-picker">
    <div>
        <startTimePicker 
            format="HH:mm"
            :initialValue="initial.start"
            :minute-interval="minuteInterval"
            :inputWidth="inputWidth"
            :dropdownHeight="dropdownHeight"
            @changeValue="onChangeStart"
            :disabled="disabled"
        ></startTimePicker>

        <span :class="{ 'disabled': disabled }" style="margin: 0 5px;">to</span>

        <endTimePicker 
            format="HH:mm"
            :initialValue="initial.end"
            :minute-interval="minuteInterval"
            :inputWidth="inputWidth"
            :dropdownHeight="dropdownHeight"
            menuPosition="left"
            @changeValue="onChangeEnd"
            :disabled="disabled"
        ></endTimePicker>
    </div>

    <div v-show="errorResult && !error.start && !error.end && !disabled" class="error-message">Error</div>
</div>
</template>

<script>
import startTimePicker from './time-picker.vue';
import endTimePicker from './time-picker.vue';

export default {
    components: { startTimePicker, endTimePicker },

    props: {
        minuteInterval:     { type: Number, default: 5 },
        initialStartTime:   { type: String, default: '' }, // HH:mm:ss or ''
        initialEndTime:     { type: String, default: '' }, // HH:mm:ss or ''
        inputWidth:         { type: Number, default: 80 },
        dropdownHeight:     { type: Number, default: 280 },
        disabled:           { type: Boolean, default: false }
    },

    data() {
        return {
            initial: {
                start: { HH: "", mm: "" },
                end  : { HH: "", mm: "" }
            },

            input: {
                start: { HH: "", mm: "" },
                end  : { HH: "", mm: "" }
            },

            error: {
                start: false,
                end: false
            },

            isReady: {
                start: false,
                end: false
            },

            isDropdownOpened: false
        }
    },

    computed: {
        formattedStartTime: function() {
            if( this.error.start ) return '';
            if( this.input.start.HH == '' && this.input.start.mm == '' ) return '';
            return this.input.start.HH + ':' + this.input.start.mm;
        },
        
        formattedEndTime: function() {
            if( this.error.end ) return '';
            if( this.input.end.HH == '' && this.input.end.mm == '' ) return '';
            return this.input.end.HH + ':' + this.input.end.mm;
        },

        errorResult: function() {
            if( this.isDropdownOpen ) { return false; }

            const startHH = this.input.start.HH;
            const startMM = this.input.start.mm;
            const endHH = this.input.end.HH;
            const endMM = this.input.end.mm;

            if(this.disabled) return false;

            if( (this.error.start || this.error.end) ||
                (startHH == '' && endHH != '') ||
                (endHH != '' && startHH > endHH) ||
                ((startHH != '' && endHH != '') && ((startHH == endHH) && (startMM >= endMM)))
            ) { return true; }

            return false;
        },

        isReadyResult: function() {
            if(this.disabled) return true;

            // more than one true is true
            let childrenAreReady = Object.values(this.isReady);
            childrenAreReady = (childrenAreReady.indexOf(true) !== -1);

            return childrenAreReady && !this.errorResult && !this.isDropdownOpen;
        }
    },

    methods: {
        onChangeStart(data) {
            this.input.start.HH = data.inputValue.HH;
            this.input.start.mm = data.inputValue.mm;
            this.error.start = data.error;
            this.isReady.start = data.isReady;
            this.isDropdownOpened = data.isDropdownOpened;
            this.fireEvents();
        },

        onChangeEnd(data) {
            this.input.end.HH = data.inputValue.HH;
            this.input.end.mm = data.inputValue.mm;
            this.error.end = data.error;
            this.isReady.end = data.isReady;
            this.isDropdownOpened = data.isDropdownOpened;
            this.fireEvents();
        },
        
        fireEvents() {
            const data = {
                value: {
                    start: this.formattedStartTime,
                    end: this.formattedEndTime
                },

                error: this.errorResult,
                isReady: this.isReadyResult,
            }

            this.$emit('changeValue', data);
        },

        updateInputValue: function() {
            if( this.initialStartTime ) {
                this.initial.start.HH = this.initialStartTime.split(':')[0];
                this.initial.start.mm = this.initialStartTime.split(':')[1];
                this.input.start.HH = this.initial.start.HH;
                this.input.start.mm = this.initial.start.mm;
            }
            if( this.initialEndTime ) {
                this.initial.end.HH = this.initialEndTime.split(':')[0];
                this.initial.end.mm = this.initialEndTime.split(':')[1];
                this.input.end.HH = this.initial.end.HH;
                this.input.end.mm = this.initial.end.mm;
            }
        }
    },

    watch: {
        initialStartTime: function() {
            this.updateInputValue();
        },

        initialEndTime: function() {
            this.updateInputValue();
        }
    },

    mounted: function() {
        this.updateInputValue();
    }
}
</script>

<style lang="scss" scoped>
.time-range-picker {
    display: inline-block;
}

.error-message {
    font-size: 0.8em;
    color: red;
    text-align: center;
}

.disabled {
    color: rgb(190, 190, 190);
}
</style>
