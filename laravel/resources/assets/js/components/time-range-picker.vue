<template>
    <span class="time-range-picker">
        <startTimePicker 
            format="HH:mm"
            :initialValue="initial.start"
            :minute-interval="minuteInterval"
            :inputWidth="inputWidth"
            :dropdownHeight="dropdownHeight"
            @changeValue="onChangeStart"
        ></startTimePicker>

        <span style="margin: 0 5px;">to</span>

        <endTimePicker 
            format="HH:mm"
            :initialValue="initial.end"
            :minute-interval="minuteInterval"
            :inputWidth="inputWidth"
            :dropdownHeight="dropdownHeight"
            menuPosition="left"
            @changeValue="onChangeEnd"
        ></endTimePicker>

    </span>
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

            readyState: {
                start: false,
                end: false
            },

            isDropdownOpened: false
        }
    },

    computed: {
        startTimeResult: function() {
            if( this.error.start ) return '';
            if( this.input.start.HH == '' && this.input.start.mm == '' ) return '';
            return this.input.start.HH + ':' + this.input.start.mm;
        },
        
        endTimeResult: function() {
            if( this.error.end ) return '';
            if( this.input.end.HH == '' && this.input.end.mm == '' ) return '';
            return this.input.end.HH + ':' + this.input.end.mm;
        },

        hasError: function() {
            if( this.isDropdownOpen ) { return false; }

            const startHH = this.input.start.HH;
            const startMM = this.input.start.mm;
            const endHH = this.input.end.HH;
            const endMM = this.input.end.mm;

            if( (this.error.start || this.error.end) ||
                (startHH == '' && endHH != '') ||
                (endHH != '' && startHH > endHH) ||
                ((startHH != '' && endHH != '') && ((startHH == endHH) && (startMM >= endMM)))
            ) { return true; }

            return false;
        },

        isReadyToUpdate: function() {
            const values = Object.values(this.readyState);
            return (values.indexOf(true) !== -1) && !this.hasError && !this.isDropdownOpened;
//            return (this.readyState.start || this.readyState.end) && !this.isDropdownOpened;
        }
    },

    methods: {
        onChangeStart(data) {
//            u.clog('------------------- onChange Start Value() ---------------');
//            u.clog('inputValue.HH(initialValue): ' + data.inputValue.HH + '(' + data.initialValue.HH + ')');
//            u.clog('inputValue.mm(initialValue): ' + data.inputValue.mm + '(' + data.initialValue.mm + ')');
//            u.clog('hasError: ' + data.hasError);
//            u.clog('isReadyToUpdate: ' + data.isReadyToUpdate);
//            u.clog('isDropdownOpened: ' + data.isDropdownOpened);
            this.input.start.HH = data.inputValue.HH;
            this.input.start.mm = data.inputValue.mm;
            this.error.start = data.hasError;
            this.readyState.start = data.isReadyToUpdate;
            this.isDropdownOpened = data.isDropdownOpened;
            this.fireEvents();
        },

        onChangeEnd(data) {
//            u.clog('------------------- onChange End Value() ---------------');
//            u.clog('inputValue.HH(initialValue): ' + data.inputValue.HH + '(' + data.initialValue.HH + ')');
//            u.clog('inputValue.mm(initialValue): ' + data.inputValue.mm + '(' + data.initialValue.mm + ')');
//            u.clog('hasError: ' + data.hasError);
//            u.clog('isReadyToUpdate: ' + data.isReadyToUpdate);
//            u.clog('isDropdownOpened: ' + data.isDropdownOpened);
            this.input.end.HH = data.inputValue.HH;
            this.input.end.mm = data.inputValue.mm;
            this.error.end = data.hasError;
            this.readyState.end = data.isReadyToUpdate;
            this.isDropdownOpened = data.isDropdownOpened;
            this.fireEvents();
        },
        
        fireEvents() {
            const data = {
                value: {
                    start: {
                        HH: this.input.start.HH,
                        mm: this.input.start.mm,
                    },

                    end: {
                        HH: this.input.end.HH,
                        mm: this.input.end.mm,
                    }
                },

                formattedValue: [
                    { 
                        start: this.startTimeResult,
                        end: this.endTimeResult
                    }
                ],

                hasError: this.hasError,
                isReadyToUpdate: this.isReadyToUpdate,
            }

            this.$emit('changeValue', data);
        }
    },

    mounted: function() {
        if( this.initialStartTime ) {
            u.clog('init startTime');
            this.initial.start.HH = this.initialStartTime.split(':')[0];
            this.initial.start.mm = this.initialStartTime.split(':')[1];
            this.input.start.HH = this.initial.start.HH;
            this.input.start.mm = this.initial.start.mm;
        }
        if( this.initialEndTime ) {
            u.clog('init endTime');
            this.initial.end.HH = this.initialEndTime.split(':')[0];
            this.initial.end.mm = this.initialEndTime.split(':')[1];
            this.input.end.HH = this.initial.end.HH;
            this.input.end.mm = this.initial.end.mm;
        }
    }
}
</script>
