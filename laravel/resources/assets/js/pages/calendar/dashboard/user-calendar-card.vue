<template>
<div>
    <modal v-if="modal.isActive">
        <!-- <button class="modal-close" @click="clickClose()"></button> -->
        <div class="modal-card">
            <section v-show="modal.hasError">
                <div class="message"> error!  </div>
            </section>

            <section class="modal-card-body" style="padding: 40px;" :style="[style.bgSecondary]">
                <button 
                    class="delete" 
                    style="position: absolute; top: 20px; right: 20px;"
                    aria-label="close" 
                    @click="clickClose()"
                ></button>
                <form>
                    <input 
                        id="name"
                        class="title inline-text-input" 
                        type="text" 
                        style="margin-bottom: 0"
                        :style="[style.bgSecondary]"
                        placeholder="Calendar Name"
                        v-model.trim="input.name"
                    >
                    <a class="button" 
                        v-show="userCalendar.name !== input.name" 
                        @click="clickUndo()"
                    >
                        <i class="fa fa-undo"></i>
                    </a>
                    <a class="button" 
                        v-show="userCalendar.name !== input.name"
                        @click="clickSave()"
                    ><i class="fa fa-floppy-o"></i></a>

                    <input 
                        id="description"
                        class="subtitle inline-text-input" 
                        type="text" 
                        :style="[style.bgSecondary]"
                        placeholder="Description"
                        v-model.trim="input.description"
                    >
                    <a class="button" 
                        v-show="userCalendar.description !== input.description" 
                        @click="clickUndo()"
                    ><i class="fa fa-undo"></i></a>
                    <a class="button" 
                        v-show="userCalendar.description !== input.description"
                        @click="clickSave()"
                    ><i class="fa fa-floppy-o"></i></a>

                </form>
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
        style="height: 150px;"
    >
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
                    style="position: absolute; top: 20px; right: 20px;"
                >
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
import { mapState } from 'vuex';
import modal from '../../../components/modal.vue';
import userCalendarService from '../../../services/userCalendar.js';
import userCalendarMemberService from '../../../services/userCalendarMember.js';

export default {
    mixins: [
        userCalendarService, userCalendarMemberService
    ],

    components: {
        'modal': modal
    },

    props: [
        'userCalendar'
    ],

    data() {
        return {
            userCalendarMemberIds: [],
            modal: {
                isActive: false,
                hasError: false,
            }
        }
    },

    computed: {
        ...mapState({
            members: state => state.member.data.members,
            userCalendarMembers: state => state.dashboard.data.userCalendarMembers,
            theme: state => state.app.theme
        }),

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
        openDialog: function( userCalendar ) {
            this.modal.isActive = true;
        },

        clickClose: function() {
            this.modal.isActive = false;
            this.initModalInput();
        },

        clickSave: function() {
            u.clog('clickSave()');
            this.modal.hasError = false;
            this.update(this.userCalendar.id);
        },

        clickUndo: function() {
            this.input.name = this.userCalendar.name;
            this.input.description = this.userCalendar.description;
            this.modal.hasError = false;
        },

        changeMemberValue(elementId, userCalendarId, memberId) {
            u.clog('--------------------------------');
            u.clog('user_calendar_id: ' + userCalendarId);
            u.clog('member_id: ' + memberId);
            const value = document.getElementById(elementId).checked;
            u.clog('value: ' + value);
            this.chengeMember(userCalendarId, memberId, value);
            if( value ) {
                this.userCalendarMemberIds.push(memberId);
            } else {
                const index = this.userCalendarMemberIds.indexOf(memberId);
                this.userCalendarMemberIds.splice(index, 1);
            }
        },

        clickUserCalendar: function(id) {
            u.clog('changeCalendar(' + id + ')');
            this.$store.commit('setCurrentCalendarId', id);
        },

        initModalInput: function() {
            this.input.name = this.userCalendar.name;
            this.input.description = this.userCalendar.description;
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
        this.initModalInput();
        this.initUserCalendarMemberIds();
    }
}
</script>

<style lang="scss" scoped>
.message {
    background-color: red;
}

.inline-text-input {
    border: none;
    box-shadow: none;
    width: 83%;
    outline: none;
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
</style>
