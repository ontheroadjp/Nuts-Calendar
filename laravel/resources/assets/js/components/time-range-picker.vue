<template>
    <span class="time-range-picker">
        <startTimePicker 
            v-model="input.start"
            format="HH:mm"
            :initialValue="initial.start"
            :minute-interval="5"
            :inputWidth="inputWidth"
            :dropdownHeight="dropdownHeight"
            @change="onChangeStart"
        ></startTimePicker>

        <span style="margin: 0 5px;">to</span>

        <endTimePicker 
            v-model="input.end"
            format="HH:mm"
            :initialValue="initial.start"
            :minute-interval="5"
            :inputWidth="inputWidth"
            :dropdownHeight="dropdownHeight"
            menuPosition="left"
            @change="onChangeEnd"
        ></endTimePicker>

    </span>
</template>

<script>
import startTimePicker from './time-picker.vue';
import endTimePicker from './time-picker.vue';

export default {
    components: { startTimePicker, endTimePicker },

    props: {
        minuteInterval:     { type: Number },
        startTime:          { type: String }, // HH:mm:ss
        endTime:            { type: String }, // HH:mm:ss
        action:             { type: Function },
        isLoading:          { type: Boolean },
        inputWidth:         { type: Number, default: 80 },
        dropdownHeight:     { type: Number, default: 280 },
        ready:              { type: Boolean, required: true }
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

            isChildReady: {
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
            return (this.isChildReady.start || this.isChildReady.end) && !this.isDropdownOpened;
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
            this.isChildReady.end = data.isReadyToUpdate;
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
            this.isChildReady.end = data.isReadyToUpdate;
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

            this.$emit('change', data);
        }
    },

    mounted: function() {
        if( this.startTime ) {
            u.clog('init startTime');
            this.initial.start.HH = this.startTime.split(':')[0];
            this.initial.start.mm = this.startTime.split(':')[1];
            this.input.start.HH = this.initial.start.HH;
            this.input.start.mm = this.initial.start.mm;
        }
        if( this.endTime ) {
            u.clog('init endTime');
            this.initial.end.HH = this.endTime.split(':')[0];
            this.initial.end.mm = this.endTime.split(':')[1];
            this.input.end.HH = this.initial.end.HH;
            this.input.end.mm = this.initial.end.mm;
        }
    }
}
</script>
