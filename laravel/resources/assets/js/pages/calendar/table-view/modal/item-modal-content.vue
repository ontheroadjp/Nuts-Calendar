<template>
<div>
    <button class="modal-close" @click="close()"></button>
    <div class="modal-card">
        <section class="modal-card-body" style="
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            padding: 60px;
        ">
            <p style="margin-bottom: 20px">
                content: {{ editItem.editingItem.item !== '' ? editItem.editingItem.content : ''}} 
            </p>
            <p style="margin-bottom: 20px">
                start: {{ editItem.editingItem.item !== '' ? editItem.editingItem.start_time : ''}} 
            </p>
            <p style="margin-bottom: 20px">
                end: {{ editItem.editingItem.item !== '' ? editItem.editingItem.end_time : ''}} 
            </p>
        </section>
        <footer class="modal-card-foot">
            <button 
                class="button is-danger" 
                @click="removeItem()" 
                :disabled="editItem.isLoading"
                >
                <span v-if="!deleteItem.isLoading"><i class="fa fa-trash"></i></span>
                <span v-else><i class="fa fa-refresh fa-spin"></i></span>
            </button>
            <button 
                class="button" 
                @click="close()" 
                :disabled="editItem.isLoading || deleteItem.isLoading"
                >Cancel</button>
<!--
            <button 
                :class="['button', theme.primary.class]" 
                :disabled="deleteItem.isLoading"
                >
                <span v-if="!editItem.isLoading">Save</span>
                <span v-else><i class="fa fa-refresh fa-spin"></i></span>
            </button>
-->
        </footer>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import updateItemService from '../../../../services/item/updateItem.vue';
import removeItemService from '../../../../services/item/removeItem.vue';

export default {
    name: 'item-modal-content',

    mixins: [ updateItemService, removeItemService ],

    computed: {
        ...mapState({
            editItem: state => state.calendar.behavior.item.editItem,
            deleteItem: state => state.calendar.behavior.item.deleteItem,
            theme: state => state.app.theme,
        }),
    },

    methods: {
        close() {
            this.$store.commit('finishUpdateItem');
            this.$store.commit('finishRemoveItem');
        }
    },

    beforeDestroy() {
        u.clog('edit-item-content is going to be destroyed.');
        this.close();
    }
}
</script>
