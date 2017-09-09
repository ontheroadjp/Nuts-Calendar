<template>
<div class="nav-item">
    <dropdown-menu 
        id="user-account-dropdown-menu"
        :backIconStyle="backIconStyle"
        :menuHeight="parseInt(66)"
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
            <a href="#" class="thin" :style="menuItemStyle" @click="clickLogout()">
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
import dropdownMenu from '../../../components/dropdown-menu.vue';

export default {
    components: {
        'dropdown-menu': dropdownMenu
    },

    mixins: [ userService ],

    computed: {
        ...mapState({
            theme: state => state.app.theme
        }),

        ...mapGetters({
            t: 'i18nText'
        }),

        backIconStyle: function() {
            return { color: this.theme.secondary.code };
        },

        menuItemStyle: function() {
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
