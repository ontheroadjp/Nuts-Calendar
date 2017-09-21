<template>
<div>
    <!-- <user-calendar-modal
        :isActive.sync="modal.isActive"
        :userCalendar="userCalendar"
    ></user-calendar-modal> -->

    <!-- <user-calendar-modal
        v-show="modal.isActive"
        :onClose="closeDialog"
        :userCalendar="userCalendar"
    ></user-calendar-modal> -->

    <!-- <user-calendar-modal
        v-show="modal.isActive"
        :onClose="closeDialog"
    ></user-calendar-modal> -->

    <div :class="['card', 'is-clickable', theme.primary.class]"
        :style="style.calendarCard">

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
                        class="title thin-200"
                        @click.native="clickUserCalendar(userCalendar.id)"
                    >{{ userCalendar.name }}
                    </router-link>
                </p>

                <p class="subtitle thin">
                    {{ userCalendar.description }}
                </p>

                <a @click="clickSettings( userCalendar )" style="transition: color 0.3s">
                    <div class="icon" style="position: absolute; top: 6px; right: 3px; color: #fff">
                        <i class="fa fa-gear" style="margin-right: 5px"></i>
                    </div>
                </a>
            </div>

        </div><!-- // .media -->
        </div><!-- // .card-content -->
    </div><!-- // .card -->
</div>
</template>

<script>
//import { mapState, mapActions, mapMutations } from 'vuex';
import { mapState } from 'vuex';
//import userCalendarModal from './edit-modal.vue';

export default {
//    components: { userCalendarModal },

    props: {
        userCalendar:   { type: Object, required: true },
        clickSettings:  { type: Function, required: true }
    },

    data() {
        return {
            modal: {
                isActive: false,
            }
        }
    },

    computed: {
        ...mapState({
            theme: state => state.app.theme
        }),

        style: function() {
            return {
                calendarCard: {
                    'height': '150px',
                    'background-image': 'linear-gradient(-135deg, '
                                        + this.theme.secondary.code
                                        + ' 40px, transparent 0)'
                }
            }
        }
    },

    methods: {
//        ...mapActions('userCalendar/update', {
//            prepare: 'prepare',
//            reset: 'reset'
//        }),

//        openDialog: function() {
//            this.modal.isActive = true;
//            this.prepare({ userCalendar: this.userCalendar });
//        },

//        closeDialog: function() {
//            this.modal.isActive = false;
//            this.reset();
//        },

        clickUserCalendar: function(id) {
            u.clog('changeCalendar(' + id + ')');
            this.$store.commit('calendar/setValue', {
                key: 'currentId', id,
                value: id
            });
        }
    }
};
</script>
