<template>
<div class="card thin" style="height: 100%; background-color: #fff;">
    <div class="main">
        <div style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            "
        >
            <div style="font-size: 1.4rem;"
                :style="selectedTab == 'date' ? style.primary : ''"
            >{{ editingItem.date }}</div>

            <div style="font-size: 1.4rem;">
                <div v-show="isEvent && input.isAllDay">
                    <span>終日</span>
                </div>

                <div v-show="!isMonthlyItem && !input.isAllDay">
                    <span :style="selectedTab === 'time' && timePane.startOrEnd == 'start'
                            ? style.primary : ''"
                    >{{ input.startTime }}</span>

                    <span style="margin: 0 5px" >to</span>

                    <span :style="selectedTab === 'time' && timePane.startOrEnd == 'end'
                            ? style.primary : ''"
                    >{{ input.endTime }}</span>
                </div>
            </div>

        </div>

        <div class="content hover-underline">
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

        <div class="tabs">
            <ul>
                <li @click="selectedTab = 'date'"
                    :class="{ 'is-active': selectedTab === 'date' }"
                ><a>Date</a></li>
                <li @click="selectedTab = 'time'"
                    :class="{ 'is-active': selectedTab === 'time' }"
                    v-show="!isMonthlyItem"
                ><a>Time</a></li>
                <li @click="selectedTab = 'repeat'"
                    :class="{ 'is-active': selectedTab === 'repeat' }"
                ><a>Repeat</a></li>
                <li @click="selectedTab = 'memo'"
                    :class="{ 'is-active': selectedTab === 'memo' }"
                ><a>Memo</a></li>
            </ul>
        </div>

        <monthly-date-pane
            v-if="selectedTab === 'date' && isMonthlyItem"
        ></monthly-date-pane>

        <daily-date-pane
            v-if="selectedTab === 'date' && !isMonthlyItem"
        ></daily-date-pane>

        <time-pane
            v-if="selectedTab === 'time' && !isMonthlyItem"
            :initialIsAllDay="Boolean(editingItem.is_all_day)"
            :initialStartTime="editingItem.start_time"
            :initialEndTime="editingItem.end_time"
            @changeValue="onChangeTime"
            :disabled="showDeleteConfirm || updateIsLoading || isMonthlyItem"
        ></time-pane>

        <daily-repeat-pane
            v-if="selectedTab === 'repeat'"
            :item = editingItem
            @changeValue="onChangeRepeat"
        > </daily-repeat-pane>

        <!-- task-pane -->
        <div v-if="isTask" style="margin-bottom: 10px">
            <span>
                <task-done-checkbox
                    label="taskDone"
                    :initialValue="Boolean(editingItem.is_done)"
                    @changeValue="onChangeTaskDone"
                    :disabled="showDeleteConfirm || updateIsLoading"
                ></task-done-checkbox>
            </span>
        </div>

        <!-- memo-pain -->
        <div v-if="selectedTab === 'memo'" class="memo">
            <memo-textarea
                :initialValue="editingItem.memo"
                :minTextLength="0"
                :maxTextLength="300"
                :showError="true"
                :showCount="true"
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
            >{{ t('item.delete') }}</button>

            <button
                class="button strin thin"
                @click="$emit('close')"
                :disabled="updateIsLoading"
            >キャンセル</button>

            <button class="button strip thin"
                :disabled="!isReady"
                @click="clickSave()">
                <span v-if="!updateIsLoading" class="icon is-small" style="width:100%">
                    {{ t('item.save') }}
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
                    <i v-if="!removeIsLoading" class="fa fa-exclamation-circle fa-5x" style="margin-top:30px"></i>
                    <i v-else class="fa fa-refresh fa-spin fa-3x" style="margin-top:60px"></i>
                </p>
                <p v-show="!removeIsLoading">{{ t('item.confirmation') }}</p>
                <p v-show="!removeIsLoading">{{ input.content }}</p>

                <div v-show="!removeIsLoading" class="delete-confirm-buttons">
                    <button class="button strip"
                        style="color:#fff"
                        @click="showDeleteConfirm = false"
                        :disabled="updateIsLoading"
                    >{{ t('item.cancel') }}</button>

                    <button class="button strip"
                        style="color:#fff"
                        @click="clickDeleteOK()"
                    >{{ t('item.ok') }}</button>
                </div>

            </div>
        </transition>
    </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import core from '../../../../../mixins/core.js';
import textInput from '../../../../../components/form/text-input.vue';
import timePane from './time-pane.vue';
import monthlyDatePane from './monthly-date-pane.vue';
import dailyDatePane from './daily-date-pane.vue';
import dailyRepeatPane from './daily-repeat-pane.vue';
import taskDoneCheckbox from '../../../../../components/form/checkbox.vue';
import memoTextarea from '../../../../../components/form/textarea.vue';

