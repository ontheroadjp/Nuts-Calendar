// This file is based on phoenixwong/vue2-timepicker
<template>
<span class="time-picker">

    <input :class="['display-time', 'thin', { disabled: disabled }]" 
        type="text" 
        :style="[style.input]" 
        v-model="displayTime" 
        @click.stop="toggleDropdown($event)" 
        :disabled="disabled"
        readonly />

    <div v-show="error && !disabled" class="error-message">Error</div>

    <span class="clear-btn" 
        v-if="!hideClearButton" 
        v-show="!showDropdown && showClearBtn" 
        @click.stop="clearTime"
    >&times;</span>

    <div class="time-picker-overlay" 
        v-if="showDropdown" 
        @click.stop="toggleDropdown($event)"
    ></div>

    <div v-show="showDropdown" class="dropdown" :style="[style.dropdown]">
        <div class="select-list thin" :style="[style.selectList]">
            <ul class="hours">
                <li class="hint" v-text="hourType"></li>
                <li v-for="hr in hours" 
                    v-text="hr" 
                    :class="{active: hour === hr}" 
                    @click.stop="select('hour', hr)"
                ></li>
            </ul>
            <ul class="minutes">
                <li class="hint" v-text="minuteType"></li>
                <li v-for="m in minutes" 
                    v-text="m" 
                    :class="{active: minute === m}" 
                    @click.stop="select('minute', m)"
                ></li>
            </ul>
            <ul class="seconds" v-if="secondType">
                <li class="hint" v-text="secondType"></li>
                <li v-for="s in seconds" 
                    v-text="s" 
                    :class="{active: second === s}" 
                    @click.stop="select('second', s)"
                ></li>
            </ul>
            <ul class="apms" v-if="apmType">
                <li class="hint" v-text="apmType"></li>
                <li v-for="a in apms" 
                    v-text="a" 
                    :class="{active: apm === a}" 
                    @click.stop="select('apm', a)"
                ></li>
            </ul>
        </div><!-- / .select-list -->

        <div class="thin" 
            :style="[style.dropdownFooter]" 
            @click.stop="toggleDropdown($event)"
        >done</div>

    </div><!-- // .dropdown -->

</span><!-- // .time-pocker -->
</template>

<script>
const CONFIG = {
    HOUR_TOKENS: ['HH', 'H', 'hh', 'h', 'kk', 'k'],
    MINUTE_TOKENS: ['mm', 'm'],
    SECOND_TOKENS: ['ss', 's'],
    APM_TOKENS: ['A', 'a']
}

