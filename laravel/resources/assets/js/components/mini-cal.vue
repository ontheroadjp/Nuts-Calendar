<template>
    <!--<div v-show="isShow" class="calendar" :style="{'left':x+'px','top':y+'px'}"> -->
<div v-show="isShow" class="calendar">
    <div class="calendar-tools">{{ getYearAndMonth(year + '-' + monthString + '-01') }}</div>
    <table cellpadding="5">
        <thead>
            <tr><td v-for="week in weeks" class="week">{{ week }}</td></tr>
        </thead>
        <tbody>
            <tr v-for="(day, k1) in days">
                <td 
                    v-for="(child, k2) in day" 
                    :class="{ 'selected': child.selected, 'disabled': child.disabled }"
                    @click="select(k1, k2, $event)" 
                    @touchstart="select(k1, k2, $event)"
                    @drop.stop="handleDrop(child)"
                >
                    <span
                        @dragenter="child.selected = true"
                        @dragleave="child.selected = false"
                        @dragover="handleDragOver($event)"
                    >{{ child.day }}</span>
                </td>
            </tr>
        </tbody>
    </table>

</div>
</template>

<script>
// -----------------------------------------------------
// forked from https://github.com/jinzhe/vue-calendar
// -----------------------------------------------------

import { mapActions } from 'vuex';
import core from '../mixins/core.js';
import dateUtilities from '../mixins/date-utilities.js';

