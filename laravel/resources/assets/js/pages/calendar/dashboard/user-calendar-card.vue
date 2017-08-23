<template>
<div>
    <modal v-if="modal.columnSettings.isActive">
        <button class="modal-close" @click="clickClose()"></button>
        <div class="modal-card">
            <section class="modal-card-body" style="
                border-top-left-radius: 3px;
                border-top-right-radius: 3px;
                padding: 60px;
                height: 350px;
            ">
                <div class="title">{{ modal.columnSettings.userCalendar.name }}</div>
                <div class="subtitle 5">{{ modal.columnSettings.userCalendar.description }}</div>
                <div class="members-label">
                    <i class="fa fa-user">&nbsp; Members</i>
                </div>
                <ul class="members">
                    <li v-for="member in members" class="member">
                        <template v-if="member.id === modal.columnSettings.userCalendar.id"> 
                            <input type="checkbox" checked>
                                <span class="member-checkbox-label">{{ member.name }}</span>
                        </template>
                        <template v-else>
                            <input type="checkbox">
                                <span class="member-checkbox-label">{{ member.name }}</span>
                        </template>
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

        clickUserCalendar: function(id) {
            u.clog('changeCalendar(' + id + ')');
            this.$store.commit('setCurrentCalendarId', id);
        }
    }
}
</script>

<style lang="scss" scoped>
.members {
    margin: 10px 20px;
}

.member {
    line-height: 1.5rem;
}

.member-checkbox-label {
    margin: 0 5px;
}
</style>
