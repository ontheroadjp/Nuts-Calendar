<template>
<div class="card thin" style="height: 100%; background-color: #fff;">
    <div class="main">
        <div class="content">
            <text-input 
                :initialValue="updateState.editingItem.content"
                placeholder="Title"
                @valueChange="onContentValueChanged"
            ></text-input>
        </div>

        <div class="time-range">
            <timeRangePicker 
                :minute-interval="5"
                :startTime="updateState.editingItem.start_time"
                :endTime="updateState.editingItem.end_time"
                :action="update"
                :isLoading="updateState.isLoading"
                :inputWidth="80"
                :menuHeight="280"
                :ready.sync="ready.timeRange"
            ></timeRangePicker>
        </div>

    </div>

    <div class="popup-footer">
        <a class="button strip" :disabled="!isAllReady">Save</a>
        <a class="button strip">Delete</a>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import textInput from '../../../../components/text-input.vue';
import timeRangePicker from '../../../../components/time-range-picker.vue';

export default {
    components: {
        textInput,
        timeRangePicker
    },

    data() {
        return {
            input: {
                content: '',
                startTime: '',
                endTime: ''
            },

            ready: {
                timeRange: false
            }
        }
    },

    computed: {
        ...mapState('calendar/tableView/item', {
            updateState: 'update'
        }),

        isAllReady: function() {
            let result = true;
            Object.keys(this.ready).forEach((key) => {
                if( this.ready[key] === false ) {
                    result = false;
                }
            });

            return result;
        }
    },

    methods: {
        update() {
            u.clog('update ------------------');
        },

        onContentValueChanged(data) {
            u.clog('-----------------------------------------------');
            u.clog('initial value: ' + data.initialValue);
            u.clog('input value: ' + data.inputValue);
            u.clog('hasError: ' + data.hasError);
            u.clog('isReady: ' + data.isReady);
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
.start-time {
    margin-bottom: 10px;
} 
.end-time {
    margin-bottom: 10px;
} 

.popup-footer {
    position: absolute;
    bottom: 0;
    background-color: whitesmoke;
    width: 100%;
    padding: 5px;
}
</style>
