<template>
<div class="card thin" style="height: 100%; background-color: #fff;">
    <div class="main">
        <div class="content">
            <text-input 
                :initialValue="updateState.editingItem.content"
                :showError="true"
                :minTextLength="1"
                :height="110"
                placeholder="Title"
                @changeValue="onChangeContent"
                :disabled="showDeleteConfirm"
            ></text-input>
        </div>

        <div class="time-range">
            <timeRangePicker 
                :minute-interval="5"
                :initialStartTime="updateState.editingItem.start_time"
                :initialEndTime="updateState.editingItem.end_time"
                :inputWidth="80"
                :dropdownHeight="280"
                @changeValue="onChangeTimeRange"
                :disabled="input.allDay || showDeleteConfirm"
            ></timeRangePicker>
        </div>

        <div class="all-day">
            <all-day-checkbox
                :initialValue="updateState.editingItem.is_all_day"
                @changeValue="onChangeAllDayCheckbox"
                :disabled="showDeleteConfirm"
            ></all-day-checkbox>
        </div>

        <span class="label thin" style="font-size: 0.8em;">Memo</span>
        <textarea style=""></textarea>

    </div><!-- // .main -->

    <div class="popup-footer">
        <div v-show="!showDeleteConfirm" style="overflow:hidden">
            <a class="button strip" 
                :disabled="!isReadyResult"
                @click="clickSave()"
                ><i class="fa fa-floppy-o" style="margin-right: 5px"></i>Save
            </a>
    
            <a class="button strip" @click="showDeleteConfirm = true">
                <i class="fa fa-trash" style="margin-right: 5px"></i>Delete
            </a>
        </div>

        <transition name="delete-confirm">
            <div class="card delete-confirm" v-show="showDeleteConfirm">
                <p style="
                    display: flex;
                    justify-content: center;
                    height: 60%;
                "><i class="fa fa-exclamation-circle fa-5x" style="margin-top:60px"></i></p>
                <div class="delete-confirm-buttons">
                    <a class="button strip" 
                        style="color:#fff"
                        @click="clickDeleteOK()"
                    >OK</a>

                    <a class="button strip" 
                        style="color:#fff" 
                        @click="showDeleteConfirm = false"
                    >Cancel</a>
                </div>
            </div>
        </transition>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import textInput from '../../../../components/text-input.vue';
import timeRangePicker from '../../../../components/time-range-picker.vue';
import allDayCheckbox from './all-day-checkbox.vue';

export default {
    components: { textInput, timeRangePicker, allDayCheckbox},

    props: {
        'height': { type: Number, default: 320 },
        'width':  { type: Number, default: 280 }
    },

    data() {
        return {
            input: {
                content: '',
                startTime: '',
                endTime: '',
                allDay: ''
            },

            error: {
                content: false,
                timeRange: false,
                allDay: false
            },

            isReady: {
                content: false,
                timeRange: false,
                allDay: false
            },

            showDeleteConfirm: false
        }
    },

    computed: {
        ...mapState('calendar/tableView/item', {
            updateState: 'update'
        }),

        errorResult: function() {
            return (Object.values(this.error).indexOf(true) !== -1);
        },

        isReadyResult: function() {
            return (Object.values(this.isReady).indexOf(true) !== -1) && !this.errorResult;
        }
    },

    methods: {
        update() {
            u.clog('update ------------------');
        },

        onChangeContent(data) {
            this.input.content = data.inputValue;
            this.error.content = data.error;
            this.isReady.content = data.isReady;
            u.clog('----------------------- content ------------------------');
            u.clog('input value: ' + this.input.content);
            u.clog('error: ' + this.error.content);
            u.clog('isReady: ' + this.isReady.content);
        },

        onChangeTimeRange(data) {
            this.input.startTime = data.value.start;
            this.input.endTime = data.value.end;
            this.error.timeRange = data.error;
            this.isReady.timeRange = data.isReady;
            u.clog('----------------------- time range ------------------------');
            u.clog('start: ' + this.input.startTime);
            u.clog('end: ' + this.input.endTime);
            u.clog('error: ' + this.error.timeRange);
            u.clog('isReady: ' + this.isReady.timeRange);
        },

        onChangeAllDayCheckbox(data) {
            this.input.allDay = data.value;
            this.error.allDay = data.error;
            this.isReady.allDay = data.isReady;
            u.clog('----------------------- all day ------------------------');
            u.clog('value: ' + this.input.allDay);
            u.clog('error: ' + this.error.allDay);
            u.clog('isReady: ' + this.isReady.allDay);
        },

        clickSave() {
            u.clog('clickSave()');
        },

        clickDeleteOK() {
            u.clog('clickDeleteOK()');
        }
    },

    mounted: function() {
        this.input.content = this.updateState.editingItem.content; 
        this.input.startTime = this.updateState.editingItem.start_time; 
        this.input.endTime = this.updateState.editingItem.end_time; 
        if( typeof this.updateState.editingItem.is_all_day === 'number' ) {
            this.input.allDay = (this.updateState.editingItem.is_all_day > 0) 
        } else {
            this.input.allDay = this.updateState.editingItem.is_all_day; 
        }

//        const doc = window.document;
//        const css = doc.createElement('style');
//        const rule = document.createTextNode(`
//
//            .delete-confirm-enter-active,
//            .delete-confirm-leave-active {
//                transition: all .3s ease;
//            }
//            
//            .delete-confirm-leave-to,
//            .delete-confirm-enter {
//                height: 0;
//                opacity: 0;
//            }
//            
//            .delete-confirm-enter-to,
//            .delete-confirm-leave {
//                opacity: 1;
//                height: ${this.height}px;
//            }
//        `);
//
//        css.id = 'delete-confirm';
//        css.type = 'text/css';
//        css.appendChild(rule);
//        doc.getElementsByTagName('head')[0].appendChild(css);
    }
}    
</script>

<style lang="scss" scoped>
.main {
    padding: 20px;
}

.strip {
    border: none;
    border-radius: 0;
    box-shadow: none;
    background: none;
    outline: none;
    &:hover {
        border-bottom: 1px solid #red
    }
}

.content {
    margin-bottom: 20px;
} 

.time-range {
    margin-bottom: 5px;
}

.all-day {
    margin-bottom: 10px;
}

textarea {
    height: 110px;
    width: 100%; 
    padding: 1em;
    border: 1px solid #e6e6e6;
    outline: none;
    resize: none;
}

.popup-footer {
    position: absolute;
    bottom: 0;
    background-color: whitesmoke;
    width: 100%;
    padding: 5px;
    text-align: right;

    & a:hover {
        border: 1px solid #e6e6e6;
    }
}

.delete-confirm {
    background-color: red;
    padding: 10px;
    color: #fff;
    text-align: center;
    overflow: hidden;
    height: 330px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
}

.delete-confirm-buttons {
    display: inline-flex;
    justify-content: space-around;
    width: 100%;
}

.delete-confirm-enter-active,
.delete-confirm-leave-active {
    transition: all .3s ease;
}

.delete-confirm-leave-to,
.delete-confirm-enter {
    height: 0;
    opacity: 0;
}

.delete-confirm-enter-to,
.delete-confirm-leave {
    opacity: 1;
    height: 330px;
}

</style>
