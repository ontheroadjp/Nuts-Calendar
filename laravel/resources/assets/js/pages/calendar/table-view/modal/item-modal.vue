<template>
<modal>
    <button class="modal-close" @click="clickClose()"></button>
    <div class="modal-card">
        <section class="modal-card-body" style="
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            padding: 60px;
        ">
            <p style="margin-bottom: 20px">
                content: {{ editItem.editingItem.content }} 
            </p>
            <p style="margin-bottom: 20px">
                start: {{ editItem.editingItem.start_time }} 
            </p>
            <p style="margin-bottom: 20px">
                end: {{ editItem.editingItem.end_time }} 
            </p>
            <p style="margin-bottom: 20px">
                color: {{ editItem.editingItem.end_time }} 
            </p>
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
            <button 
                :class="['button', 'is-pulled-right', theme.primary.class]"
                @click="clickSave()" 
                :disabled="editItem.isLoading || deleteItem.isLoading"
                >Save
            </button>
        </footer>
    </div>
</modal>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import modal from '../../../../components/modal.vue';

export default {
    name: 'item-modal-content',

    components: {
        modal
    },

    computed: {
        ...mapState({
            editItem: state => state.action.item.update,
            deleteItem: state => state.action.item.remove,
            theme: state => state.app.theme
        }),
    },

    methods: {
        ...mapActions({
            update: 'action/item/update/update',
            updateReset: 'action/item/update/reset',
            remove: 'action/item/remove/remove',
            removeReset: 'action/item/remove/reset'
        }),

        clickSave() {
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

    beforeDestroy() {
        u.clog('edit-item-content is going to be destroyed.');
        this.clickClose();
    }
}
</script>

<style lang="scss" scoped>
    /* empty */
</style>
