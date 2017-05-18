<template>
    <span class="nav-item">
        <p class="control is-expanded">
        <span class="select is-fullwidth">
            <select 
                :style="selectStyle" 
                v-model="selectedTheme" 
                @change="setTheme()"
                style="border: none"
                ><option 
                    v-for="option in options" 
                    :value="option.value"
                    >{{ option.text }}
                </option>
            </select>
        </span>
        </p>
    </span>
</template>

<script>
import { mapState } from 'vuex';
import core from '../../../mixins/core.js';

export default {
    data() {
        const self = this;
        return {
            selectedTheme: '',
        }
    },

    mixins: [
        core
    ],

    computed: {
        options: function() {
            return [
                { value: "koiai", text: this.t('theme.koiai') },
                { value: "nadeshiko", text: this.t('theme.nadeshiko') },
                { value: "mikan", text: this.t('theme.mikan') },
                { value: "sumire", text: this.t('theme.sumire') },
                { value: "moegi", text: this.t('theme.moegi') },
            ];
        },
        selectStyle: function() {
            return {
                background: 'none',
                color: this.theme.primary.codeInvert,
            }
        }
    },

    methods: {
        setTheme: function() {
            u.clog('changeTheme: ' + this.selectedTheme);
            localStorage.setItem('theme', this.selectedTheme);
            this.$store.commit('setTheme', this.selectedTheme);
        }
    },

    mounted() {
        this.selectedTheme = this.$store.state.app.theme.name;
    }
}
</script>
