<template>
<modal>
    <button class="modal-close" @click="clickClose()"></button>
    <div class="modal-card">
<!--
        <section class="modal-card-body" style="
            border-top-left-radius: 3px;
            border-top-right-radius: 3px;
            padding: 60px;
            height: 350px;
        ">

            <content-field
                name="content"
                :value="update.editingItem.content"
                :action="updateContent"
                :is-loading="update.isLoading"
            ></content-field>
-->
        <section class="modal-card-body" style="padding: 40px;background-color: blue; color:white;">
            <button 
                class="delete" 
                style="position: absolute; top: 20px; right: 20px;"
                aria-label="close" 
                @click="clickClose()"
            ></button>

            <inline-text-input 
                id=""
                inputClass="title"
                inputColor="#fff"
                iconColor="#fff"
                placeholder="Title"
                :syncValue.sync="input.content"
                :defaultValue="updateState.editingItem.content"
                :saveCallback="clickSave"
            ></inline-text-input>  
        </section>

        <section class="modal-card-body" style="padding: 60px;">
            <span class="icon" style="margin-right: 10px">
                <i class="fa fa-clock-o"></i>
            </span>
<!--
            <time-range
                name="content"
                :startTime="updateState.editingItem.start_time"
                :endTime="updateState.editingItem.end_time"
                :action="updateTimeRange"
                :is-loading="updateState.isLoading"
            ></time-range>
-->
            <timeRangePicker 
                minute-interval="5"
                :startTime="updateState.editingItem.start_time"
                :endTime="updateState.editingItem.end_time"
                :action="updateTimeRange"
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

//import contentField from '../../../../components/edit-text-field.vue';
import inlineTextInput from '../../../../components/inline-text-input.vue';

//import timeRange from '../../../../components/edit-time-range.vue';
import timeRangePicker from '../../../../components/time-range-picker.vue';

export default {
    name: 'item-modal-content',

    components: {
        'modal': modal,
//        'contentField': contentField,
        'inlineTextInput': inlineTextInput,
//        'timeRange': timeRange,
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
        }),

//        input: function() {
//            return {
//                content: {
//                    get() {
//                        return this.updateState.input.content
//                        //return this.$store.calendar.tableView.update.input.content;
//                    },
//    
//                    set(value) {
//                        //this.setInputContent({ value });
//                    }
//                }
//            }
//        }
    },

    methods: {
        ...mapActions('calendar/tableView/item/update', {
            setInputValues: 'setInputValues',
            update: 'update',
            updateReset: 'reset',
            updateContent: 'updateContent',
            updateTimeRange: 'updateTimeRange'
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

<style lang="scss" scoped>
    /* empty */
</style>
