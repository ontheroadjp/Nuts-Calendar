<template>
<div>

    <div style="margin-bottom: 25px;">
        <all-day-checkbox
            label="終日"
            :initialValue="Boolean(initial.isAllDay)"
            @changeValue="onChangeIsAllDay"
            :disabled="disabled"
        ></all-day-checkbox>
    </div>

    <div style="margin-bottom: 15px;">
        <button @click="startOrEnd = 'start'; fireEvent()"
            class="button"
            style="font-size: 0.8rem;"
            :style="startOrEnd == 'start' ? style.primary : ''"
            :disabled="disabled || input.isAllDay"
        >開始時刻</button>

        <button @click="startOrEnd = 'end'; fireEvent()"
            class="button"
            style="font-size: 0.8rem;"
            :style="startOrEnd == 'end' ? style.primary : ''"
            :disabled="disabled || input.isAllDay"
        >終了時刻</button>

        <button v-show="startOrEnd === 'end'" v-for="val in endTimeButtonValues" class="button"
            style="font-size: 0.8rem; border-radius: 15px"
            @click="clickEndTimeButton(val)"
            :disabled="disabled || input.isAllDay"
            >{{ val < 60 ? val + 'min' : (val / 60) + 'hr' }}
        </button>
    </div>

    <div><span style="font-size: 0.8rem;">時</span></div>
    <div v-for="line in timeButtonLabels.HH" style="margin-bottom: 10px;" >
        <button v-for="val in line" class="button"
            style="font-size: 0.8rem; border-radius: 5px; width: 2rem; margin-right: 1px;"
            :style="isSelectedTime(val, 'HH')"
            @click="setTime(val, 'HH')"
            :disabled="disabled || input.isAllDay || isButtonDisabled(val, 'HH')"
            >{{ val }}
        </button>
    </div>

    <div><span style="font-size: 0.8rem;">分</span></div>
    <div v-for="line in timeButtonLabels.MM" style="margin-bottom: 10px;" >
        <button v-for="val in line" class="button"
            style="font-size: 0.8rem; border-radius: 5px; width: 2rem; margin-right: 1px;"
            :style="isSelectedTime(val, 'mm')"
            @click="setTime(val, 'mm')"
            :disabled="disabled || input.isAllDay || isButtonDisabled(val, 'mm')"
            >{{ val }}
        </button>
    </div>

    <div v-show="hasError && !disabled"
        class="error-message"
    >{{ t('timePicker.error') }}</div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import core from '../../../../../mixins/core.js';
import allDayCheckbox from '../../../../../components/form/checkbox.vue';

