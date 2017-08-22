<template>
<div>
    <modal v-show="modal.columnSettings.isActive">
        <button class="modal-close" @click="clickClose()"></button>
        <div class="modal-card">
            <section class="modal-card-body" style="
                border-top-left-radius: 3px;
                border-top-right-radius: 3px;
                padding: 60px;
                height: 350px;
            ">
                <h2>ID: {{ modal.columnSettings.userCalendar.id }}</h2>
                <h2>Name: {{ modal.columnSettings.userCalendar.name }}</h2>
                <h2>Description: {{ modal.columnSettings.userCalendar.description }}</h2>
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
                        class="title is-4" 
                        @click.native="clickUserCalendar(userCalendar.id)"
                    >{{ userCalendar.name }}
                    </router-link>
                </p>
    
                <p class="subtitle is-6">
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
            'theme': state => state.app.theme
        })
    },

    methods: {
        openDialog: function( userCalendar ) {
            this.modal.columnSettings.userCalendar = userCalendar;
            this.modal.columnSettings.isActive = true;
        },

        clickClose: function() {
            this.modal.columnSettings.isActive = false;
        }
    }
}
</script>

<style lang="scss" scoped>
    /* empty */
</style>
