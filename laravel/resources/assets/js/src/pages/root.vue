<template>
<div>
    <section :class="['hero', theme.primary.class, 'is-fullheight']">
    <div class="hero-body">
    <div id="home" class="container" style="display: flex;">

        <div class="main-hero-left">
            <div class="contents" style="width: 60%;">
                <img src="images/nuts-logo-big.png" />
                <small>(BETA)</small>

                <div style="margin-bottom: 30px;">
                    <h2 class="subtitle thin" style="color:#fff">
                        Grasp the schedules of your own multiple roles,
                        family members, lovers, and colleagues with one
                        simple calendar !!
                    </h2>
                </div>

                <div style="display: flex; justify-content: space-around;">
                    <router-link
                        to="/login"
                        class="button is-outlined"
                        :class="theme.secondary.class"
                    >{{ t('navbar.login') }}
                    </router-link>

                    <router-link
                        to="/register"
                        class="button is-outlined"
                        :class="theme.secondary.class"
                    >{{ t('navbar.register') }}
                    </router-link>
                </div>
            </div>
        </div><!-- // .main-hero-left -->

        <div class="main-hero-right">
<!--
            <h3>Login</h3>
            <login-panel
                @update:success="loginSuccess"
                @update:failed="loginFailed"
            ></login-panel>
-->
        </div><!-- // .main-hero-right -->

    </div>
    </div>
    </section>

    <section>
        <div style="height: 250px; background-color: blue;">
            HOGEHOGE
        </div>
    </section>
    <section>
        <div style="height: 250px; background-color: red;">
            HOGEHOGE
        </div>
    </section>
    <section>
        <div style="height: 250px; background-color: yellow;">
            HOGEHOGE
        </div>
    </section>
</div>
</template>

<script>
import core from '../mixins/core.js';
//import loginPanel from './user/login/login-panel.vue';

export default {
//    components: { loginPanel },

    mixins: [ core ],

    computed: {
        theme: function() {
            return this.$store.state.app.theme;
        }
    },

//    methods: {
//        loginSuccess() {
//
//        },
//
//        loginFailed() {
//
//        }
//    }
}
</script>

<style lang="scss" scoped>
.main-hero-right {
    width: 50%;
}
</style>
