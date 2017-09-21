<template>
<modal>
    <button class="modal-close" @click="clickClose()"></button>
    <div class="modal-card">

        <section class="modal-card-body"
            style="padding: 40px;background-color: blue; color:white;">

            <button
                class="delete"
                style="position: absolute; top: 20px; right: 20px;"
                aria-label="close"
                @click="clickClose()"
            ></button>

            <inline-text-input
                id="item-content"
                inputClass="title"
                inputColor="#fff"
                iconColor="#fff"
                placeholder="Title"
                :isLoading="updateState.isLoading"
                :syncValue.sync="input.content"
                :defaultValue="updateState.editingItem.content"
                :saveCallback="clickSave"
            ></inline-text-input>
        </section>

        <section class="modal-card-body" style="padding: 60px;">
            <span class="icon" style="margin-right: 10px">
                <i class="fa fa-clock-o"></i>
            </span>

            <timeRangePicker
                minute-interval="5"
                :startTime="updateState.editingItem.start_time"
                :endTime="updateState.editingItem.end_time"
                :action="update"
                :isLoading="updateState.isLoading"
            ></timeRangePicker>
        </section>

        <footer class="modal-card-foot">
            <button
                class="button is-danger"
                @click="clickRemove()"
                :disabled="updateState.isLoading || deleteItem.isLoading"
                >
                <span v-if="!deleteItem.isLoading"><i class="fa fa-trash"></i></span>
                <span v-else><i class="fa fa-refresh fa-spin"></i></span>
            </button>
            <button
                class="button"
                @click="clickClose()"
                :disabled="updateState.isLoading || deleteItem.isLoading"
                >Cancel
            </button>
        </footer>
    </div>
</modal>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import modal from '../../../../components/modal.vue';
import inlineTextInput from '../../../../components/inline-text-input.vue';
import timeRangePicker from '../../../../components/time-range-picker.vue';

export default {
    name: 'item-modal-content',

    components: {
        'modal': modal,
        'inlineTextInput': inlineTextInput,
        'timeRangePicker': timeRangePicker
    },

    data() {
        return {
            input: {
                content: '',
                startTime: '',
                endTime: ''
            }
        }
    },

    computed: {
        ...mapState({
            updateState: state => state.calendar.tableView.item.update,
            deleteItem: state => state.calendar.tableView.item.remove,
            theme: state => state.app.theme
        })
    },

    methods: {
        ...mapActions('calendar/tableView/item/update', {
            setInputValues: 'setInputValues',
            update: 'update',
            updateReset: 'reset',
//            updateContent: 'updateContent',
//            updateTimeRange: 'updateTimeRange'
        }),

        ...mapActions('calendar/tableView/item/remove', {
            remove: 'remove',
            removeReset: 'reset',
        }),

        clickSave() {
            this.setInputValues({
                content: this.input.content,
                startTime: this.input.startTime,
                endTime: this.input.endTime
            });

            this.update();
        },

        clickRemove() {
            this.remove();
        },

        clickClose() {
            this.updateReset();
            this.removeReset();
        }
    },

    mounted: function() {
        this.input.content = this.updateState.editingItem.content;
        this.input.startTime = this.updateState.editingItem.start_time;
        this.input.endTime = this.updateState.editingItem.end_time;
    },

    beforeDestroy() {
        u.clog('edit-item-content is going to be destroyed.');
        this.clickClose();
    }
}
</script>
