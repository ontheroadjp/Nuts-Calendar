<template>
<div id="dashboard-members-pane">
    <new-modal
        :isActive="newModal.isActive"
        :onClose="closeModal"
    ></new-modal>

    <edit-modal
        :isActive="editModal.isActive"
        :onClose="closeModal"
    ></edit-modal>


    <!-- add new members -->
    <!-- <div class="columns">
        <div class="column is-12">
            <div class="card" style="padding: 20px 40px; margin-bottom: 20px;">
                <form>
                    <input
                        class="text-input"
                        type="text"
                        style=" font-size:1rem; line-height:2.3rem"
                        placeholder="Add New Member"
                        v-model.trim="newName"
                    >
                    <a :class="['button', 'is-outlined', 'add-member', theme.primary.class]"
                        @click="clickAddMember()"
                       :disabled="!newName != '' || isInsertLoading">

                        <span v-if="!isInsertLoading">
                            Add Member
                        </span>

                        <span class="icon is-small" v-else>
                            <i class="fa fa-refresh fa-spin"></i>
                        </span>
                    </a>
                </form>
            </div>
        </div>
    </div> -->

    <!-- members -->
    <div class="columns is-multiline">
        <template v-for="member in members">
            <div class="column is-6">
                <card
                    :member="member"
                    :clickSettings="openEditModal"
                ></card>
            </div>
        </template>

        <new-card
            :onOpen="openNewModal"
        ></new-card>
    </div>

<!--
    <template v-for="member, index in members">
    <div class="columns">

        <div class="card column is-6" style="padding: 5px 40px; margin-bottom: 5px;" draggable>
            <div class="icon is-pulled-right" style="margin-top: 8px; margin-right: -25px; cursor: move;">
                <i class="fa fa-align-justify"></i>
            </div>
            <form>
            <table class="member-edit-table" style="width: 100%;">
                <tr @mouseenter="showEditIcon(index, true)"
                    @mouseleave="showEditIcon(index, false)"
                    style="height: 2.5rem">

                    <td width="30px">
                        <i v-if="(!isFocused && input.icon[index]) || input.focused[index]"
                            class="fa fa-pencil"
                            style="display:inline;"></i>
                        <i v-else-if="input.notSaved[index]"
                            class="fa fa-exclamation-circle"
                            style="color:red; display:inline"></i>
                    </td>

                    <td>
                        <input
                            id="name"
                            type="text"
                            class="text-input input-icon"
                            style="
                                width:95%;
                                font-size:1rem;
                                line-height:1.5rem
                            "
                            placeholder="Name"
                            v-model.trim="input.name[index]"
                            @focus="focused(index, true)"
                            @blur="focused(index, false)"
                        >
                    </td>
                    <td style="width: 160px">
                        <a class="button no-border"
                           v-show="(!isFocused && input.icon[index]) || input.focused[index]"
                           :disabled="input.name[index] === members[index].name || input.name[index] === ''"
                        ><i class="fa fa-undo" @click="clickUndo(index)"></i>
                        </a>
                        <a class="button no-border"
                           v-show="(!isFocused && input.icon[index]) || input.focused[index]"
                           :disabled="!isUpdateLoading && (input.name[index] === members[index].name || input.name[index] === '')"
                        ><i class="fa fa-floppy-o" @click="clickSave(index)"></i></a>
                        <a class="button no-border"
                           v-show="(!isFocused && input.icon[index]) || input.focused[index]"
                        ><i class="fa fa-trash" @click="clickRemove(index)"></i></a>
                    </td>
                </tr>
            </table>
            </form>
-->
        </div><!-- / .card -->

    </div><!-- / .columns -->
    </template>

</div>
</template>

<script>
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import newModal from './new-modal.vue';
import editModal from './edit-modal.vue';
import card from './card.vue';
import newCard from './card-new.vue';

export default {
    components: { newModal, editModal, card, newCard },

    data() {
        return {
            isLoading: [],
            newModal: {
                isActive: false
            },

            editModal: {
                isActive: false
            }
//            input: {
//                focused: [],
//                notSaved: [],
//                name: {},
//                icon: []
//            }
        }
    },

    computed: {
        ...mapState({
            theme: state => state.app.theme
        }),

        ...mapState('userCalendar', {
            userCalendars: state => state.data.userCalendars
        }),

        ...mapState('member', {
            members: state => state.data.members
        }),

        ...mapState('member/insert', {
            isInsertLoading: state => state.isLoading
        }),

        ...mapState('member/update', {
            isUpdateLoading: state => state.isLoading
        }),

//        newName: {
//            get () {
//                return this.$store.state.member.insert.insertValues.name;
//            },
//
//            set (value) {
//                this.setInsertValue({
//                    key: 'name',
//                    value: value
//                });
//            }
//        },

//        isFocused: function() {
//            return this.input.focused.indexOf(true) !== -1;
//        }
    },

    methods: {
        ...mapActions('dashboard', {
            data: 'data'
        }),

//        ...mapActions('member/insert', {
//            setInsertValue: 'setInsertValue',
//            insert: 'insert'
//        }),

        ...mapActions('member/update', {
            prepareUpdate: 'prepare',
            update: 'update',
            reset: 'reset'
        }),

        ...mapActions('member/remove', {
            prepareRemove: 'prepare',
            remove: 'remove'
        }),

        openNewModal: function() {
            this.newModal.isActive = true;
        },

        openEditModal: function( member ) {
            this.prepareUpdate({ editingMember: member });
            this.editModal.isActive = true;
        },

        closeModal: function() {
            this.newModal.isActive = false;
            this.editModal.isActive = false;
            setTimeout(() => this.reset(), 1000);
        }

//        clickAddMember: function() {
//            this.insert();
//        },

//        showEditIcon: function(index, value) {
//            this.$set(this.input.icon, index, value);
//        },

//        focused: function(index, value) {
//            this.$set(this.input.focused, index, value);
//            if( !value ) {
//                if( this.members[index].name !== this.input.name[index] ) {
//                    this.$set(this.input.notSaved, index, true);
//                } else {
//                    this.$set(this.input.notSaved, index, false);
//                }
//            }
//        },

//        clickUndo: function(index) {
//            this.$set(this.input.notSaved, index, false);
//            this.$set(this.input.name, index, this.members[index].name);
//        },

//        clickSave: function(index) {
//            this.$set(this.input.notSaved, index, false);
//
////            let editingMember = this.members[index];
////            editingMember.name = this.input.name[index];
////            editingMember.isShow = true;
////            this.prepareUpdate({ editingMember })
//
//            const id = index;
//            const name = this.input.name[index];
//            const isShow = true;
//
//            this.prepareUpdate({ id, name, isShow })
//
//            this.update();
//        },

//        clickRemove: function(index) {
//            this.remove({ index });
//        }
    },

//    mounted() {
//        const self = this;
//        Object.keys(this.members).forEach(function(key) {
//            Vue.set(self.input.name, key, self.members[key].name);
//            self.isLoading[key] = false;
//        });
//    },

//    watch: {
//        members: function(val) {
//            const self = this;
//            Object.keys(this.members).forEach(function(key) {
//                self.input.name[key] = this[key].name;
//            }, this.members);
//        }
//    }
}
</script>

<style lang="scss" scoped>
/*
.no-border {
    border: none;
}

.member-edit-table {
    & td {
        vertical-align: middle;
    }
}

.text-input {
    border: none;
    box-shadow: none;
    width: 83%;
    outline: none;
    font-weight: 100;
}

a.add-member {
    color: #fff;
}
*/
</style>
