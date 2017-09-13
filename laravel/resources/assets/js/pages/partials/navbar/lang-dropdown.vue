<template>
<div class="nav-item">
    <dropdown-menu 
        id="lang-dropdown-menu"
        :label="menuItems[selectedLang].label" 
        :labelStyle="{ 'color': linkColorStyle, 'pointer-events': pointerEventsStyle }"
        icon="" 
        :backIconStyle="backIconStyle"
        :menuHeight="40"
    >
        <template v-for="item in menuItems">
            <li v-if="selectedLang != item.value">
                <a class="thin" :style="menuItemStyle" @click="clickMenuItem(item.value)">
                    <span class="icon is-small">
                        <i class="fa fa-btn fa-snowflake-o"></i>
                    </span>
                    <span>{{ item.label }}</span>
                </a>
            </li>
        </template>
    </dropdown-menu>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import dropdownMenu from '../../../components/DropdownMenu/DropdownMenu.vue';

export default {
    components: {
        'dropdown-menu': dropdownMenu
    },

    computed: {
        ...mapState({
            theme: state => state.app.theme,
            selectedLang: state => state.app.lang
        }),

        ...mapState('dashboard', {
            disabled: state => state.disabled
        }),

        ...mapGetters({
            t: 'i18nText'
        }),

        menuItems: function() {
            return {
                en: { value: "en", label: 'English' },
                ja: { value: "ja", label: 'Japanese' }
            }
        },

        selectedStyle: function() {
            return { 'background-color': this.theme.secondary.code }
        },

        backIconStyle: function() {
            return { color: this.theme.secondary.code };
        },

        menuItemStyle: function() {
            return { color: this.theme.primary.code };
        },

        linkColorStyle: function() {
            if( this.disabled ) return "rgba(242, 242, 242, 0.3)";
            return "";
        },

        pointerEventsStyle: function() {
            if( this.disabled ) return 'none';
            return 'auto';
        }
    },

    methods: {
        clickMenuItem: function(value) {
            u.clog('changeLang: ' + value);
            localStorage.setItem('lang', value);
            this.$store.commit('setLang', value);
        }
    }
}
</script>
