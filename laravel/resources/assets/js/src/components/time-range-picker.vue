<template>
<div class="time-range-picker">
    <div style="margin-bottom: 15px;" >
        <startTimePicker
            ref="startTimePicker"
            format="HH:mm"
            :initialValue="initial.start"
            :minute-interval="minuteInterval"
            :inputWidth="inputWidth"
            :dropdownHeight="dropdownHeight"
            :hideClearButton="false"
            @changeValue="onChangeStart"
            :disabled="disabled"
        ></startTimePicker>

        <span :class="{ 'disabled': disabled }"
            style="margin: 0 5px; line-height: 2rem;"
        >to</span>

        <endTimePicker
            ref="endTimePicker"
            format="HH:mm"
            :initialValue="initial.end"
            :minute-interval="minuteInterval"
            :inputWidth="inputWidth"
            :dropdownHeight="dropdownHeight"
            menuPosition="left"
            :hideClearButton="false"
            @changeValue="onChangeEnd"
            :disabled="disabled"
        ></endTimePicker>
    </div>

    <div style="margin-bottom: 25px;" >
        <button class="button"
            style="font-size: 0.8rem; border-radius: 15px"
            @click="clickEndTimeButton(15)"
            :disabled="disabled"
        >15min</button>
        <button class="button"
            style="font-size: 0.8rem; border-radius: 15px"
            @click="clickEndTimeButton(30)"
            :disabled="disabled"
        >30min</button>
        <button class="button"
            style="font-size: 0.8rem; border-radius: 15px"
            @click="clickEndTimeButton(60)"
            :disabled="disabled"
        >1hr</button>
        <button class="button"
            style="font-size: 0.8rem; border-radius: 15px"
            @click="clickEndTimeButton(120)"
            :disabled="disabled"
        >2hr</button>
        <button class="button"
            style="font-size: 0.8rem; border-radius: 15px"
            @click="clickEndTimeButton(240)"
            :disabled="disabled"
        >4hr</button>
    </div>


    <div v-show="errorResult && !error.start && !error.end && !disabled"
        class="error-message"
    >{{ t('timePicker.error') }}</div>
</div>
</template>

<script>
import core from '../mixins/core.js';
import startTimePicker from './time-picker.vue';
import endTimePicker from './time-picker.vue';

export default {
    components: { startTimePicker, endTimePicker },

    mixins: [ core ],

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
            if(this.disabled) return false;

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

        isReadyResult: function() {
            if(this.disabled) return false;

            // more than one true is true
            let childrenAreReady = Object.values(this.isReady);
            childrenAreReady = (childrenAreReady.indexOf(true) !== -1);

            return childrenAreReady && !this.errorResult && !this.isDropdownOpen;
        }
    },

    methods: {
        clickEndTimeButton(value) {
            const date = new Date(2018,1,1);
            date.setHours(this.input.start.HH);
            date.setMinutes(this.input.start.mm);
            date.setMinutes(date.getMinutes() + value);
            const endHH = date.getHours();
            const endMM = date.getMinutes();
            if(date.getDate() === 1) {
                this.$refs.endTimePicker.setHour(("00" + date.getHours()).slice(-2));
                this.$refs.endTimePicker.setMinutes(("00" + date.getMinutes()).slice(-2));
            } else {
                this.$refs.endTimePicker.setHour(23);
                this.$refs.endTimePicker.setMinutes(55);
            }
        },

        onChangeStart(data) {
            this.input.start.HH = data.inputValue.HH;
            this.input.start.mm = data.inputValue.mm;
            this.error.start = data.error;
            this.isReady.start = data.isReady;
            this.isDropdownOpened = data.isDropdownOpened;
//            u.clog('--------------- onChangeStart() -----------------');
//            u.clog('data.inputValue.HH: ' + data.inputValue.HH);
//            u.clog('data.inputValue.mm: ' + data.inputValue.mm);
//            u.clog('this.input.start.HH' + this.input.start.HH);
//            u.clog('this.input.start.mm' + this.input.start.mm);

            // start.HH > end.HH
            if(data.inputValue.HH > this.input.end.HH) {
                this.$refs.endTimePicker.setHour(
                    ("00" + (parseInt(data.inputValue.HH) + 1)).slice(-2)
                );
            }

            // start.HH == end.HH && start.mm > end.mm
            if( data.inputValue.HH == this.input.end.HH
                        && data.inputValue.mm > this.input.end.mm) {
                this.$refs.endTimePicker.setHour(
                    ("00" + (parseInt(data.inputValue.HH) + 1)).slice(-2)
                );
            }

            // start.HH == 23
            if(data.inputValue.HH == 23) {
                this.$refs.endTimePicker.setHour(23);
                if( data.inputValue.mm > this.input.end.mm ) {
                    this.$refs.endTimePicker.setMinutes(55);
                }
            }

            this.fireEvent();
        },

        onChangeEnd(data) {
            this.input.end.HH = data.inputValue.HH;
            this.input.end.mm = data.inputValue.mm;
            this.error.end = data.error;
            this.isReady.end = data.isReady;
            this.isDropdownOpened = data.isDropdownOpened;

            // start.HH > end.HH
            if(data.inputValue.HH < this.input.start.HH) {
                this.$refs.startTimePicker.setHour(
                    ("00" + (parseInt(data.inputValue.HH) - 1)).slice(-2)
                );
            }

            // start.HH == end.HH && start.mm > end.mm
            if(data.inputValue.HH == this.input.end.HH
                && data.inputValue.mm < this.input.end.mm) {
                    this.$refs.startTimePicker.setHour(
                        ("00" + (parseInt(data.inputValue.HH) - 1)).slice(-2)
                    );
            }

            // start.HH == 23
            if(data.inputValue.HH == 23
                && this.input.start.HH == 23
                && data.inputValue.mm < this.input.start.mm) {
                    this.$refs.startTimePicker.setMinute("00");
                }

            this.fireEvent();
        },

        fireEvent() {
            const data = {
                value: {
                    start: this.formattedStartTime,
                    end: this.formattedEndTime
                },

                error: this.errorResult,
                isReady: this.isReadyResult
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
        },

        disabled: function() {
            if( !this.disabled ) this.fireEvent();
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
