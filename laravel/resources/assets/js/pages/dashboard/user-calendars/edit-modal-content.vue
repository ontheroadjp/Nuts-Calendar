<<template>
<div class="card" :style="showDeleteConfirm ? 'height: 160px' : ''">
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

    <div class="popup-footer">
        <div v-show="!showDeleteConfirm"
            style="display: flex; justify-content: flex-end; width: 95%;"
        >
            <button
                class="button strip thin"
                @click="showDeleteConfirm = true"
                :disabled="updateIsLoading"
            >Delete</button>
        </div>

        <transition name="delete-confirm">
            <div class="card delete-confirm"
                v-show="showDeleteConfirm"
            >
                <div style="
                    display: flex;
                    justify-content: center;
                    height: 75%;
                ">
                    <div style="display: flex; justify-content: space-around; align-items: center;">
                        <i v-if="!removeIsLoading" class="fa fa-exclamation-circle fa-3x"></i>
                        <i v-else class="fa fa-refresh fa-spin fa-3x"></i>
                        <span v-show="!removeIsLoading"
                            class="thin-200"
                            style="padding: 20px; font-size: 1.8rem;"
                        >Delete {{ userCalendar.name }} ?</span>
                    </div>
                </div>

                <div v-show="!removeIsLoading" class="delete-confirm-buttons">
                    <button class="button strip"
                        style="color:#fff"
                        @click="showDeleteConfirm = false"
                        :disabled="updateIsLoading"
                    >Cancel</button>

                    <button class="button strip"
                        style="color:#fff"
                        @click="clickDeleteOK()"
                    >OK</button>
                </div>
            </div>
        </transition>
    </div><!-- // .dialog-footer -->
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import textInput from '../../../components/form/text-input.vue';
import checkboxInput from '../../../components/form/checkbox.vue';

export default {
    components: {
        textInput, checkboxInput
    },

    props: {
        updateIsLoading: { type: Boolean, default: false }
    },

    data() {
        return {
            userCalendarMemberIds: [],
            showDeleteConfirm: false,
            removeIsLoading: false
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
.popup-footer {
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

.delete-confirm {
    background-color: red;
    padding: 10px;
    color: #fff;
    text-align: center;
    overflow: hidden;
    height: 150px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
}

.delete-confirm-buttons {
    display: inline-flex;
    justify-content: space-around;
    width: 100%;
}

.delete-confirm-enter-active,
.delete-confirm-leave-active {
    transition: all .3s ease;
}

.delete-confirm-leave-to,
.delete-confirm-enter {
    height: 0;
    opacity: 0;
}

.delete-confirm-enter-to,
.delete-confirm-leave {
    opacity: 1;
    height: 150px;
}
</style>
