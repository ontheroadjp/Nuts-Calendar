<template>
<div>
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
import { mapState } from 'vuex';

export default {
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
