<template>
<section id="signboard" class="hero is-primary" :style="heroStyling">
    <div class="hero-body">
        <div class="container">
            <div id="mc_embed_signup" class="columns is-vcentered">

                <div class="column is-one-third is-left">
                    <p class="title">Family <strong>Calendar</strong></p>
                    <p class="subtitle">
                        <small>
                            Manage your task & events in easily, quickly and a fun!
                        </small>
                    </p>
                </div>

                <div class="column">
                    <span class="is-pulled-right" style="font-size: 1.8em;">
                        <nuts-ym-field></nuts-ym-field>
                    </span>
                </div>

            </div>
        </div>
    </div>

    <div class="hero-foot" :style="heroFootStyling">
        <div class="container">
            <nav class="tabs is-boxed">

                <ul>
                    <li 
                        v-for="uCalendar in userCalendar" 
                        @click="$store.commit('setCurrentCalendarId', uCalendar.id)"
                        :class="{'is-active': currentCalendarId == uCalendar.id}"
                    ><a href="#">
                        <span class="icon"><i class="fa fa-calendar"></i></span>
                        {{ uCalendar.name }}
                    </a></li>

                    <!--
                    <li><a href="#">
                        <span class="icon"><i class="fa fa-plus"></i></span>
                    </a></li>
                    -->

                </ul>

                <a class="button is-primary is-outlined" @click="selectSettings()">
                    <span class="icon"><i class="fa fa-cog"></i></span>
                    <span>Settings</span>
                </a>

            </nav>
        </div>
    </div>
</section>
</template>

<script>
    import nutsYmField from '../nuts-vue-components/NutsYmField.vue';

    export default {

        components: {
            'nuts-ym-field': nutsYmField,
        },

        data() {
            return {
                heroStyling: {
                    'margin-top': '-2px',
                },

                heroFootStyling: {
                    'height': '36px',
                },
            }
        },

        computed: {

            userCalendar: function() {
                return this.$store.state.userCalendar;
            },

            currentCalendarId: function() {
                return this.$store.state.currentCalendarId;
            },

        },

        methods: {

//            selectMenu(index) {
//                this.$store.commit('setMainIndex', index);
//            },

            selectSettings() {
                this.$store.commit('setMainIndex', 99);
            },

        }
    } 
</script>

<style>

</style>
