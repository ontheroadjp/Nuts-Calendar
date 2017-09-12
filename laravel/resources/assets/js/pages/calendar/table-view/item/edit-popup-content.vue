<template>
<div class="card thin" style="height: 100%; background-color: #fff;">
    <div class="main">
        <div class="content">
            <text-input 
                :initialValue="updateState.editingItem.content"
                placeholder="Title"
                @valueChange="onChangeContent"
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
            ></timeRangePicker>
        </div>

        <span class="label thin" style="font-size: 0.8em;">Memo</span>
        <textarea style=""></textarea>

    </div><!-- // .main -->

    <div class="popup-footer">
        <a class="button strip" :disabled="!isReadyToUpdate">Save</a>
        <a class="button strip">Delete</a>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import textInput from '../../../../components/text-input.vue';
import timeRangePicker from '../../../../components/time-range-picker.vue';

export default {
    components: { textInput, timeRangePicker },

    data() {
        return {
            input: {
                content: '',
                startTime: '',
                endTime: ''
            },

            hasError: {
                content: false,
                timeRange: false
            },

            readyState: {
                content: false,
                timeRange: false
            }
        }
    },

    computed: {
        ...mapState('calendar/tableView/item', {
            updateState: 'update'
        }),

        isReadyToUpdate: function() {
            const values = Object.values(this.readyState);
            return (values.indexOf(true) !== -1) && !this.hasError;
        }
    },

    methods: {
        update() {
            u.clog('update ------------------');
        },

        onChangeContent(data) {
            u.clog('-----------------------------------------------');
            u.clog('initial value: ' + data.initialValue);
            u.clog('input value: ' + data.inputValue);
            u.clog('hasError: ' + data.hasError);
            u.clog('isReady: ' + data.isReady);
        },

        onChangeTimeRange(data) {
            this.readyState.timeRange = data.isReadyToUpdate;
        }
    },

    mounted: function() {
        this.input.content = this.updateState.editingItem.content; 
        this.input.startTime = this.updateState.editingItem.start_time; 
        this.input.endTime = this.updateState.editingItem.end_time; 
    },
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
    margin-bottom: 12px;
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
}
</style>
