<template>
<div>
    <div :class="['card', 'is-clickable', theme.primary.class]"
        :style="style.memberCard">

        <div class="card-content">
        <div class="media">

            <div class="media-left">
                <span class="fa-stack fa-lg">
                    <i class="fa fa-circle fa-stack-2x"
                        style="color: rgb(240, 240, 240)"
                    ></i>
                    <i class="fa fa-stack-1x fa-inverse fa-user"
                        :style="'color: ' + theme.secondary.code"
                    ></i>
                </span>
            </div>


            <div class="media-content">
                <p style="margin-bottom: 10px;">
                    <!-- <router-link
                        to="/calendar/view"
                        class="thin-200"
                        style="font-size: 1.4rem;"
                        @click.native="clickMember(member.id)"
                    >{{ member.name }}
                    </router-link> -->
                    <span class="thin-200"
                        style="font-size: 1.4rem;"
                    >{{ member.name }}</span>
                </p>

                <p class="subtitle thin">
                    {{ member.description }}
                </p>

                <a @click="clickSettings( member )" style="transition: color 0.3s">
                    <div class="icon" style="position: absolute; top: 0px; right: -2px; color: #fff">
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
        member:   { type: Object, required: true },
        clickSettings:  { type: Function, required: true }
    },

    data() {
        return {
            modal: {
                isActive: false
            }
        }
    },

    computed: {
        ...mapState({
            theme: state => state.app.theme
        }),

//        frontIconStyle: function() {
//            if( this.disabled ) {
//                return { color: chroma('rgb(242, 242, 242)').alpha(0.3).css('hsl') }
//            }
//            return { color: 'rgb(242, 242, 242)' };
//        },
//
//        backIconStyle: function() {
//            if( this.disabled ) {
//                return { color: chroma(this.theme.secondary.code).alpha(0.5).css('hsl') }
//            }
//            return { color: this.theme.secondary.code };
//        },

        style: function() {
            return {
                memberCard: {
                    'height': '150px',
                    'background-image': 'linear-gradient(-135deg, '
                                        + this.theme.secondary.code
                                        + ' 30px, transparent 0)'
                }
            }
        }
    },

    methods: {
        clickMember: function(id) {
//            u.clog('changeCalendar(' + id + ')');
//            this.$store.commit('calendar/SET_VALUE', {
//                key: 'currentId', id,
//                value: id
//            });
        }
    }
};
</script>
