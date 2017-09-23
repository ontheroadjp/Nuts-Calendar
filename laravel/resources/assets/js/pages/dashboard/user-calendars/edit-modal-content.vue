<<template>
    <div class="card"
         style="transition: height 0.3s ease; height: 600px;"
        :style="showDeleteConfirm ||
                showSuccessNotification ||
                showFailedNotification
                    ? 'height: 160px'
                    : ''
    ">

        <div class="modal-header">
            <notification
                :isActive="showSuccessNotification || showFailedNotification"
                :type="showSuccessNotification ? 'success' : 'danger'"
                :message="showSuccessNotification ? '成功' : '失敗'"
                height="150px"
                @close="close()"
            ></notification>
        </div>

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
                    @click="showDeleteConfirm = true"
                    :disabled="updateIsLoading"
                >Delete</button>
            </div>

            <deleteConfirm
                :isActive="showDeleteConfirm"
                @cancel="showDeleteConfirm = false"
                @ok="clickDeleteOK()"
            ></deleteConfirm>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import textInput from '../../../components/form/text-input.vue';
import checkboxInput from '../../../components/form/checkbox.vue';
import deleteConfirm from './deleteConfirm.vue';
import notification from './notification.vue';

export default {
    components: { textInput, checkboxInput, deleteConfirm, notification },

    props: {
        updateIsLoading: { type: Boolean, default: false },
        onClose: { type: Function, default: () => {} }
    },

    data() {
        return {
            userCalendarMemberIds: [],
//            removeIsLoading: false,
            showDeleteConfirm: false,
            showSuccessNotification: false,
            showFailedNotification: false
        }
    },

    computed: {
        ...mapState('member', {
            members: state => state.data.members
        }),

        ...mapState('userCalendar/update', {
            userCalendar: state => state.editingUserCalendar
        }),

        ...mapState('userCalendarMember', {
            userCalendarMembers: state => state.data.userCalendarMembers
        })
    },

    methods: {
        ...mapActions('userCalendar/remove', {
            remove: 'remove'
        }),

        ...mapActions('userCalendar/update', {
            setUpdateValue: 'setUpdateValue',
            update: 'update'
        }),

        ...mapActions('userCalendarMember/insert', {
            insertUserCalendarMember: 'insert'
        }),

        ...mapActions('userCalendarMember/remove', {
            removeUserCalendarMember: 'remove'
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

        clickDeleteOK() {
            this.remove({
                id: this.userCalendar.id,

                notify: false,

                successCb: () => {
                    this.showSuccessNotification = true;
//                    setTimeout(() => {
//                        this.showDeleteConfirm = false;
//                    }, 300);
                },

                failedCb: () => {
                    this.showFailedNotification = true;
//                    setTimeout(() => {
//                        this.showDeleteConfirm = false;
//                    }, 300);
                }
            })
        },

        close: function() {
            this.onClose();
            setTimeout(() => {
                this.showDeleteConfirm = false;
                this.showSuccessNotification = false;
                this.showFailedNotification = false;
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
        }
    }

};
</script>

<style lang="scss" scoped>
.modal-header {
    position: absolute;
    top: 0;
    background-color: #fff;
    width: 100%;
    padding: 5px;
    text-align: right;
}

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
