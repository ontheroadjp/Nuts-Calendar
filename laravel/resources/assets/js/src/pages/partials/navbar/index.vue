<template>
<section
    v-show="$route.meta.navbar.enable"
    id="headerNav"
    :class="['hero', theme.primary.class, 'is-medium']"
>

<div class="hero-head">
<header class="nav navbar-fixed-top" :style="headerStyle">

    <template>
        <div class="nav-left" style="padding-left: 20px;">
            <a class="nav-item is-brand" href="/">
                <img v-show="$route.meta.navbar.logo" src="/images/nuts-logo-white.png" alt="Nuts logo">
            </a>
        </div>

        <hamburger-menu></hamburger-menu>

        <div class="nav-right nav-menu" style="overflow:visible">

            <router-link to="/"
                v-show="$route.meta.navbar.home"
                class="nav-item thin"
                :style="[ linkColorStyle, pointerEventsStyle ]"
            >{{ t('navbar.home') }}</router-link>

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
                    v-show="$route.meta.navbar.dashboard"
                    to="/dashboard"
                    class="nav-item thin"
                    :style="[ linkColorStyle, pointerEventsStyle ]"
                    @click.native="$store.commit('calendar/SET_VALUE', {
                        key: 'currentId',
                        value: 'dashboard'
                    })"
                >{{ t('navbar.dashboard') }}
                </router-link>
                <user-account-dropdown></user-account-dropdown>
            </template>

            <theme-dropdown v-show="$route.meta.navbar.theme" :color="linkColor"></theme-dropdown>
            <lang-dropdown v-show="$route.meta.navbar.lang" e:color="linkColor"></lang-dropdown>

            <span v-show="$route.meta.navbar.twitter" class="nav-item">
                <a :class="['button', theme.primary.class, 'is-inverted', 'is-outlined']"
                    :style="[linkColorStyle, pointerEventsStyle, {
                            'border': '1px solid ' + linkColor
                    }]"
                >
                    <span class="icon">
                        <i class="fa fa-twitter"></i>
                    </span>
                    <span>Tweet</span>
                </a>
            </span>

        </div><!-- // .nav-right .nav-menu -->

    </template>

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

    export default {
        name: 'navbar-index',
        components: {
            'hamburgerMenu': hamburgerMenu,
            'user-account-dropdown': userAccountDropdown,
            'theme-dropdown': themeDropdown,
            'lang-dropdown': langDropdown
        },

        mixins: [ core ],

        props: [ 'height' ],

        data() {
            return {
                linkColor: 'rgb(242, 242, 242)'
            }
        },

        computed: {
            ...mapState('user', {
                username: state => state.data.name
            }),

            ...mapState('dashboard', {
                disabled: state => state.disabled
            }),

            headerStyle: function() {
                return {
                        'border-bottom': `1px solid this.theme.secondary.code`,
                        'box-shadow': 'none',
                    }
            },

            linkColorStyle: function() {
                if( this.disabled ) return chroma(this.linkColor).alpha(0.3);
                return { 'color': this.linkColor }
            },

            pointerEventsStyle: function() {
                if( this.disabled ) {
                    return { 'pointer-events': 'none' };
                }

                return { 'pointer-events': 'auto' };
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
