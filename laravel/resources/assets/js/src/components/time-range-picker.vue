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
            :hideClearButton="true"
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
            :hideClearButton="true"
            @changeValue="onChangeEnd"
            :disabled="disabled"
        ></endTimePicker>
    </div>

    <div style="margin-bottom: 15px;" >
        <button @click="startOrEnd = 'start'"
            class="button"
            style="font-size: 0.8rem;"
            :style="startOrEnd == 'start' ? style.primary : ''"
            :disabled="disabled"
        >開始時刻</button>

        <button @click="startOrEnd = 'end'"
            class="button"
            style="font-size: 0.8rem;"
            :style="startOrEnd == 'end' ? style.primary : ''"
            :disabled="disabled"
        >終了時刻</button>

        <button v-show="startOrEnd === 'end'" v-for="val in endTimeButtonValues" class="button"
            style="font-size: 0.8rem; border-radius: 15px"
            @click="clickEndTimeButton(val)"
            :disabled="disabled"
            >{{ val < 60 ? val + 'min' : (val / 60) + 'hr' }}
        </button>
    </div>

    <div><span style="font-size: 0.8rem;">時</span></div>
    <div v-for="line in timeButtonLabels.HH" style="margin-bottom: 10px;" >
        <button v-for="val in line" class="button"
            style="font-size: 0.8rem; border-radius: 5px; width: 2rem; margin-right: 1px;"
            :style="isActiveHH(val)"
            @click="setHH(val)"
            :disabled="disabled || isButtonDisabledHH(val)"
            >{{ val }}
        </button>
    </div>

    <div><span style="font-size: 0.8rem;">分</span></div>
    <div v-for="line in timeButtonLabels.MM" style="margin-bottom: 10px;" >
        <button v-for="val in line" class="button"
            style="font-size: 0.8rem; border-radius: 5px; width: 2rem; margin-right: 1px;"
            :style="isActiveMM(val)"
            @click="setMM(val)"
            :disabled="disabled || isButtonDisabledMM(val)"
            >{{ val }}
        </button>
    </div>




    <div v-show="errorResult && !error.start && !error.end && !disabled"
        class="error-message"
    >{{ t('timePicker.error') }}</div>
</div>
</template>

<script>
import { mapState } from 'vuex';
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
            endTimeButtonValues: [ 15, 30, 60, 120, 240 ],
            startOrEnd: 'start',
            timeButtonLabels: {
                HH: [
                    [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ],
                    [ 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
                ],
                MM: [
                    [ '00', '05', 10, 15, 20, 25, 30, 35, 40, 45, 50, 55 ]
                ]
            },

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
        ...mapState({
            theme: state => state.app.theme,
        }),

//        ...mapState('calendar/tableView/item/update', {
        ...mapState('item/update', {
            editingItem: 'editingItem',
            updateIsLoading: 'isLoading'
        }),

        style: function() {
            return {
                primary: {
                    'background-color': this.theme.primary.code,
                    'color': '#fff'
                }
            }
        },

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

        // --------------------------------------------------------------

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
        isActiveHH: function(val) {
            if( this.startOrEnd === 'start' ) {
                return this.input.start.HH == val
                    ? this.style.primary : '';
            }
            if( this.startOrEnd === 'end' ) {
                return this.input.end.HH == val
                    ? this.style.primary : '';
            }
        },

        isActiveMM: function(val) {
            if( this.startOrEnd === 'start' ) {
                return this.input.start.mm == val
                    ? this.style.primary : '';
            }
            if( this.startOrEnd === 'end' ) {
                return this.input.end.mm == val
                    ? this.style.primary : '';
            }
        },

        isButtonDisabledHH: function(val) {
            if( this.startOrEnd === 'end' ) {
                return this.input.start.HH > val ? true : false;
            }
            return false;
        },

        isButtonDisabledMM: function(val) {
            if( this.startOrEnd === 'end' ) {
                const startHH = this.input.start.HH;
                const endHH = this.input.end.HH;
                return startHH === endHH && this.input.start.mm > val ? true : false;
            }
            return false;
        },

        setHH(val) {
            if( this.startOrEnd === 'start' ) {
                this.$refs.startTimePicker.setHour(("00" + val).slice(-2));
            } else {
                this.$refs.endTimePicker.setHour(("00" + val).slice(-2));
            }
        },

        setMM(val) {
            if( this.startOrEnd === 'start' ) {
                this.$refs.startTimePicker.setMinutes(("00" + val).slice(-2));
            } else {
                this.$refs.endTimePicker.setMinutes(("00" + val).slice(-2));
            }
        },

        // ------------------------------------------------------

        clickEndTimeButton(value) {
            const date = new Date(2018,1,1);
            date.setHours(this.input.start.HH);
            date.setMinutes(this.input.start.mm);
            date.setMinutes(date.getMinutes() + value);
            const endHH = date.getHours();
            const endMM = date.getMinutes();
            if(date.getDate() === 1) {
                this.$refs.endTimePicker.setHour(("00" + endHH).slice(-2));
                this.$refs.endTimePicker.setMinutes(("00" + endMM).slice(-2));
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
