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

    props: [
        'minuteInterval',
        'startTime',
        'endTime',
        'action',
        'isLoading',
        'inputWidth',
        'menuHeight'
    ],

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
            return this.input.start.HH + ':' + this.input.start.mm;
        },
        
        endTimeResult: function() {
            return this.input.end.HH + ':' + this.input.end.mm;
        },

        hasError: function() {
            if( this.isDropdownOpen ) {
                return false;
            }

            if( this.input.start.HH == '' 
                    || this.input.start.mm == '' 
                    || this.input.end.HH == '' 
                    || this.input.end.mm == '' ) {
                return false;
            }

            if( this.input.start.HH < this.input.end.HH ) {
                return false;
            }

            if( this.input.start.HH > this.input.end.HH ) {
                return true;
            }

            if( this.input.start.mm >= this.input.end.mm ) {
                return true;
            }
        }
    },

    methods: {
        onDropdownOpen(value) {
            this.isDropdownOpen = value;
        },

        clickSave() {
            this.action({ 
                start: this.startTimeResult, 
                end: this.endTimeResult 
            });
        },
    },

//    watch: {
//        'input.end.HH': function() {
//            this.input.end.mm === '' ? this.input.end.mm = '00' : '';
//        }
//    },

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

<style lang="scss" scoped>
.time-range-picker {

}
</style>
