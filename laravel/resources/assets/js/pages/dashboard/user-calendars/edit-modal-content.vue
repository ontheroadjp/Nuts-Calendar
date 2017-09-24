<<template>
    <div class="card"
         id="user-calendar-edit-modal"
         style="transition: height 0.3s ease;"
    >
        <deleteConfirm
            :isActive="showDeleteConfirm"
            height="150px"
            @cancel="clickDeleteCancel()"
            @ok="clickDeleteOK()"
        ></deleteConfirm>

        <notification-slide-panel
            :isActive="deleteResult !== ''"
            :type="deleteResult !== '' ? deleteResult : 'success'"
            height="150px"
            @close="close()"
        ></notification-slide-panel>

        <div style="padding: 40px;">
            <text-input
                id="calendar-name"
                inputStyle="font-size: 2rem; font-weight: 200;"
                :initialValue="userCalendar.name"
                :showError="true"
                :minTextLength="1"
                :height="110"
                placeholder="Calendar name"
                @blurValue="blurName"
                :disabled="false"
            ></text-input>
            <text-input
                id="description"
                :initialValue="userCalendar.description"
                :showError="true"
                :minTextLength="0"
                :height="110"
                placeholder="Description"
                @blurValue="blurDescription"
                :disabled="false"
            ></text-input>
        </div>

        <div style="padding: 40px 60px; background-color: whitesmoke; margin-bottom: 32px;">
            <ul class="members">
                <li v-for="member in members" class="member">
                    <div class="card" style="margin-bottom: 5px; padding: 10px;">
                        <checkbox-input
                            :id="member.name"
                            :label="member.name"
                            labelStyle="font-size: 1rem; font-weight: 100;"
                            :initialValue="userCalendarMemberIds.indexOf(member.id) !== -1"
                            @changeValue="changeMemberGroup(
                                member.name,
                                userCalendar.id,
                                member.id
                            )"
                            :disabled="false"
                        ></checkbox-input>
                    </div>
                </li>
            </ul>
        </div>

        <div class="modal-footer">
            <div v-show="!showDeleteConfirm" class="button-panel">
                <button class="button strip thin"
                    @click="clickDeleteButton"
                    :disabled="updateIsLoading"
                >Delete</button>
            </div>
        </div>

    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import textInput from '../../../components/form/text-input.vue';
import checkboxInput from '../../../components/form/checkbox.vue';
import deleteConfirm from '../../../components/slide-panel/delete-confirm-slide-panel.vue';
import notificationSlidePanel from '../../../components/slide-panel/notification-slide-panel.vue';
import simpleSlidePanel from '../../../components/slide-panel/simple-slide-panel.vue';

export default {
    components: { textInput, checkboxInput, deleteConfirm, notificationSlidePanel, simpleSlidePanel },

    props: {
        updateIsLoading: { type: Boolean, default: false },
        onClose: { type: Function, default: () => {} },
        isActive: { type: Boolean, required: true }
    },

    data() {
        return {
            userCalendarMemberIds: [],
            showDeleteConfirm: false,
            deleteResult: '',
            showMemberGroup: false,
            modalHeight: '',
            modalHeightWhenDeleteConfirmOpened: '160px'
        }
    },

    computed: {
        ...mapState('member', {
            members: state => state.data.members
        }),

        ...mapState('userCalendar', {
            userCalendar: state => state.update.editingUserCalendar
        }),

        ...mapState('userCalendarMember', {
            userCalendarMembers: state => state.data.userCalendarMembers
        })
    },

    methods: {
        ...mapActions('userCalendar', {
            remove: 'remove/remove',
            update: 'update/update',
            setUpdateValue: 'update/setUpdateValue'
        }),

        ...mapActions('userCalendarMember', {
            insertUserCalendarMember: 'insert/insert',
            removeUserCalendarMember: 'remove/remove'
        }),

        blurName(data) {
            if(data.isReady) {
                this.setUpdateValue({ key: 'name', value: data.inputValue });
                this.update(false);
            }
        },

        blurDescription(data) {
            if(data.isReady) {
                this.setUpdateValue({ key: 'description', value: data.inputValue });
                this.update(false);
            }
        },

        changeMemberGroup(elementId, userCalendarId, memberId) {
            if( document.getElementById(elementId).checked ) {
                this.insertUserCalendarMember({ userCalendarId, memberId });
            } else {
                this.removeUserCalendarMember({ userCalendarId, memberId });
            }
        },

        clickDeleteButton: function() {
            const el = document.getElementById('user-calendar-edit-modal');
            this.modalHeight = el.clientHeight;
            el.style.height = this.modalHeightWhenDeleteConfirmOpened;
            this.showDeleteConfirm = true;
        },

        clickDeleteCancel: function() {
            const el = document.getElementById('user-calendar-edit-modal');
            el.style.height = this.modalHeight + 'px';
            this.showDeleteConfirm = false
        },

        clickDeleteOK() {
            this.remove({
                id: this.userCalendar.id,
                notify: false,
                successCb: () => {
                    this.deleteResult = 'success';
                },
                failedCb: () => {
                    this.deleteResult = 'failed';
                }
            })
        },

        close: function() {
            this.onClose();
            setTimeout(() => {
                this.showDeleteConfirm = false;
                this.deleteResult = '';
            }, 1000);
        },

        initUserCalendarMemberIds: function() {
            this.userCalendarMemberIds = [];
            this.userCalendarMembers.forEach( ( val ) => {
                if( val.user_calendar_id === this.userCalendar.id ) {
                    this.userCalendarMemberIds.push(val.member_id);
                }
            });
        }
    },

    watch: {
        userCalendar: function() {
            this.initUserCalendarMemberIds();
        },

        isActive: function(newVal, oldVal) {
            if( newVal ) {
                const el = document.getElementById('user-calendar-edit-modal');
                el.style.height = el.clientHeight + 'px';
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.modal-footer {
    position: absolute;
    bottom: 0;
    background-color: #fff;
    width: 100%;
    padding: 5px;
    text-align: right;

    & button:hover {
        border: 1px solid #e6e6e6;
    }
}

.button-panel {
    display: flex;
    justify-content:
    flex-end;
    width: 95%;
}
</style>
