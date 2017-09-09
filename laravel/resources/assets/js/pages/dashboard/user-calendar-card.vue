<template>
<div>
    <user-calendar-modal :isActive.sync="modal.isActive" :userCalendar="userCalendar"></user-calendar-modal>
    <div :class="['card', 'is-clickable', theme.primary.class]"
        :style="style.calendarCard">

        <div class="card-content">
        <div class="media">

            <div class="media-left">
                <span class="icon">
                    <i class="fa fa-calendar"></i>
                </span>
            </div>
    
            <div class="media-content">
                <p style="margin-bottom: 10px;">
                    <router-link
                        to="/calendar/view"
                        class="title thin-200" 
                        @click.native="clickUserCalendar(userCalendar.id)"
                    >{{ userCalendar.name }}
                    </router-link>
                </p>
    
                <p class="subtitle thin">
                    {{ userCalendar.description }}
                </p>
    
                <a @click="openDialog(userCalendar)" style="transition: color 0.3s">
                    <div class="icon" style="position: absolute; top: 6px; right: 3px; color: #fff">
                        <i class="fa fa-gear" style="margin-right: 5px"></i>
                    </div>
                </a>
            </div>
    
        </div><!-- // .media -->
        </div><!-- // .card-content -->
    </div><!-- // .card -->
</div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import userCalendarModal from './user-calendar-modal.vue';
//import modal from '../../components/modal.vue';
//import inlineTextInput from '../../components/inline-text-input.vue';

export default {
    components: {
//        'modal': modal,
//        'inline-text-input': inlineTextInput
        'user-calendar-modal': userCalendarModal,
    },

    props: {
        userCalendar: { type: Object, required: true }
    },

    data() {
        return {
//            editingId: '',
//            userCalendarMemberIds: [],
            modal: {
                isActive: false,
            }
        }
    },

    computed: {
        ...mapState({
            theme: state => state.app.theme
        }),

//        ...mapState('userCalendar', {
//            updateState: state => state.update,
//        }),
//
//        ...mapState('member', {
//            members: state => state.data.members,
//        }),

//        ...mapState('userCalendarMember', {
//            userCalendarMembers: state => state.data.userCalendarMembers,
//        }),

//        inputName: {
//            get() {
//                return this.updateState.updateValues.name;
//            },
//
//            set(value) {
//                this.setUpdateValue({ key: 'name', value: value });
//            }
//        },
//
//        inputDescription: {
//            get() {
//                return this.updateState.updateValues.description;
//            },
//
//            set(value) {
//                this.setUpdateValue({ key: 'description', value: value });
//            }
//        },

        style: function() {
            return {
                calendarCard: {
                    'height': '150px',
                    'background-image': 'linear-gradient(-135deg, ' + this.theme.secondary.code + ' 40px, transparent 0)'
                },

//                bgPrimary: {
//                    'background-color': this.theme.primary.code,
//                    'color': 'white'
//                }
            }
        }
    },

    methods: {
//        ...mapMutations('userCalendar/update', {
//            setUpdateValue: 'setUpdateValue'
//        }),

        ...mapActions('userCalendar/update', {
            prepare: 'prepare',
//            updateName: 'updateName',
//            updateDescription: 'updateDescription'
        }),

//        ...mapActions('userCalendarMember/insert', {
//            insertUserCalendarMember: 'insert'
//        }),
//
//        ...mapActions('userCalendarMember/remove', {
//            removeUserCalendarMember: 'remove'
//        }),

        openDialog: function( userCalendar ) {
            this.modal.isActive = true;
            this.prepare({ userCalendar });
        },

//        clickClose: function() {
//            this.modal.isActive = false;
//        },
//
//        clickSaveName: function() {
//            u.clog('clickSave()');
//            this.updateName(this.userCalendar.id);
//        },
//
//        clickSaveDescription: function() {
//            u.clog('clickSave()');
//            this.updateDescription(this.userCalendar.id);
//        },
//
//        clickUndo: function() {
//            this.input.name = this.userCalendar.name;
//            this.input.description = this.userCalendar.description;
//        },
//
//        changeMemberValue(elementId, userCalendarId, memberId) {
//            u.clog('--------------------------------');
//            u.clog('user_calendar_id: ' + userCalendarId);
//            u.clog('member_id: ' + memberId);
//            const value = document.getElementById(elementId).checked;
//            u.clog('value: ' + value);
//
//            if( value ) {
//                this.insertUserCalendarMember({ userCalendarId, memberId });
//            } else {
//                this.removeUserCalendarMember({ userCalendarId, memberId });
//            }
//        },

        clickUserCalendar: function(id) {
            u.clog('changeCalendar(' + id + ')');
            this.$store.commit('calendar/setValue', {
                key: 'currentId', id,
                value: id
            });
        },

//        initUserCalendarMemberIds: function() {
//            const self = this;
//            this.userCalendarMembers.forEach( function( val ) {
//                if( val.user_calendar_id === self.userCalendar.id ) {
//                    self.userCalendarMemberIds.push(val.member_id);
//                }
//            });
//        }
    },

//    mounted() {
//        this.initUserCalendarMemberIds();
//    }
}
</script>

<style lang="scss" scoped>
/*
.header-icon {
    background-color: #fff;
    border-radius: 30px;
    &:hover {
        background-color: #9a9a9a;
    }
}

.members {
    margin: 10px 20px;
}

.member {
    line-height: 2.0rem;
}

.member-checkbox-label {
    margin: 0 5px;
}
*/
</style>
