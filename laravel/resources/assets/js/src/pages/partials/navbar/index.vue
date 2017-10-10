<template>
<section id="headerNav" :class="['hero', theme.primary.class, 'is-medium']">
<div class="hero-head">
<header class="nav navbar-fixed-top" :style="headerStyle">

    <div class="nav-left" style="padding-left: 20px;">
        <a class="nav-item is-brand" href="/">
            <!-- <img src="/images/bulma-type-white.png" alt="Bulma logo"> -->
            <img src="/images/nuts-logo-white.png" alt="Nuts logo">
        </a>
    </div>

    <hamburger-menu></hamburger-menu>

    <div class="nav-right nav-menu" style="overflow:visible">

        <router-link to="/"
            class="nav-item thin"
            :style="{ 'color': linkColorStyle, 'pointer-events': pointerEventsStyle }"
        >{{ t('navbar.home') }}</router-link>

        <!-- <template v-if="! $store.state.user.data.name"> -->
        <template v-if="! username">
            <router-link to="/login" class="nav-item thin">
                {{ t('navbar.login') }}
            </router-link>

            <router-link to="/register" class="nav-item thin">
                {{ t('navbar.register') }}
            </router-link>
        </template>

        <template v-else>
            <router-link
                to="/dashboard"
                class="nav-item thin"
                :style="{ 'color': linkColorStyle, 'pointer-events': pointerEventsStyle }"
                @click.native="$store.commit('calendar/setValue', {
                    key: 'currentId',
                    value: 'dashboard'
                })"
            >{{ t('navbar.dashboard') }}
            </router-link>
            <user-account-dropdown></user-account-dropdown>
        </template>

        <theme-dropdown></theme-dropdown>
        <lang-dropdown></lang-dropdown>

        <!-- <theme-changer></theme-changer> -->
        <!-- <lang-changer></lang-changer> -->

        <span class="nav-item">
            <a :class="['button', theme.primary.class, 'is-inverted', 'is-outlined']"
                :style="{
                    'color': linkColorStyle,
                    'pointer-events': pointerEventsStyle,
                    'border': '1px solid ' + linkColorStyle
                }"
            >
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
    import { mapState } from 'vuex';
    import core from '../../../mixins/core.js';
    import hamburgerMenu from './hamburger-menu.vue';
    import userAccountDropdown from './user-account-dropdown.vue';
    import themeDropdown from './theme-dropdown.vue';
    import langDropdown from './lang-dropdown.vue';
//    import themeChanger from './theme-changer.vue';
//    import langChanger from './lang-changer.vue';

    export default {
        name: 'navbar-index',
        components: {
            'hamburgerMenu': hamburgerMenu,
            'user-account-dropdown': userAccountDropdown,
            'theme-dropdown': themeDropdown,
            'lang-dropdown': langDropdown
//            'themeChanger': themeChanger,
//            'langChanger': langChanger
        },

        mixins: [ core ],

        props: [ 'height' ],

        computed: {
            ...mapState('user', {
                username: state => state.data.name
            }),

            ...mapState('dashboard', {
                disabled: state => state.disabled
            }),

            headerStyle: function() {
                return 'border-bottom: 1px solid ' + this.theme.secondary.code + '; '
                    + 'box-shadow: none;';
            },

            linkColorStyle: function() {
                if( this.disabled ) return "rgba(242, 242, 242, .3)";
                return "rgba(242, 242, 242, .75)";
            },

            pointerEventsStyle: function() {
                if( this.disabled ) return 'none';
                return 'auto';
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