export default {
    components: {
        dailyDatePane, monthlyDatePane, timePane, dailyRepeatPane,
        textInput, taskDoneCheckbox, memoTextarea
    },

    mixins: [ core ],

    props: {
        'height': { type: Number, default: 320 },
        'width':  { type: Number, default: 280 }
    },

    data() {
        return {
            selectedTab: 'time',

            timePane: {
                startOrEnd: 'start'
            },

            input: {
                content: '',
                time: '',
                startTime: '',
                endTime: '',
                isAllDay: '',
                rruleString: '',
                rruleText: '',
                rruleJson: '',
                taskDone: '',
                memo: ''
            },

            hasError: {
                content: false,
                time: false,
                rrule: false,
                isAllDay: false,
                taskDone: false,
                memo: ''
            },

            showDeleteConfirm: false
        }
    },

    computed: {
        ...mapState({
            theme: state => state.app.theme
        }),

        ...mapState('calendar', {
            viewMode: state => state.viewMode
        }),

//        ...mapState('calendar/tableView/item/update', {
        ...mapState('item/update', {
            editingItem: 'editingItem',
            updateIsLoading: 'isLoading'
        }),

//        ...mapState('calendar/tableView/item/remove', {
        ...mapState('item/remove', {
            removeIsLoading: 'isLoading'
        }),

        style: function() {
            return {
                primary: {
                    'color': this.theme.primary.code,
                    'font-weight': 200
                }
            }
        },

        isMonthlyItem: function() {
            return (this.editingItem.date).slice(-2) == 0;
        },

        isEvent: function() {
            return this.editingItem.type_id == 1;
        },

        isTask: function() {
            return this.editingItem.type_id == 2;
        },

        startTimeChanged: function() {
            const a = this.input;
            const b = this.editingItem;
            const aStart = new Date('2018/1/1 ' + a.startTime).getTime();
            const bStart = new Date('2018/1/1 ' + b.start_time).getTime();
            return aStart !== bStart;
        },

        endTimeChanged: function() {
            const a = this.input;
            const b = this.editingItem;
            const aEnd = new Date('2018/1/1 ' + a.endTime).getTime();
            const bEnd = new Date('2018/1/1 ' + b.end_time).getTime();
            return aEnd !== bEnd;
        },

        noError: function() {
            return (Object.values(this.hasError).indexOf(true) === -1);
        },

        isReady: function() {
            const a = this.input;
            const b = this.editingItem;

            const changed = a.content != b.content
                    || this.startTimeChanged
                    || this.endTimeChanged
                    || Boolean(a.isAllDay) !== Boolean(b.is_all_day)
                    || Boolean(a.taskDone) !== Boolean(b.is_done)
                    || this.input.rrule_string !== this.editingItem.rrule_string
                    || a.memo !== b.memo;

            return  this.noError && changed;
        }
    },

    methods: {
//        ...mapActions('calendar/tableView/item/update', {
        ...mapActions('item/update', {
            setInputValue: 'setInputValue',
            update: 'update'
        }),

//        ...mapActions('calendar/tableView/item/remove', {
        ...mapActions('item/remove', {
            remove: 'remove'
        }),

        onChangeContent(data) {
            this.input.content = data.inputValue;
            this.hasError.content = data.hasError;
            this.setInputValue({key: 'content', value: data.inputValue });
        },

        onChangeTime(data) {
            this.input.isAllDay = data.isAllDay;
            this.input.startTime = data.startTime;
            this.input.endTime = data.endTime;
            this.hasError.time = data.hasError;
            this.timePane.startOrEnd = data.startOrEnd;
            this.setInputValue({key: 'isAllDay', value: data.isAllDay });
            this.setInputValue({key: 'startTime', value: data.startTime });
            this.setInputValue({key: 'endTime', value: data.endTime });
        },

        onChangeRepeat(data) {
            this.input.rruleString = data.values.rruleString;
            this.input.rruleText = data.values.rruleText;
            this.input.rruleJson = data.values.rruleJson;
            this.hasError.rrule = data.hasError;
            this.setInputValue({key: 'rruleString', value: this.input.rruleString });
            this.setInputValue({key: 'rruleText', value: this.input.rruleText });
            this.setInputValue({key: 'rruleJson', value: this.input.rruleJson });
        },

        onChangeTaskDone(data) {
            this.input.taskDone = data.value;
            this.hasError.taskDone = data.hasError;
            this.setInputValue({key: 'taskDone', value: data.value });
            this.editingItem.is_done = data.value;
        },

        onChangeMemo(data) {
            this.input.memo = data.value;
            this.hasError.memo = data.hasError;
            this.setInputValue({key: 'memo', value: data.value });
        },

        clickSave() {
            this.update();
        },

        clickDeleteOK() {
            this.remove();
        }
    },

    watch: {
        removeIsLoading: function( newValue, oldValue ) {
            if(oldValue === true) this.$emit('close');
        }
    },

    created: function() {
        this.isMonthlyItem ? this.selectedTab = 'date' : this.selectedTab = 'time';

        const st = this.editingItem.start_time.split(':');
        const et = this.editingItem.end_time.split(':');

        this.input.content = this.editingItem.content;
        this.input.startTime = parseInt(st[0]) + ':' + st[1];
        this.input.endTime = parseInt(et[0]) + ':' + et[1];
        this.input.isAllDay = Boolean(this.editingItem.is_all_day);
        this.input.rrule_id = this.editingItem.rrule_id;
        this.input.taskDone = Boolean(this.editingItem.is_done);
        this.input.memo = this.editingItem.memo;
    }
}
</script>

<style lang="scss" scoped>
.main {
    padding: 20px;
}

.content {
    margin-bottom: 30px;
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

.button[disabled] {
    background: none;
}

.delete-confirm {
    background-color: red;
    padding: 10px;
    color: #fff;
    text-align: center;
    overflow: hidden;
    height: 370px;
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
