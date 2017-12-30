<<template>
<div id="settings-pane" class="wrapper" >
    <section>
        <h2 class="section-title thin-200" :style="{'color': theme.primary.code}">
            {{ t('settingsPane.general') }}
        </h2>

        <div class="columns">
            <div class="column is-6">
                <h3 class="thin" >{{ t('settingsPane.theme') }}</h3>
                <theme-dropdown
                    style="display: flex; justify-content: center; padding: 5px;"
                ></theme-dropdown>
            </div>
            <div class="column is-6">
                <h3 class="thin" >{{ t('settingsPane.language') }}</h3>
                <lang-dropdown
                    style="display: flex; justify-content: center; padding: 5px;"
                ></lang-dropdown>
            </div>
        </div>
    </section>

    <section>
        <h2 class="section-title thin-200" :style="{'color': theme.primary.code}">
            {{ t('settingsPane.userAccount') }}
        </h2>

        <div class="columns">
            <div class="column is-6">
                <h3 class="thin" >{{ t('settingsPane.username') }}</h3>
                <username-field></username-field>
            </div>
            <div class="column is-6">
                <h3 class="thin" >{{ t('settingsPane.changePassword') }}</h3>
                <div style="text-align: center;">
                    <a :class="['button', theme.secondary.class]"
                        @click="toggleChangePassword(true)"
                    >{{ t('settingsPane.changePassword') }}
                    </a>
                </div>
            </div>
        </div>
    </section>

    <passwordChangeModal
        :isActive="isPasswordChangeModalActive"
        :onClose="toggleChangePassword"
    ></passwordChangeModal>

<!--
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
-->
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
//import newModal from './new-modal.vue';
//import editModal from './edit-modal.vue';
//import card from './card.vue';
//import newCard from './card-new.vue';
import themeDropdown from './theme-dropdown.vue';
import langDropdown from './lang-dropdown.vue';
import usernameField from './username-field.vue';
import passwordChangeModal from './password-change-modal.vue';
import core from '../../../mixins/core.js';

export default {
//    components: { card, newCard, newModal, editModal },
    components: { themeDropdown, langDropdown, usernameField, passwordChangeModal },

    mixins: [ core ],

    data() {
        return {
            isPasswordChangeModalActive: false
//            newModal: {
//                isActive: false
//            },
//
//            editModal: {
//                isActive: false
//            }
        }
    },

    computed: {
        ...mapState({
            theme: state => state.app.theme
        })
//        ...mapState('userCalendar', {
//            userCalendars: state => state.data.userCalendars
//        })
    },

    methods: {
        toggleChangePassword: function(value) {
            this.isPasswordChangeModalActive = value;
        }
//        ...mapActions('userCalendar/update', {
//            prepare: 'prepare',
//            reset: 'reset'
//        }),
//
//        openNewModal: function() {
//            this.newModal.isActive = true;
//        },
//
//        openEditModal: function( userCalendar ) {
//            this.prepare({ userCalendar });
//            this.editModal.isActive = true;
//        },
//
//        closeModal: function() {
//            this.newModal.isActive = false;
//            this.editModal.isActive = false;
//            setTimeout(() => this.reset(), 1000);
//        }
    }
};
</script>

<style lang="scss" scoped>
section {
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    margin-bottom: 30px;
}

.section-title {
    margin-bottom: 20px;
    font-size: 1.75rem;
}
</style>
