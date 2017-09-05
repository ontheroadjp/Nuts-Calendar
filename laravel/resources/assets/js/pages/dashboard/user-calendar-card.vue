<template>
<div>
    <modal v-if="modal.isActive">
        <div class="modal-card">

            <section class="modal-card-body" 
                style="padding: 40px;" 
                :style="[style.bgSecondary]">

                <button 
                    class="delete" 
                    style="position: absolute; top: 20px; right: 20px;"
                    aria-label="close" 
                    @click="clickClose()"
                ></button>

                <table style="width:100%">
                    <inline-text-input 
                        id="calendar-name"
                        inputClass="title"
                        inputColor="#fff"
                        iconColor="#fff"
                        placeholder="Calendar Name"
                        :isLoading="updateState.isLoading.name"
                        :syncValue.sync="inputName"
                        :defaultValue="userCalendar.name"
                        :saveCallback="clickSaveName"
                        :editingId.sync="editingId"
                    ></inline-text-input>  
                    <inline-text-input 
                        id="calendar-description"
                        inputClass="subtitle"
                        inputColor="#fff"
                        iconColor="#fff"
                        placeholder="Description"
                        :isLoading="updateState.isLoading.description"
                        :syncValue.sync="inputDescription"
                        :defaultValue="userCalendar.description"
                        :saveCallback="clickSaveDescription"
                        :editingId.sync="editingId"
                    ></inline-text-input>  
                </table>
            </section> 

            <section class="modal-card-body" style="padding: 60px;">
                <label class="label">Members</label>
                <ul class="members">
                    <li v-for="member in members" class="member">
                        <input :id="member.name" 
                            type="checkbox" 
                            class="nuts-input-checkbox" 
                            :checked="userCalendarMemberIds.indexOf(member.id) !== -1"
                            @change="changeMemberValue(
                                member.name, 
                                userCalendar.id,
                                member.id
                            )"
                        >
                        <label :for="member.name" 
                            class="member-checkbox-label" 
                            style="display: inline;"
                        >{{ member.name }}</label>
                    </li>
                </ul>
            </section>
        </div>
    </modal>
    
    <div :class="['card', 'is-clickable', theme.primary.class]"
        style="height: 150px;">

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
                        class="title" 
                        @click.native="clickUserCalendar(userCalendar.id)"
                    >{{ userCalendar.name }}
                    </router-link>
                </p>
    
                <p class="subtitle">
                    {{ userCalendar.description }}
                </p>
    
                <div class="icon"
                    style="position: absolute; top: 20px; right: 20px;">

                    <a @click="openDialog(userCalendar)">
                        <i class="fa fa-gear"></i>
                    </a>
                </div>
            </div>
    
        </div><!-- // .media -->
        </div><!-- // .card-content -->
    </div><!-- // .card -->
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import modal from '../../components/modal.vue';

import inlineTextInput from '../../components/inline-text-input.vue';

export default {
    components: {
        'modal': modal,
        'inline-text-input': inlineTextInput
    },

    props: [
        'userCalendar'
    ],

    data() {
        return {
            editingId: '',
            userCalendarMemberIds: [],
            modal: {
                isActive: false,
            }
        }
    },

    computed: {
        ...mapState({
            members: state => state.member.data.members,
            userCalendarMembers: state => state.userCalendarMember.data.userCalendarMembers,
            theme: state => state.app.theme
        }),

        ...mapState('userCalendar', {
            updateState: state => state.update,
        }),

        inputName: {
            get() {
                return this.$store.state.userCalendar.update.updateValues.name;
            },

            set(value) {
                this.$store.commit('userCalendar/update/setUpdateValue', { 
                    key: 'name', 
                    value: value 
                });
            }
        },

        inputDescription: {
            get() {
                return this.$store.state.userCalendar.update.updateValues.description;
            },

            set(value) {
                this.$store.commit('userCalendar/update/setUpdateValue', {
                    key: 'description',
                    value: value
                });
            }
        },

        style: function() {
            return {
                bgSecondary: {
                    'background-color': this.theme.secondary.code,
                    'color': 'white'
                }
            }
        }
    },

    methods: {
        ...mapActions('userCalendar/update', {
            prepare: 'prepare',
            updateName: 'updateName',
            updateDescription: 'updateDescription'
        }),

        ...mapActions('userCalendarMember/insert', {
            insertUserCalendarMember: 'insert'
        }),

        ...mapActions('userCalendarMember/remove', {
            removeUserCalendarMember: 'remove'
        }),

        openDialog: function( userCalendar ) {
            this.modal.isActive = true;
            this.prepare({ userCalendar });
        },

        clickClose: function() {
            this.modal.isActive = false;
        },

        clickSaveName: function() {
            u.clog('clickSave()');
            this.updateName(this.userCalendar.id);
        },

        clickSaveDescription: function() {
            u.clog('clickSave()');
            this.updateDescription(this.userCalendar.id);
        },

        clickUndo: function() {
            this.input.name = this.userCalendar.name;
            this.input.description = this.userCalendar.description;
        },

        changeMemberValue(elementId, userCalendarId, memberId) {
            u.clog('--------------------------------');
            u.clog('user_calendar_id: ' + userCalendarId);
            u.clog('member_id: ' + memberId);
            const value = document.getElementById(elementId).checked;
            u.clog('value: ' + value);

            if( value ) {
                this.insertUserCalendarMember({ userCalendarId, memberId });
            } else {
                this.removeUserCalendarMember({ userCalendarId, memberId });
            }
        },

        clickUserCalendar: function(id) {
            u.clog('changeCalendar(' + id + ')');
            this.$store.commit('setCurrentCalendarId', id);
        },

        initUserCalendarMemberIds: function() {
            const self = this;
            this.userCalendarMembers.forEach( function( val ) {
                if( val.user_calendar_id === self.userCalendar.id ) {
                    self.userCalendarMemberIds.push(val.member_id);
                }
            });
        }
    },

    mounted() {
        this.initUserCalendarMemberIds();
    }
}
</script>

<style lang="scss" scoped>
.message {
    background-color: red;
}

/*
.inline-text-input {
    border: none;
    box-shadow: none;
    width: 83%;
    outline: none;
}
*/

.members {
    margin: 10px 20px;
}

.member {
    line-height: 2.0rem;
}

.member-checkbox-label {
    margin: 0 5px;
}
</style>
