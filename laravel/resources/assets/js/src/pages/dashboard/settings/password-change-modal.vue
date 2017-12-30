<template>
<div id="password-change-modal">
    <notification-modal
        blackScreenColor="rgba(10,10,10,0.45)"
        :onClose="clickClose"
        :isActive="isActive"
        :type="notification.type"
        :isShowNotification="notification.isShow"
    >
        <div class="box" style="padding-top: 50px;">
            <modal-contents @update:result="status => { handleResult(status) }"></modal-contents>
        </div>
    </notification-modal>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
//import textInput from '../../../components/form/text-input.vue';
//import checkboxInput from '../../../components/form/checkbox.vue';
//import simpleModal from '../../../components/modal/simple-modal.vue';
import notificationModal from '../../../components/modal/notification-modal.vue';
import modalContents from './password-change-content.vue';

export default {
//    components: { textInput, checkboxInput, simpleModal },
    components: { notificationModal, modalContents },

    props: {
        isActive: { type: Boolean, required: true },
        onClose:  { type: Function, required: true }
    },

    data() {
        return {
            notification: {
                isShow: false,
                type: 'success'
            },
//            isShowNotification: false,
//            resultStatus: 'success'
//            userCalendarMemberIds: [],
//            showMemberGroup: false,
//            deleteResult: ''
        }
    },

    computed: {
//        modalHeight: function() {
////            this.$nextTick(function() {
//                const el = document.getElementsByClassName('box')[0];
//                u.clog('=============================');
//                u.clog(el);
//                const height = this.isActive && el !== 'undefined' ? el.clientHeight : 0;
//                u.clog(height);
//                return height + 'px';
////            });
//        }
//        ...mapState('user', {
//            userId: state => state.data.user.id
//        }),
//
//        ...mapState('member', {
//            members: state => state.data.members
//        }),
//
//        ...mapState('userCalendar', {
//            userCalendar: state => state.update.editingUserCalendar
//        }),
//
//        ...mapState('userCalendarMember', {
//            userCalendarMembers: state => state.data.userCalendarMembers
//        })
    },

    methods: {
        clickClose: function() {
            this.onClose(false);
            this.notification.isShow = false;
        },

        handleResult: function(status) {
            const type = status ? 'success' : 'failed';
            this.notification.type = type;
            this.notification.isShow = true;
        }
//        ...mapActions('userCalendar', {
//            remove: 'remove/remove',
//            update: 'update/update',
//            setUpdateValue: 'update/setUpdateValue'
//        }),
//
//        ...mapActions('userCalendarMember', {
//            insertUserCalendarMember: 'insert/insert',
//            removeUserCalendarMember: 'remove/remove'
//        }),
//
//        blurName(data) {
//            if(data.isReady) {
//                this.setUpdateValue({ key: 'name', value: data.inputValue });
//                this.update(false);
//            }
//        },
//
//        blurDescription(data) {
//            if(data.isReady) {
//                this.setUpdateValue({ key: 'description', value: data.inputValue });
//                this.update(false);
//            }
//        },
//
//        changeMemberGroup(elementId, userId, userCalendarId, memberId) {
//            if( document.getElementById(elementId).checked ) {
//                this.insertUserCalendarMember({ userId, userCalendarId, memberId });
//            } else {
//                this.removeUserCalendarMember({ userId, userCalendarId, memberId });
//            }
//        },
//
//        clickDeleteOK: function() {
//            this.remove({
//                id: this.userCalendar.id,
//                notify: false,
//                successCb: () => {
//                    this.deleteResult = 'success';
//                },
//                failedCb: () => {
//                    this.deleteResult = 'failed';
//                }
//            });
//        },
//
//        initUserCalendarMemberIds: function() {
//            this.userCalendarMemberIds = [];
//            this.userCalendarMembers.forEach((val) => {
//                if( val.user_calendar_id === this.userCalendar.id ) {
//                    this.userCalendarMemberIds.push(val.member_id);
//                }
//            });
//        }
    },

    watch: {
//        userCalendar: function() {
//            this.initUserCalendarMemberIds();
//        }
    },

    mounted() {
//        this.initUserCalendarMemberIds();
//        const height = document.getElementById('password-change-modal').clientHeight;
//        u.clog('HEIGHT: ' + height);
    }
};
</script>
