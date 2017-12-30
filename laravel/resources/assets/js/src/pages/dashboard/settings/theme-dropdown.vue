<template>
    <!--
<div class="nav-item">
    <dropdown-menu
        id="theme-dropdown-menu"
        :label="t('theme.' + selectedTheme)"
        :labelStyle="[linkColorStyle, pointerEventsStyle]"
        icon=""
        :backIconStyle="backIconStyle"
        :menuHeight="145"
    >
    -->
    <dropdown-menu
        id="theme-dropdown-menu"
        :label="t('theme.' + selectedTheme)"
        :labelStyle="linkColorStyle"
        icon=""
        :backIconStyle="backIconStyle"
        :menuHeight="145"
    >
        <template v-for="item in menuItems">
            <li v-if="selectedTheme == item.value" :style="selectedStyle">
                <span style="
                    display: block;
                    padding: 3px 20px;
                    color: white;
                    white-space: nowrap;
                ">
                    <span class="icon is-small">
                        <i class="fa fa-btn fa-snowflake-o"></i>
                    </span>
                    <span>{{ item.label }}</span>
                </span>
            </li>

            <li v-else>
                <a class="thin" :style="menuItemStyle" @click="clickMenuItem(item.value)">
                    <span class="icon is-small">
                        <i class="fa fa-btn fa-snowflake-o"></i>
                    </span>
                    <span>{{ item.label }}</span>
                </a>
            </li>
        </template>
    </dropdown-menu>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import dropdownMenu from '../../../components/DropdownMenu/DropdownMenu.vue';

export default {
    props: {
        color: {
            type: String,
            default: '#4a4a4a'
        }
    },

    components: {
        'dropdown-menu': dropdownMenu
    },

    computed: {
        ...mapState({
            theme: state => state.app.theme,
            selectedTheme: state => state.app.theme.name
        }),

        ...mapState('dashboard', {
            disabled: state => state.disabled
        }),

        ...mapGetters({
            t: 'i18nText'
        }),

        menuItems: function() {
            return [
                { value: "ruri", label: this.t('theme.ruri') },
                { value: "koiai", label: this.t('theme.koiai') },
                { value: "nadeshiko", label: this.t('theme.nadeshiko') },
                { value: "mikan", label: this.t('theme.mikan') },
                { value: "sumire", label: this.t('theme.sumire') },
                { value: "moegi", label: this.t('theme.moegi') }
            ]
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
            if( this.disabled ) return { 'color': chroma(this.color).alpha(0.3) };
            return { 'color': this.color };
        },

        pointerEventsStyle: function() {
            if( this.disabled ) return { 'pointer-events': 'none' };
            return { 'pointer-events': 'auto' };
        }
    },

    methods: {
        clickMenuItem: function(themeName) {
            u.clog('changeTheme: ' + themeName);
            localStorage.setItem('theme', themeName);
            this.$store.commit('setTheme', themeName);
        }
    }
}
</script>
