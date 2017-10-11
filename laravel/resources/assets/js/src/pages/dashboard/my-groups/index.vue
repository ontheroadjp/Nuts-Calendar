<<template>
<div id="dashboard-user-calendar-pane">
    <new-modal
        :isActive="newModal.isActive"
        :onClose="closeModal"
    ></new-modal>

    <edit-modal
        :isActive="editModal.isActive"
        :onClose="closeModal"
    ></edit-modal>

    <div class="columns is-multiline">
        <template v-for="uCal in userCalendars">
            <div class="column is-6">
                <card
                    :userCalendar="uCal"
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
    components: { card, newCard, newModal, editModal },

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
        ...mapState('userCalendar', {
            userCalendars: state => state.data.userCalendars
        })
    },

    methods: {
        ...mapActions('userCalendar/update', {
            prepare: 'prepare',
            reset: 'reset'
        }),

        openNewModal: function() {
            this.newModal.isActive = true;
        },

        openEditModal: function( userCalendar ) {
            this.prepare({ userCalendar });
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
