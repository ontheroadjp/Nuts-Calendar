<template>
<div class="card thin" style="height: 100%; background-color: #fff;">
    <div class="main">
        <div class="content">
            <text-input
                :initialValue="editingItem.content"
                :showError="true"
                :minTextLength="1"
                :height="110"
                placeholder="Title"
                @changeValue="onChangeContent"
                :disabled="showDeleteConfirm || updateIsLoading"
            ></text-input>
        </div>

        <div class="time-range">
            <timeRangePicker
                :minute-interval="5"
                :initialStartTime="editingItem.start_time"
                :initialEndTime="editingItem.end_time"
                :inputWidth="80"
                :dropdownHeight="280"
                @changeValue="onChangeTimeRange"
                :disabled="input.allDay || showDeleteConfirm || updateIsLoading"
            ></timeRangePicker>
        </div>

        <div class="all-day">
            <all-day-checkbox
                label="All-day"
                :initialValue="editingItem.is_all_day"
                @changeValue="onChangeAllDay"
                :disabled="showDeleteConfirm || updateIsLoading"
            ></all-day-checkbox>
        </div>

        <div class="memo">
            <memo-textarea
                :initialValue="editingItem.memo"
                :minTextLength="5"
                :maxTextLength="30"
                :showError="true"
                placeholder="memo"
                @changeValue="onChangeMemo"
            ></memo-textarea>
        </div>

    </div><!-- // .main -->

    <div class="popup-footer">
        <div v-show="!showDeleteConfirm" style="display: flex; justify-content: space-around">
            <button
                class="button strip thin"
                @click="showDeleteConfirm = true"
                :disabled="updateIsLoading"
            >Delete</button>

            <button class="button strip thin"
                :disabled="!isReadyResult"
                @click="clickSave()">
                <span v-if="!updateIsLoading" class="icon is-small" style="width:100%">
                    Save
                </span>
                <span v-else class="icon is-small" style="width:100%">
                    <i class="fa fa-refresh fa-spin"></i>
                </span>
            </button>
        </div>

        <transition name="delete-confirm">
            <div class="card delete-confirm" v-show="showDeleteConfirm">
                <p style="
                    display: flex;
                    justify-content: center;
                ">
                    <i v-if="!removeIsLoading" class="fa fa-exclamation-circle fa-5x" style="margin-top:60px"></i>
                    <i v-else class="fa fa-refresh fa-spin fa-3x" style="margin-top:60px"></i>
                </p>
                <p v-show="!removeIsLoading">Delete {{ input.content }} ?</p>

                <div v-show="!removeIsLoading" class="delete-confirm-buttons">
                    <button class="button strip"
                        style="color:#fff"
                        @click="showDeleteConfirm = false"
                        :disabled="updateIsLoading"
                    >Cancel</button>

                    <button class="button strip"
                        style="color:#fff"
                        @click="clickDeleteOK()"
                    >OK</button>
                </div>

            </div>
        </transition>
    </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import textInput from '../../../../components/form/text-input.vue';
import timeRangePicker from '../../../../components/time-range-picker.vue';
import allDayCheckbox from './all-day-checkbox.vue';
import memoTextarea from './input-textarea.vue';

export default {
    components: { textInput, timeRangePicker, allDayCheckbox, memoTextarea },

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
                allDay: '',
                memo: ''
            },

            error: {
                content: false,
                timeRange: false,
                allDay: false,
                memo: ''
            },

            isReady: {
                content: false,
                timeRange: false,
                allDay: false,
                memo: false
            },

            showDeleteConfirm: false
        }
    },

    computed: {
        ...mapState('calendar/tableView/item/update', {
            editingItem: 'editingItem',
            updateIsLoading: 'isLoading'
        }),

        ...mapState('calendar/tableView/item/remove', {
            removeIsLoading: 'isLoading'
        }),

        errorResult: function() {
            return (Object.values(this.error).indexOf(true) !== -1);
        },

        isReadyResult: function() {
            return (Object.values(this.isReady).indexOf(true) !== -1) && !this.errorResult;
        }
    },

    methods: {
        ...mapActions('calendar/tableView/item/update', {
            setInputValue: 'setInputValue',
            update: 'update'
        }),

        ...mapActions('calendar/tableView/item/remove', {
            remove: 'remove'
        }),

        onChangeContent(data) {
            this.input.content = data.inputValue;
            this.error.content = data.error;
            this.isReady.content = data.isReady;
            this.setInputValue({key: 'content', value: data.inputValue });
//            u.clog('----------------------- content ------------------------');
//            u.clog('input value: ' + this.input.content);
//            u.clog('error: ' + this.error.content);
//            u.clog('isReady: ' + this.isReady.content);
        },

        onChangeTimeRange(data) {
            this.input.startTime = data.value.start;
            this.input.endTime = data.value.end;
            this.error.timeRange = data.error;
            this.isReady.timeRange = data.isReady;
            this.setInputValue({key: 'startTime', value: data.value.start });
            this.setInputValue({key: 'endTime', value: data.value.end });
//            u.clog('----------------------- time range ------------------------');
//            u.clog('start: ' + this.input.startTime);
//            u.clog('end: ' + this.input.endTime);
//            u.clog('error: ' + this.error.timeRange);
//            u.clog('isReady: ' + this.isReady.timeRange);
        },

        onChangeAllDay(data) {
            this.input.allDay = data.value;
            this.error.allDay = data.error;
            this.isReady.allDay = data.isReady;
            this.setInputValue({key: 'allDay', value: data.value });
//            u.clog('----------------------- all day ------------------------');
//            u.clog('value: ' + this.input.allDay);
//            u.clog('error: ' + this.error.allDay);
//            u.clog('isReady: ' + this.isReady.allDay);
        },

        onChangeMemo(data) {
            this.input.memo = data.value;
            this.error.memo = data.error;
            this.isReady.memo = data.isReady;
            this.setInputValue({key: 'memo', value: data.value });
//            u.clog('----------------------- all day ------------------------');
//            u.clog('value: ' + this.input.memo);
//            u.clog('error: ' + this.error.memo);
//            u.clog('isReady: ' + this.isReady.memo);
        },

        clickSave() {
            u.clog('clickSave()');
            this.update();
            this.isReady.content = false;
            this.isReady.timeRange = false;
            this.isReady.allDay = false;
            this.isReady.memo = false;
        },

        clickDeleteOK() {
            u.clog('clickDeleteOK()');
            this.remove();
        }
    },

    watch: {
        removeIsLoading: function( newValue, oldValue ) {
            if(oldValue === true) this.$emit('close');
        }
    },

    mounted: function() {
        this.input.content = this.editingItem.content;
        this.input.startTime = this.editingItem.start_time;
        this.input.endTime = this.editingItem.end_time;
        if( typeof this.editingItem.is_all_day === 'number' ) {
            this.input.allDay = (this.editingItem.is_all_day > 0)
        } else {
            this.input.allDay = this.editingItem.is_all_day;
        }
        this.input.memo = this.editingItem.memo;

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

.content {
    margin-bottom: 20px;
}

.time-range {
    margin-bottom: 5px;
}

.all-day {
    margin-bottom: 18px;
}

.popup-footer {
    position: absolute;
    bottom: 0;
    background-color: whitesmoke;
    width: 100%;
    padding: 5px;
    text-align: right;

    & button:hover {
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
}
</style>
