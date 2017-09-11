<template>
    <span class="time-range-picker">
        <startTimePicker 
            :minute-interval="5"
            v-model="input.start"
            format="HH:mm"
            :inputWidth="inputWidth"
            :menuHeight="menuHeight"
            @dropdown-open="onDropdownOpen"
            :hasError.sync="error.start"
        ></startTimePicker>

        <span style="margin: 0 5px;">to</span>

        <endTimePicker 
            :minute-interval="5"
            v-model="input.end"
            format="HH:mm"
            :inputWidth="inputWidth"
            :menuHeight="menuHeight"
            menuPosition="left"
            @dropdown-open="onDropdownOpen"
            :hasError.sync="error.end"
        ></endTimePicker>

        <!--
        <button
            class="button"
            @click="clickSave"
            :disabled="isLoading 
                        || initial.start.HH === input.start.HH 
                        && ( initial.start.mm === input.start.mm 
                        && initial.end.HH === input.end.HH 
                        && initial.end.mm === input.end.mm )
                        "
            >
                <i v-if="!isLoading" class="fa fa-floppy-o"></i>
                <i v-else class="fa fa-refresh fa-spin"></i>
        </button> 
        -->
    </span>
</template>

<script>
import startTimePicker from './time-picker.vue';
import endTimePicker from './time-picker.vue';

export default {
    components: {
        'startTimePicker': startTimePicker, 
        'endTimePicker': endTimePicker
    },

//    props: [
//        'minuteInterval',
//        'startTime',
//        'endTime',
//        'action',
//        'isLoading',
//        'inputWidth',
//        'menuHeight'
//    ],

    props: {
        minuteInterval: { type: Number },
        startTime:      { type: String }, // HH:mm:ss
        endTime:        { type: String }, // HH:mm:ss
        action:         { type: Function },
        isLoading:      { type: Boolean },
        inputWidth:     { type: Number, default: 80 },
        menuHeight:     { type: Number, default: 280 },
        ready:          { type: Boolean, required: true }
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

            isDropdownOpen: false
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
        }
    },

    methods: {
        onDropdownOpen(value) {
            this.isDropdownOpen = value;

            if( value === true ) return;

            this.$nextTick(() => {
                this.$emit('update:ready', !this.hasError);
            });
        },

//        clickSave() {
//            this.action({ 
//                start: this.startTimeResult, 
//                end: this.endTimeResult 
//            });
//        },
    },

    watch: {
        'input.start.HH': function() {
            if(!this.isDropdownOpen)
                this.$emit('update:ready', !this.hasError);
        },

        'input.start.mm': function() {
            if(!this.isDropdownOpen)
                this.$emit('update:ready', !this.hasError);
        },

        'input.end.HH': function() {
            if(!this.isDropdownOpen)
                this.$emit('update:ready', !this.hasError);
        },

        'input.end.mm': function() {
            if(!this.isDropdownOpen)
                this.$emit('update:ready', !this.hasError);
        },
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

        this.$emit('update:ready', !this.hasError);
    }
}
</script>
