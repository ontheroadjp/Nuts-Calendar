<template>
<div class="nav-item">
    <p class="control is-expanded">
        <span class="select is-fullwidth">
            <select
                class="thin"
                :style="selectStyle"
                v-model="selectedTheme"
                @change="setTheme()"
                ><option
                    v-for="option in options"
                    :value="option.value"
                    >{{ option.label }}
                </option>
            </select>
        </span>
    </p>
</div>
</template>

<script>
import core from '../../../mixins/core.js';

export default {
    data() {
        return {
            selectedTheme: ''
        }
    },

    mixins: [
        core
    ],

    computed: {
        options: function() {
            return [
                { value: "ruri", label: this.t('theme.ruri') },
                { value: "koiai", label: this.t('theme.koiai') },
                { value: "nadeshiko", label: this.t('theme.nadeshiko') },
                { value: "mikan", label: this.t('theme.mikan') },
                { value: "sumire", label: this.t('theme.sumire') },
                { value: "moegi", label: this.t('theme.moegi') }
            ];
        },
        selectStyle: function() {
            return {
                background: 'none',
                border: 'none',
                color: this.theme.primary.codeInvert
            }
        }
    },

    methods: {
        setTheme: function() {
            u.clog('changeTheme: ' + this.selectedTheme);
            localStorage.setItem('theme', this.selectedTheme);
            this.$store.commit('SET_THEME', this.selectedTheme);
        }
    },

    mounted() {
        this.selectedTheme = this.$store.state.app.theme.name;
    }
}
</script>
