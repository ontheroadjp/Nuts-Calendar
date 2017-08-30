<template>
<div>
    <!-- members -->
    <div class="card" style="padding: 20px 40px;">
        <form>
            <input 
                id="name"
                class="inline-text-input" 
                type="text" 
                style="
                    width:40%; 
                    margin-bottom:5px; 
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
                    <i class="fa fa-floppy-o" style="margin-top: 3px;"></i>&nbspAdd
                </span>

                <span v-else>
                    <i class="fa fa-refresh fa-spin"></i>
                </span>
            </a>
        </form>
    </div>

    <div class="card" style="padding: 20px 40px;">
        <form>
        <table style="width: 60%">
        <template v-for="member, index in members">
            <tr 
                @mouseenter="showEditIcon(index, true)"
                @mouseleave="showEditIcon(index, false)"
                style="height: 2.5rem"
            >
                <td width="30px">
                    <i v-if="(!isFocused && input.icon[index]) || input.fucused[index]" 
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
                    <span v-else>{{ index }}</span>
                </td>

                <td>
                    <input 
                        id="name"
                        class="inline-text-input input-icon" 
                        type="text" 
                        style="
                            width:100%; 
                            margin-bottom:5px; 
                            font-size:1rem; 
                            line-height:1.5rem
                        "
                        placeholder="Name"
                        v-model.trim="input.name[index]"
                        @focus="fucused(index, true)"
                        @blur="fucused(index, false)"
                    >
                </td>
                <td style="width: 160px">
                    <a class="button" 
                       v-show="(!isFocused && input.icon[index]) || input.fucused[index]"
                        @click="clickUndo(index)"
                       :disabled="input.name[index] === members[index].name || input.name[index] === ''"
                    >
                        <i class="fa fa-undo"></i>
                    </a>
                    <a class="button" 
                       v-show="(!isFocused && input.icon[index]) || input.fucused[index]"
                        @click="clickSave(index)"
                       :disabled="!isUpdateLoading && (input.name[index] === members[index].name || input.name[index] === '')"
                    ><i class="fa fa-floppy-o"></i></a>
                    <a class="button" 
                       v-show="(!isFocused && input.icon[index]) || input.fucused[index]"
                        @click=""
                    ><i class="fa fa-trash"></i></a>
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
                fucused: [],
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
            return this.input.fucused.indexOf(true) !== -1;
        }
    },

    methods: {
        ...mapActions('member/insert', {
            setNewName: 'setNewName',
            insert: 'insert'
        }),

        ...mapActions('member/update', {
            prepare: 'prepare',
            update: 'update'
        }),

        clickAddMember: function() {
            this.insert();
        },

        showEditIcon: function(index, value) {
            this.$set(this.input.icon, index, value);
        },

        fucused: function(index, value) {
            this.$set(this.input.fucused, index, value);
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
            this.prepare({ editingMember })
            this.update();
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
.inline-text-input {
    border: none;
    box-shadow: none;
    width: 83%;
    outline: none;
}

</style>
