<template>
<modal>
<button class="modal-close" @click="close()"></button>
<div class="modal-card">
    <section class="modal-card-body" style="
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            padding: 60px 60px 0 60px;
        ">

        <div class="field">
            <div class="control">
                <span class="is-pulled-right">
                    <input 
                        id="is-show" 
                        class="nuts-input-checkbox" 
                        type="checkbox" 
                        v-model="inputIsShow"
                    ><label for="is-show">Display</label>
                </span>
            </div>
        </div>
        
        <div class="field" style="margin-bottom: 60px">
            <label class="label">Name</label>
            <div class="control">
                <input class="input" type="text" v-model="inputName" placeholder="Name">
            </div>
        </div>

        <div class="field" style="margin-bottom: 60px">
            <label class="label">Order</label>
            <div class="control">
                <span class="select">
                    <select v-model="inputOrder">
                        <option v-for="member in members">
                            {{ member.order }}
                        </option>
                    </select>
                </span>
            </div>
        </div>

    </section>
    <footer class="modal-card-foot">
        <button 
            class="button is-danger" 
            @click="deleteButton()"
            :disabled="editColumn.isLoading || deleteColumn.isLoading"
            >
            <i v-if="!deleteColumn.isLoading" class="fa fa-trash"></i>
            <i v-else class="fa fa-refresh fa-spin"></i>
        </button>
        <button 
            :class="['button', theme.primary.class]" 
            @click="saveButton()"
            :disabled="editColumn.isLoading || deleteColumn.isLoading"
            >
            <span v-if="!editColumn.isLoading">Save</span>
            <i v-else class="fa fa-refresh fa-spin"></i>
        </button>
        <button 
            class="button" 
            @click="close()" 
            :disabled="editColumn.isLoading || deleteColumn.isLoading"
            >Cancel
        </button>
    </footer>
</div><!-- // .modal-card -->
</modal>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import modal from '../../../../components/modal.vue';

export default {
    name: 'column-modal-content',

    components: {
        modal
    },

    computed: {
        ...mapState({
            members: state => state.calendar.data.members,
            editColumn: state => state.action.column.update,
            deleteColumn: state => state.action.column.remove,
            theme: state => state.app.theme
        }),

        inputName: {
            get() { return this.editColumn.input.name; },
            set(value) { this.setName( { value } ); }
        },

        inputIsShow: {
            get() { return this.editColumn.input.isShow; },
            set(value) { this.setIsShow( { value } ); }
        },

        inputOrder: {
            get() { return this.editColumn.input.order; },
            set(value) { this.setOrder( { value } ); }
        }
    },

    methods: {
        ...mapActions('action/column/update', {
            setName: 'setName', 
            setIsShow: 'setIsShow', 
            setOrder: 'setOrder', 
            update: 'update', 
            reset: 'reset'
        }),

        ...mapActions('action/column/remove', {
            remove: 'remove',
            reset: 'reset'
        }),

        deleteButton: function() {
            this.remove();
        },

        saveButton: function() {
            this.update();
        },

        close: function() {
            this.reset();
        }
    }
}
</script>

<style lang="scss" scoped>
    /* empty */
</style>