export default {
    mixins: [ core, dateUtilities ],

    props: {
        isShow:       { type: Boolean,    default: false },
        type:       { type: String,     default: "date" },
        value:      { type: String,     default: "" },
//        x:          { type: Number,     default: 0 },
//        y:          { type: Number,     default: 0 },
//        begin:      { type: String,     default: "" },
//        end:        { type: String,     default: "" },
//        range:      { type: Boolean,    default: false },
//        rangeBegin: { type: Array, default: Array },
//        rangeEnd:   { type: Array, default: Array },
        sep:        { type: String,     default: "-" },
        weeks:      { type: Array,      default: () => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
        months:     { type: Array,      default: () => ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12' ] }
    },

    data() {
        return {
            year: 0,
            month: 0,
            day: 0,
//            hour: 0,
//            minute: 0,
//            second: 0,
            days: [],
            today: [],
            currentMonth: Number,
            monthString:""
        }
    },

    created() {
        this.init()
    },

    watch: {
        value() {
            this.init()
        }
    },

    methods: {
        ...mapActions('action/item/dnd', {
            setOnMiniCal: 'setOnMiniCal',
            dragOver: 'dragOver'
        }),

        handleDragOver: function(e) {
            this.dragOver({e});
        },

        handleDrop(child) {
            child.selected = false;
            u.clog('------------------------------');
            u.clog('year: ' + this.year);
            u.clog('month: ' + this.month + 1);
            u.clog('day: ' + child.day);
            u.clog('------------------------------');
        },

        zero: (n) => { return n < 10 ? '0' + n : n },

        init(){
//            var now = new Date();
//            if (this.value != "") {
                if (this.value.indexOf("-") != -1) this.sep = "-"
                if (this.value.indexOf(".") != -1) this.sep = "."
                if (this.value.indexOf("/") != -1) this.sep = "/"
                if (this.type == "date") {
                    var split = this.value.split(this.sep)
                    this.year = parseInt(split[0])
                    this.month = parseInt(split[1]) - 1
                    this.day = parseInt(split[2])
//                } else if (this.type == "datetime") {
//                    var split = this.value.split(" ")
//                    var splitDate = split[0].split(this.sep)
//                    this.year = parseInt(splitDate[0])
//                    this.month = parseInt(splitDate[1]) - 1
//                    this.day = parseInt(splitDate[2])
//                    if (split.length > 1) {
//                        var splitTime = split[1].split(":")
//                        this.hour = splitTime[0]
//                        this.minute = splitTime[1]
//                        this.second = splitTime[2]
//                    }
                }
//                if (this.range) {
//                    var split = this.value.split(" ~ ")
//                    if (split.length > 1) {
//                        var beginSplit = split[0].split(this.sep)
//                        var endSplit = split[1].split(this.sep)
//                        this.rangeBegin = [parseInt(beginSplit[0]), parseInt(beginSplit[1] - 1), parseInt(beginSplit[2])]
//                        this.rangeEnd = [parseInt(endSplit[0]), parseInt(endSplit[1] - 1), parseInt(endSplit[2])]
//                    }
//                }
//            } else {
//                if(this.sep=="")this.sep = "/"
//                this.year = now.getFullYear()
//                this.month = now.getMonth()
//                this.day = now.getDate()
//                this.hour = this.zero(now.getHours())
//                this.minute = this.zero(now.getMinutes())
//                this.second = this.zero(now.getSeconds())
//                if (this.range) {
//                    this.rangeBegin = Array
//                    this.rangeEnd = Array
//                }
//            }
            this.monthString=this.months[this.month]

//            u.clog('year: ' + this.year);
//            u.clog('month: ' + this.month);

            this.render(this.year, this.month)
        },

        render(y, m) {
//            if (!this.range) {
//                this.rangeBegin = []
//                this.rangeEnd = []
//            }
            var firstDayOfMonth = new Date(y, m, 1).getDay()         //当月第一天
            var lastDateOfMonth = new Date(y, m + 1, 0).getDate()    //当月最后一天
            var lastDayOfLastMonth = new Date(y, m, 0).getDate()     //最后一月的最后一天

//            u.clog('firstDayOfMonth: ' + firstDayOfMonth);
//            u.clog('lastDateOfMonth: ' + lastDateOfMonth);
//            u.clog('lastDayOfLastMonth: ' + lastDayOfLastMonth);

            this.year = y
            this.currentMonth = this.months[m]
            var seletSplit = this.value.split(" ")[0].split(this.sep)
            var i, line = 0,temp = []
            for (i = 1; i <= lastDateOfMonth; i++) {
                var dow = new Date(y, m, i).getDay()
                // 第一行
                if (dow == 0) {
                    temp[line] = []
                } else if (i == 1) {
                    temp[line] = []
                    var k = lastDayOfLastMonth - firstDayOfMonth + 1
                    for (var j = 0; j < firstDayOfMonth; j++) {
                        temp[line].push({
                            day: k,
                            disabled: true
                        })
                        k++;
                    }
                }
                // 如果是日期范围
//                if (this.range) {
//                    var options = {
//                        day: i
//                    }
//                    if (this.rangeBegin.length > 0) {
//                        var beginTime = Number(new Date(this.rangeBegin[0], this.rangeBegin[1], this.rangeBegin[2]))
//                        var endTime = Number(new Date(this.rangeEnd[0], this.rangeEnd[1], this.rangeEnd[2]))
//                        var thisTime = Number(new Date(this.year, this.month, i))
//                        if (beginTime <= thisTime && endTime >= thisTime) {
//                            options.selected = true
//                        }
//                    }
//                    temp[line].push(options)
//                } else {
                    // 单选模式
                    var chk = new Date()
                    var chkY = chk.getFullYear()
                    var chkM = chk.getMonth()
                    // 匹配上次选中的日期
                    if (
                        parseInt(seletSplit[0]) == this.year &&
                        parseInt(seletSplit[1]) - 1 == this.month &&
                        parseInt(seletSplit[2]) == i) {
                        temp[line].push({
                            day: i,
                            selected: true
                        })
                        this.today = [line, temp[line].length - 1]
                    }
                     // 没有默认值的时候显示选中今天日期
                    else if (chkY == this.year && chkM == this.month && i == this.day && this.value == "") {
                        temp[line].push({
                            day: i,
                            selected: true
                        })
                        this.today = [line, temp[line].length - 1]
                    }else{
                        // 设置可选范围
                        // console.log(this.begin,this.end);
                         var options = {
                            day: i,
                            selected: false
                        }
//                        if (this.begin != "") {
//                            var beginSplit = this.begin.split(this.sep)
//                            var beginTime = Number(new Date(
//                                parseInt(beginSplit[0]),
//                                parseInt(beginSplit[1]) - 1,
//                                parseInt(beginSplit[2])
//                            ))
//                            if (beginTime > Number(new Date(this.year, this.month, i))) options.disabled = true
//                        }
//                        if (this.end != ""){
//                            var endSplit = this.end.split(this.sep)
//                            var endTime = Number(new Date(
//                                parseInt(endSplit[0]),
//                                parseInt(endSplit[1]) - 1,
//                                parseInt(endSplit[2])
//                            ))
//                            if (endTime <  Number(new Date(this.year, this.month, i))) options.disabled = true
//                        }
                        temp[line].push(options)
                    }
//                }
                // 最后一行
                if (dow == 6) {
                    line++
                } else if (i == lastDateOfMonth) {
                    var k = 1
                    for (dow; dow < 6; dow++) {
                        temp[line].push({
                            day: k,
                            disabled: true
                        })
                        k++
                    }
                }
            } //end for
            this.days = temp
        }
    }
}
</script>

<style lang="scss" scoped>
/*
.mini-cal-fade-enter-active, .mini-cal-fade-leave-active {
    transition: all .6s ease;
}

.mini-cal-fade-enter, .mini-cal-fade-leave-to {
    opacity: 0;
}
*/

.calendar {
    width: 300px;
    padding: 10px;
    background: #fff;
    position: absolute;
    border: 1px solid #dedede;
    border-radius: 2px;
    opacity: 0.95;
    transition: all 0.5s ease;

    &::before {
        position: absolute;
        content: "";
        border: 5px solid rgba(0, 0, 0, 0);
        border-bottom-color: #dedede;
    }

    &::after {
        content: "";
        border: 5px solid rgba(0, 0, 0, 0);
        border-bottom-color: #fff;
    }

    & table {
        clear: both;
        width: 100%;
        margin-bottom: 10px;
        border-collapse: collapse;
        color: #444;
    }

    & thead td {
        text-transform: uppercase;
    }

    & td {
        margin: 2px !important;
        padding: 0;
        width: 14.28571429%;
        height: 34px;
        text-align: center;
        vertical-align: middle;
        font-size: 14px;
        line-height: 125%;
        cursor: pointer;

        &.week {
            pointer-events: none !important;
            cursor: default !important;
        }

        &.disabled {
            color: #c0c0c0;
            pointer-events: none !important;
            cursor: default !important;
        }

        & span {
            display: block;
            height: 30px;
            line-height: 30px;
            margin: 2px;
            border-radius: 2px;

            &:hover {
                background: #f3f8fa;
            }
        }

        &.selected {
            & span {
                background-color: #5e7a88;
                color: #fff;

                &:hover {
                    background-color: #5e7a88;
                    color: #fff;
                }
            }
        }
    }
}

.calendar-tools {
    height: 32px;
    font-size: 20px;
    line-height: 32px;
    color: #5e7a88;

    & .float.left {
        float: left;
    }

    & .float.right {
        float: right;
    }

    & input {
        font-size: 20px;
        line-height: 32px;
        color: #5e7a88;
        width: 70px;
        text-align: center;
        border: none;
        background-color: transparent;
    }

    & span {
        cursor: pointer;
    }
}

.calendar-button {
    text-align: center;

    & span {
        cursor: pointer;
        display: inline-block;
        min-height: 1em;
        min-width: 5em;
        vertical-align: baseline;
        background: #5e7a88;
        color: #fff;
        margin: 0 0.25em 0 0;
        padding: 0.6em 2em;
        font-size: 1em;
        line-height: 1em;
        text-align: center;
        border-radius: 0.3em;

        &.cancel {
            background: #efefef;
            color: #666;
        }
    }
}
</style>