export default {
    components: { allDayCheckbox },

    mixins: [ core ],

    props: {
        initialStartTime:   { type: String, default: '09:00:00' }, // HH:mm:ss or ''
        initialEndTime:     { type: String, default: '10:00:00' }, // HH:mm:ss or ''
        initialIsAllDay:    { type: Boolean, default: false },
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
                start: { HH: '', mm: '' },
                end  : { HH: '', mm: '' },
                isAllDay: ''
            },

            input: {
                start: { HH: '', mm: '' },
                end  : { HH: '', mm: '' },
                isAllDay: ''
            }
        }
    },

    computed: {
        ...mapState({
            theme: state => state.app.theme,
        }),

        style: function() {
            return {
                primary: {
                    'background-color': this.theme.primary.code,
                    'color': '#fff'
                }
            }
        },

        hasError: function() {
            const startHH = parseInt(this.input.start.HH);
            const startMM = parseInt(this.input.start.mm);
            const endHH = parseInt(this.input.end.HH);
            const endMM = parseInt(this.input.end.mm);

            if(startHH > endHH) return true;
            if(startHH === endHH && startMM > endMM) return true;

            return false;
        },

        isReady: function() {
            return ( parseInt(this.initial.start.HH) !== parseInt(this.input.start.HH)
                    || parseInt(this.initial.start.mm) !== parseInt(this.input.start.mm)
                    || parseInt(this.initial.end.HH) !== parseInt(this.input.end.HH)
                    || parseInt(this.initial.end.mm) !== parseInt(this.input.end.mm)
                ) && !this.hasError;
        }
    },

    methods: {
        isSelectedTime: function(val, HHorMM) {
            return this.input[this.startOrEnd][HHorMM] == val
                ? this.style.primary : '';
        },

        isButtonDisabled: function(val, HHorMM) {
            if( this.startOrEnd === 'start' ) return;
            switch(HHorMM) {
                case 'HH':
                    return this.input.start.HH > val ? true : false;
                    break;
                case 'mm':
                    const startHH = this.input.start.HH;
                    const startMM = this.input.start.mm;
                    const endHH = this.input.end.HH;
                    return startHH === endHH && startMM > val ? true : false;
                    break;
                default:
                    return true;
            }
        },

        onChangeIsAllDay(data) {
            this.input.isAllDay = data.value;
            this.fireEvent();
        },

        setTime(val, HHorMM) {
            this.input[this.startOrEnd][HHorMM] = parseInt(val);

            if( this.startOrEnd === 'start' ) {

                // start.HH > end.HH
                if(this.input.start.HH > this.input.end.HH) {
                    this.input.end.HH = parseInt(this.input.start.HH) + 1;
                }

                // start.HH == end.HH && start.mm > end.mm
                if( this.input.start.HH == this.input.end.HH
                        && this.input.start.mm > this.input.end.mm ) {
                    this.input.end.HH = parseInt(this.input.start.HH) + 1;
                }

                // start.HH == 23
                if(this.input.start.HH == 23) {
                    this.input.end.HH = 23;
                    if( this.input.start.mm > this.input.end.mm ) {
                        this.input.end.mm = 55;
                    }
                }
            }

            if( this.startOrEnd === 'end' ) {
                // start.HH > end.HH
                if(this.input.start.HH > this.input.start.HH) {
                    this.input.start.HH = this.input.end.HH - 1;
                }

                // start.HH == end.HH && start.mm > end.mm
                if(this.input.start.HH == this.input.end.HH
                    && this.input.start.mm > this.input.end.mm) {
                        this.input.start.HH = this.input.end.HH - 1;
                }

                // start.HH == 23
                if(this.input.end.HH == 23
                    && this.input.start.HH == 23
                    && this.input.start.mm > this.input.end.mm) {
                        this.input.start.mm = 0;
                }
            }

            this.fireEvent();
        },

        clickEndTimeButton(value) {
            const date = new Date(2018,1,1);
            date.setHours(this.input.start.HH);
            date.setMinutes(this.input.start.mm);
            date.setMinutes(date.getMinutes() + value);
            const endHH = date.getHours();
            const endMM = date.getMinutes();
            if(date.getDate() === 1) {
                this.input.end.HH = ("00" + endHH).slice(-4);
                this.input.end.mm = ("00" + endMM).slice(-2);
            } else {
                this.input.end.HH = 23;
                this.input.end.mm = 55;
            }

            this.fireEvent();
        },

        fireEvent: function() {
            const startHH = parseInt(this.input.start.HH);
            const startMM = ('00' + parseInt(this.input.start.mm)).slice(-2);
            const endHH = parseInt(this.input.end.HH);
            const endMM = ('00' + parseInt(this.input.end.mm)).slice(-2);
            const results = {
                isAllDay: this.input.isAllDay,
                startTime: startHH + ':' + startMM,
                endTime: endHH + ':' + endMM,
                isReady: this.isReady,
                hasError: this.hasError,
                startOrEnd: this.startOrEnd
            }
            this.$emit('changeValue', results);
        }
    },

    created: function() {
        this.initial.start.HH = this.initialStartTime.split(':')[0];
        this.initial.start.mm = this.initialStartTime.split(':')[1];
        this.input.start.HH = this.initial.start.HH;
        this.input.start.mm = this.initial.start.mm;

        this.initial.end.HH = this.initialEndTime.split(':')[0];
        this.initial.end.mm = this.initialEndTime.split(':')[1];
        this.input.end.HH = this.initial.end.HH;
        this.input.end.mm = this.initial.end.mm;

        this.initial.isAllDay = this.initialIsAllDay;
        this.input.isAllDay = this.initial.isAllDay;
    }
}
</script>

<style lang="scss" scoped>
.error-message {
    font-size: 0.8em;
    color: red;
    text-align: center;
}

.disabled {
    color: rgb(190, 190, 190);
}
</style>
