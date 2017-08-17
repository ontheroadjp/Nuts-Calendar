<template>
<div>
<button class="modal-close" @click="close()"></button>
<div class="modal-card">
    <section class="modal-card-body" style="
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
        ">
        <div style="padding: 60px; width: 100%;">

            <div class="field">
                <label class="label">Name</label>
                <div class="control has-icon">
<!--
                    <input 
                        class="nuts-input-textbox" 
                        type="text" 
                        style="margin-bottom: 25px;"
                        v-model="name" 
                        :placeholder="nameHasError ? error.name : 'Name'"
                        v-focus
                    >
                    <span class="icon is-small" :style="[nameHasError ? style.error : '']">
                        <i class="fa fa-user"></i>
                    </span>
-->
                    <input 
                        class="nuts-input-textbox" 
                        type="text" 
                        style="margin-bottom: 25px;"
                        v-model="inputName" 
                        placeholder="Name"
                    >
                    <span class="icon is-small">
                        <i class="fa fa-user"></i>
                    </span>
                </div>
            </div>

        </div>
    </section>
    <footer class="modal-card-foot">
        <button 
            :class="['button', theme.primary.class]" 
            @click="saveButton()"
            :disabled="addColumn.isLoading"
            >
            <span v-if="!addColumn.isLoading">Add</span>
            <span v-else><i class="fa fa-refresh fa-spin"></i></span>
        </button>
        <button 
            class="button" 
            @click="close()" 
            :disabled="addColumn.isLoading"
            >Cancel
        </button>
    </footer>
</div><!-- // .modal-card -->
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    computed: {
        ...mapState({
            addColumn: state => state.action.calendar.tableView.column.insert,
            theme: state => state.app.theme
        }),

        inputName: {
            get() {
                return this.addColumn.input.name;
            },
            set(value) {
                this.setName( { value } );
            }
        }
    },

    methods: {
        ...mapActions('action/calendar/tableView/column/insert', {
            setName: 'setName',
            insert: 'insert',
            reset: 'reset'
        }),

        saveButton: function() {
            this.insert();
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
