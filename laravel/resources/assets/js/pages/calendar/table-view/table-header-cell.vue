<template>
<div>
    <edit-column-modal v-if="isColumnEditing">
        <edit-column-modal-content></edit-column-modal-content>
    </edit-column-modal>

    <delete-column-warning v-if="isColumnDeleting">
        <delete-column-warning-content></delete-column-warning-content>
    </delete-column-warning>

    <header-shutter 
        :text="member.name + '(' + member.id + ')'"
        :text-style="{ 'padding': '0.5em 0.75em' }"
        >
        
        <a class="button" @click.stop="editColumnButton(member.id)">
            <span class="icon is-small">
                <i class="fa fa-pencil"></i>
            </span>
        </a>
    
        <a class="button" @click="deleteColumnButton(member.id)">
            <span class="icon is-small">
                <i class="fa fa-trash"></i>
            </span>
        </a>
    </header-shutter>
</div>
</template>

<script>
import { mapState } from 'vuex';
import editColumnModal from '../../../components/modal.vue';
import editColumnModalContent from './modal/edit-column-content.vue';
import deleteColumnWarning from '../../../components/modal.vue';
import deleteColumnWarningContent from './message/delete-column-warning.vue';
import headerShutter from '../../../components/shutter.vue';

export default {
    name: 'header-cell',

    components: {
        'edit-column-modal': editColumnModal,
        'edit-column-modal-content': editColumnModalContent,
        'delete-column-warning': deleteColumnWarning,
        'delete-column-warning-content': deleteColumnWarningContent,
        'header-shutter': headerShutter,
    },

    props: [
        'member'
    ],

    computed: {
        ...mapState({
            isColumnEditing: state => state.calendar.behavior.column.isEditing,
            isColumnDeleting: state => state.calendar.behavior.column.isDeleting,
        })
    },

    methods: {
        editColumnButton(memberId) {
            u.clog('editColumnButton()');
            const payload = {
                isEditing: !this.isColumnEditing,
                editingColumnId: memberId
            };
            this.$store.commit('toggleColumnEditing', payload);
        },

        deleteColumnButton(memberId) {
            u.clog('deleteColumnButton()');
            const payload = {
                isDeleting: !this.isColumnDeleting,
                deletingColumnId: memberId
            };
            this.$store.commit('toggleColumnDeleting', payload);
        },
    }
}
</script>
