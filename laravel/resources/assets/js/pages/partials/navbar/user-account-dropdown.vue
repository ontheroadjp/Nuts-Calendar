<template>
<span class="nav-item dropdown">

    <a href="#" class="dropdown-toggle" @click="toggle()">
        <span>
            <span class="icon is-small">
                <i class="fa fa-user"></i>
            </span>
            {{ $store.state.user.name }}
        </span>
        <span class="icon is-small" style="margin-top: 4px">
            <i class="fa fa-caret-down"></i>
        </span>
    </a>

    <ul class="dropdown-menu" v-show="isMenuOpen">
        <li>
            <router-link to="/me/settings/general" :style="menuItemStyle" @click="toggle">
                <span class="icon is-small">
                    <i class="fa fa-gear"></i>
                </span>
                {{ t('navbar.accountSettings') }}
            </router-link>
        </li>

        <li>
            <a href="#" :style="menuItemStyle" @click="clickLogout()">
                <span class="icon is-small">
                    <i class="fa fa-btn fa-arrow-circle-o-right"></i>
                </span>
                <span>{{ t('navbar.logout') }}</span>
            </a>
        </li>
    </ul>

</span>
</template>

<script>
    import core from '../../../mixins/core.js';
    import userApi from '../../../services/user.js';
    
    export default {
        mixins: [
            core, userApi
        ],
    
        data() {
            return {
                isMenuOpen: false
            }
        },

        computed: {
            theme: function() {
                return this.$store.state.app.theme;
            },

            menuItemStyle: function() {
                return 'color: ' + this.theme.primary.code;
            }
        },

        methods: {
            toggle () {
                if (this.isMenuOpen) {
                    return this.hide()
                }
                return this.show()
            },

            show () {
                this.isMenuOpen = true;
                setTimeout(() => document.addEventListener('click', this.hide), 0);
            },

            hide () {
                this.isMenuOpen = false;
                document.removeEventListener('click', this.hide);
            },

            clickLogout: function() {
                this.isMenuOpen = false;
                this.logout();
            }
        }
    }
</script>

<style lang="scss">
/*
   @import '../../../../sass/app.scss';
    @import 'resources/assets/sass/app.scss';
*/

/* A fork of https://github.com/twbs/bootstrap.  */
.dropdown {
    position: relative;
}

.dropdown-menu {
    display: block;
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 1000;
    float: left;
    min-width: 180px;
    padding: 5px 0;
    margin: 2px 0 0;
    list-style: none;
    font-size: 14px;
    text-align: left;
    background-color: #fff;
    border: 1px solid #ccc;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    background-clip: padding-box;

    & > li > a {
        display: block;
        padding: 3px 20px;
        clear: both;
        font-weight: normal;
        line-height: 1.428571429;
        color: white;
        white-space: nowrap;
    }

    & > li > a:hover,
    & > li > a:focus {
        text-decoration: none;
        color: #262626;
        background-color: #f5f5f5;
    }
}
</style>
