<template>
<div class="nav-item">
    <dropdown-menu
        id="user-account-dropdown-menu"
        :frontIconStyle="frontIconStyle"
        :backIconStyle="backIconStyle"
        :menuHeight="66"
    >
        <li>
            <router-link to="/me/settings/general" class="thin" :style="menuItemStyle">
                <span class="icon is-small">
                    <i class="fa fa-gear"></i>
                </span>
                {{ t('navbar.accountSettings') }}
            </router-link>
        </li>

        <li>
            <a href="signout" class="thin" :style="menuItemStyle" @click="clickLogout()">
                <span class="icon is-small">
                    <i class="fa fa-btn fa-arrow-circle-o-right"></i>
                </span>
                <span>{{ t('navbar.logout') }}</span>
            </a>
        </li>
    </dropdown-menu>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import userService from '../../../services/user.js';
import dropdownMenu from '../../../components/DropdownMenu/DropdownMenu.vue';
import chroma from 'chroma-js';

export default {
    components: {
        'dropdown-menu': dropdownMenu
    },

    mixins: [ userService ],

    computed: {
        ...mapState({
            theme: state => state.app.theme
        }),

        ...mapState('dashboard', {
            disabled: state => state.disabled
        }),

        ...mapGetters({
            t: 'i18nText'
        }),

        frontIconStyle: function() {
            if( this.disabled ) {
                return { color: chroma('rgb(242, 242, 242)').alpha(0.3).css('hsl') }
            }
            return { color: 'rgb(242, 242, 242)' };
        },

        backIconStyle: function() {
            if( this.disabled ) {
                return { color: chroma(this.theme.secondary.code).alpha(0.5).css('hsl') }
            }
            return { color: this.theme.secondary.code };
        },

        menuItemStyle: function() {
//            if( this.disabled ) {
//                return { color: chroma(this.theme.primary.code).alpha(0.2).css('hsl') }
//            }
            return { color: this.theme.primary.code };
        }
    },

    methods: {
        clickLogout: function() {
            this.logout();
        }
    }
}
</script>
