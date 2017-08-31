<template>
<div>
    <!-- members -->
    <div class="card" style="padding: 20px 40px;">
        <form>
            <input 
                class="inline-text-input" 
                type="text" 
                style="
                    width:40%; 
                    font-size:1rem; 
                    line-height:2.3rem
                "
                placeholder="Add New Member"
                v-model.trim="newName"
            >
            <a :class="['button', theme.primary.class]" 
                @click="clickAddMember()"
               :disabled="!newName != '' || isInsertLoading"
            >
                <span v-if="!isInsertLoading">
                    Add Member
                </span>

                <span class="icon is-small" v-else>
                    <i class="fa fa-refresh fa-spin"></i>
                </span>
            </a>
        </form>
    </div>

    <div class="card" style="padding: 20px 40px;">
        <form>
        <table class="member-edit-table" style="width: 60%">
        <template v-for="member, index in members">
            <tr 
                @mouseenter="showEditIcon(index, true)"
                @mouseleave="showEditIcon(index, false)"
                style="height: 2.5rem"
            >
                <td width="30px">
                    <i v-if="(!isFocused && input.icon[index]) || input.focused[index]" 
                        class="fa fa-pencil"
                        style="display:inline;"></i>
                    <i v-else-if="input.notSaved[index]" 
                        class="fa fa-exclamation-circle"
                        style="color:red; display:inline"></i>
<!--
                    <i v-else-if="isUpdateLoading && input.focused[index]" 
                        class="fa fa-refresh fa-spin"
                        style="display:inline"></i>
-->
                </td>

                <td>
                    <input 
                        id="name"
                        class="inline-text-input input-icon" 
                        type="text" 
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
        </template>
        </table>
        </form>
    </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    data() {
        return {
            input: {
                focused: [],
                notSaved: [],
                name: [],
                icon: []
            }
        }
    },

    computed: {
        ...mapState({
            theme: state => state.app.theme
        }),

        ...mapState('dashboard', {
            members: state => state.data.members,
            userCalendars: state => state.data.userCalendars
        }),

        ...mapState('member/insert', {
            isInsertLoading: state => state.isLoading
        }),

        ...mapState('member/update', {
            isUpdateLoading: state => state.isLoading
        }),

        newName: {
            get () {
                return this.$store.state.member.insert.input.newName;
            },

            set (value) {
                this.setNewName({ value });
            }
        },

        isFocused: function() {
            return this.input.focused.indexOf(true) !== -1;
        }
    },

    methods: {
        ...mapActions('member/insert', {
            setNewName: 'setNewName',
            insert: 'insert'
        }),

        ...mapActions('member/update', {
            prepareUpdate: 'prepare',
            update: 'update',
        }),

        ...mapActions('member/remove', {
            prepareRemove: 'prepare',
            remove: 'remove'
        }),

        clickAddMember: function() {
            this.insert();
        },

        showEditIcon: function(index, value) {
            this.$set(this.input.icon, index, value);
        },

        focused: function(index, value) {
            this.$set(this.input.focused, index, value);
            if( !value ) {
                if( this.members[index].name !== this.input.name[index] ) {
                    this.$set(this.input.notSaved, index, true);
                } else {
                    this.$set(this.input.notSaved, index, false);
                }
            }
        },

        clickUndo: function(index) {
            this.$set(this.input.notSaved, index, false);
            this.$set(this.input.name, index, this.members[index].name);
        },

        clickSave: function(index) {
            this.$set(this.input.notSaved, index, false);
            let editingMember = this.members[index];
            editingMember.name = this.input.name[index];
            editingMember.isShow = true;
            this.prepareUpdate({ editingMember })
            this.update();
        },

        clickRemove: function(index) {
            this.remove({ index });
        }
    },

    watch: {
        'members': function(val) {
            const self = this;
            this.members.forEach(function(val, index) {
                self.input.name[index] = val.name;
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.no-border {
    border: none;
}

.member-edit-table {
    & td {
        vertical-align: middle;
    }
}

.inline-text-input {
    border: none;
    box-shadow: none;
    width: 83%;
    outline: none;
}

</style>
