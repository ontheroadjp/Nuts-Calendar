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
                v-model="input.newName"
            >
            <a :class="['button', theme.primary.class]" 
                @click="clickSave(index)"
               :disabled="!input.newName != ''"
            ><i class="fa fa-floppy-o"></i>&nbspAdd</a>
        </form>
    </div>

    <div class="card" style="padding: 20px 40px;">
        <form>
        <table style="width: 40%">
        <template v-for="m, index in members">
            <tr 
                @mouseenter="showEditIcon(index, true)"
                @mouseleave="showEditIcon(index, false)"
                style="height: 2.5rem"
            >
                <td width="30px">
                    <i v-show="(!isEditing && input.icon[index]) || input.editing[index]" class="fa fa-pencil"></i>
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
                        @focus="editing(index, true)"
                        @blur="editing(index, false)"
                    >
                </td>
                <td style="width: 100px">
                    <a class="button" 
                       v-show="(!isEditing && input.icon[index]) || input.editing[index]"
                        @click="clickUndo(index)"
                       :disabled="input.name[index] === members[index].name"
                    >
                        <i class="fa fa-undo"></i>
                    </a>
                    <a class="button" 
                       v-show="(!isEditing && input.icon[index]) || input.editing[index]"
                        @click="clickSave(index)"
                       :disabled="input.name[index] === members[index].name"
                    ><i class="fa fa-floppy-o"></i></a>
                </td>
            </tr>
        </template>
        </table>
        </form>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {
            input: {
                newName: '',
                editing: [],
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

        isEditing: function() {
            return this.input.editing.indexOf(true) !== -1;
        }
    },

    methods: {
        showEditIcon: function(index, value) {
            this.$set(this.input.icon, index, value);
        },

        editing: function(index, value) {
            this.$set(this.input.name, index, this.members[index].name);
            this.$set(this.input.editing, index, value);
        },

        clickUndo: function(index) {
            const i = parseInt(index);
            this.$set(this.input.name, index, this.members[index].name);
        },

        clickSave: function(index) {

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

p:before {
    content: "HOGE";
}

.input-icon {
    font-size: 1.5rem;
    &:hover::before {
        content: "<i class='fa fa-pencil'></i>";
    }
}
</style>
