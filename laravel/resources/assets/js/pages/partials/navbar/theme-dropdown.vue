<template>
<div class="nav-item">
    <dropdown-menu :label="t('theme.' + selectedTheme)" icon="" :backIconStyle="backIconStyle">
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
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import dropdownMenu from '../../../components/dropdown-menu.vue';

export default {
    components: {
        'dropdown-menu': dropdownMenu
    },

    computed: {
        ...mapState({
            theme: state => state.app.theme,
            selectedTheme: state => state.app.theme.name
        }),

        ...mapGetters({
            t: 'i18nText'
        }),

        menuItems: function() {
            return [
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

<style lang="scss">
    /* empty */
</style>
