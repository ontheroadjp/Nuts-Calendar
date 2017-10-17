<template>
<div id="dashboard-members-pane">
    <new-modal
        :isActive="newModal.isActive"
        :onClose="closeModal"
    ></new-modal>

    <edit-modal
        :isActive="editModal.isActive"
        :onClose="closeModal"
    ></edit-modal>

    <div class="columns is-multiline">
        <template v-for="member in members">
            <div class="column is-6">
                <card
                    :member="member"
                    :clickSettings="openEditModal"
                ></card>
            </div>
        </template>

        <new-card
            :onOpen="openNewModal"
        ></new-card>
    </div>

</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import newModal from './new-modal.vue';
import editModal from './edit-modal.vue';
import card from './card.vue';
import newCard from './card-new.vue';

export default {
    components: { newModal, editModal, card, newCard },

    data() {
        return {
            newModal: {
                isActive: false
            },

            editModal: {
                isActive: false
            }
        }
    },

    computed: {
        ...mapState({
            theme: state => state.app.theme
        }),

        ...mapState('userCalendar', {
            userCalendars: state => state.data.userCalendars
        }),

        ...mapState('member', {
            members: state => state.data.members
        }),

        ...mapState('member/insert', {
            isInsertLoading: state => state.isLoading
        }),

        ...mapState('member/update', {
            isUpdateLoading: state => state.isLoading
        })
    },

    methods: {
        ...mapActions('dashboard', {
            data: 'data'
        }),

        ...mapActions('member/update', {
            prepareUpdate: 'prepare',
            update: 'update',
            reset: 'reset'
        }),

        ...mapActions('member/remove', {
            prepareRemove: 'prepare',
            remove: 'remove'
        }),

        openNewModal: function() {
            this.newModal.isActive = true;
        },

        openEditModal: function( member ) {
            this.prepareUpdate({ editingMember: member });
            this.editModal.isActive = true;
        },

        closeModal: function() {
            this.newModal.isActive = false;
            this.editModal.isActive = false;
            setTimeout(() => this.reset(), 1000);
        }
    }
};
</script>
