<template>
<section id="headerNav" :class="['hero', theme.primary.class, 'is-medium']">
<div class="hero-head">
<header class="nav navbar-fixed-top" :style="headerStyle">

    <div class="nav-left" style="padding-left: 20px;">
        <a class="nav-item is-brand" href="/">
            <img src="/images/bulma-type-white.png" alt="Bulma logo">
        </a>
    </div>

    <hamburger-menu></hamburger-menu>

    <div class="nav-right nav-menu" style="overflow:visible">

        <router-link to="/" class="nav-item">{{ t('navbar.home') }}</router-link>

        <template v-if="! $store.state.user.name">
            <router-link to="/login" class="nav-item">{{ t('navbar.login') }}</router-link>
            <router-link to="/register" class="nav-item">{{ t('navbar.register') }}</router-link>
        </template>

        <template v-else>
            <router-link 
                to="/calendar"
                class="nav-item"
                @click="$store.commit('setCurrentCalendarId', 'dashboard')"
                >{{ t('navbar.dashboard') }}
            </router-link>

            <user-account-dropdown></user-account-dropdown>
        </template>

        <theme-changer></theme-changer>
        <lang-changer></lang-changer>

        <span class="nav-item">
            <a :class="['button', theme.primary.class, 'is-inverted']" >
                <span class="icon">
                    <i class="fa fa-twitter"></i>
                </span>
                <span>Tweet</span>
            </a>
        </span>
    
    </div><!-- // .nav-right .nav-menu -->

</header>
</div><!-- // .hero-head -->
</section>
</template>

<script>
    import core from '../../../mixins/core.js';
    import hamburgerMenu from './hamburger-menu.vue';
    import userAccountDropdown from './user-account-dropdown.vue';
    import themeChanger from './theme-changer.vue';
    import langChanger from './lang-changer.vue';
    
    export default {
        name: 'navbar-index',
        components: {
            'hamburgerMenu': hamburgerMenu,
            'userAccountDropdown': userAccountDropdown,
            'themeChanger': themeChanger,
            'langChanger': langChanger
        },

        mixins: [
            core
        ],

        props: [
            'height'
        ],

        computed: {
            headerStyle: function() {
                return 'border-bottom: 1px solid ' + this.theme.secondary.code + '; ' 
                    + 'box-shadow: none;';
            }
        },

        mounted() {
            const self = this;
            window.addEventListener('resize', function (event) {
                const height = document.getElementById('headerNav').clientHeight;
                self.$emit('update:height', height);
            });
        }
    }
</script>

<style lang="scss" scoped>
    /* empty */
</style>
