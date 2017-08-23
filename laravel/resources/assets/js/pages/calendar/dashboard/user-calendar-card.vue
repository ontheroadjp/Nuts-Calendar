<template>
<div>
    <modal v-if="modal.columnSettings.isActive">
        <button class="modal-close" @click="clickClose()"></button>
        <div class="modal-card">
            <section v-show="modal.hasError">
                <div class="message"> error!  </div>
            </section>

            <section class="modal-card-body" style="
                border-top-left-radius: 3px;
                border-top-right-radius: 3px;
                padding: 60px;
                height: 600px;
            ">
                <form>
                    <input 
                        id="name"
                        class="title inline-text-input" 
                        type="text" 
                        style="margin-bottom: 0"
                        placeholder="Calendar Name"
                        v-model="modal.input.name"
                        @focus="modal.editing.name = true"
                        @blur="blurName()"
                    >
                    <a class="button" 
                        v-show="modal.editing.name" 
                        @click="clickNameCancel().editing.name=false"
                        :disabled="modal.input.name === userCalendar.name"
                    ><i class="fa fa-times"></i></a>
                    <a class="button" 
                        v-show="modal.editing.name"
                        @click="clickNameSave()"
                        :disabled="modal.input.name === userCalendar.name"
                    ><i class="fa fa-floppy-o"></i></a>

                    <input 
                        id="description"
                        class="subtitle inline-text-input" 
                        type="text" 
                        placeholder="Description"
                        v-model="modal.input.description"
                        @focus="modal.editing.description = true"
                        @blur="blurDescription()"
                    >
                    <a class="button" 
                        v-show="modal.editing.description" 
                        @click="clickDescriptionCancel()"
                        :disabled="modal.input.description === userCalendar.description"
                    ><i class="fa fa-times"></i></a>
                    <a class="button" 
                        v-show="modal.editing.description"
                        @click="clickDescriptionSave()"
                        :disabled="modal.input.description === userCalendar.description"
                    ><i class="fa fa-floppy-o"></i></a>
                
                    <label class="label">Members</label>
                    <ul class="members">
                        <li v-for="member in members" class="member">
                            <input :id="member.name" 
                                type="checkbox" 
                                class="nuts-input-checkbox" 
                                :checked="member.id === modal.columnSettings.userCalendar.id"
                            >
                            <label :for="member.name" 
                                class="member-checkbox-label" 
                                style="display: inline;"
                            >{{ member.name }}</label>
                        </li>
                    </ul>

                </form>
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

export default {
    components: {
        'modal': modal
    },

    props: [
        'userCalendar'
    ],

    data() {
        return {
            modal: {
                columnSettings: {
                    isActive: false,
                    userCalendar: ''
                },

                hasError: false,

                editing: {
                    name: false,
                    description: false
                },

                input: {
                    name: '',
                    description: ''
                }
            }
        }
    },

    computed: {
        ...mapState({
            members: state => state.dashboard.data.members,
            theme: state => state.app.theme
        })
    },

    methods: {
        openDialog: function( userCalendar ) {
            this.modal.columnSettings.userCalendar = userCalendar;
            this.modal.columnSettings.isActive = true;
        },

        clickClose: function() {
            this.modal.columnSettings.isActive = false;
        },

        clickNameSave: function() {
            u.clog('clickNameSave()');
            this.modal.editing.name = false;
            this.modal.hasError = false;
        },

        clickNameCancel: function() {
            this.modal.input.name = this.userCalendar.name;
            this.modal.editing.name = false;
            this.modal.hasError = false;
        },

        blurName: function() {
            if( this.modal.input.name === this.userCalendar.name ) {
                this.modal.editing.name = false;
            } else {
                u.clog('name has not been saved');
                document.getElementById('name').focus();
                this.modal.hasError = true;
            }
        },

        clickDescriptionSave: function() {
            u.clog('clickDescriptionSave()');
            this.modal.editing.description = false;
            this.modal.hasError = false;
        },

        clickDescriptionCancel: function() {
            this.modal.input.description = this.userCalendar.description;
            this.modal.editing.description = false;
            this.modal.hasError = false;
        },

        blurDescription: function() {
            if( this.modal.input.description === this.userCalendar.description ) {
                this.modal.editing.description = false;
            } else {
                u.clog('description has not been saved');
                document.getElementById('description').focus();
                this.modal.hasError = true;
            }
        },

        clickUserCalendar: function(id) {
            u.clog('changeCalendar(' + id + ')');
            this.$store.commit('setCurrentCalendarId', id);
        }
    },

    mounted() {
        this.modal.input.name = this.userCalendar.name;
        this.modal.input.description = this.userCalendar.description;
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