export default {
    name: 'VueTimepicker',

    props: {
//        value:              { type: Object },
        initialValue:       { type: Object, default: {} },
        hideClearButton:    { type: Boolean, default: false },
        format:             { type: String, default: 'HH:mm' },
        minuteInterval:     { type: Number, default: 5 },
        secondInterval:     { type: Number, default: 10 },
        dropdownHeight:     { type: Number, default: 280 }, // by px
        inputHeight:        { type: Number, default: 35 },  // by px
        inputWidth:         { type: Number, default: 100 }, // by px
        disabled:           { type: Boolean, default: false }
    },

    data() {
        return {
//            value: {},
            inputValue: {},
            hours: [],
            minutes: [],
            seconds: [],
            apms: [],
            showDropdown: false,
            muteWatch: false,
            hourType: 'HH',
            minuteType: 'mm',
            secondType: '',
            apmType: '',
            hour: '',
            minute: '',
            second: '',
            apm: '',
            fullValues: undefined,
            dropdownPosition: {
                top: '0px',
                left: '0px'
            }
        }
    },

    computed: {
        displayTime () {
            let formatString = String((this.format || 'HH:mm'))
                if (this.hour) {
                    formatString = formatString.replace(new RegExp(this.hourType, 'g'), this.hour)
                }
            if (this.minute) {
                formatString = formatString.replace(new RegExp(this.minuteType, 'g'), this.minute)
            }
            if (this.second && this.secondType) {
                formatString = formatString.replace(new RegExp(this.secondType, 'g'), this.second)
            }
            if (this.apm && this.apmType) {
                formatString = formatString.replace(new RegExp(this.apmType, 'g'), this.apm)
            }
            return formatString
        },

        showClearBtn () {
            if ( ((this.hour && this.hour !== '') || 
                 (this.minute && this.minute !== '')) && 
                 !this.disabled
            ) {
                return true
            }
            return false
        },

        error: function() {
            if( (this.hour == '' && this.minute != '') 
                || (this.hour != '' && this.minute == '') 
            ) { return true; }

            return false;
        },

        style: function(){
            return {
                dropdown: {
                    height: this.dropdownHeight + 'px',
                    top: this.dropdownPosition.top,
                    left: this.dropdownPosition.left
                },

                selectList: {
                    height: this.dropdownHeight + 'px'
                },

                input: {
                    height: this.inputHeight + 'px',
                    width: this.inputWidth + 'px'
                },

                dropdownFooter: {
                    'position': 'absolute',
                    'top': `calc(${this.dropdownHeight}px + 10px)`,
                    'left': `calc(((${this.inputWidth}px + ${this.inputWidth}px + 4px)/2) - (${this.inputWidth}px * 1.2) / 2)`,
                    'width': this.inputWidth * 1.2 + 'px',
                    'padding': '3px',
                    'background-color': 'rgb(104, 127, 137)',
                    'color': '#fff',
                    'text-align': 'center',
                    'cursor': 'pointer',
                    'border-radius': '5px',
                    'z-index': '99'
                }
            }
        }
    },

    watch: {
        'format': 'renderFormat',
        minuteInterval (newInteval) {
            this.renderList('minute', newInteval)
        },

        secondInterval (newInteval) {
            this.renderList('second', newInteval)
        },

//        'value': 'readValues',
        'inputValue': 'readValues',
        'displayTime': 'fillValues'
    },

    methods: {
        formatValue (type, i) {
            switch (type) {
                case 'H':
                case 'm':
                case 's':
                    return String(i)
                case 'HH':
                case 'mm':
                case 'ss':
                    return i < 10 ? `0${i}` : String(i)
                case 'h':
                case 'k':
                    return String(i + 1)
                case 'hh':
                case 'kk':
                    return (i + 1) < 10 ? `0${i + 1}` : String(i + 1)
                default:
                    return ''
            }
        },

        checkAcceptingType (validValues, formatString, fallbackValue) {
            if (!validValues || !formatString || !formatString.length) { 
                return '' 
            }

            for (let i = 0; i < validValues.length; i++) {
                if (formatString.indexOf(validValues[i]) > -1) {
                    return validValues[i]
                }
            }
            return fallbackValue || ''
        },

        renderFormat (newFormat) {
            newFormat = newFormat || this.format
            if (!newFormat || !newFormat.length) {
                newFormat = 'HH:mm'
            }

            this.hourType = this.checkAcceptingType(CONFIG.HOUR_TOKENS, newFormat, 'HH')
            this.minuteType = this.checkAcceptingType(CONFIG.MINUTE_TOKENS, newFormat, 'mm')
            this.secondType = this.checkAcceptingType(CONFIG.SECOND_TOKENS, newFormat)
            this.apmType = this.checkAcceptingType(CONFIG.APM_TOKENS, newFormat)

            this.renderHoursList()
            this.renderList('minute')

            if (this.secondType) {
                this.renderList('second')
            }

            if (this.apmType) {
                this.renderApmList()
            }

            const self = this
            this.$nextTick(() => {
                self.readValues()
            })
        },

        renderHoursList () {
            const hoursCount = (this.hourType === 'h' || this.hourType === 'hh') ? 12 : 24
            this.hours = []
            for (let i = 0; i < hoursCount; i++) {
                this.hours.push(this.formatValue(this.hourType, i))
            }
        },

        renderList (listType, interval) {
            if (listType === 'second') {
                interval = interval || this.secondInterval
            } else if (listType === 'minute') {
                interval = interval || this.minuteInterval
            } else {
                return
            }

            if (interval === 0) {
                interval = 60
            } else if (interval > 60) {
                window.console.warn('`' + listType + '-interval` should be less than 60. Current value is', interval)
                interval = 1
            } else if (interval < 1) {
                window.console.warn('`' + listType + '-interval` should be NO less than 1. Current value is', interval)
                interval = 1
            } else if (!interval) {
                interval = 1
            }

            if (listType === 'minute') {
                this.minutes = []
            } else {
                this.seconds = []
            }

            for (let i = 0; i < 60; i += interval) {
                if (listType === 'minute') {
                    this.minutes.push(this.formatValue(this.minuteType, i))
                } else {
                    this.seconds.push(this.formatValue(this.secondType, i))
                }
            }
        },

        renderApmList () {
            this.apms = []
            if (!this.apmType) { return }
            this.apms = this.apmType === 'A' ? ['AM', 'PM'] : ['am', 'pm']
        },

        readValues () {
//            if (!this.value || this.muteWatch) { return }
            if (!this.inputValue || this.muteWatch) { return }

//            const timeValue = JSON.parse(JSON.stringify(this.value || {}))
            const timeValue = JSON.parse(JSON.stringify(this.inputValue || {}))

            const values = Object.keys(timeValue);
            if (values.length === 0) { return }

            if (values.indexOf(this.hourType) > -1) {
                this.hour = timeValue[this.hourType]
            }

            if (values.indexOf(this.minuteType) > -1) {
                this.minute = timeValue[this.minuteType]
            }

            if (values.indexOf(this.secondType) > -1) {
                this.second = timeValue[this.secondType]
            } else {
                this.second = 0
            }

            if (values.indexOf(this.apmType) > -1) {
                this.apm = timeValue[this.apmType]
            }

            this.fillValues()
        },

        fillValues () {
            let fullValues = {}

            const baseHour = this.hour
            const baseHourType = this.hourType

            const hourValue = baseHour || baseHour === 0 ? Number(baseHour) : ''
            const baseOnTwelveHours = this.isTwelveHours(baseHourType)
            const apmValue = (baseOnTwelveHours && this.apm) ? String(this.apm).toLowerCase() : false

            CONFIG.HOUR_TOKENS.forEach((token) => {
                if (token === baseHourType) {
                    fullValues[token] = baseHour
                    return
                }

                let value
                let apm
                switch (token) {
                    case 'H':
                    case 'HH':
                        if (!String(hourValue).length) {
                            fullValues[token] = ''
                            return

                        } else if (baseOnTwelveHours) {
                            if (apmValue === 'pm') {
                                value = hourValue < 12 ? hourValue + 12 : hourValue
                            } else {
                                value = hourValue % 12
                            }

                        } else {
                            value = hourValue % 24
                        }

                        fullValues[token] = (token === 'HH' && value < 10) 
                            ? `0${value}` 
                            : String(value)
                            break

                    case 'k':
                    case 'kk':
                        if (!String(hourValue).length) {
                            fullValues[token] = ''
                            return

                        } else if (baseOnTwelveHours) {
                            if (apmValue === 'pm') {
                                value = hourValue < 12 ? hourValue + 12 : hourValue
                            } else {
                                value = hourValue === 12 ? 24 : hourValue
                            }

                        } else {
                            value = hourValue === 0 ? 24 : hourValue
                        }

                        fullValues[token] = (token === 'kk' && value < 10) ? `0${value}` : String(value)
                        break

                    case 'h':
                    case 'hh':
                        if (apmValue) {
                            value = hourValue
                            apm = apmValue || 'am'

                        } else {
                            if (!String(hourValue).length) {
                                fullValues[token] = ''
                                fullValues.a = ''
                                fullValues.A = ''
                                return

                            } else if (hourValue > 11) {
                                apm = 'pm'
                                value = hourValue === 12 ? 12 : hourValue % 12

                            } else {
                                if (baseOnTwelveHours) {
                                    apm = ''
                                } else {
                                    apm = 'am'
                                }
                                value = hourValue % 12 === 0 ? 12 : hourValue
                            }
                        }

                        fullValues[token] = (token === 'hh' && value < 10) ? `0${value}` : String(value)
                        fullValues.a = apm
                        fullValues.A = apm.toUpperCase()
                        break
                    }
            })

            if (this.minute || this.minute === 0) {
                const minuteValue = Number(this.minute)
                fullValues.m = String(minuteValue)
                fullValues.mm = minuteValue < 10 ? `0${minuteValue}` : String(minuteValue)
            } else {
                fullValues.m = ''
                fullValues.mm = ''
            }

            if (this.second || this.second === 0) {
                const secondValue = Number(this.second)
                fullValues.s = String(secondValue)
                fullValues.ss = secondValue < 10 ? `0${secondValue}` : String(secondValue)
            } else {
                fullValues.s = ''
                fullValues.ss = ''
            }

            this.fullValues = fullValues
            this.updateTimeValue(fullValues)
//            this.$emit('change', {data: fullValues})
        },

        updateTimeValue (fullValues) {
            this.muteWatch = true
            const self = this
//            const baseTimeValue = JSON.parse(JSON.stringify(this.value || {}))
            const baseTimeValue = JSON.parse(JSON.stringify(this.inputValue || {}))
            let timeValue = {}

            Object.keys(baseTimeValue).forEach((key) => {
                timeValue[key] = fullValues[key]
            })

//            this.$emit('input', timeValue)
            this.fireEvents();

            this.$nextTick(() => {
                self.muteWatch = false
            })
        },

        fireEvents() {
            const ready = !this.error 
                    && ( (this.hour != this.initialValue.HH) 
                    || (this.minute != this.initialValue.mm) );

            const data = {
                error: this.error,
                isReady: ready,
                initialValue: {
                    HH: this.initialValue.HH,
                    mm: this.initialValue.mm
                },

                inputValue: {
                    HH: this.hour,
                    mm: this.minute
                },

                isDropdownOpened: this.showDropdown
            }

            this.$emit('changeValue', data);
        },

        isTwelveHours (token) {
            return token === 'h' || token === 'hh'
        },

        setDropdownPositionX(e) {
            const x = e.pageX;
            const rightEdge = window.innerWidth;
            const dropdownWidth = this.inputWidth * 2;
            const margin = rightEdge - x - dropdownWidth;

            if( margin < ((this.inputWidth * -1)) ) {
                this.dropdownPosition.left = ((this.inputWidth * -1) + 10) + 'px';
            } else if( margin < 10 ) {
                this.dropdownPosition.left = (margin - 10) + 'px';
            } else {
                this.dropdownPosition.left = '0px';
            }

        },

        setDropdownPositionY(e) {
            const y = e.pageY;
            const scrollPositionY = document.body.scrollTop;
            const bottomEdge = window.innerHeight + scrollPositionY;
            const dropdownFooterHeigh = 30; // visually estimate value;
            const margin = bottomEdge - y - this.inputHeight - this.dropdownHeight - dropdownFooterHeigh;

//            u.clog('-----------------------');
//            u.clog('y: ' + y);
//            u.clog('scrollPositionY: ' + scrollPositionY);
//            u.clog('window.innerHeight: ' + window.innerHeight);
//            u.clog('bottomEdge: ' + bottomEdge);
//            u.clog('inputHeight: ' + this.inputHeight);
//            u.clog('dropdownHeight: ' + this.dropdownHeight);
//            u.clog('dropdownFooterHeigh: ' + dropdownFooterHeigh);
//            u.clog('margin: ' + margin);

            if( margin < 0 ) {
                this.dropdownPosition.top = (this.inputHeight + 5) + (margin - 5) + 'px';
            } else if( margin < 5 ) {
                this.dropdownPosition.top = (this.inputHeight + 5) - (5 - margin) + 'px';
            } else {
                this.dropdownPosition.top = (this.inputHeight + 5) + 'px';
            }

            u.clog('this.dropdownPosition.top: ' + this.dropdownPosition.top);
        },

        toggleDropdown (e) {
            this.setDropdownPositionX(e);
            this.setDropdownPositionY(e);

            this.showDropdown = !this.showDropdown;
            this.fireEvents();
        },

        select (type, value) {
            if (type === 'hour') {
                this.hour = value
            } else if (type === 'minute') {
                this.minute = value
            } else if (type === 'second') {
                this.second = value
            } else if (type === 'apm') {
                this.apm = value
            }
        },

        clearTime () {
            this.hour = '';
            this.minute = '';
            this.second = '';
            this.apm = '';
            this.fireEvents();
        }
    },

    mounted () {
//        this.value = this.initialValue;
        this.inputValue = this.initialValue;
        this.renderFormat();
    }
}
</script>

