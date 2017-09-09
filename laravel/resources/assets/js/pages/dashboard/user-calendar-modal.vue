<template>
<modal v-if="isActive">
    <div class="modal-card">

        <section class="modal-card-body" 
            style="padding: 40px;" 
            :style="[style.bgPrimary]">

            <button 
                class="delete" 
                style="position: absolute; top: 20px; right: 20px;"
                aria-label="close" 
                @click="clickClose()"
            ></button>

            <table style="width:100%">
                <tr>
                    <td rowspan="3" style="width: 70px">
                        <span class="fa-stack fa-lg">
                            <i class="fa fa-calendar fa-2x" 
                                style="margin-left:1px; color: #fff"></i>
                        </span>
                    </td>
                </tr>

                <inline-text-input 
                    id="calendar-name"
                    inputClass="title thin-200"
                    inputStyle="color: #fff"
                    iconStyle="color: #fff"
                    placeholder="Calendar Name"
                    :isLoading="updateState.isLoading.name"
                    :syncValue.sync="inputName"
                    :defaultValue="userCalendar.name"
                    :saveCallback="clickSaveName"
                    :editingId.sync="editingId"
                ></inline-text-input>  

                <inline-text-input 
                    id="calendar-description"
                    inputClass="subtitle thin"
                    inputStyle="color: #fff"
                    iconStyle="color: #fff"
                    placeholder="Description"
                    :isLoading="updateState.isLoading.description"
                    :syncValue.sync="inputDescription"
                    :defaultValue="userCalendar.description"
                    :saveCallback="clickSaveDescription"
                    :editingId.sync="editingId"
                ></inline-text-input>  
            </table>
        </section> 

        <section class="modal-card-body thin" style="padding: 60px">
            <label class="label thin-400">Members</label>
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
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import modal from '../../components/modal.vue';
import inlineTextInput from '../../components/inline-text-input.vue';

export default {
    components: {
        modal,
        inlineTextInput
    },

    props: {
        userCalendar: { type: Object, required: true },
        isActive: { type: Boolean, required: true }
    },

    data() {
        return {
            editingId: '',
            userCalendarMemberIds: [],
        }
    },

    computed: {
        ...mapState({
            theme: state => state.app.theme
        }),

        ...mapState('userCalendar', {
            updateState: state => state.update
        }),

        ...mapState('member', {
            members: state => state.data.members
        }),

        ...mapState('userCalendarMember', {
            userCalendarMembers: state => state.data.userCalendarMembers
        }),

        inputName: {
            get() {
                return this.updateState.updateValues.name;
            },

            set(value) {
                this.setUpdateValue({ key: 'name', value: value });
            }
        },

        inputDescription: {
            get() {
                return this.updateState.updateValues.description;
            },

            set(value) {
                this.setUpdateValue({ key: 'description', value: value });
            }
        },

        style: function() {
            return {
                bgPrimary: {
                    'background-color': this.theme.primary.code,
                    'color': 'white'
                }
            }
        }

    },

    methods: {
        ...mapMutations('userCalendar/update', {
            setUpdateValue: 'setUpdateValue'
        }),

        ...mapActions('userCalendar/update', {
            updateName: 'updateName',
            updateDescription: 'updateDescription'
        }),

        ...mapActions('userCalendarMember/insert', {
            insertUserCalendarMember: 'insert'
        }),

        ...mapActions('userCalendarMember/remove', {
            removeUserCalendarMember: 'remove'
        }),

        clickClose: function() {
            this.$emit('update:isActive', false);
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

