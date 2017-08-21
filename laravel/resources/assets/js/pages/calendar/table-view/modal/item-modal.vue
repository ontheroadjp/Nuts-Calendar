<template>
<modal>
    <button class="modal-close" @click="clickClose()"></button>
    <div class="modal-card">
        <section class="modal-card-body" style="
            border-top-left-radius: 3px;
            border-top-right-radius: 3px;
            padding: 60px;
            height: 350px;
        ">
            <content-field
                name="content"
                :value="editItem.editingItem.content"
                :action="updateContent"
                :is-loading="editItem.isLoading"
            ></content-field>

            <span class="icon" style="margin-right: 10px">
                <i class="fa fa-clock-o"></i>
            </span>
<!--
            <time-range
                name="content"
                :startTime="editItem.editingItem.start_time"
                :endTime="editItem.editingItem.end_time"
                :action="updateTimeRange"
                :is-loading="editItem.isLoading"
            ></time-range>
-->

                <timeRangePicker 
                    minute-interval="5"
                    :startTime="editItem.editingItem.start_time"
                    :endTime="editItem.editingItem.end_time"
                    :action="updateTimeRange"
                    :isLoading="editItem.isLoading"
                ></timeRangePicker>

        </section>
        <footer class="modal-card-foot">
            <button 
                class="button is-danger" 
                @click="clickRemove()" 
                :disabled="editItem.isLoading || deleteItem.isLoading"
                >
                <span v-if="!deleteItem.isLoading"><i class="fa fa-trash"></i></span>
                <span v-else><i class="fa fa-refresh fa-spin"></i></span>
            </button>
            <button 
                class="button" 
                @click="clickClose()" 
                :disabled="editItem.isLoading || deleteItem.isLoading"
                >Cancel
            </button>
        </footer>
    </div>
</modal>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import modal from '../../../../components/modal.vue';
import contentField from '../../../../components/edit-text-field.vue';
import timeRange from '../../../../components/edit-time-range.vue';
import timeRangePicker from '../../../../components/time-range-picker.vue';

export default {
    name: 'item-modal-content',

    components: {
        'modal': modal,
        'contentField': contentField,
        'timeRange': timeRange,
        'timeRangePicker': timeRangePicker
    },

    computed: {
        ...mapState({
            editItem: state => state.calendar.tableView.item.update,
            deleteItem: state => state.calendar.tableView.item.remove,
            theme: state => state.app.theme
        }),
    },

    methods: {
        ...mapActions('calendar/tableView/item', {
            updateReset: 'update/reset',
            remove: 'remove/remove',
            removeReset: 'remove/reset',
            updateContent: 'update/updateContent',
            updateTimeRange: 'update/updateTimeRange'
        }),

        clickRemove() {
            this.remove();
        },

        clickClose() {
            this.updateReset();
            this.removeReset();
        }
    },

    beforeDestroy() {
        u.clog('edit-item-content is going to be destroyed.');
        this.clickClose();
    }
}
</script>

<style lang="scss" scoped>
    /* empty */
</style>