<style lang="scss" scoped>
.disabled {
    color: rgba(190, 190, 190, 1);
}

.time-picker {
    display: inline-block;
    position: relative;
    font-size: 1em;
    /* width: 10em; */
    font-family: sans-serif;
    vertical-align: top;

    & * {
        box-sizing: border-box;
    }

    & input.display-time {
        border: 1px solid #d2d2d2;
        width: 10em;
        height: 2.2em;
        padding: 0.3em 0.5em;
        font-size: 1em;
    }

    & .clear-btn {
        position: absolute;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        top: 0;
        right: 0;
        bottom: 0;
        margin-top: -0.15em;
        z-index: 3;
        font-size: 1.1em;
        line-height: 1em;
        vertical-align: middle;
        width: 1.3em;
        color: #d2d2d2;
        background: rgba(255,255,255,0);
        text-align: center;
        font-style: normal;
        transition: color .2s;

        &:hover {
            color: #797979;
            cursor: pointer;
        }
    }

    & .time-picker-overlay {
        z-index: 2;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    & .error-message {
        font-size: 0.8em;
        color: red;
        text-align: center;
    }

    & .dropdown {
        position: absolute;
        z-index: 5;
        top: calc(2.2em + 2px);
        left: 0;
        /* 'left': `calc(-10em + ${this.inputWidth}px)` */
        background: #fff;
        box-shadow: 0 1px 6px rgba(0,0,0,0.15);
        width: 10em;
        height: 10em;
        font-weight: normal;

        & .hint {
            color: #a5a5a5;
            cursor: default;
            font-size: 0.8em;
        }

        & .select-list {
            width: 10em;
            height: 10em;
            overflow: hidden;
            display: flex;
            flex-flow: row nowrap;
            align-items: stretch;
            justify-content: space-between;
        }
        
        & ul {
            padding: 0;
            margin: 0;
            list-style: none;
        
            flex: 1;
            overflow-x: hidden;
            overflow-y: auto;

            &.minutes,
            &.seconds,
            &.apms {
                border-left: 1px solid #fff;
            }

            & li {
                text-align: center;
                padding: 0.3em 0;
                color: #161616;

                &:not(.hint):hover {
                    background: rgba(0,0,0,.08);
                    color: #161616;
                    cursor: pointer;
                }

                &.active,
                &.active:hover {
                    background: rgba(104, 127, 137, 0.6);
                    color: #fff;
                }
            }
        }
    }
}
</style>
